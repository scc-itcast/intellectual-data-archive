// 竣工
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
          <sz-button class="global--ml20" title="删除" @click="fun_del"></sz-button>
          <sz-button class="global--ml20" title="添加工程" @click="fun_add"></sz-button>
          <sz-button class="global--ml20" title="保存" @click="fun_save"></sz-button>
        </div>
      </div>
    </template>
    <div style="display: flex">
      <div style="width: 300px">
        <sz-aside-tree> </sz-aside-tree>
      </div>
      <common title="房屋建筑工程项目级著录单" tag="1"></common>
    </div>
    <div v-if="advanced_query_obj_show">
      <sz-advanced-query
        :advanced_query_obj="advanced_query_obj"
        @fun_advanced_query_close="fun_advanced_query_close"
      />
    </div>
  </d2-container>
</template>

<script>
import common from '@/views/menu/file-bgf-menu/components-table-a/table.vue'
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  name: 'com-file-record',
  mixins: [mixinAsideShowTrue],
  components: {
    common,
  },
  setup(prop, context) {
    let tableList = reactive({
      thead: [
        { label: '项目名称', prop: 'project_name', checked: true, disabled: true, width: '200' },
        { label: '项目地点', prop: 'project_adress', checked: true, width: '200' },
        { label: '项目类型', prop: 'project_type', checked: true, width: '200' },
        { label: '录入人', prop: 'enter_pepole', checked: false, width: '100' },
        { label: '录入时间', prop: 'enter_time', checked: false, width: '150' },
        { label: '建设单位', prop: 'construct_unit', checked: false, width: '200' },
        { label: '代建单位', prop: 'd_construct_unit', checked: false, width: '200' },
        { label: '立项批准单位', prop: 'project_appr_unit', checked: false, width: '200' },
        { label: '设计单位', prop: 'design_unit', checked: false, width: '200' },
        { label: '监理单位', prop: 'super_unit', checked: false, width: '200' },
        { label: '勘察单位', prop: 'pros_unit', checked: false, width: '200' },
        { label: '立项批准文号', prop: 'project_appr_number', checked: false, width: '200' },
        { label: '规划许可证号', prop: 'plan_permis_number', checked: false, width: '200' },
        { label: '用地规划许可证号', prop: 'plan_permit_number', checked: false, width: '200' },
        { label: '国有土地使用证号', prop: 'certificate_number', checked: false, width: '200' },
        { label: '施工许可证号', prop: 'const_permit_number', checked: false, width: '200' },
        { label: '项目序号', prop: 'project_number', checked: false, width: '200' },
        { label: '进馆日期', prop: 'hen_date', checked: false, width: '200' },
        { label: '移交单位', prop: 'handed_ove_unit', checked: false, width: '200' },
        { label: '备注', prop: 'remark', checked: false, width: '200' },
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
              handler: (data) => fun_create_engine(data),
            },
            {
              label: '修改',
              type: 'text',
              event: 'button',
              handler: (data) => fun_modify_project(data),
            },
            {
              label: '导出',
              type: 'text',
              event: 'button',
              handler: (data) => fun_export_project(data),
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: (data) => fun_delete_project(data),
            },
            {
              label: '锁定',
              type: 'text',
              event: 'button',
              handler: (data) => fun_locked_project(data),
            },
          ],
        },
      ],
    })

    let contextData = reactive({
      name: '竣工档案著录',
      breadcrumb: [
        { path: '/file-bgf', title: '档案整编' },
        { path: '/file-bgf/file-description/com-file-record', title: '档案著录' },
        { path: '/file-bgf/file-description/com-file-record', title: '竣工档案著录' },
      ],
      queryList: {
        project_name: { title: '项目名称', value: '' },
      },
      advanced_query_obj_show: false,
      advanced_query_obj: {
        project_query_disabled: false,
        type_query_value: 2,
        query_field_list: [],
      },
    })

    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })
    const fun_value_change = () => {}
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
    const fun_del = () => {}
    const fun_add = () => {}
    const fun_save = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      fun_value_change,
      fun_general_query,
      fun_advanced_query,
      fun_advanced_query_close,
      fun_del,
      fun_add,
      fun_save,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../components-table-a/index.scss';
</style>
