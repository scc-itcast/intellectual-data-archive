<template>
  <div id="sz-auvi-file-preview" class="look_project">
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
      <div class="look-project-dialog--body" :style="look_project_style">
        <div class="look-project-body--box">
          <sz-auvi-file-table
            ref="sz_auvi_file_table"
            :config="tableList"
            @fun_selection_change="fun_selection_change"
          />
        </div>
      </div>
      <template slot="footer">
        <div class="advanced-query--box">
          <div class="global--ml20" v-for="(item, index) in button_list" :key="index">
            <sz-button
              :title="item.title"
              :type="item.type"
              @click="fun_button_click(item, index)"
            ></sz-button>
          </div>
        </div>
      </template>
    </el-dialog>
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
      checkbox: true,
      table_height: 410,
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
      fullscreen: false,
      look_project_style: {},
      button_list: {
        refresh: { title: '刷新', value: '' },
        batch_delete: { title: '批量删除', value: '' },
        deselect: { title: '取消全选', value: '' },
        select_all: { title: '全选', value: '' },
        upload_panoramic: { title: '上传全景图片', value: '', type: 'primary' },
        cancel: { title: '关闭', value: '' }
      },
      delete_current_row: null
    })

    watchEffect(() => {
      contextData.look_project_dialog = prop.look_project_obj.look_project_dialog
      contextData.data_row = prop.look_project_obj.row
    })

    const fun_look_project_zoom = () => {
      contextData.fullscreen = !contextData.fullscreen
      tableList.table_height = 410
      contextData.look_project_style = {}
      if (contextData.fullscreen) {
        contextData.look_project_style = {
          height: document.body.clientHeight - 119 + 'px'
        }
        tableList.table_height = document.body.clientHeight - 600
      }
    }

    const fun_button_click = (item, index) => {
      switch (index) {
        case 'refresh': {
          fun_refresh()
          break
        }
        case 'batch_delete': {
          fun_batch_delete()
          break
        }
        case 'deselect': {
          fun_deselect()
          break
        }
        case 'select_all': {
          fun_select_all()
          break
        }
        case 'upload_panoramic': {
          fun_upload_panoramic()
          break
        }
        case 'cancel': {
          fun_look_project_close()
          break
        }
      }
    }

    const fun_refresh = row => {}

    const fun_batch_delete = row => {}

    const fun_deselect = row => {
      context.refs.sz_auvi_file_table.fun_deselect()
    }

    const fun_select_all = row => {
      context.refs.sz_auvi_file_table.fun_select_all()
    }

    const fun_upload_panoramic = row => {}

    const fun_selection_change = val => {
      console.log(val)
    }

    const fun_look_project_close = () => {
      context.emit('fun_look_project_close')
    }

    const fun_look_project_submit = () => {
      context.emit('fun_look_project_close')
    }

    const fun_preview_project = () => {}

    const fun_delete_project = () => {
      contextData.delete_current_row = row
      context.root.$confirm('', '', {
        title: '消息提示框',
        message: '记录删除后不可恢复,是否删除记录？',
        center: true, // 是否使用圆角按钮
        lockScroll: true, // 是否在 MessageBox 出现时将 body 滚动锁定
        callback: fun_delete_callback // 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
      })
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
      fun_button_click,
      fun_selection_change,
      fun_look_project_zoom,
      fun_look_project_close,
      fun_look_project_submit,
      fun_preview_project,
      fun_delete_project
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
  overflow-y: auto;
  padding-top: 10px;
  box-sizing: border-box;
  .look-project-body--box {
    width: 100%;
    color: $color-text-main;
    .look-project-body--content {
      font-size: 14px;
    }
  }
}
.advanced-query--box {
  display: flex;
}
</style>
