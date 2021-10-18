<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template slot="header">
      <div class="query--box global--flex global--mb10">
        <div class="query-list--box global--flex">
          <div v-for="(item, index) in queryList" :key="index">
            <template v-if="index !== 'ident_num'">
              <sz-text-input
                :queryObject="item"
                :index="index"
                className="primary"
                @fun_value_change="fun_value_change"
              ></sz-text-input>
            </template>
          </div>
        </div>
      </div>
      <div class="query--box global--flex" style="margin-left: -40px">
        <div class="query-list--box global--flex">
          <div v-for="(item, index) in queryList" :key="index">
            <template v-if="index === 'ident_num'">
              <sz-text-input
                :queryObject="item"
                :index="index"
                className="primary"
                @fun_value_change="fun_value_change"
              ></sz-text-input>
            </template>
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
          <div class="table-conditions--left global--flex">
            <!-- <sz-button
              title="添加利用登记"
              type="warning"
              @click="fun_create_project"
              size="medium"
            ></sz-button> -->
          </div>
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
      <div class="table-list--box">
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
      <div v-if="look_project_obj_show">
        <look-project
          :look_project_obj="look_project_obj"
          @fun_look_project_close="fun_look_project_close"
        />
      </div>
      <div v-if="record_project_obj_show">
        <return-record
          :record_project_obj="record_project_obj"
          @fun_record_project_close="fun_record_project_close"
        />
      </div>
    </template>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
import LookProject from '@/views/menu/file-using-menu/use-query/components/look_project.vue'
import ReturnRecord from '@/views/menu/file-using-menu/use-query/components/return_record.vue'
export default {
  name: 'use-query',
  components: {
    LookProject,
    ReturnRecord
  },
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let tableList = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: true,
      // expand: true,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '唯一标识', prop: 'unique_ident', checked: true, width: '200' },
        { label: '查档人', prop: 'whthin_people', checked: true, disabled: true, width: '200' },
        { label: '查档单位', prop: 'whthin_unit', checked: true, disabled: true, width: '200' },
        { label: '查档人电话', prop: 'whthin_phone', checked: false, width: '200' },
        { label: '查档类型', prop: 'whthin_type', checked: false, width: '200' },
        { label: '接待人', prop: 'receiver', checked: false, width: '200' },
        { label: '查档日期', prop: 'whthin_date', checked: false, width: '200' },
        { label: '证件编号', prop: 'ident_num', checked: true, width: '200' },
        { label: '用途', prop: 'use_pos', checked: true, width: '200' },
        { label: '职务', prop: 'job_pos', checked: false, width: '100' },
        { label: '清点人', prop: 'count_people', checked: false, width: '150' },
        { label: '利用说明', prop: 'use_explain', checked: false, width: '200' },
        { label: '备注', prop: 'remark', checked: false, width: '200' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '查看',
              type: 'text',
              event: 'button',
              handler: data => fun_look_project(data)
            },
            {
              label: '打印',
              type: 'text',
              event: 'button',
              handler: data => fun_print_project(data)
            },
            {
              label: '查看归还记录',
              type: 'text',
              event: 'button',
              handler: data => fun_record_project(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '利用查询',
      breadcrumb: [
        { path: '/file-using', title: '档案查询' },
        { path: '/file-using/use-query', title: '利用查询' }
      ],
      queryList: {
        use_status: { title: '利用状态', value: '', type: 'select', list: [] },
        whthin_people: { title: '查档人', value: '' },
        whthin_unit: { title: '查档单位', value: '' },
        whthin_date: { title: '查档日期', value: '', type: 'datetime' },
        ident_num: { title: '证件编号', value: '' }
      },
      conditionsList: {
        // remove: { title: '删除项目信息', icon: 'iconfont guilian-icon' },
        // lock: { title: '锁定', icon: 'iconfont guilian-icon' },
        // export: { title: '导出项目信息', icon: 'iconfont guilian-icon' },
        custom: { title: '自定义表头', icon: 'iconfont guilian-icon' }
      },
      use_status_list: [
        { label: '全部', prop: 1 },
        { label: '查阅', prop: 2 },
        { label: '借阅', prop: 3 },
        { label: '未归还', prop: 4 },
        { label: '归还中', prop: 5 },
        { label: '已归还', prop: 6 }
      ],
      advanced_query_obj: {
        advanced_query_dialog: false,
        project_query_disabled: false,
        type_query_value: 2,
        query_field_list: []
      },
      advanced_query_obj_show: false,
      look_project_obj: {
        look_project_dialog: false,
        row: null
      },
      look_project_obj_show: false,
      record_project_obj: {
        record_project_dialog: false,
        row: null
      },
      record_project_obj_show: false,
      delete_current_row: null,
      complete_current_row: null
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      contextData.queryList.use_status.list = contextData.use_status_list
    })

    const fun_value_change = obj => {
      let { value, index } = obj
      contextData.queryList[index].value = value
      if (index === 'use_status') {
      }
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

    const fun_create_project = () => {
      context.root.$router.push({ path: '/file-using/use-regist/increase-regist' })
    }

    const fun_db_click = row => {}

    const fun_export_project = () => {}

    const fun_look_project = row => {
      contextData.look_project_obj.look_project_dialog = true
      contextData.look_project_obj.row = JSON.parse(JSON.stringify(row))
      contextData.look_project_obj_show = true
    }

    const fun_look_project_close = val => {
      console.log(val)
      contextData.look_project_obj.look_project_dialog = false
      contextData.look_project_obj_show = false
    }

    const fun_print_project = () => {}

    const fun_record_project = row => {
      contextData.record_project_obj.record_project_dialog = true
      contextData.record_project_obj.row = JSON.parse(JSON.stringify(row))
      contextData.record_project_obj_show = true
    }

    const fun_record_project_close = val => {
      console.log(val)
      contextData.record_project_obj.record_project_dialog = false
      contextData.record_project_obj_show = false
    }

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      fun_value_change,
      fun_general_query,
      fun_advanced_query,
      fun_advanced_query_close,
      fun_export_project,
      fun_create_project,
      fun_look_project,
      fun_look_project_close,
      fun_print_project,
      fun_record_project,
      fun_record_project_close,
      fun_table_handle,
      fun_checkbox_change,
      fun_db_click
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
