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
        <div class="query-btn--box global--flex global--ml30">
          <sz-button title="查询" type="primary" @click="fun_general_query"></sz-button>
          <!-- <sz-button class="global--ml20" title="高级查询" @click="fun_advanced_query"></sz-button> -->
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
      <div v-if="review_com_obj_show">
        <review-com :review_com_obj="review_com_obj" @fun_review_com_close="fun_review_com_close" />
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
import LookProject from '@/views/menu/business-manage-menu/file-receive/components/look_project.vue'
import ReviewCom from '@/views/menu/business-manage-menu/receive-review-files/components/review_com.vue'
export default {
  name: 'receive-review-files',
  components: {
    LookProject,
    ReviewCom
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
        { label: '唯一标识', prop: 'unique_ident', checked: true, width: '200' },
        { label: '工程名称', prop: 'project_name', checked: true, disabled: true, width: '200' },
        { label: '工程类型', prop: 'project_type', checked: true, disabled: true, width: '200' },
        { label: '工程地点', prop: 'project_adress', checked: true, width: '200' },
        { label: '录入人', prop: 'enter_pepole', checked: false, width: '100' },
        { label: '录入时间', prop: 'enter_time', checked: false, width: '150' },
        { label: '送审人', prop: 'peview_people', checked: false, width: '200' },
        { label: '审核工作日', prop: 'audit_day', checked: false, width: '200' },
        { label: '联系电话', prop: 'contact_phone', checked: false, width: '200' },
        { label: '档案接收人', prop: 'file_receiver', checked: false, width: '200' },
        { label: '接收日期', prop: 'receive_date', checked: false, width: '200' },
        { label: '报送图纸材料(张)', prop: 'sub_draw_z', checked: false, width: '200' },
        { label: '报送图纸材料(卷)', prop: 'sub_draw_v', checked: false, width: '200' },
        { label: '报送照片材料(张)', prop: 'sub_photo_z', checked: false, width: '200' },
        { label: '报送录像带材料(盘)', prop: 'report_video_p', checked: false, width: '200' },
        { label: '报送文字材料(张)', prop: 'submit_word_z', checked: false, width: '200' },
        { label: '报送文字材料(卷)', prop: 'submit_word_v', checked: false, width: '200' },
        { label: '卷数', prop: 'volume', checked: false, width: '200' },
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
              label: '退回',
              type: 'text',
              event: 'button',
              handler: data => fun_back_project(data)
            },
            {
              label: '通过',
              type: 'text',
              event: 'button',
              handler: data => fun_pass_project(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '档案接收审核',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/receive-review-files', title: '档案接收审核' }
      ],
      queryList: {
        // project_name: { title: '工程名称', value: '' }
      },
      conditionsList: {
        // remove: { title: '删除项目信息', icon: 'iconfont guilian-icon' },
        // lock: { title: '锁定', icon: 'iconfont guilian-icon' },
        // export: { title: '导出项目信息', icon: 'iconfont guilian-icon' },
        custom: { title: '自定义表头', icon: 'iconfont guilian-icon' }
      },
      advanced_query_obj: {
        project_query_disabled: false,
        type_query_value: 2,
        query_field_list: []
      },
      advanced_query_obj_show: false,
      review_com_obj: {
        review_com_dialog: false
      },
      review_com_obj_show: false,
      look_project_obj: {
        look_project_dialog: false,
        row: null
      },
      look_project_obj_show: false,
      delete_current_row: null
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
      // fun_modify_archive(row)
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

    const fun_back_project = () => {
      fun_serial_project()
    }

    const fun_pass_project = () => {
      fun_serial_project()
    }

    const fun_serial_project = () => {
      contextData.review_com_obj.review_com_dialog = true
      contextData.review_com_obj_show = true
    }

    const fun_review_com_close = obj => {
      contextData.review_com_obj.review_com_dialog = false
      contextData.review_com_obj_show = false
    }

    const fun_create_engine = row => {
      context.root.$router.push({
        path: '/business-manage/file-receive/increase-engine',
        query: {
          id: row.id,
          type: row.project_type
        }
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
      fun_look_project,
      fun_look_project_close,
      fun_back_project,
      fun_pass_project,
      fun_review_com_close,
      fun_table_handle,
      fun_create_engine,
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
