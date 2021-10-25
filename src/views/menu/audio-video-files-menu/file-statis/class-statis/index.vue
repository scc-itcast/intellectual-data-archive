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
      </div>
    </template>
    <template>
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
    </template>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  name: 'class-statis',
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let tableList = reactive({
      search_form: false,
      isRequest: false,
      table_total: true,
      pagination: false,
      // checkbox: true,
      number: true,
      // expand: true,
      table_height: 315,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '时间', prop: 'time', checked: true, width: '100' },
        { label: '分类', prop: 'class', checked: true, width: '100' },
        { label: '照片数量(张)', prop: 'photos_num', checked: true, width: '100' },
        { label: '照片存储大小(GB)', prop: 'photos_sto_size', checked: true, width: '100' },
        { label: '视频数量(个)', prop: 'video_num', checked: true, width: '100' },
        { label: '视频存储大小(GB)', prop: 'video_sto_size', checked: true, width: '100' },
        { label: '音频数量(个)', prop: 'audio_num', checked: true, width: '100' },
        { label: '音频存储大小(GB)', prop: 'audio_sto_size', checked: true, width: '100' },
        { label: '总数量', prop: 'total_num', checked: true, width: '100' },
        { label: '总存储大小(GB)', prop: 'total_sto_size', checked: true, width: '100' }
      ]
    })

    let contextData = reactive({
      name: '分类统计',
      breadcrumb: [
        { path: '/audio-video-files', title: '声像档案' },
        { path: '/audio-video-files/file-statis/class-statis', title: '档案统计' },
        { path: '/audio-video-files/file-statis/class-statis', title: '分类统计' }
      ],
      queryList: {
        statistical_methods: {
          title: '统计方式',
          value: 'year_statistics',
          type: 'select',
          list: []
        },
        year_mouth_statistical: {
          title: '',
          value: 2021,
          type: 'select',
          list: [],
          isHide: false
        },
        time_period_statistical_start: {
          title: '',
          value: '',
          type: 'datetime',
          isHide: true
        },
        time_period_statistical_end: {
          title: '',
          value: '',
          type: 'datetime',
          isHide: true
        }
      },
      conditionsList: {
        // remove: { title: '删除项目信息', icon: 'iconfont guilian-icon' },
        // lock: { title: '锁定', icon: 'iconfont guilian-icon' },
        // export: { title: '导出项目信息', icon: 'iconfont guilian-icon' },
        // custom: { title: '自定义表头', icon: 'iconfont guilian-icon' }
      },
      statistical_methods_list: [
        { label: '按年度统计', prop: 'year_statistics' },
        { label: '按月度统计', prop: 'mouth_statistics' },
        { label: '指定时间段统计', prop: 'time_period_statistics' }
      ],
      advanced_query_obj: {
        advanced_query_dialog: false,
        project_query_disabled: false,
        type_query_value: 2,
        query_field_list: []
      },
      advanced_query_obj_show: false,
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
      export_current_row: null
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      fun_init()
    })

    const fun_init = () => {
      contextData.queryList.statistical_methods.list = contextData.statistical_methods_list
      let array = []
      for (var index = 2021; index >= 1995; index--) {
        array.push({ label: index, prop: index })
      }
      contextData.queryList.year_mouth_statistical.list = array
    }

    const fun_value_change = obj => {
      let { value, index } = obj
      contextData.queryList[index].value = value
      if (index === 'statistical_methods') {
        fun_statistical_methods(value)
      }
    }

    const fun_statistical_methods = value => {
      switch (value) {
        case 'time_period_statistics': {
          contextData.queryList.year_mouth_statistical.isHide = true
          contextData.queryList.time_period_statistical_start.isHide = false
          contextData.queryList.time_period_statistical_end.isHide = false
          break
        }
        default: {
          contextData.queryList.time_period_statistical_start.isHide = true
          contextData.queryList.time_period_statistical_end.isHide = true
          contextData.queryList.year_mouth_statistical.isHide = false
        }
      }
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
      context.root.$router.push({ path: '/file-using/use-regist/increase-regist' })
    }

    const fun_db_click = row => {}

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      fun_value_change,
      fun_general_query,
      fun_advanced_query,
      fun_advanced_query_close,
      fun_create_project,
      fun_table_handle,
      fun_checkbox_change,
      fun_db_click
    }
  }
}
</script>

<style lang="scss" scoped></style>
