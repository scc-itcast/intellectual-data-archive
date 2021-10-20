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
          <sz-button title="添加库房" type="primary" @click="fun_create_whouse"></sz-button>
        </div>
      </div>
    </template>
    <template>
      <div class="table-conditions--box">
        <div class="table-conditions--box-layar global-between-center--flex">
          <div class="table-conditions--left global--flex">
            <!-- <sz-button
              title="添加项目"
              type="warning"
              @click="fun_create_whouse"
              size="medium"
            ></sz-button> -->
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
          :config="tableList"
          @fun_db_click="fun_db_click"
          @fun_expand_change="fun_expand_change"
        ></sz-table>
      </div>
      <div v-if="whouse_project_obj_show">
        <whouse-project
          :whouse_project_obj="whouse_project_obj"
          @fun_whouse_project_close="fun_whouse_project_close"
        />
      </div>
      <div v-if="frame_project_obj_show">
        <frame-project
          :frame_project_obj="frame_project_obj"
          @fun_frame_project_close="fun_frame_project_close"
        />
      </div>
    </template>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
import WhouseProject from '@/views/menu/whouse-manage-menu/whouse-manage/components/whouse'
import FrameProject from '@/views/menu/whouse-manage-menu/whouse-manage/components/frame'
export default {
  name: 'whouse-manage',
  components: {
    WhouseProject,
    FrameProject
  },
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let tableList = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: true,
      expand: true,
      pagination_children: true,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      children_thead: [
        { label: '密集架名称', prop: 'frame_name', checked: true, width: '200' },
        { label: '密集架长度(m)', prop: 'frame_length', checked: true, width: '150' },
        { label: '密集架高度(m)', prop: 'frame_height', checked: true, width: '150' },
        { label: '密集架深度(m)', prop: 'frame_depth', checked: false, width: '150' },
        { label: '密集架行数', prop: 'frame_row', checked: false, width: '150' },
        { label: '密集架列数', prop: 'frame_column', checked: false, width: '150' },
        {
          label: '操作',
          prop: 'operation',
          type: 'operation',
          checked: true,
          disabled: true,
          width: '150',
          buttonGroup: [
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_engine(data)
            }
          ]
        }
      ],
      thead: [
        { label: '库房名称', prop: 'whouse_name', checked: true, disabled: true, width: '200' },
        { label: '库房地址', prop: 'whouse_adress', checked: true, width: '200' },
        { label: '库房长度(m)', prop: 'whouse_length', checked: true, width: '200' },
        { label: '库房高度(m)', prop: 'whouse_height', checked: false, width: '100' },
        { label: '库房宽度(m)', prop: 'whouse_width', checked: false, width: '150' },
        { label: '库房密集架间距(m)', prop: 'whouse_frame_space', checked: false, width: '200' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '添加',
              type: 'text',
              event: 'button',
              handler: data => fun_create_frame(data)
            },
            {
              label: '修改',
              type: 'text',
              event: 'button',
              handler: data => fun_modify_whouse(data)
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

    let contextData = reactive({
      name: '库房管理',
      breadcrumb: [
        { path: '/whouse-manage', title: '库房管理' },
        { path: '/whouse-manage/whouse-manage', title: '库房管理' }
      ],
      queryList: {
        // project_name: { title: '项目名称', value: '' },
        // plan_permission_number: { title: '规划许可证号', value: '' }
      },
      conditionsList: {
        // remove: { title: '删除项目信息', icon: 'iconfont guilian-icon' },
        // lock: { title: '锁定', icon: 'iconfont guilian-icon' },
        // export: { title: '导出项目信息', icon: 'iconfont guilian-icon' },
        custom: { title: '自定义表头', icon: 'iconfont guilian-icon' }
      },
      whouse_project_obj: {
        whouse_project_dialog: false,
        row: null
      },
      whouse_project_obj_show: false,
      frame_project_obj: {
        frame_project_dialog: false,
        row: null
      },
      frame_project_obj_show: false,
      delete_current_row: null,
      expand_current_row: null
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })

    const fun_value_change = obj => {
      let { value, index } = obj
      contextData.queryList[index].value = value
    }

    const fun_table_handle = index => {
      console.log(index)
    }

    const fun_checkbox_change = list => {
      tableList.thead.map(item => {
        item.checked = list.indexOf(item.label) != -1 ? true : false
      })
    }

    const fun_expand_change = row => {
      contextData.expand_current_row = row
    }

    const fun_create_whouse = () => {
      contextData.whouse_project_obj.whouse_project_dialog = true
      contextData.whouse_project_obj.row = null
      contextData.whouse_project_obj_show = true
    }

    const fun_modify_whouse = row => {
      contextData.whouse_project_obj.whouse_project_dialog = true
      contextData.whouse_project_obj.row = JSON.parse(JSON.stringify(row))
      contextData.whouse_project_obj_show = true
    }
    
    const fun_whouse_project_close = val => {
      console.log(val)
      contextData.whouse_project_obj.whouse_project_dialog = false
      contextData.whouse_project_obj_show = false
    }

    const fun_db_click = row => {
      fun_modify_whouse(row)
    }

    const fun_delete_project = row => {
      contextData.delete_current_row = row
      context.root.$confirm('', '', {
        title: '',
        message: '记录删除后不可恢复,是否删除记录？',
        center: true, // 是否使用圆角按钮
        lockScroll: true, // 是否在 MessageBox 出现时将 body 滚动锁定
        callback: fun_delete_callback // 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
      })
    }

    const fun_create_frame = row => {
      contextData.frame_project_obj.frame_project_dialog = true
      contextData.frame_project_obj.row = JSON.parse(JSON.stringify(row))
      contextData.frame_project_obj_show = true
    }

    const fun_frame_project_close = val => {
      console.log(val)
      contextData.frame_project_obj.frame_project_dialog = false
      contextData.frame_project_obj_show = false
    }

    const fun_delete_engine = row => {
      contextData.delete_current_row = row
      context.root.$confirm('', '', {
        title: 'This is the title',
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
      fun_value_change,
      fun_create_whouse,
      fun_modify_whouse,
      fun_whouse_project_close,
      fun_delete_project,
      fun_table_handle,
      fun_create_frame,
      fun_frame_project_close,
      fun_delete_engine,
      fun_checkbox_change,
      fun_db_click,
      fun_expand_change
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
