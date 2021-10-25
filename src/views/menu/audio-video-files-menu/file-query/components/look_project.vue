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
          <el-tab-pane label="工程信息" name="engine_info">
            <div class="look-project-dialog--body global--plr115" :style="look_project_style">
              <sz-engine-look />
            </div>
          </el-tab-pane>
          <el-tab-pane label="声像组信息" name="audio_video_group_info">
            <div class="look-project-dialog--body global--plr115" :style="look_project_style">
              <sz-auvi-group-look />
            </div>
          </el-tab-pane>
          <el-tab-pane label="声像文件信息" name="audio_video_file_info">
            <div class="look-project-dialog-body--table">
              <sz-auvi-file-table ref="sz_table" :config="tableList" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <template slot="footer"> </template>
    </el-dialog>
    <div v-if="preview_project_obj_show">
      <sz-auvi-file-preview
        :preview_project_obj="preview_project_obj"
        @fun_preview_project_close="fun_preview_project_close"
      />
    </div>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['look_project_obj'],
  setup(prop, context) {
    let tableList = reactive({
      isRequest: false,
      pagination: true,
      table_height: 425,
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
      active_name: 'engine_info',
      preview_project_obj: {
        preview_project_dialog: false,
        row: null
      },
      preview_project_obj_show: false
    })

    watchEffect(() => {
      contextData.look_project_dialog = prop.look_project_obj.look_project_dialog
      contextData.data_row = prop.look_project_obj.row
    })

    const fun_look_project_zoom = () => {
      contextData.fullscreen = !contextData.fullscreen
      contextData.look_project_style = {}
      tableList.table_height = 472
      if (contextData.fullscreen) {
        contextData.look_project_style = {
          height: document.body.clientHeight - 109 - 46 + 10 + 'px'
        }
        tableList.table_height = document.body.clientHeight - 600
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

    const fun_case_file_click = () => {}

    const fun_file_generic_click = () => {}

    const fun_audio_video_click = () => {}

    const fun_audio_video_file_click = () => {}

    const fun_preview_project = row => {
      contextData.preview_project_obj.preview_project_dialog = true
      contextData.preview_project_obj.row = JSON.parse(JSON.stringify(row))
      contextData.preview_project_obj_show = true
    }

    const fun_preview_project_close = () => {
      contextData.preview_project_obj.preview_project_dialog = false
      contextData.preview_project_obj_show = false
    }

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      fun_look_project_zoom,
      fun_look_project_close,
      fun_look_project_submit,
      fun_tab_click,
      fun_case_file_click,
      fun_file_generic_click,
      fun_audio_video_click,
      fun_audio_video_file_click,
      fun_preview_project,
      fun_preview_project_close
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
