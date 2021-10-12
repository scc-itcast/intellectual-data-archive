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
      <div style="flex: 1;min-width:0">
        <div class="container-page--content" :style="container_style"></div>
      </div>
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
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import LookProject from '@/views/menu/file-query-menu/class-query/components/look_project.vue'
import {
  onMounted,
  computed,
  reactive,
  watchEffect,
  toRefs,
  onBeforeUnmount
} from '@vue/composition-api'
export default {
  name: 'easy-search',
  mixins: [mixinAsideShowTrue],
  components: {
    LookProject
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
      name: '易搜索',
      breadcrumb: [
        { path: '/file-query', title: '档案查询' },
        { path: '/file-query/easy-search', title: '易搜索' }
      ],
      container_style: {
        height: document.body.clientHeight - 242 + 'px',
        overflowY: 'auto'
      },
      queryList: {
        project_name: { title: '项目名称', value: '' },
        plan_permission_number: { title: '规划许可证号', value: '' }
      },
      advanced_query_obj: {
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
      tree_current_item: {}
    })

    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onResize = () => {
      contextData.container_style = {
        height: document.body.clientHeight - 295 + 'px',
        overflowY: 'auto'
      }
    }

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

    const fun_tree_item = val => {
      contextData.tree_current_item = JSON.parse(JSON.stringify(val))
      fun_tree_click(val.level, val)
    }

    const fun_page_change = val => {
      console.log(val)
    }

    const fun_tree_click = (index, val) => {
      contextData.tree_current_item = JSON.parse(JSON.stringify(val))
      switch (index) {
        case 'project': {
          break
        }
        default: {
        }
      }
    }

    const fun_file_batch_con = val => {
      console.log('案卷批量挂接')
    }

    const fun_batch_upload = val => {
      console.log('批量上传')
    }

    const fun_export_ident = val => {
      console.log('导出关联标识')
    }

    const fun_db_click = row => {
      console.log('双击了')
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
      fun_db_click,
      fun_tree_item,
      fun_page_change,
      fun_look_project,
      fun_look_project_close
    }
  }
}
</script>
<style lang="scss" scoped>
.container--page {
  display: flex;
  width: 100%;
  .container-page--content {
    background-color: $color-bg-4;
    border-radius: 6px;
    padding-top: 20px;
  }
}
.tree-item--page {
  width: 100%;
  background-color: $color-bg-4;
  border-radius: 6px;
}
</style>
