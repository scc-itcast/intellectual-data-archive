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
      <div style="flex: 1;min-width:0">
        <div v-show="!file_generic_table_show">
          <div class="tree-item--page">
            <sz-project-level
              ref="component_project_ref"
              v-show="tree_item_flag.project"
              :tree_item="project_tree_item"
            />
            <sz-engine-level
              ref="component_engine_ref"
              v-show="tree_item_flag.engine"
              :tree_item="engine_tree_item"
            />
            <sz-case-file-level
              ref="component_case_file_ref"
              v-show="tree_item_flag.case_file"
              :tree_item="case_file_tree_item"
            />
            <sz-file-generic-level
              ref="component_file_generic_ref"
              v-show="tree_item_flag.file_generic"
              :tree_item="file_generic_tree_item"
            />
          </div>
        </div>
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
import ProjectLevel from '@/views/menu/file-bgf-menu/components/project_level/index.vue'
import EngineLevel from '@/views/menu/file-bgf-menu/components/engine_level/index.vue'
import CaseFileLevel from '@/views/menu/file-bgf-menu/components/case_file_level/index.vue'
import FileGenericLevel from '@/views/menu/file-bgf-menu/components/file_generic_level/index.vue'
import FormItem from '@/views/menu/file-bgf-menu/components/index.vue'
import FileGenericTable from '@/views/menu/file-bgf-menu/components/file_generic_table/index.vue'
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
  name: 'receive-confirm',
  mixins: [mixinAsideShowTrue],
  components: {
    CaseFileLevel,
    FileGenericLevel,
    ProjectLevel,
    EngineLevel,
    FormItem,
    FileGenericTable
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
      name: '接收确认',
      breadcrumb: [
        { path: '/file-bgf', title: '档案整编' },
        { path: '/file-bgf/receive-confirm', title: '接收确认' }
      ],
      queryList: {
        project_name: { title: '项目名称', value: '' }
      },
      button_list: {},
      button_list_all: {
        modify_project: {},
        modify_engine: {
          receive: { title: '接收', value: '' }
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
            level: 'project',
            children: [
              {
                id: 111,
                label: 'xxxxxxx一号楼',
                type: '房屋建筑工程',
                level: 'engine',
                children: [
                  {
                    id: 1111,
                    label: 'xxxxxxx案卷级',
                    type: '案卷级',
                    level: 'case_file',
                    children: [
                      {
                        id: 11111,
                        label: 'xxxxxxx文件级通用',
                        type: '文件级通用',
                        level: 'file_generic'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: '苏州相城区xxxxxx小区',
            type: '房屋建筑工程',
            level: 'project',
            children: [
              {
                id: 222,
                label: 'xxxxxxx二号楼',
                type: '房屋建筑工程',
                level: 'engine'
              }
            ]
          }
        ]
      },
      tem_directory_obj: {
        style: {
          width: '300px'
        },
        pagination: false,
        tree_title: '模板目录',
        show_icon: false,
        select_item: 'build_directory',
        select_list: [
          { label: '房屋建筑', prop: 'house_build' },
          { label: '东至2', prop: 'east_to' },
          { label: '建筑工程移交目录', prop: 'build_directory' },
          { label: '市政工程移交目录', prop: 'municipal_directory' }
        ],
        tree_list: [
          {
            id: 1,
            label: '（一）工程准备阶段文件',
            children: [
              {
                id: 111,
                label: '项目建议书及纪要、领导批示'
              },
              {
                id: 112,
                label: '项目建议书及纪要、领导批示'
              },
              {
                id: 113,
                label: '项目建议书及纪要、领导批示'
              }
            ]
          },
          {
            id: 2,
            label: '（二）监理文件',
            children: [
              {
                id: 222,
                label: '项目建议书及纪要、领导批示'
              }
            ]
          }
        ]
      },
      tem_directory_item: {},
      tree_item: {},
      project_tree_item: {
        modify: true
      },
      engine_tree_item: {
        modify: true
      },
      case_file_tree_item: {
        modify: true
      },
      file_generic_tree_item: {
        modify: true
      },
      tree_item_flag: {
        project: false,
        engine: false,
        case_file: false,
        file_generic: false
      },
      file_generic_table_show: false,
      file_generic_table: [],
      file_generic_table_index: [],
      carr_type_list: [
        { label: '文字(张)', prop: '文字(张)' },
        { label: '图纸(张)', prop: '图纸(张)' },
        { label: '底图(张)', prop: '底图(张)' },
        { label: '照片(张)', prop: '照片(张)' },
        { label: '底片(张)', prop: '底片(张)' },
        { label: '载体测试', prop: '载体测试' },
        { label: '录音带(盒)', prop: '录音带(盒)' },
        { label: '录像带(盒)', prop: '录像带(盒)' },
        { label: '光盘(盘)', prop: '光盘(盘)' },
        { label: '计算机磁盘(盘)', prop: '计算机磁盘(盘)' },
        { label: '计算机磁带(盘)', prop: '计算机磁带(盘)' },
        { label: '缩微片(盘)', prop: '缩微片(盘)' },
        { label: '缩微片(张)', prop: '缩微片(张)' },
        { label: '其它', prop: '其它' }
      ]
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      const tree_list = contextData.aside_tree_obj.tree_list[0]
      const project_tree_item = contextData.project_tree_item
      contextData.project_tree_item = { ...tree_list, ...project_tree_item }
      contextData.tree_item = contextData.aside_tree_obj.tree_list[0]
      fun_tree_item_flag()
    })
    onBeforeUnmount(() => {})

    const fun_value_change = () => {}

    const fun_general_query = () => {}

    const fun_tree_item = val => {
      contextData.tree_item = JSON.parse(JSON.stringify(val))
      fun_tree_item_flag()
      fun_tree_click(val.level, val)
    }

    const fun_tree_item_flag = () => {
      const { id, type, level } = contextData.tree_item
      // console.log(prop.tree_item)
      for (const key in contextData.tree_item_flag) {
        contextData.tree_item_flag[key] = false
      }
      contextData.tree_item_flag[level] = true
    }

    const fun_page_change = val => {
      console.log(val)
    }

    const fun_tree_click = (index, val) => {
      switch (index) {
        case 'project': {
          contextData.button_list = contextData.button_list_all.modify_project
          contextData.project_tree_item = JSON.parse(JSON.stringify(val))
          contextData.project_tree_item['modify'] = true
          break
        }
        case 'engine': {
          contextData.button_list = contextData.button_list_all.modify_engine
          contextData.engine_tree_item = JSON.parse(JSON.stringify(val))
          contextData.engine_tree_item['modify'] = true
          break
        }
        default: {
        }
      }
    }

    const fun_button_click = (item, index) => {
      // console.log(index)
      fun_tree_click(index)
      switch (index) {
        case 'receive': {
          fun_receive()
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

    const fun_receive = () => {
      console.log('接收');
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
