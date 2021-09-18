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
          <div class="table-conditions--left global--flex">
            <sz-button
              title="新增"
              type="warning"
              @click="fun_create_project"
              size="medium"
            ></sz-button>
            <sz-button
              class="global--ml20"
              title="导出"
              @click="fun_export_project"
              size="medium"
            ></sz-button>
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
      <div v-if="modifi_num_obj_show">
        <modifi-num :modifi_num_obj="modifi_num_obj" @fun_modifi_num_close="fun_modifi_num_close" />
      </div>
      <div v-if="look_project_obj_show">
        <look-project
          :look_project_obj="look_project_obj"
          @fun_look_project_close="fun_look_project_close"
        />
      </div>
    </template>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
import ModifiNum from '@/views/menu/business-manage-menu/report-respons-regist/components/modifi_num.vue'
import LookProject from '@/views/menu/business-manage-menu/report-respons-regist/components/look_project.vue'
export default {
  name: 'business-guid-regist',
  components: {
    ModifiNum,
    LookProject
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
        {
          label: '报送责任书编号',
          prop: 'report_respons_num',
          checked: true,
          disabled: true,
          width: '200'
        },
        { label: '工程名称', prop: 'project_name', checked: true, disabled: true, width: '200' },
        { label: '建设单位', prop: 'construct_unit', checked: false, width: '200' },
        { label: '开工日期', prop: 'starts_date', checked: true, width: '200' },
        { label: '竣工日期', prop: 'completed_date', checked: true, width: '200' },
        { label: '录入人', prop: 'enter_pepole', checked: false, width: '100' },
        { label: '录入时间', prop: 'enter_time', checked: false, width: '150' },
        { label: '面积', prop: 'construct_area', checked: false, width: '200' },
        { label: '报送人', prop: 'submit_people', checked: false, width: '200' },
        { label: '报送人电话', prop: 'submit_phone', checked: false, width: '200' },
        { label: '本馆责任人', prop: 'library_respons_people', checked: false, width: '200' },
        { label: '本馆责任人电话', prop: 'library_respons_phone', checked: false, width: '200' },
        { label: '发证日期', prop: 'certificate_date', checked: false, width: '200' },
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
              label: '修改',
              type: 'text',
              event: 'button',
              handler: data => fun_modify_project(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_project(data)
            },
            {
              label: '打印',
              type: 'text',
              event: 'button',
              handler: data => fun_print_project(data)
            },
            {
              label: '编号',
              type: 'text',
              event: 'button',
              handler: data => fun_serial_project(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '业务指导登记',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/business-guid-regist', title: '业务指导登记' }
      ],
      queryList: {
        project_name: { title: '工程名称', value: '' },
        certificate_date: { title: '发证日期', value: '', type: 'datetime' },
        busi_type_guid: { title: '业务指导类型', value: '', type: 'select', list: [] }
      },
      conditionsList: {
        // remove: { title: '删除项目信息', icon: 'iconfont guilian-icon' },
        // lock: { title: '锁定', icon: 'iconfont guilian-icon' },
        // export: { title: '导出项目信息', icon: 'iconfont guilian-icon' },
        custom: { title: '自定义表头', icon: 'iconfont guilian-icon' }
      },
      busi_type_guid_list: [
        { label: '全部类型', prop: 1 },
        { label: '电话指导', prop: 2 },
        { label: '现场指导', prop: 3 },
        { label: '4353', prop: 4 }
      ],
      advanced_query_obj: {
        advanced_query_dialog: false,
        project_query_disabled: false,
        type_query_value: 2,
        query_field_list: []
      },
      advanced_query_obj_show: false,
      modifi_num_obj: {
        modifi_num_dialog: false
      },
      modifi_num_obj_show: false,
      look_project_obj: {
        look_project_dialog: false,
        row: null
      },
      look_project_obj_show: false,
      delete_current_row: null
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      contextData.queryList.busi_type_guid.list = contextData.busi_type_guid_list
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

    const fun_create_project = () => {
      context.root.$router.push({ path: '/business-manage/report-respons-regist/increase-report' })
    }

    const fun_modify_project = row => {
      context.root.$router.push({
        path: '/business-manage/report-respons-regist/increase-report',
        query: {
          id: row.id
        }
      })
    }

    const fun_db_click = row => {
      fun_modify_project(row)
    }

    const fun_delete_project = row => {
      contextData.delete_current_row = row
      context.root.$confirm('', '', {
        title: '',
        message: '记录删除后不可恢复,是否删除记录？',
        center: true, // 是否使用圆角按钮
        lockScroll: true, // 是否在 MessageBox 出现时将 body 滚动锁定
        callback: fun_delete_callback // 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
      })
    }

    const fun_export_project = () => {}

    const fun_print_project = () => {}

    const fun_serial_project = () => {
      contextData.modifi_num_obj.modifi_num_dialog = true
      contextData.modifi_num_obj_show = true
    }

    const fun_modifi_num_close = obj => {
      contextData.modifi_num_obj.modifi_num_dialog = false
      contextData.modifi_num_obj_show = false
    }

    const fun_look_project = row => {
      contextData.look_project_obj.look_project_dialog = true
      contextData.look_project_obj.row = JSON.parse(JSON.stringify(row))
      contextData.look_project_obj_show = true
    }

    const fun_look_project_close = () => {
      contextData.look_project_obj.look_project_dialog = false
      contextData.look_project_obj_show = false
    }

    const fun_delete_callback = (action, instance) => {
      // console.log(action, contextData.delete_current_row)
      let row = contextData.delete_current_row
      if (action == 'cancel') {
        context.root.$notify({
          title: '提示信息',
          message: '取消删除',
          iconClass: 'iconfont happy-full', // 自定义图标的类名。若设置了 type，则 iconClass 会被覆盖
          position: 'bottom-right', // 自定义弹出位置
          duration: 2000 // 显示时间, 毫秒。设为 0 则不会自动关闭
        })
        return
      }
      context.root.$notify({
        title: '提示信息',
        message: '删除成功',
        iconClass: 'iconfont guilian', // 自定义图标的类名。若设置了 type，则 iconClass 会被覆盖
        position: 'bottom-right', // 自定义弹出位置
        duration: 2000 // 显示时间, 毫秒。设为 0 则不会自动关闭
      })
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
      fun_modify_project,
      fun_delete_project,
      fun_print_project,
      fun_serial_project,
      fun_modifi_num_close,
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
