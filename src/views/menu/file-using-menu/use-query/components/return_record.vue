<template>
  <div id="sz-advanced-query" class="look_project tabs-none">
    <el-dialog
      :title="advanced_query_title"
      :visible.sync="record_project_dialog"
      width="75%"
      :fullscreen="fullscreen"
      :lock-scroll="true"
      custom-class="advanced-query--dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="fun_record_project_close"
    >
      <template slot="title">
        <div class="look-project-dialog--zoom" @click="fun_record_project_zoom">
          <i aria-hidden="true" class="fa fa-iconfont guilian-icon"></i>
        </div>
      </template>
      <div class="look-project-dialog--body" :style="look_project_style">
        <div class="look-project-body--box">
          <sz-table :config="return_records_list"></sz-table>
        </div>
      </div>
      <!-- <template slot="footer">
        <div class="advanced-query--box">
          <sz-button title="取消" @click="fun_record_project_close"></sz-button>
          <sz-button
            class="global--ml20"
            title="归还"
            type="primary"
            @click="fun_record_project_submit"
          ></sz-button>
        </div>
      </template> -->
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['record_project_obj'],
  setup(prop, context) {
    let return_records_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: false,
      expand_info_look: true,
      component_info_look: 'ReturnRecord',
      table_height: 402,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '归还人姓名', prop: 'restitutor', checked: true, width: '200' },
        { label: '归还人电话', prop: 'restitutor_phone', checked: true, width: '200' },
        { label: '归还人单位', prop: 'restitutor_unit', checked: true, width: '100' },
        { label: '归还时间', prop: 'restitutor_time', checked: true, width: '100' }
      ]
    })

    let contextData = reactive({
      advanced_query_title: '',
      record_project_dialog: false,
      data_row: null,
      fullscreen: false,
      look_project_style: {},
      active_name: 'case_file_info'
    })

    watchEffect(() => {
      contextData.record_project_dialog = prop.record_project_obj.record_project_dialog
      contextData.data_row = prop.record_project_obj.row
    })

    const fun_record_project_zoom = () => {
      contextData.fullscreen = !contextData.fullscreen
      contextData.look_project_style = {}
      return_records_list.table_height = 402
      if (contextData.fullscreen) {
        contextData.look_project_style = {
          height: document.body.clientHeight - 109 - 46 + 68 + 'px'
        }
        return_records_list.table_height = document.body.clientHeight - 670
      }
    }

    const fun_record_project_close = () => {
      context.emit('fun_record_project_close')
    }

    const fun_record_project_submit = () => {
      context.emit('fun_record_project_close', '归还')
    }

    return {
      contextData,
      ...toRefs(contextData),
      return_records_list,
      ...toRefs(return_records_list),
      fun_record_project_zoom,
      fun_record_project_close,
      fun_record_project_submit
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
.look-project-dialog--body {
  height: 550px;
  padding: 0 20px;
  overflow-y: scroll;
  .look-project-body--box {
    width: 100%;
    color: $color-text-main;
    margin-top: 7px;
  }
}
.advanced-query--box {
  display: flex;
}
</style>
