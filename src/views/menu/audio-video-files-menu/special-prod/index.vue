<template>
  <d2-container type="ghost" better-scroll :breadcrumb="breadcrumb">
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
          <div class="global--ml20" v-for="(item, index) in button_list" :key="index">
            <sz-button
              :title="item.title"
              :type="item.type"
              @click="fun_button_click(item, index)"
            ></sz-button>
          </div>
        </div>
      </div>
    </template>
    <div class="container--page">
      <div class="global--mr10">
        <sz-aside-tree
          ref="tree_ref_box"
          :aside_tree_obj="aside_tree_obj"
          @fun_tree_item="fun_tree_item"
          @fun_page_change="fun_page_change"
        />
      </div>
      <div class="tree-item--page">
        <pro-des-single
          ref="component_group_ref"
          v-show="tree_item_flag.project"
          :tree_item="project_tree_item"
        />
        <div v-show="tree_item_flag.manage" class="auvi-table-list--box">
          <sz-auvi-file-table
            ref="component_operate_ref"
            :config="tableList"
            @fun_selection_change="fun_selection_change"
          />
        </div>
      </div>
    </div>
    <div v-if="advanced_query_obj_show">
      <sz-advanced-query
        :advanced_query_obj="advanced_query_obj"
        @fun_advanced_query_close="fun_advanced_query_close"
      />
    </div>
    <div v-if="preview_project_obj_show">
      <sz-auvi-file-preview
        :preview_project_obj="preview_project_obj"
        @fun_preview_project_close="fun_preview_project_close"
      />
    </div>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import {
  onMounted,
  computed,
  reactive,
  watchEffect,
  toRefs,
  onBeforeUnmount
} from '@vue/composition-api'
import ProDesSingle from '@/views/menu/audio-video-files-menu/special-prod/components/pro_des_single'
export default {
  name: 'special-prod',
  mixins: [mixinAsideShowTrue],
  components: {
    ProDesSingle
  },
  setup(prop, context) {
    let tableList = reactive({
      isRequest: false,
      pagination: false,
      checkbox: true,
      table_height: 268,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      buttonGroup: [
        {
          label: '下载',
          type: 'text',
          event: 'button',
          handler: data => fun_download_project(data)
        },
        {
          label: '删除',
          type: 'text',
          event: 'button',
          handler: data => fun_delete_project(data)
        },
        {
          label: '浏览',
          type: 'text',
          event: 'button',
          handler: data => fun_preview_project(data)
        }
      ],
      thead: [
        { label: '专题名称', prop: 'project_name', checked: true, disabled: true, width: '200' },
        { label: '制作日期', prop: 'make_date', checked: true, width: '200' },
        { label: '专题描述', prop: 'project_describe', checked: true, width: '200' },
        { label: '录入时间', prop: 'enter_time', checked: false, width: '150' }
      ]
    })

    let contextData = reactive({
      name: '专题制作',
      breadcrumb: [
        { path: '/audio-video-files', title: '声像档案' },
        { path: '/audio-video-files/special-prod', title: '专题制作' }
      ],
      queryList: {
        project_name: { title: '专题名称', value: '' }
      },
      button_list: {
        delete: { title: '删除', value: '', current: 'file' },
        created: { title: '保存', value: '', current: 'group' },
        increase_project: { title: '添加专题', value: '' },
        file_manage: { title: '文件管理', value: '' }
      },
      button_list_copy: {},
      button_list_all: {
        project: {
          delete: { title: '删除', value: '', current: 'file' },
          created: { title: '保存', value: '', current: 'group' },
          increase_project: { title: '添加专题', value: '' },
          file_manage: { title: '文件管理', value: '' }
        },
        increase_project: {
          created: { title: '保存', value: '', current: 'file' }
        },
        file_manage: {
          upload: { title: '上传', value: '' },
          refresh: { title: '刷新', value: '' }
        }
      },
      advanced_query_obj: {
        project_query_disabled: false,
        type_query_value: 2,
        query_field_list: []
      },
      advanced_query_obj_show: false,
      aside_tree_obj: {
        style: {
          width: '300px'
        },
        pagination: true,
        page_index: 1,
        tree_total: 1,
        tree_title: '项目列表',
        show_icon: true,
        tree_list: [
          {
            id: 1,
            label: '广西xxxxxx小区',
            type: '房屋建筑工程',
            level: 'project'
          },
          {
            id: 2,
            label: '苏州相城区xxxxxx小区',
            type: '房屋建筑工程',
            level: 'project'
          }
        ]
      },
      tree_current_item: {},
      project_tree_item: {
        modify: true
      },
      tree_item_flag: {
        project: false,
        manage: false
      },
      preview_project_obj: {
        preview_project_dialog: false,
        row: null
      },
      preview_project_obj_show: false,
      delete_current_row: null
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      const tree_list = contextData.aside_tree_obj.tree_list[0]
      const project_tree_item = contextData.project_tree_item
      contextData.project_tree_item = { ...tree_list, ...project_tree_item }
      contextData.tree_current_item = tree_list
      fun_tree_item_flag('project')
    })
    onBeforeUnmount(() => {})

    const fun_value_change = () => {}

    const fun_general_query = () => {}

    const fun_tree_item = val => {
      contextData.tree_current_item = JSON.parse(JSON.stringify(val))
      const { id, type, level } = contextData.tree_current_item
      fun_tree_item_flag(level)
      fun_tree_click(val, val.level)
    }

    const fun_tree_item_flag = level => {
      // console.log(prop.tree_item)
      for (const key in contextData.tree_item_flag) {
        contextData.tree_item_flag[key] = false
      }
      contextData.tree_item_flag[level] = true
    }

    const fun_page_change = val => {
      console.log(val)
    }

    const fun_tree_click = (val, index) => {
      switch (index) {
        case 'project': {
          contextData.button_list = contextData.button_list_all.project
          const tree_item = contextData.group_tree_item
          contextData.group_tree_item = { ...tree_item, modify: false }
          break
        }
        case 'increase_project': {
          contextData.button_list = contextData.button_list_all.increase_project
          const tree_item = contextData.group_tree_item
          contextData.group_tree_item = { ...tree_item, modify: false }
          break
        }
        case 'file_manage': {
          contextData.button_list = contextData.button_list_all.file_manage
          fun_tree_item_flag('manage')
          break
        }
        default: {
        }
      }
    }

    const fun_button_click = (item, index) => {
      // console.log(index)
      fun_tree_click(item, index)
      switch (index) {
        case 'delete': {
          fun_delete(item)
          break
        }
        case 'increase_project': {
          fun_increase_project(item)
          break
        }
        case 'created': {
          fun_created(item)
          break
        }
        case 'upload': {
          fun_upload()
          break
        }
        case 'refresh': {
          fun_refresh()
          break
        }
        default: {
        }
      }
    }

    const fun_advanced_query = () => {
      contextData.advanced_query_obj.query_field_list = JSON.parse(JSON.stringify(tableList.thead))
      contextData.advanced_query_obj.advanced_query_dialog = true
      contextData.advanced_query_obj_show = true
    }

    const fun_advanced_query_close = () => {
      contextData.advanced_query_obj.advanced_query_dialog = false
      contextData.advanced_query_obj_show = false
    }

    const fun_delete = val => {
      switch (val.current) {
        case 'project': {
          break
        }
        default: {
        }
      }
    }

    const fun_created = val => {
      switch (val.current) {
        case 'project': {
          context.refs.component_engine_ref.fun_created()
          break
        }
        default: {
        }
      }
    }

    const fun_increase_project = () => {}

    const fun_upload = () => {}

    const fun_refresh = () => {
      context.refs.component_operate_ref.fun_refresh()
    }

    const fun_download_project = row => {}

    const fun_delete_project = row => {
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

    const fun_preview_project = (row, list) => {
      contextData.preview_project_obj.preview_project_dialog = true
      contextData.preview_project_obj.row = JSON.parse(JSON.stringify(row))
      contextData.preview_project_obj_show = true
    }

    const fun_preview_project_close = () => {
      contextData.preview_project_obj.preview_project_dialog = false
      contextData.preview_project_obj_show = false
    }

    const fun_selection_change = val => {
      console.log(val);
    }

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      fun_value_change,
      fun_general_query,
      fun_button_click,
      fun_advanced_query,
      fun_advanced_query_close,
      fun_tree_item,
      fun_page_change,
      fun_download_project,
      fun_delete_project,
      fun_preview_project,
      fun_preview_project_close,
      fun_selection_change
    }
  }
}
</script>
<style lang="scss" scoped>
.container--page {
  display: flex;
  width: 100%;
}
.tree-item--page {
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: $color-bg-4;
  border-radius: 6px;
}
</style>
