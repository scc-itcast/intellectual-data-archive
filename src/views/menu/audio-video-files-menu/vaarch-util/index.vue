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
          <sz-button title="查询" type="primary" @click="fun_general_query"></sz-button>
          <!-- <sz-button class="global--ml20" title="高级查询" @click="fun_advanced_query"></sz-button> -->
        </div>
      </div>
    </template>
    <template>
      <div class="table-conditions--box">
        <div class="table-conditions--box-layar global-between-center--flex">
          <div v-show="!show_complete_regist" class="table-conditions--left global--flex">
            <sz-button
              title="查阅登记"
              type="warning"
              @click="fun_refer_regist"
              size="medium"
            ></sz-button>
            <sz-button
              class="global--ml20"
              title="查看已完成登记"
              @click="fun_complete_regist"
              size="medium"
            ></sz-button>
          </div>
          <div v-show="show_complete_regist" class="table-conditions--left global--flex">
            <sz-button
              type="warning"
              title="查看未完成登记"
              @click="fun_no_complete_regist"
              size="medium"
            ></sz-button>
          </div>
        </div>
      </div>
      <div class="table-list--box">
        <sz-table
          v-show="!show_complete_regist"
          class="table-padding-left30"
          :config="no_completed_regist_list"
          @fun_db_click="fun_no_completed_db_click"
        ></sz-table>
        <sz-table
          v-show="show_complete_regist"
          class="table-padding-left30"
          :config="completed_regist_list"
          @fun_db_click="fun_completed_db_click"
        ></sz-table>
      </div>
      <div v-if="advanced_query_obj_show">
        <sz-advanced-query
          :advanced_query_obj="advanced_query_obj"
          @fun_advanced_query_close="fun_advanced_query_close"
        />
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
import LookProject from '@/views/menu/audio-video-files-menu/vaarch-util/components/look_project.vue'
export default {
  name: 'vaarch-util',
  components: {
    LookProject
  },
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let no_completed_regist_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      checkbox: false,
      number: true,
      // expand: true,
      // table_height: 375,
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
              label: '修改',
              type: 'text',
              event: 'button',
              handler: data => fun_modify_project(data)
            },
            {
              label: '完成',
              type: 'text',
              event: 'button',
              handler: data => fun_complete_project(data)
            },
            {
              label: '打印',
              type: 'text',
              event: 'button',
              handler: data => fun_print_project(data)
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

    let completed_regist_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      checkbox: false,
      number: true,
      // expand: true,
      // table_height: 375,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '查阅人', prop: 'refer_people', checked: true, width: '200' },
        { label: '查阅单位', prop: 'refer_unit', checked: true, width: '200' },
        { label: '查阅人电话', prop: 'refer_phone', checked: true, width: '200' },
        { label: '接待人', prop: 'receiver', checked: false, width: '200' },
        { label: '查阅日期', prop: 'refer_date', checked: true, width: '100' },
        { label: '状态', prop: 'status', checked: true, width: '100' },
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
              label: '打印',
              type: 'text',
              event: 'button',
              handler: data => fun_print_project(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '声像档案利用',
      breadcrumb: [
        { path: '/audio-video-files', title: '声像档案' },
        { path: '/audio-video-files/vaarch-util', title: '声像档案利用' }
      ],
      queryList: {
        refer_people: { title: '查阅人', value: '' },
        refer_unit: { title: '查阅单位', value: '' },
        refer_date: { title: '查阅日期', value: '', type: 'datetime' }
      },
      advanced_query_obj: {
        advanced_query_dialog: false,
        project_query_disabled: false,
        type_query_value: 2,
        query_field_list: []
      },
      advanced_query_obj_show: false,
      look_project_obj: {
        look_project_dialog: false,
        row: null
      },
      look_project_obj_show: false,
      delete_current_row: null,
      complete_current_row: null,
      show_complete_regist: false
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
      // contextData.advanced_query_obj.query_field_list = JSON.parse(JSON.stringify(table_list.thead))
      contextData.advanced_query_obj.advanced_query_dialog = true
      contextData.advanced_query_obj_show = true
    }

    const fun_advanced_query_close = () => {
      contextData.advanced_query_obj.advanced_query_dialog = false
      contextData.advanced_query_obj_show = false
    }

    const fun_refer_regist = () => {
      context.root.$router.push({ path: '/audio-video-files/vaarch-util/increase-regist' })
    }

    const fun_complete_regist = () => {
      contextData.show_complete_regist = true
    }

    const fun_no_complete_regist = () => {
      contextData.show_complete_regist = false
    }

    const fun_no_completed_db_click = row => {
      fun_modify_project(row)
    }

    const fun_modify_project = row => {
      context.root.$router.push({
        path: '/audio-video-files/vaarch-util/modify-regist',
        query: {
          id: row.id
        }
      })
    }

    const fun_complete_project = row => {
      contextData.complete_current_row = row
      context.root.$confirm('', '', {
        title: '消息提示框',
        message: '完成后将不能进行修改，是否确认完成？',
        center: true, // 是否使用圆角按钮
        lockScroll: true, // 是否在 MessageBox 出现时将 body 滚动锁定
        callback: fun_complete_callback // 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
      })
    }

    const fun_complete_callback = (action, instance) => {
      // console.log(action, contextData.delete_current_row)
      let row = contextData.complete_current_row
      if (action == 'cancel') {
        context.root.$notify({
          title: '提示信息',
          message: '取消提交',
          iconClass: 'iconfont happy-full', // 自定义图标的类名。若设置了 type，则 iconClass 会被覆盖
          position: 'bottom-right', // 自定义弹出位置
          duration: 2000 // 显示时间, 毫秒。设为 0 则不会自动关闭
        })
        return
      }
      context.root.$notify({
        title: '提示信息',
        message: '提交成功',
        iconClass: 'iconfont guilian', // 自定义图标的类名。若设置了 type，则 iconClass 会被覆盖
        position: 'bottom-right', // 自定义弹出位置
        duration: 2000 // 显示时间, 毫秒。设为 0 则不会自动关闭
      })
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

    const fun_completed_db_click = row => {
      fun_look_project(row)
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

    const fun_print_project = row => {}

    return {
      contextData,
      ...toRefs(contextData),
      completed_regist_list,
      ...toRefs(completed_regist_list),
      no_completed_regist_list,
      ...toRefs(no_completed_regist_list),
      fun_value_change,
      fun_general_query,
      fun_advanced_query,
      fun_advanced_query_close,
      fun_refer_regist,
      fun_complete_regist,
      fun_no_complete_regist,
      fun_no_completed_db_click,
      fun_modify_project,
      fun_complete_project,
      fun_delete_project,
      fun_look_project,
      fun_look_project_close,
      fun_print_project,
      fun_completed_db_click
    }
  }
}
</script>

<style lang="scss" scoped></style>
