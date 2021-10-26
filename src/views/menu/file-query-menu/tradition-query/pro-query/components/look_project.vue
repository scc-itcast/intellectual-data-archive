<template>
  <div id="sz-advanced-query" class="look_project">
    <el-dialog
      :title="advanced_query_title"
      :visible.sync="look_project_dialog"
      width="75%"
      :fullscreen="fullscreen"
      :lock-scroll="true"
      custom-class="advanced-query--dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="fun_look_project_close"
    >
      <template slot="title">
        <div class="look-project-dialog--zoom" @click="fun_look_project_zoom">
          <i aria-hidden="true" class="fa fa-iconfont guilian-icon"></i>
        </div>
      </template>
      <div class="global--plr40">
        <el-tabs v-model="active_name" @tab-click="fun_tab_click">
          <el-tab-pane label="项目信息" name="project_info">
            <div class="look-project-dialog--body global--plr115" :style="look_project_style">
              <sz-project-look />
            </div>
          </el-tab-pane>
          <el-tab-pane label="工程信息" name="engine_info">
            <div class="look-project-dialog-body--table">
              <div class="look-project-dialog-body--search">
                <el-input placeholder="请输入内容" v-model="engine_input" class="input-with-select">
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="fun_engine_click"
                  ></el-button>
                </el-input>
              </div>
              <sz-table :config="engine_info_list"></sz-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="案卷信息" name="case_file_info">
            <div class="look-project-dialog-body--table">
              <div class="look-project-dialog-body--search">
                <el-input
                  placeholder="请输入内容"
                  v-model="case_file_input"
                  class="input-with-select"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="fun_case_file_click"
                  ></el-button>
                </el-input>
              </div>
              <sz-table :config="case_file_info_list"></sz-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文件信息" name="file_generic_info">
            <div class="look-project-dialog-body--table">
              <div class="look-project-dialog-body--search">
                <el-input
                  placeholder="请输入内容"
                  v-model="file_generic_input"
                  class="input-with-select"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="fun_file_generic_click"
                  ></el-button>
                </el-input>
              </div>
              <sz-table :config="file_generic_info_list"></sz-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="声像组信息" name="audio_video_group_info">
            <div class="look-project-dialog-body--table">
              <div class="look-project-dialog-body--search">
                <el-input
                  placeholder="请输入内容"
                  v-model="audio_video_group_input"
                  class="input-with-select"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="fun_audio_video_click"
                  ></el-button>
                </el-input>
              </div>
              <sz-table :config="audio_video_group_info_list"></sz-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="声像文件信息" name="audio_video_file_info">
            <div class="look-project-dialog-body--table">
              <div class="look-project-dialog-body--search">
                <el-input
                  placeholder="请输入内容"
                  v-model="audio_video_file_input"
                  class="input-with-select"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="fun_audio_video_file_click"
                  ></el-button>
                </el-input>
              </div>
              <sz-auvi-file-table
                ref="sz_auvi_file_table"
                :config="audio_video_file_info"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <template slot="footer"> </template>
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['look_project_obj'],
  setup(prop, context) {
    let engine_info_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: false,
      expand_info_look: true,
      component_info_look: 'EngineInfo',
      table_height: 472,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '工程档号', prop: 'eng_file_num', checked: true, width: '100' },
        { label: '工程名称', prop: 'engin_name', checked: true, width: '200' },
        { label: '工程地点', prop: 'engin_adress', checked: true, width: '200' },
        { label: '工程类型', prop: 'project_type', checked: true, width: '100' },
        { label: '工程状态', prop: 'engin_status', checked: true, width: '100' },
        { label: '录入人', prop: 'enter_pepole', checked: true, width: '200' },
        { label: '录入时间', prop: 'enter_time', checked: true, width: '200' }
      ]
    })

    let case_file_info_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: false,
      expand_info_look: true,
      component_info_look: 'CaseFileInfo',
      table_height: 472,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '总登记号', prop: 'total_registration', checked: true, width: '80' },
        { label: '案卷题名', prop: 'books_title', checked: true, width: '200' },
        { label: '档号', prop: 'file_num', checked: true, width: '100' },
        { label: '存放地址', prop: 'store_address', checked: true, width: '100' },
        { label: '保管期限', prop: 'safe_duration', checked: true, width: '80' },
        { label: '密级', prop: 'security_class', checked: true, width: '80' },
        { label: '起始时间', prop: 'prepare_date_first', checked: true, width: '150' },
        { label: '终止时间', prop: 'prepare_date_second', checked: true, width: '150' },
        { label: '编制单位', prop: 'compile_unit', checked: true, width: '100' },
        { label: '借阅状态', prop: 'borrow_status', checked: true, width: '80' },
        { label: '备注', prop: 'remark', checked: true, width: '80' }
      ]
    })

    let file_generic_info_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: false,
      expand_info_look: true,
      component_info_look: 'FileGenericInfo',
      table_height: 472,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '文件档号', prop: 'document_no', checked: true, width: '200' },
        { label: '文件题名', prop: 'document_title', checked: true, disabled: true, width: '200' },
        { label: '责任者', prop: 'res_people', checked: true, width: '100' },
        { label: '载体类型', prop: 'carr_type', checked: true, width: '100' },
        { label: '数量', prop: 'number', checked: true, width: '100' },
        { label: '录入人', prop: 'enter_pepole', checked: true, width: '100' },
        { label: '录入时间', prop: 'enter_time', checked: true, width: '200' },
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
              handler: data => fun_look_file_generic(data)
            }
          ]
        }
      ]
    })

    let audio_video_group_info_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: false,
      expand_info_look: true,
      component_info_look: 'AudioVideo',
      table_height: 472,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '组名称', prop: 'group_name', checked: true, width: '200' },
        { label: '组地点', prop: 'group_address', checked: true, width: '200' },
        { label: '录入人', prop: 'enter_pepole', checked: true, width: '100' },
        { label: '录入时间', prop: 'enter_time', checked: true, width: '200' }
      ]
    })

    let audio_video_file_info = reactive({
      isRequest: false,
      pagination: true,
      table_height: 420,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      buttonGroup: [
        {
          label: '浏览',
          type: 'text',
          event: 'button',
          handler: data => fun_preview_project(data)
        },
        {
          label: '删除',
          type: 'text',
          event: 'button',
          handler: data => fun_delete_project(data)
        }
      ]
    })

    let contextData = reactive({
      advanced_query_title: '',
      look_project_dialog: false,
      data_row: null,
      engine_input: '',
      case_file_input: '',
      file_generic_input: '',
      audio_video_group_input: '',
      audio_video_file_input: '',
      fullscreen: false,
      look_project_style: {},
      active_name: 'project_info',
      look_file_generic_obj: {
        look_file_generic_dialog: false,
        row: null
      },
      look_file_generic_obj_show: false
    })

    watchEffect(() => {
      contextData.look_project_dialog = prop.look_project_obj.look_project_dialog
      contextData.data_row = prop.look_project_obj.row
    })

    const fun_look_project_zoom = () => {
      contextData.fullscreen = !contextData.fullscreen
      contextData.look_project_style = {}
      engine_info_list.table_height = 472
      case_file_info_list.table_height = 472
      file_generic_info_list.table_height = 472
      audio_video_group_info_list.table_height = 472
      audio_video_file_info.table_height = 410
      if (contextData.fullscreen) {
        contextData.look_project_style = {
          height: document.body.clientHeight - 119 + 'px'
        }
        engine_info_list.table_height = document.body.clientHeight - 600
        case_file_info_list.table_height = document.body.clientHeight - 600
        file_generic_info_list.table_height = document.body.clientHeight - 600
        audio_video_group_info_list.table_height = document.body.clientHeight - 600
        audio_video_file_info.table_height = document.body.clientHeight - 600
      }
    }

    const fun_look_project_close = () => {
      context.emit('fun_look_project_close')
    }

    const fun_look_project_submit = () => {
      context.emit('fun_look_project_close')
    }

    const fun_tab_click = (tab, event) => {
      // console.log(tab, event)
    }

    const fun_engine_click = () => {}

    const fun_case_file_click = () => {}

    const fun_file_generic_click = () => {}

    const fun_audio_video_click = () => {}

    const fun_audio_video_file_click = () => {}

    const fun_look_file_generic = row => {
      contextData.look_file_generic_obj.look_file_generic_dialog = true
      contextData.look_file_generic_obj.row = JSON.parse(JSON.stringify(row))
      contextData.look_file_generic_obj_show = true
    }

    const fun_look_file_generic_close = () => {
      contextData.look_file_generic_obj.look_file_generic_dialog = false
      contextData.look_file_generic_obj_show = false
    }

    return {
      contextData,
      ...toRefs(contextData),
      engine_info_list,
      ...toRefs(engine_info_list),
      case_file_info_list,
      ...toRefs(case_file_info_list),
      file_generic_info_list,
      ...toRefs(file_generic_info_list),
      audio_video_group_info_list,
      ...toRefs(audio_video_group_info_list),
      audio_video_file_info,
      ...toRefs(audio_video_file_info),
      fun_look_project_zoom,
      fun_look_project_close,
      fun_look_project_submit,
      fun_tab_click,
      fun_engine_click,
      fun_case_file_click,
      fun_file_generic_click,
      fun_audio_video_click,
      fun_audio_video_file_click,
      fun_look_file_generic,
      fun_look_file_generic_close
    }
  }
}
</script>
<style lang="scss" scoped>
.look-project-dialog--zoom {
  position: absolute;
  top: 40%;
  right: 50px;
  cursor: pointer;
}
.look-project-dialog-body--table {
  height: 550px;
}
.look-project-dialog-body--search {
  width: 300px;
  height: 50px;
}
.look-project-dialog--body {
  height: 550px;
  overflow-y: scroll;
  color: $color-text-main;
  .look-project-body--box {
    width: 100%;
    color: $color-text-main;
    .look-project-body--title {
      text-align: center;
      font-size: 16px;
      margin: 8px 0 27px 0;
    }
    .look-project-body--content {
      font-size: 14px;
    }
  }
}
.advanced-query--box {
  display: flex;
}
</style>
