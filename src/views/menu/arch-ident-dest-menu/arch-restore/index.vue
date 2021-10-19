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
          <sz-button title="查询" type="primary" @click="fun_advanced_query"></sz-button>
          <!-- <sz-button class="global--ml20" title="高级查询" @click="fun_advanced_query"></sz-button> -->
        </div>
      </div>
    </template>
    <template>
      <div class="table-conditions--box">
        <div class="table-conditions--box-layar global-between-center--flex">
          <div class="table-conditions--left global--flex">
            <!-- <sz-button
              title="添加销毁登记"
              type="warning"
              @click="fun_create_project"
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
          class="table-padding-left30"
          :config="tableList"
          @fun_db_click="fun_db_click"
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
import LookProject from '@/views/menu/arch-ident-dest-menu/components/destroy/look_project.vue'
export default {
  name: 'arch-restore',
  components: {
    LookProject
  },
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let tableList = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: true,
      // expand: true,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        {
          label: '总登记号',
          prop: 'total_registration',
          checked: true,
          width: '80',
          disabled: true
        },
        { label: '案卷题名', prop: 'books_title', checked: true, width: '100', disabled: true },
        { label: '所属单位工程', prop: 'Belongs_eng', checked: true, width: '100' },
        { label: '所属项目', prop: 'Belongs_pro', checked: true, width: '100' },
        { label: '案卷档号', prop: 'books_no', checked: true, width: '100' },
        { label: '存放位置', prop: 'stor_location', checked: true, width: '100' },
        { label: '归档时间', prop: 'archive_date', checked: true, width: '100' },
        { label: '文字材料(张)', prop: 'sub_word_z', checked: true, width: '100' },
        { label: '图纸材料(张)', prop: 'sub_draw_v', checked: true, width: '100' },
        { label: '其他材料数量', prop: 'other_materi_num', checked: true, width: '110' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '还原',
              type: 'text',
              event: 'button',
              handler: data => fun_restore_project(data)
            },
            {
              label: '查看',
              type: 'text',
              event: 'button',
              handler: data => fun_look_project(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '档案还原',
      breadcrumb: [
        { path: '/arch-ident-dest', title: '档案鉴定销毁' },
        { path: '/arch-ident-dest/arch-restore', title: '档案还原' }
      ],
      queryList: {
        // arch_destroy_people: { title: '档案销毁人员', value: '' },
        // destroy_regist_status: {
        //   title: '销毁登记状态',
        //   value: 'destroy_complete',
        //   type: 'select',
        //   list: []
        // }
      },
      conditionsList: {
        // remove: { title: '删除项目信息', icon: 'iconfont guilian-icon' },
        // lock: { title: '锁定', icon: 'iconfont guilian-icon' },
        // export: { title: '导出项目信息', icon: 'iconfont guilian-icon' },
        custom: { title: '自定义表头', icon: 'iconfont guilian-icon' }
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
      export_setting_from: {
        project: '项目id',
        engine: '项目id',
        case: '项目id',
        file: '项目id'
      },
      select_obj: {
        project_list: [
          { label: '项目名称', prop: '项目名称' },
          { label: '项目档号', prop: '项目档号' },
          { label: '项目id', prop: '项目id' }
        ],
        engine_list: [
          { label: '工程名称', prop: '工程名称' },
          { label: '工程档号', prop: '工程档号' },
          { label: '工程id', prop: '工程id' }
        ],
        case_list: [
          { label: '案卷名称', prop: '案卷名称' },
          { label: '案卷档号', prop: '案卷档号' },
          { label: '案卷id', prop: '案卷id' }
        ],
        file_list: [
          { label: '文件名称', prop: '文件名称' },
          { label: '文件档号', prop: '文件档号' },
          { label: '文件id', prop: '文件id' }
        ]
      },
      restore_current_row: null,
      complete_current_row: null,
      delete_current_row: null
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
      contextData.advanced_query_obj.query_field_list = JSON.parse(JSON.stringify(tableList.thead))
      contextData.advanced_query_obj.advanced_query_dialog = true
      contextData.advanced_query_obj_show = true
    }

    const fun_advanced_query_close = () => {
      contextData.advanced_query_obj.advanced_query_dialog = false
      contextData.advanced_query_obj_show = false
    }

    const fun_table_handle = index => {
      console.log(index)
    }

    const fun_checkbox_change = list => {
      tableList.thead.map(item => {
        item.checked = list.indexOf(item.label) != -1 ? true : false
      })
    }

    const fun_create_project = () => {
      context.root.$router.push({ path: '/arch-ident-dest/arch-dest/increase-regist' })
    }

    const fun_restore_project = row => {
      contextData.restore_current_row = row
      context.root.$confirm('', '', {
        title: '',
        message: '还原后将不能进行修改，是否确认完成？',
        center: true, // 是否使用圆角按钮
        lockScroll: true, // 是否在 MessageBox 出现时将 body 滚动锁定
        callback: fun_restore_callback // 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
      })
    }

    const fun_restore_callback = (action, instance) => {
      // console.log(action, contextData.delete_current_row)
      let row = contextData.restore_current_row
      if (action == 'cancel') {
        context.root.$notify({
          title: '提示信息',
          message: '取消还原',
          iconClass: 'iconfont happy-full', // 自定义图标的类名。若设置了 type，则 iconClass 会被覆盖
          position: 'bottom-right', // 自定义弹出位置
          duration: 2000 // 显示时间, 毫秒。设为 0 则不会自动关闭
        })
        return
      }
      context.root.$notify({
        title: '提示信息',
        message: '还原成功',
        iconClass: 'iconfont guilian', // 自定义图标的类名。若设置了 type，则 iconClass 会被覆盖
        position: 'bottom-right', // 自定义弹出位置
        duration: 2000 // 显示时间, 毫秒。设为 0 则不会自动关闭
      })
    }

    const fun_db_click = row => {
      fun_look_project(row)
    }

    const fun_look_project = row => {
      contextData.look_project_obj.look_project_dialog = true
      contextData.look_project_obj.row = JSON.parse(JSON.stringify(row))
      contextData.look_project_obj_show = true
    }

    const fun_look_project_close = val => {
      console.log(val)
      contextData.look_project_obj.look_project_dialog = false
      contextData.look_project_obj_show = false
    }

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      fun_value_change,
      fun_general_query,
      fun_advanced_query,
      fun_advanced_query_close,
      fun_restore_project,
      fun_create_project,
      fun_look_project,
      fun_look_project_close,
      fun_table_handle,
      fun_checkbox_change,
      fun_db_click
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
