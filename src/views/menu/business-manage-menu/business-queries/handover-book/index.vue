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
          class="table-padding-left30"
          :config="tableList"
          @fun_db_click="fun_db_click"
        ></sz-table>
      </div>
      <div v-if="advanced_query_obj_show">
        <sz-advanced-query
          :advanced_query_obj="advanced_query_obj"
          @fun_advanced_query_close="fun_advanced_query_close"
        />
      </div>
      <div v-if="look_handover_obj_show">
        <look-handover :look_handover_obj="look_handover_obj" @fun_look_handover_close="fun_look_handover_close" />
      </div>
    </template>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
import LookHandover from '@/views/menu/business-manage-menu/business-queries/components/look_handover_book.vue'
export default {
  name: 'handover-book',
  components: {
    LookHandover
  },
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let tableList = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: true,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        // {
        //   label: '唯一标识',
        //   prop: 'project_name',
        //   checked: true,
        //   width: '250',
        //   type: 'function',
        //   callback: (row, prop) => {
        //     return `<span>工程名称：${row[prop]}</span>`
        //   }
        // },
        { label: '唯一标识', prop: 'unique_ident', checked: true, width: '200' },
        { label: '编号', prop: 'serial', checked: true, disabled: true, width: '200' },
        { label: '工程名称', prop: 'project_name', checked: true, disabled: true, width: '200' },
        { label: '建设单位', prop: 'construct_unit', checked: true, width: '200' },
        { label: '建设单位负责人', prop: 'con_res_people', checked: false, width: '200' },
        { label: '建设单位联系电话', prop: 'con_contact_phone', checked: false, width: '200' },
        { label: '施工单位', prop: 'construct_organiza', checked: false, width: '200' },
        { label: '施工单位负责人', prop: 'org_res_people', checked: false, width: '200' },
        { label: '施工单位联系电话', prop: 'org_contact_phone', checked: false, width: '200' },
        { label: '移交人', prop: 'handed_over_people', checked: false, width: '200' },
        { label: '移交人联系电话', prop: 'handed_contact_phone', checked: false, width: '200' },
        { label: '移交日期', prop: 'handed_ove_date', checked: false, width: '200' },
        { label: '发证日期', prop: 'certificate_date', checked: false, width: '200' },
        { label: '密级', prop: 'security_class', checked: false, width: '200' },
        { label: '材料总数(张)', prop: 'material_num', checked: false, width: '200' },
        { label: '备注', prop: 'remark', checked: false, width: '200' },
        { label: '录入人', prop: 'enter_pepole', checked: false, width: '200' },
        { label: '录入时间', prop: 'enter_time', checked: false, width: '200' },
        {
          label: '操作',
          prop: 'operation',
          type: 'operation',
          checked: true,
          disabled: true,
          width: '200',
          buttonGroup: [
            {
              label: '查看',
              type: 'text',
              event: 'button',
              handler: data => fun_look_handover(data)
            },
            {
              label: '打印',
              type: 'text',
              event: 'button',
              handler: data => fun_print_handover(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '移交书',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/business-queries/handover-book', title: '业务查询' },
        { path: '/business-manage/business-queries/handover-book', title: '移交书' }
      ],
      queryList: {
        project_name: { title: '工程名称', value: '' },
        report_respons_num: { title: '编号', value: '' },
        certificate_date: { title: '发证日期', value: '', type: 'datetime' }
      },
      conditionsList: {
        // remove: { title: '删除项目信息', icon: 'iconfont guilian-icon' },
        // lock: { title: '锁定', icon: 'iconfont guilian-icon' },
        export: { title: '导出', icon: 'iconfont guilian-icon' },
        custom: { title: '自定义表头', icon: 'iconfont guilian-icon' }
      },
      advanced_query_obj: {
        project_query_disabled: false,
        type_query_value: 2,
        query_field_list: []
      },
      advanced_query_obj_show: false,
      look_handover_obj: {
        look_handover_dialog: false,
        row: null
      },
      look_handover_obj_show: false,
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

    const fun_db_click = row => {
      fun_look_handover(row)
    }

    const fun_print_handover = row => {}

    const fun_look_handover = row => {
      contextData.look_handover_obj.look_handover_dialog = true
      contextData.look_handover_obj.row = JSON.parse(JSON.stringify(row))
      contextData.look_handover_obj_show = true
    }

    
    const fun_look_handover_close = () => {
      contextData.look_handover_obj.look_handover_dialog = false
      contextData.look_handover_obj_show = false
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
      fun_look_handover,
      fun_look_handover_close,
      fun_delete_handover,
      fun_print_handover,
      fun_table_handle,
      fun_checkbox_change,
      fun_advanced_query_close,
      fun_db_click
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
