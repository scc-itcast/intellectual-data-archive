<template>
  <d2-container type="ghost" better-scroll :breadcrumb="breadcrumb">
    <template slot="header">
      <div class="query--box global--flex">
        <div v-show="table_item_switch.project_list" class="query-list--box global--flex">
          <div v-for="(item, index) in query_list" :key="index">
            <sz-text-input
              :queryObject="item"
              :index="index"
              className="primary"
              @fun_value_change="fun_value_change"
            ></sz-text-input>
          </div>
        </div>
        <div class="query-btn--box global--flex">
          <div class="global--mr20" v-for="(item, index) in button_list" :key="index">
            <sz-button
              :title="item.title"
              :type="item.type"
              @click="fun_button_click(item, index)"
            ></sz-button>
          </div>
        </div>
      </div>
    </template>
    <template>
      <div class="container--page">
        <div class="global--mr10">
          <sz-aside-tree
            ref="tree_ref_box"
            :aside_tree_obj="aside_tree_obj"
            @fun_tree_item="fun_tree_item"
          />
        </div>
        <div class="tree-item--page">
          <div v-show="table_item_switch.project_list" class="table-list--box">
            <sz-table
              class="table-padding-left30"
              :config="tableList"
              @fun_db_click="fun_db_click"
            ></sz-table>
          </div>
          <div v-show="table_item_switch.project_increase" class="table-increase--box">
            <el-tabs v-model="active_name" @tab-click="fun_tab_click">
              <el-tab-pane label="场景管理" name="scene_manage">
                <sz-table
                  @fun_selection_change="fun_scene_manage_selection_change"
                  :config="scene_manage_list"
                ></sz-table>
              </el-tab-pane>
              <el-tab-pane label="项目设置" name="project_set">
                <div class="table-increase--page" :style="table_increase_style">
                  <sz-auvi-engine-look />
                </div>
              </el-tab-pane>
              <el-tab-pane label="相册管理" name="album_manage">
                <sz-table :config="album_manage_list"></sz-table>
              </el-tab-pane>
              <el-tab-pane label="环物管理" name="env_manage">
                <sz-table :config="env_manage_list"></sz-table>
              </el-tab-pane>
              <el-tab-pane label="全局背景音乐" name="global_back_music">
                <div class="table-increase--page" :style="table_increase_style">
                  <sz-auvi-engine-look />
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div v-show="table_item_switch.scene_manage_increase" class="table-list--box">
            <sz-table :config="scene_manage_increase_list"></sz-table>
          </div>
          <div v-show="table_item_switch.album_manage_increase" class="table-list--box">
            <sz-table
              @fun_selection_change="fun_album_manage_increase_selection_change"
              :config="album_manage_increase_list"
            ></sz-table>
          </div>
          <div v-show="table_item_switch.env_manage_increase" class="table-list--box">
            <sz-table
              @fun_selection_change="fun_env_manage_increase_selection_change"
              :config="env_manage_increase_list"
            ></sz-table>
          </div>
        </div>
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
import mixinAsideShowFalse from '@/views/menu/mixins/aside-show-false'
import {
  onMounted,
  onBeforeUnmount,
  computed,
  reactive,
  watchEffect,
  toRefs
} from '@vue/composition-api'
import LookProject from '@/views/menu/pan-view-files-menu/components/look_project.vue'
export default {
  name: 'index-menu',
  components: {
    LookProject
  },
  mixins: [mixinAsideShowFalse],
  setup(prop, context) {
    let tableList = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      checkbox: false,
      number: true,
      // expand: true,
      table_height: 350,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '唯一标识', prop: 'unique_ident', checked: true, width: '200' },
        { label: '查阅人', prop: 'refer_people', checked: true, width: '200' },
        { label: '查阅单位', prop: 'refer_unit', checked: true, width: '200' },
        { label: '查阅人电话', prop: 'refer_phone', checked: true, width: '200' },
        { label: '接待人', prop: 'receiver', checked: false, width: '200' },
        { label: '查阅日期', prop: 'refer_date', checked: true, width: '100' },
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
              label: '全景',
              type: 'text',
              event: 'button',
              handler: data => fun_panoramic_view(data)
            },
            {
              label: '管理',
              type: 'text',
              event: 'button',
              handler: data => fun_manage_project(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_project(data)
            }
          ]
        }
      ]
    })

    let scene_manage_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      checkbox: true,
      number: false,
      table_height: 421,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '场景图片', prop: 'scene_image', checked: true, width: '200' },
        { label: '名称', prop: 'name', checked: true },
        { label: '热点数量', prop: 'hot_num', checked: true, width: '100' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '新增',
              type: 'text',
              event: 'button',
              handler: data => fun_increase_scene_manage(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_scene_manage(data)
            },
            {
              label: '设置',
              type: 'text',
              event: 'button',
              handler: data => fun_set_scene_manage(data)
            }
          ]
        }
      ]
    })

    let scene_manage_increase_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      checkbox: true,
      number: false,
      table_height: 350,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '热点名称', prop: 'hot_name', checked: true },
        { label: '热点类型', prop: 'hot_type', checked: true, width: '200' },
        { label: '关联数据名称', prop: 'assoc_data_name', checked: true, width: '200' },
        { label: '样式', prop: 'style', checked: true, width: '100' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '修改',
              type: 'text',
              event: 'button',
              handler: data => fun_modify_scene_manage_increase(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_scene_manage_increase(data)
            }
          ]
        }
      ]
    })

    let album_manage_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: false,
      table_height: 421,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '相册标题', prop: 'album_title', checked: true },
        { label: '图册数量', prop: 'album_num', checked: true, width: '200' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '修改',
              type: 'text',
              event: 'button',
              handler: data => fun_modify_album_manage(data)
            },
            {
              label: '新增',
              type: 'text',
              event: 'button',
              handler: data => fun_increase_album_manage(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_album_manage(data)
            }
          ]
        }
      ]
    })

    let album_manage_increase_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      checkbox: true,
      number: false,
      table_height: 350,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '图片', prop: 'picture', checked: true, width: '200' },
        { label: '标题', prop: 'title', checked: true, width: '200' },
        { label: '文本内容', prop: 'text_content', checked: true },
        { label: '超链接', prop: 'super_link', checked: true, width: '200' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '修改',
              type: 'text',
              event: 'button',
              handler: data => fun_modify_album_manage_increase(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_album_manage_increase(data)
            }
          ]
        }
      ]
    })

    let env_manage_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: false,
      table_height: 421,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '环物名称', prop: 'env_name', checked: true },
        { label: '图片数量', prop: 'picture_address', checked: true, width: '200' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '修改',
              type: 'text',
              event: 'button',
              handler: data => fun_modify_env_manage(data)
            },
            {
              label: '新增',
              type: 'text',
              event: 'button',
              handler: data => fun_increase_env_manage(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_env_manage(data)
            }
          ]
        }
      ]
    })

    let env_manage_increase_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      checkbox: true,
      number: false,
      table_height: 350,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '环物名称', prop: 'env_name', checked: true },
        { label: '图片数量', prop: 'picture_address', checked: true, width: '200' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '修改',
              type: 'text',
              event: 'button',
              handler: data => fun_modify_env_manage_increase(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_env_manage_increase(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '全景档案',
      breadcrumb: [{ path: '/pan-view-files', title: '全景档案' }],
      query_list: {
        pro_group_name: { title: '项目组名称', value: '' }
      },
      query_list_copy: {
        pro_group_name: { title: '项目组名称', value: '' }
      },
      button_list: {
        query: { title: '查询', value: '', type: 'primary' },
        increase_child: { title: '添加子级', value: '' },
        increase_same: { title: '添加同级', value: '' },
        modify_pro_team: { title: '修改项目组', value: '' },
        delete: { title: '删除', value: '' },
        increase_project: { title: '添加项目', value: '' }
      },
      button_list_copy: {},
      button_list_all: {
        project_list: {
          query: { title: '查询', value: '', type: 'primary' },
          increase_child: { title: '添加子级', value: '' },
          increase_same: { title: '添加同级', value: '' },
          modify_pro_team: { title: '修改项目组', value: '' },
          delete: { title: '删除', value: '' },
          increase_project: { title: '添加项目', value: '' }
        },
        project_list_no_child: {
          query: { title: '查询', value: '', type: 'primary' },
          increase_same: { title: '添加同级', value: '' },
          modify_pro_team: { title: '修改项目组', value: '' },
          delete: { title: '删除', value: '' },
          increase_project: { title: '添加项目', value: '' }
        },
        scene_manage: {
          // 场景管理
          go_back: { title: '返回', value: '' },
          batch_delete: { title: '批量删除', value: '', current: 'scene' }
        },
        increase_scene_manage: {
          // 场景管理
          go_back: { title: '返回', value: '' },
          increase_hot: { title: '新增热点', value: '' }
        },
        project_set: {
          // 项目设置
          go_back: { title: '返回', value: '' },
          created: { title: '保存', value: '', current: 'project' }
        },
        album_manage: {
          // 相册管理
          go_back: { title: '返回', value: '' },
          increase_album: { title: '新增相册', value: '' }
        },
        increase_album_manage: {
          // 相册管理
          go_back: { title: '返回', value: '' },
          increase_atlas: { title: '新增图册', value: '' },
          batch_delete: { title: '批量删除', value: '', current: 'album' }
        },
        env_manage: {
          // 环物管理
          go_back: { title: '返回', value: '' },
          increase_env: { title: '新增环物', value: '' }
        },
        increase_env_manage: {
          // 环物管理
          go_back: { title: '返回', value: '' },
          upload_env: { title: '上传环物图片', value: '' },
          batch_delete: { title: '批量删除', value: '', current: 'env' }
        },
        global_back_music: {
          // 全局背景音乐
          go_back: { title: '返回', value: '' },
          created: { title: '保存', value: '', current: 'music' }
        }
      },
      aside_tree_obj: {
        style: {
          width: '300px'
        },
        pagination: false,
        page_index: 1,
        tree_total: 1,
        tree_title: '项目列表',
        show_icon: true,
        tree_list: [
          {
            id: 1,
            label: '广西xxxxxx小区',
            type: '房屋建筑工程',
            level: 'engine',
            children: [
              {
                id: 111,
                label: 'xxxxxxx一号楼',
                type: '房屋建筑工程',
                level: 'group',
                children: [
                  {
                    id: 1111,
                    label: 'xxxxxxx案卷级',
                    type: '案卷级',
                    level: 'file'
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: '苏州相城区xxxxxx小区',
            type: '房屋建筑工程',
            level: 'engine',
            children: [
              {
                id: 222,
                label: 'xxxxxxx二号楼',
                type: '房屋建筑工程',
                level: 'group'
              }
            ]
          }
        ]
      },
      tree_current_item: {},
      table_item_switch: {
        project_list: false,
        project_increase: false,
        scene_manage_increase: false,
        album_manage_increase: false,
        env_manage_increase: false
      },
      table_increase_style: {
        height: document.body.clientHeight - 316 + 'px'
      },
      active_name: 'scene_manage',
      look_project_obj: {
        look_project_dialog: false,
        row: null
      },
      look_project_obj_show: false,
      delete_current_row: null
    })

    onMounted(async () => {
      fun_table_item_switch('project_list')
      window.addEventListener('resize', onResize)
      // 调用方法, 方法里调用接口
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onResize = () => {
      contextData.table_increase_style = {
        height: document.body.clientHeight - 316 + 'px'
      }
    }

    const fun_value_change = obj => {
      let { value, index } = obj
      contextData.query_list[index].value = value
    }

    const fun_tree_item = val => {
      contextData.tree_current_item = JSON.parse(JSON.stringify(val))
      // const { id, type, level } = contextData.tree_current_item
      fun_table_item_switch('project_list')
      fun_button_switch('project_list')
    }

    const fun_table_item_switch = level => {
      for (const key in contextData.table_item_switch) {
        contextData.table_item_switch[key] = false
      }
      contextData.table_item_switch[level] = true
    }

    const fun_button_switch = index => {
      switch (index) {
        case 'project_list': {
          contextData.button_list = contextData.button_list_all.project_list
          break
        }
        case 'project_list_no_child': {
          contextData.button_list = contextData.button_list_all.project_list_no_child
          break
        }
        case 'scene_manage': {
          contextData.button_list = contextData.button_list_all.scene_manage
          break
        }
        case 'increase_scene_manage': {
          contextData.button_list = contextData.button_list_all.increase_scene_manage
          break
        }
        case 'project_set': {
          contextData.button_list = contextData.button_list_all.project_set
          break
        }
        case 'album_manage': {
          contextData.button_list = contextData.button_list_all.album_manage
          break
        }
        case 'increase_album_manage': {
          contextData.button_list = contextData.button_list_all.increase_album_manage
          break
        }
        case 'env_manage': {
          contextData.button_list = contextData.button_list_all.env_manage
          break
        }
        case 'increase_env_manage': {
          contextData.button_list = contextData.button_list_all.increase_env_manage
          break
        }
        case 'global_back_music': {
          contextData.button_list = contextData.button_list_all.global_back_music
          break
        }
        default: {
        }
      }
    }

    const fun_button_click = (item, index) => {
      switch (index) {
        case 'query': {
          fun_general_query(item)
          break
        }
        case 'increase_child': {
          fun_increase_child(item)
          break
        }
        case 'increase_same': {
          fun_increase_same(item)
          break
        }
        case 'modify_pro_team': {
          fun_modify_pro_team(item)
          break
        }
        case 'delete': {
          fun_delete(item)
          break
        }
        case 'increase_project': {
          fun_increase_project(item)
          break
        }
        case 'increase_hot': {
          fun_increase_hot(item)
          break
        }
        case 'increase_album': {
          fun_increase_album(item)
          break
        }
        case 'increase_atlas': {
          fun_increase_atlas(item)
          break
        }
        case 'increase_env': {
          fun_increase_env(item)
          break
        }
        case 'upload_env': {
          fun_upload_env(item)
          break
        }
        case 'go_back': {
          fun_go_back(item)
          break
        }
        case 'batch_delete': {
          fun_batch_delete(item)
          break
        }
        case 'created': {
          fun_created(item)
          break
        }
        default: {
        }
      }
    }

    const fun_general_query = () => {
      return
      context.refs.sz_table.search()
      context.refs.sz_table.requestData()
    }

    const fun_increase_child = row => {}

    const fun_increase_same = row => {}

    const fun_modify_pro_team = row => {}

    const fun_increase_project = row => {}

    const fun_delete = row => {}

    const fun_increase_hot = row => {}

    const fun_increase_album = row => {}

    const fun_increase_atlas = row => {}

    const fun_increase_env = row => {}

    const fun_upload_env = row => {}

    const fun_go_back = row => {
      contextData.button_list = contextData.button_list_copy
      const key_list = Object.keys(contextData.button_list_copy)
      if (key_list.indexOf('query') === -1) {
        fun_table_item_switch('project_increase')
        contextData.button_list_copy = contextData.button_list_all.project_list
      } else {
        fun_table_item_switch('project_list')
      }
      console.log(key_list)
    }

    const fun_batch_delete = row => {
      switch (row.current) {
        case 'scene': {
        }
        case 'album': {
        }
        case 'env': {
        }
        default: {
        }
      }
    }

    const fun_created = row => {
      switch (row.current) {
        case 'project': {
        }
        case 'music': {
        }
        default: {
        }
      }
    }

    const fun_db_click = row => {
      fun_modify_project(row)
    }

    const fun_modify_project = row => {}

    const fun_panoramic_view = row => {}

    const fun_manage_project = row => {
      contextData.button_list_copy = {}
      Object.assign(contextData.button_list_copy, contextData.button_list)
      fun_table_item_switch('project_increase')
      fun_button_switch('scene_manage')
    }

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

    const fun_look_project = row => {
      contextData.look_project_obj.look_project_dialog = true
      contextData.look_project_obj.row = JSON.parse(JSON.stringify(row))
      contextData.look_project_obj_show = true
    }

    const fun_look_project_close = () => {
      contextData.look_project_obj.look_project_dialog = false
      contextData.look_project_obj_show = false
    }

    const fun_tab_click = (tab, event) => {
      // console.log(tab, event)
      fun_button_switch(contextData.active_name)
    }

    const fun_increase_scene_manage = row => {
      contextData.button_list_copy = {}
      Object.assign(contextData.button_list_copy, contextData.button_list)
      fun_table_item_switch('scene_manage_increase')
      fun_button_switch('increase_scene_manage')
    }

    const fun_delete_scene_manage = row => {}

    const fun_set_scene_manage = row => {}

    const fun_scene_manage_selection_change = val => {
      console.log(val)
    }

    const fun_modify_scene_manage_increase = row => {}

    const fun_delete_scene_manage_increase = row => {}

    const fun_modify_album_manage = row => {}

    const fun_increase_album_manage = row => {
      contextData.button_list_copy = {}
      Object.assign(contextData.button_list_copy, contextData.button_list)
      fun_table_item_switch('album_manage_increase')
      fun_button_switch('increase_album_manage')
    }

    const fun_delete_album_manage = row => {}

    const fun_modify_album_manage_increase = row => {}

    const fun_delete_album_manage_increase = row => {}

    const fun_album_manage_increase_selection_change = val => {
      console.log(val)
    }

    const fun_modify_env_manage = row => {}

    const fun_increase_env_manage = row => {
      contextData.button_list_copy = {}
      Object.assign(contextData.button_list_copy, contextData.button_list)
      fun_table_item_switch('env_manage_increase')
      fun_button_switch('increase_env_manage')
    }

    const fun_delete_env_manage = row => {}

    const fun_modify_env_manage_increase = row => {}

    const fun_delete_env_manage_increase = row => {}

    const fun_env_manage_increase_selection_change = val => {
      console.log(val)
    }

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      scene_manage_list,
      ...toRefs(scene_manage_list),
      scene_manage_increase_list,
      ...toRefs(scene_manage_increase_list),
      album_manage_list,
      ...toRefs(album_manage_list),
      album_manage_increase_list,
      ...toRefs(album_manage_increase_list),
      env_manage_list,
      ...toRefs(env_manage_list),
      env_manage_increase_list,
      ...toRefs(env_manage_increase_list),
      fun_value_change,
      fun_general_query,
      fun_button_click,
      fun_button_switch,
      fun_tree_item,
      fun_db_click,
      fun_modify_project,
      fun_panoramic_view,
      fun_manage_project,
      fun_delete_project,
      fun_look_project,
      fun_look_project_close,
      fun_tab_click,
      fun_increase_scene_manage,
      fun_delete_scene_manage,
      fun_set_scene_manage,
      fun_scene_manage_selection_change,
      fun_modify_scene_manage_increase,
      fun_delete_scene_manage_increase,
      fun_modify_album_manage,
      fun_increase_album_manage,
      fun_delete_album_manage,
      fun_modify_album_manage_increase,
      fun_delete_album_manage_increase,
      fun_album_manage_increase_selection_change,
      fun_modify_env_manage,
      fun_increase_env_manage,
      fun_delete_env_manage,
      fun_modify_env_manage_increase,
      fun_delete_env_manage_increase,
      fun_env_manage_increase_selection_change
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
.table-increase--box {
  padding: 20px;
}
.table-increase--page {
  overflow-y: scroll;
  color: $color-text-main;
  padding: 0 20px;
}
</style>
