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
          <sz-button class="global--ml20" title="高级查询" @click="fun_advanced_query"></sz-button>
        </div>
      </div>
    </template>
    <template>
      <div class="table-list--box">
        <sz-auvi-file-table ref="sz_table" :config="tableList" />
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
      <div v-if="preview_project_obj_show">
        <sz-auvi-file-preview
          :preview_project_obj="preview_project_obj"
          @fun_preview_project_close="fun_preview_project_close"
        />
      </div>
    </template>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
import LookProject from '@/views/menu/audio-video-files-menu/file-query/components/look_project.vue'
export default {
  name: 'vafile-query',
  components: {
    LookProject
  },
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let tableList = reactive({
      isRequest: false,
      pagination: true,
      table_height: 375,
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
          label: '详情',
          type: 'text',
          event: 'button',
          handler: data => fun_look_project(data)
        }
      ],
      thead: [
        { label: '文件题名', prop: 'document_title', checked: true, width: '200' },
        { label: '文件档号', prop: 'document_no', checked: true, width: '200' },
        { label: '原名称', prop: 'origin_name', checked: true, width: '100' },
        { label: '责任者', prop: 'res_people', checked: true, width: '150' },
        { label: '版权所有者', prop: 'copyright', checked: true, width: '100' },
        { label: '拍摄地点', prop: 'shoot_address', checked: true, width: '100' },
        { label: '拍摄事由', prop: 'shoot_reason', checked: true, width: '100' },
        { label: '拍摄者', prop: 'shoot_people', checked: true, width: '100' },
        { label: '拍摄日期', prop: 'shoot_date', checked: true, width: '100' },
        { label: '原编号', prop: 'origin_number', checked: true, width: '100' },
        { label: '文件类型', prop: 'file_type', checked: true, width: '100' },
        { label: '底片号', prop: 'film_no', checked: true, width: '100' },
        { label: '盘号', prop: 'plate_no', checked: true, width: '100' },
        { label: '参见号', prop: 'see_no', checked: true, width: '100' },
        { label: '人物', prop: 'figure', checked: true, width: '100' },
        { label: '保管期限', prop: 'safe_duration', checked: true, width: '100' },
        { label: '密级', prop: 'security_class', checked: true, width: '100' },
        { label: '来源', prop: 'source', checked: true, width: '100' },
        { label: '接收日期', prop: 'receive_date', checked: true, width: '100' },
        { label: '关键字', prop: 'keyword', checked: true, width: '100' },
        { label: '主题词', prop: 'subject_headings', checked: true, width: '100' },
        { label: '描述', prop: 'group_descript', checked: true, width: '100' },
        { label: '文字说明', prop: 'text_instruct', checked: true, width: '100' },
        { label: '录入时间', prop: 'enter_time', checked: true, width: '100' },
      ]
    })

    let contextData = reactive({
      name: '声像文件查询',
      breadcrumb: [
        { path: '/audio-video-files', title: '声像档案' },
        { path: '/audio-video-files/file-query/vafile-query', title: '档案查询' },
        { path: '/audio-video-files/file-query/vafile-query', title: '声像文件查询' }
      ],
      queryList: {
        document_title: { title: '文件题名', value: '' },
        document_no: { title: '文件档号', value: '' },
        file_type: { title: '文件类型', value: '', type: 'select', list: [] }
      },
      file_type_list: [
        { label: '全部类型', prop: 1 },
        { label: '照片', prop: 2 },
        { label: '视频', prop: 3 },
        { label: '音频', prop: 4 }
      ],
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
      preview_project_obj: {
        preview_project_dialog: false,
        row: null
      },
      preview_project_obj_show: false
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      contextData.queryList.file_type.list = contextData.file_type_list
    })

    const fun_value_change = obj => {
      let { value, index } = obj
      contextData.queryList[index].value = value
    }

    const fun_general_query = () => {
      return
      context.refs.sz_table.search()
      context.refs.sz_table.requestData()
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

    const fun_preview_project = row => {
      contextData.preview_project_obj.preview_project_dialog = true
      contextData.preview_project_obj.row = JSON.parse(JSON.stringify(row))
      contextData.preview_project_obj_show = true
    }

    const fun_preview_project_close = () => {
      contextData.preview_project_obj.preview_project_dialog = false
      contextData.preview_project_obj_show = false
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

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      fun_value_change,
      fun_general_query,
      fun_advanced_query,
      fun_advanced_query_close,
      fun_preview_project,
      fun_preview_project_close,
      fun_look_project,
      fun_look_project_close
    }
  }
}
</script>

<style lang="scss" scoped></style>
