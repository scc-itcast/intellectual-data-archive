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
        <sz-auvi-group-level
          ref="component_group_ref"
          v-show="tree_item_flag.group"
          :tree_item="group_tree_item"
        />
        <sz-auvi-file-level
          ref="component_file_ref"
          v-show="tree_item_flag.file"
          :tree_item="file_tree_item"
        />
        <div v-show="tree_item_flag.operation" class="auvi-table-list--box">
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
export default {
  name: 'ple-va-manage',
  mixins: [mixinAsideShowTrue],
  components: {},
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
          label: '上传',
          type: 'text',
          event: 'button',
          handler: data => fun_upload_project(data)
        },
        {
          label: '下载',
          type: 'text',
          event: 'button',
          handler: data => fun_download_project(data)
        },
        {
          label: '浏览',
          type: 'text',
          event: 'button',
          handler: data => fun_preview_project(data)
        }
      ],
      thead: [
        { label: '工程名称', prop: 'project_name', checked: true, disabled: true, width: '200' },
        { label: '工程地点', prop: 'project_adress', checked: true, width: '200' },
        { label: '录入时间', prop: 'enter_time', checked: false, width: '150' }
      ]
    })

    let contextData = reactive({
      name: '竣工声像组管理',
      breadcrumb: [
        { path: '/audio-video-files', title: '声像档案' },
        { path: '/audio-video-files/svafile-modifi/ple-vag-manage', title: '库存声像档案修改' },
        { path: '/audio-video-files/svafile-modifi/ple-vag-manage', title: '竣工声像组管理' }
      ],
      queryList: {
        project_name: { title: '项目名称', value: '' }
      },
      button_list: {
        created: { title: '保存', value: '', current: 'group' },
        increase_file: { title: '添加文件', value: '' },
        batch_operation: { title: '批量操作', value: '' }
      },
      button_list_copy: {},
      button_list_all: {
        modify_group: {
          created: { title: '保存', value: '', current: 'group' },
          increase_file: { title: '添加文件', value: '' },
          batch_operation: { title: '批量操作', value: '' }
        },
        modify_file: {
          created: { title: '保存', value: '', current: 'file' },
          delete: { title: '删除', value: '', current: 'file' }
        },
        increase_file: {
          created: { title: '保存', value: '', current: 'file' }
        },
        batch_operation: {
          upload: { title: '上传', value: '' },
          batch_modify: { title: '批量修改', value: '' },
          select_all: { title: '全选', value: '' },
          deselect: { title: '取消选择', value: '' },
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
            level: 'group',
            children: [
              {
                id: 111,
                label: 'xxxxxxx一号楼',
                type: '房屋建筑工程',
                level: 'file'
              }
            ]
          },
          {
            id: 2,
            label: '苏州相城区xxxxxx小区',
            type: '房屋建筑工程',
            level: 'group',
            children: [
              {
                id: 222,
                label: 'xxxxxxx二号楼',
                type: '房屋建筑工程',
                level: 'file'
              }
            ]
          }
        ]
      },
      tree_current_item: {},
      group_tree_item: {
        modify: true
      },
      file_tree_item: {
        modify: true
      },
      tree_item_flag: {
        engine: false,
        group: false,
        file: false,
        operation: false
      },
      preview_project_obj: {
        preview_project_dialog: false,
        row: null
      },
      preview_project_obj_show: false
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      const tree_list = contextData.aside_tree_obj.tree_list[0]
      const group_tree_item = contextData.group_tree_item
      contextData.group_tree_item = { ...tree_list, ...group_tree_item }
      contextData.tree_current_item = contextData.aside_tree_obj.tree_list[0]
      fun_tree_item_flag('group')
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
        case 'group': {
          contextData.button_list = contextData.button_list_all.modify_group
          contextData.group_tree_item = JSON.parse(JSON.stringify(val))
          contextData.group_tree_item['modify'] = true
          break
        }
        case 'file': {
          contextData.button_list = contextData.button_list_all.modify_file
          contextData.file_tree_item = JSON.parse(JSON.stringify(val))
          contextData.file_tree_item['modify'] = true
          break
        }
        case 'increase_file': {
          contextData.button_list = contextData.button_list_all.increase_file
          const tree_item = contextData.file_tree_item
          contextData.file_tree_item = { ...tree_item, modify: false }
          break
        }
        case 'batch_operation': {
          contextData.button_list_copy = {}
          Object.assign(contextData.button_list_copy, contextData.button_list)
          contextData.button_list = contextData.button_list_all.batch_operation
          fun_tree_item_flag('operation')
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
        case 'increase_file': {
          fun_increase_file()
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
        case 'batch_modify': {
          fun_batch_modify()
          break
        }
        case 'select_all': {
          fun_select_all()
          break
        }
        case 'deselect': {
          fun_deselect()
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
        case 'group': {
          break
        }
        case 'file': {
          break
        }
        default: {
        }
      }
    }

    const fun_increase_file = () => {}

    const fun_created = val => {
      switch (val.current) {
        case 'engine': {
          context.refs.component_engine_ref.fun_created()
          break
        }
        case 'group': {
          context.refs.component_group_ref.fun_created()
          break
        }
        case 'file': {
          context.refs.component_file_ref.fun_created()
          break
        }
        default: {
        }
      }
    }

    const fun_upload = () => {
      context.refs.component_operate_ref.fun_upload()
    }

    const fun_batch_modify = () => {
      context.refs.component_operate_ref.fun_batch_modify()
    }

    const fun_select_all = () => {
      context.refs.component_operate_ref.fun_select_all()
    }

    const fun_deselect = () => {
      context.refs.component_operate_ref.fun_deselect()
    }

    const fun_refresh = () => {
      context.refs.component_operate_ref.fun_refresh()
    }

    const fun_upload_project = row => {}

    const fun_download_project = row => {}

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
      console.log(val)
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
      fun_upload_project,
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
