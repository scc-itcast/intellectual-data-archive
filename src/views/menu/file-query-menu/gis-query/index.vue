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
          <!-- <sz-button title="查询" type="primary" @click="fun_general_query"></sz-button> -->
          <sz-button
            type="primary"
            class="global--ml20"
            title="查询"
            @click="fun_advanced_query"
          ></sz-button>
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
      <div style="flex: 1;min-width:0" class="tree-item--page">
        <my-map :bim_list_prop="bim_list" :tree_item_prop="tree_item" />
      </div>
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
import MyMap from '@/views/menu/file-query-menu/gis-query/components/map.vue'
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
  name: 'gis-query',
  mixins: [mixinAsideShowTrue],
  components: {
    MyMap
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
        { label: '备注', prop: 'remark', checked: false, width: '200' }
      ]
    })
    let contextData = reactive({
      name: 'GIS查询',
      breadcrumb: [
        { path: '/file-query', title: '档案查询' },
        { path: '/file-query/gis-query', title: 'GIS查询' }
      ],
      queryList: {
        // project_name: { title: '项目名称', value: '' }
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
        tree_type: 'gis_map',
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
      tree_item: {},
      map: {},
      bim_list: []
    })

    onMounted(async () => {
      // 调用方法, 方法里调用接口
      const tree_list = contextData.aside_tree_obj.tree_list[0]
      contextData.tree_item = contextData.aside_tree_obj.tree_list[0]
      contextData.bim_list = contextData.aside_tree_obj.tree_list
    })

    onBeforeUnmount(() => {})

    const fun_value_change = () => {}

    const fun_general_query = () => {}

    const fun_tree_item = val => {
      contextData.tree_item = JSON.parse(JSON.stringify(val))
    }

    const fun_page_change = val => {
      console.log(val)
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

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      fun_value_change,
      fun_general_query,
      fun_advanced_query,
      fun_advanced_query_close,
      fun_tree_item,
      fun_page_change
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
  width: 100%;
  background-color: $color-bg-4;
  border-radius: 6px;
}
</style>
