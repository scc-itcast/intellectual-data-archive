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
        <div class="container-page--content">
          <sz-table
            class="table-padding-left30"
            :config="tableList"
            @fun_db_click="fun_db_click"
          ></sz-table>
        </div>
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
import LookProject from '@/views/menu/file-bgf-menu/file-articulated/components/look_project.vue'
import {
  onMounted,
  computed,
  reactive,
  watchEffect,
  toRefs,
  onBeforeUnmount
} from '@vue/composition-api'
export default {
  name: 'file-articulated',
  mixins: [mixinAsideShowTrue],
  components: {
    LookProject
  },
  setup(prop, context) {
    let tableList = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
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
        { label: '文件档号', prop: 'document_no', checked: true, width: '200' },
        { label: '文件题名', prop: 'document_title', checked: true, disabled: true, width: '200' },
        { label: '责任者', prop: 'res_people', checked: true, width: '100' },
        { label: '载体类型', prop: 'carr_type', checked: true, width: '100' },
        { label: '数量', prop: 'number', checked: true, width: '100' },
        { label: '录入人', prop: 'enter_pepole', checked: true, width: '100' },
        { label: '录入时间', prop: 'enter_time', checked: true, width: '200' },
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
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '档案挂接',
      breadcrumb: [
        { path: '/file-bgf', title: '档案整编' },
        { path: '/file-bgf/file-articulated', title: '档案挂接' }
      ],
      queryList: {
        associated: { title: '关联', value: '', type: 'select', list: [] },
        project_name: { title: '项目名称', value: '' }
      },
      associated_list: [
        { label: '根据ID关联', prop: 1 },
        { label: '根据名称关联 ', prop: 2 },
        { label: '根据档号关联', prop: 3 }
      ],
      button_list: {
        file_batch_con: { title: '案卷批量挂接', value: '' }
      },
      button_list_copy: {},
      button_list_all: {
        project: {
          file_batch_con: { title: '案卷批量挂接', value: '' }
        },
        engine: {
          file_batch_con: { title: '案卷批量挂接', value: '' },
          batch_upload: { title: '批量上传', value: '' },
          export_ident: { title: '导出关联标识', value: '' }
        }
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
      tree_current_item: {}
    })
    onMounted(async () => {
      contextData.queryList.associated.list = contextData.associated_list
      // 调用方法, 方法里调用接口
    })
    onBeforeUnmount(() => {})

    const fun_value_change = () => {
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
          contextData.button_list = contextData.button_list_all.project
          break
        }
        default: {
          contextData.button_list = contextData.button_list_all.engine
        }
      }
    }

    const fun_button_click = (item, index) => {
      fun_tree_click(index)
      switch (index) {
        case 'file_batch_con': {
          fun_file_batch_con(item)
          break
        }
        case 'batch_upload': {
          fun_batch_upload(item)
          break
        }
        case 'export_ident': {
          fun_export_ident(item)
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
      fun_button_click,
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
