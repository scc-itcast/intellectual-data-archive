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
              title="导出"
              type="warning"
              @click="fun_export_project"
              size="medium"
            ></sz-button>
            <div class="global--ml20" v-for="(item, index) in button_list" :key="index">
              <sz-button
                :title="item.title"
                :type="item.type"
                @click="fun_button_click(item, index)"
                size="medium"
              ></sz-button>
            </div>
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
          @fun_selection_change="fun_selection_change"
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
    </template>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
import LookProject from '@/views/menu/file-query-menu/tradition-query/case-query/components/look_project.vue'
export default {
  name: 'case-query',
  components: {
    LookProject
  },
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let tableList = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      checkbox: false,
      number: true,
      // expand: true,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        // {
        //   label: '项目名称',
        //   prop: 'project_name',
        //   checked: true,
        //   width: '200',
        //   type: 'function',
        //   callback: (row, prop) => {
        //     return `<span style="color: #1C9399">${row[prop]}</span>`
        //   }
        // },
        { label: '总登记号', prop: 'total_registration', checked: true, width: '80' },
        { label: '案卷题名', prop: 'books_title', checked: true, width: '200' },
        { label: '档号', prop: 'file_num', checked: true, width: '100' },
        { label: '存放地址', prop: 'store_address', checked: true, width: '100' },
        { label: '保管期限', prop: 'safe_duration', checked: true, width: '80' },
        { label: '密级', prop: 'security_class', checked: true, width: '80' },
        { label: '起始时间', prop: 'prepare_date_first', checked: true, width: '150' },
        { label: '终止时间', prop: 'prepare_date_second', checked: true, width: '150' },
        { label: '编制单位', prop: 'compile_unit', checked: true, width: '100' },
        { label: '借阅状态', prop: 'borrow_status', checked: false, width: '80' },
        { label: '旧档号', prop: 'old_no', checked: false, width: '80' },
        { label: '责任者', prop: 'res_people', checked: false, width: '80' },
        { label: '立卷人', prop: 'establish_person', checked: false, width: '80' },
        { label: '立卷日期', prop: 'establish_date', checked: false, width: '150' },
        { label: '审核人', prop: 'reviewer', checked: false, width: '80' },
        { label: '审核日期', prop: 'reviewer_date', checked: false, width: '80' },
        { label: '主题词', prop: 'subject_headings', checked: false, width: '150' },
        { label: '录入人', prop: 'enter_pepole', checked: false, width: '80' },
        { label: '录入时间', prop: 'enter_time', checked: false, width: '150' },
        { label: '备注', prop: 'remark', checked: true, width: '80' },
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
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '案卷查询',
      breadcrumb: [
        { path: '/file-query', title: '档案查询' },
        { path: '/file-query/tradition-query/case-query', title: '传统查询' },
        { path: '/file-query/tradition-query/case-query', title: '案卷查询' }
      ],
      queryList: {
        books_title: { title: '案卷题名', value: '' },
        file_num: { title: '档号', value: '' },
        total_registration: { title: '总登记号', value: '' }
      },
      button_list: {
        // print_cover: { title: '打印封面', value: '' },
        // print_back: { title: '打印脊背', value: '' },
        // print_directory: { title: '打印目录', value: '' },
        // print_table: { title: '打印备考表', value: '' }
      },
      conditionsList: {
        // remove: { title: '删除项目信息', icon: 'iconfont guilian-icon' },
        // lock: { title: '锁定', icon: 'iconfont guilian-icon' },
        // export: { title: '导出项目信息', icon: 'iconfont guilian-icon' },
        custom: { title: '自定义表头', icon: 'iconfont guilian-icon' }
      },
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
      delete_current_row: null,
      multiple_selection: []
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

    const fun_button_click = (item, index) => {
      switch (index) {
        case 'print_cover': {
          fun_print_cover(item)
          break
        }
        case 'print_back': {
          fun_print_back(item)
          break
        }
        case 'print_directory': {
          fun_print_directory(item)
          break
        }
        case 'print_table': {
          fun_print_table(item)
          break
        }
        default: {
        }
      }
    }

    const fun_print_cover = val => {
      console.log('打印封面')
    }

    const fun_print_back = val => {
      console.log('打印脊背')
    }

    const fun_print_directory = val => {
      console.log('打印目录')
    }

    const fun_print_table = val => {
      console.log('打印备考表')
    }

    const fun_table_handle = index => {
      console.log(index)
    }

    const fun_checkbox_change = list => {
      tableList.thead.map(item => {
        item.checked = list.indexOf(item.label) != -1 ? true : false
      })
    }

    const fun_export_project = () => {
      // context.root.$router.push({ path: '/file-bgf/cd-manage/increase-cd-regist' })
      console.log('导出')
    }

    const fun_db_click = row => {
      fun_look_project(row)
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

    const fun_selection_change = val => {
      contextData.multiple_selection = val
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
      fun_button_click,
      fun_export_project,
      fun_look_project,
      fun_look_project_close,
      fun_table_handle,
      fun_checkbox_change,
      fun_selection_change,
      fun_db_click
    }
  }
}
</script>

<style lang="scss" scoped></style>
