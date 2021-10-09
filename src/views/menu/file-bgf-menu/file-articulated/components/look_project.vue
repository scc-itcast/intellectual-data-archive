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
              <project-info></project-info>
            </div>
          </el-tab-pane>
          <el-tab-pane label="工程信息" name="engine_info">
            <div class="look-project-dialog--body global--plr115" :style="look_project_style">
              <engine-info></engine-info>
            </div>
          </el-tab-pane>
          <el-tab-pane label="案卷信息" name="case_file_info">
            <div class="look-project-dialog--body global--plr115" :style="look_project_style">
              <case-file-info></case-file-info>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文件信息" name="file_generic_info">
            <div class="look-project-dialog--body global--plr115" :style="look_project_style">
              <file-generic-info></file-generic-info>
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
import ProjectInfo from '@/views/menu/file-bgf-menu/file-articulated/components/look_project/project_info.vue'
import EngineInfo from '@/views/menu/file-bgf-menu/file-articulated/components/look_project/engine_info.vue'
import CaseFileInfo from '@/views/menu/file-bgf-menu/file-articulated/components/look_project/case_file_info.vue'
import FileGenericInfo from '@/views/menu/file-bgf-menu/file-articulated/components/look_project/file_generic_info.vue'
export default {
  components: {
    ProjectInfo,
    EngineInfo,
    CaseFileInfo,
    FileGenericInfo
  },
  props: ['look_project_obj'],
  setup(prop, context) {
    let tableList = reactive({
      search_form: false,
      isRequest: false,
      pagination: false,
      // checkbox: true,
      number: false,
      // expand: true,
      table_height: 346,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '审核人', prop: 'review_people', checked: true, width: '200' },
        { label: '审核时间', prop: 'review_date', checked: true, width: '200' },
        { label: '审核级别', prop: 'review_level', checked: true, width: '200' },
        { label: '审核状态', prop: 'review_status', checked: true, width: '200' }
      ]
    })

    let contextData = reactive({
      advanced_query_title: '',
      look_project_dialog: false,
      data_row: null,
      test_form: {
        busi_guide_num: '', // 业务指导编号
        certificate_date: '', // 发证日期
        contact_people: '', // 联系人
        contact_phone: '', // 联系电话
        report_res_num: '', // 报送责任书编号
        guide_date: '', // 指导日期
        sub_pro: '', // 所属项目
        project_name: '', // 工程名称
        construct_unit: '', // 建设单位
        busi_guide_type: '', // 业务指导类型
        eng_address: '', // 工程地址
        guide_content: '', // 指导内容
        guide_opinion: '', // 指导意见
        remark: '', // 备注
        enter_pepole: '', // 录入人
        enter_time: '' // 录入时间
      },
      fullscreen: false,
      look_project_style: {},
      active_name: 'project_info'
    })

    watchEffect(() => {
      contextData.look_project_dialog = prop.look_project_obj.look_project_dialog
      contextData.data_row = prop.look_project_obj.row
    })

    const fun_look_project_zoom = () => {
      contextData.fullscreen = !contextData.fullscreen
      contextData.look_project_style = {}
      tableList.table_height = 346
      if (contextData.fullscreen) {
        contextData.look_project_style = {
          height: document.body.clientHeight - 109 - 46 + 10 + 'px'
        }
        tableList.table_height = document.body.clientHeight - 630
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

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      fun_look_project_zoom,
      fun_look_project_close,
      fun_look_project_submit,
      fun_tab_click
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
