<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template slot="header">
      <div class="query--box global--flex">
        <div class="query-list--box global--flex">
          <div v-for="(item, index) in queryList" :key="index">
            <sz-text-input
              :queryObject="item"
              :index="index"
              className="primary"
              @fun_value_change="fun_value_change"
            ></sz-text-input>
          </div>
        </div>
        <div class="query-btn--box global--flex">
          <sz-button title="查询" type="primary" @click="fun_general_query"></sz-button>
          <sz-button class="global--ml20" title="高级查询" @click="fun_advanced_query"></sz-button>
        </div>
      </div>
    </template>
    <template>
      <div class="table-conditions--box">
        <div class="table-conditions--box-layar global-between-center--flex">
          <div class="table-conditions--left global--flex"></div>
          <div class="table-conditions--right global-between-center--flex">
            <div class="global-between-center--flex">
              <div
                class="global-between-center--flex"
                v-for="(item, index) in conditionsList"
                :key="index"
              >
                <template>
                  <sz-button
                    v-if="index != 'custom'"
                    class=""
                    :icon="item.icon"
                    :title="item.title"
                    type="text"
                    @click="fun_table_handle(index)"
                    size="medium"
                  />
                  <sz-custom-header
                    v-else
                    :customObject="item"
                    :thead="tableList.thead"
                    @fun_checkbox_change="fun_checkbox_change"
                  />
                </template>
                <span
                  v-show="index != 'custom'"
                  class="global-btn--line global-button--margin"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-list--box" id="handover-book">
        <sz-table
          :config="tableList"
          @fun_db_click="fun_db_click"
          @fun_child_db_click="fun_child_db_click"
          @fun_expand_change="fun_expand_change"
        ></sz-table>
      </div>
      <div v-if="advanced_query_obj_show">
        <sz-advanced-query
          :advanced_query_obj="advanced_query_obj"
          @fun_advanced_query_close="fun_advanced_query_close"
        />
      </div>
    </template>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  name: 'handover-book',
  components: {},
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let tableList = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: true,
      expand: true,
      expand_handover: true,
      table_height: 375,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      children_thead: [
        { label: '唯一标识', prop: 'unique_ident', checked: true, width: '250' },
        { label: '编号', prop: 'serial', checked: true, width: '200' },
        { label: '建设单位', prop: 'construct_unit', checked: true, width: '200' },
        { label: '工程名称', prop: 'project_name', checked: true, width: '200' },
        { label: '移交日期', prop: 'handed_ove_date', checked: true, width: '150' },
        { label: '发证日期', prop: 'certificate_date', checked: true, width: '150' },
        {
          label: '操作',
          prop: 'operation',
          type: 'operation',
          checked: true,
          disabled: true,
          width: '200',
          buttonGroup: [
            {
              label: '修改',
              type: 'text',
              event: 'button',
              handler: data => fun_modify_handover(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_handover(data)
            }
          ]
        }
      ],
      thead: [
        {
          label: '唯一标识',
          prop: 'project_name',
          checked: true,
          width: '250',
          type: 'function',
          callback: (row, prop) => {
            return `<span>工程名称：${row[prop]}</span>`
          }
        },
        // { label: '唯一标识', prop: 'project_name', checked: true, width: '250' },
        { label: '编号', checked: true, width: '200' },
        { label: '工程名称', checked: true, width: '200' },
        { label: '建设单位', checked: true, width: '200' },
        { label: '移交日期', checked: true, width: '150' },
        { label: '发证日期', checked: true, width: '150' },
        {
          label: '操作',
          prop: 'operation',
          type: 'operation',
          checked: true,
          disabled: true,
          width: '200',
          buttonGroup: [
            {
              label: '添加',
              type: 'text',
              event: 'button',
              handler: data => fun_create_handover(data)
            },
            {
              label: '修改',
              type: 'text',
              event: 'button',
              handler: data => fun_modify_engine(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '移交书',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/certificate-issued/handover-book', title: '证件发放' },
        { path: '/business-manage/certificate-issued/handover-book', title: '移交书' }
      ],
      queryList: {
        project_name: { title: '工程名称', value: '' }
      },
      conditionsList: {
        // remove: { title: '删除项目信息', icon: 'iconfont guilian-icon' },
        // lock: { title: '锁定', icon: 'iconfont guilian-icon' },
        // export: { title: '导出项目信息', icon: 'iconfont guilian-icon' },
        // custom: { title: '自定义表头', icon: 'iconfont guilian-icon' }
      },
      advanced_query_obj: {
        project_query_disabled: false,
        type_query_value: 2,
        query_field_list: []
      },
      advanced_query_obj_show: false,
      delete_current_row: null,
      expand_current_row: null
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })

    const fun_value_change = obj => {
      let { value, index } = obj
      contextData.queryList[index].value = value
    }

    const fun_general_query = () => {}

    const fun_advanced_query = () => {
      contextData.advanced_query_obj.query_field_list = JSON.parse(JSON.stringify(tableList.thead))
      contextData.advanced_query_obj.advanced_query_dialog = true
      contextData.advanced_query_obj_show = true
    }

    const fun_advanced_query_close = () => {
      contextData.advanced_query_obj.advanced_query_dialog = false
      contextData.advanced_query_obj_show = false
    }

    const fun_table_handle = index => {
      console.log(index)
    }

    const fun_checkbox_change = list => {
      tableList.thead.map(item => {
        item.checked = list.indexOf(item.label) != -1 ? true : false
      })
    }

    const fun_expand_change = row => {
      contextData.expand_current_row = row
    }

    const fun_db_click = row => {
      fun_modify_engine(row)
    }
    const fun_modify_engine = row => {
      context.root.$router.push({
        path: '/business-manage/project-regist/modify-engine',
        query: {
          id: row.id,
          type: row.project_type
        }
      })
    }

    const fun_create_handover = row => {
      context.root.$router.push({
        path: '/business-manage/certificate-issued/handover-book/increase-book',
        query: {
          id: row.id,
          type: row.project_type
        }
      })
    }

    const fun_child_db_click = row => {
      fun_modify_handover(row)
    }

    const fun_modify_handover = row => {
      context.root.$router.push({
        path: '/business-manage/certificate-issued/handover-book/modify-book',
        query: {
          id: row.id,
          type: row.project_type
        }
      })
    }

    const fun_delete_handover = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      fun_value_change,
      fun_general_query,
      fun_advanced_query,
      fun_create_handover,
      fun_modify_handover,
      fun_delete_handover,
      fun_modify_engine,
      fun_table_handle,
      fun_checkbox_change,
      fun_advanced_query_close,
      fun_db_click,
      fun_child_db_click,
      fun_expand_change
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
