<template>
  <div id="sz-aside-tree" @mouseenter="fun_mouseenter" @mouseleave="fun_mouseleave">
    <div v-if="aside_toggle" style="width: 100%;">
      <div class="tree-aside">
        <div class="tree-aside--header global-between-center--flex">
          <div class="tree-aside--text global--ml20">{{ aside_tree_obj.tree_title }}</div>
        </div>
        <div :style="increase_style_aside">
          <div class="tree-aside--content">
            <el-tree
              ref="tree_ref"
              class="el-tree--highlight-current"
              :data="tree_list"
              node-key="id"
              :default-expand-all="false"
              :expand-on-click-node="true"
              :props="defaultProps"
              @node-drag-start="fun_drag_start"
              @node-drag-enter="fun_drag_enter"
              @node-drag-leave="fun_drag_leave"
              @node-drag-over="fun_drag_over"
              @node-drag-end="fun_drag_end"
              @node-drop="fun_drop"
              draggable
              :allow-drop="fun_allow_drop"
              :allow-drag="fun_allow_drag"
              :default-expanded-keys="default_expanded_key"
            >
              <span class="custom-tree-node" slot-scope="{ node }">
                <div class="global-custom-tree-node--title">
                  <div><i class="fa fa-iconfont" :class="fun_increase_icon(node)"></i></div>
                  <div class="custom-tree-node--label">
                    <span>
                      {{ node.label }}
                    </span>
                  </div>
                </div>
              </span>
            </el-tree>
          </div>
        </div>
        <template v-if="aside_tree_obj.pagination">
          <div class="tree-aside--pagination global-center-center--flex">
            <div class="tree-pagination global-between-center--flex">
              <el-pagination
                @size-change="fun_size_change"
                @current-change="fun_page_change"
                :current-page="aside_tree_obj.page_index"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="aside_tree_obj.page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="aside_tree_obj.tree_total"
              >
              </el-pagination>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import {
  onMounted,
  computed,
  reactive,
  watchEffect,
  toRefs,
  onBeforeUnmount
} from '@vue/composition-api'
import log from '@/libs/util.log'
export default {
  setup(prop, context) {
    let contextData = reactive({
      aside_toggle: true,
      increase_style_aside: {
        height: document.body.clientHeight - 222 - 60 + 'px',
        overflowY: 'auto'
      },
      aside_tree_obj: {
        pagination: true,
        page_size: 1,
        page_index: 1,
        tree_total: 1,
        tree_title: '项目列表'
      },
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
                      label: 'xxxxxxx文件级通用01',
                      type: '文件级通用',
                      level: 'file_generic'
                    },
                    {
                      id: 11112,
                      label: 'xxxxxxx文件级通用02',
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
            },
            {
              id: 223,
              label: 'xxxxxxx二号楼',
              type: '房屋建筑工程',
              level: 'engine',
              children: [
                {
                  id: 2233,
                  label: 'xxxxxxx二号楼',
                  type: '房屋建筑工程',
                  level: 'engine'
                },
                {
                  id: 2234,
                  label: 'xxxxxxx二号楼',
                  type: '房屋建筑工程',
                  level: 'engine'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      default_expanded_key: [],
      select_item: '',
      page_index: 0,
      prev_disabled: true,
      next_disabled: true,
      touchtime: new Date().getTime()
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    watchEffect(() => {})

    const onResize = () => {
      contextData.increase_style_aside = {
        height: document.body.clientHeight - 222 - 60 + 'px'
      }
    }

    const fun_increase_icon = node => {
      const flag = node.data.children?.length > 0
      return flag ? 'wenjianjiaweigongxiang' : 'wenjian'
    }

    const fun_drag_start = (node, ev) => {
      // console.log('drag start', node)
    }
    const fun_drag_enter = (draggingNode, dropNode, ev) => {
      // console.log('tree drag enter: ', dropNode.label)
    }
    const fun_drag_leave = (draggingNode, dropNode, ev) => {
      // console.log('tree drag leave: ', dropNode.label)
    }
    const fun_drag_over = (draggingNode, dropNode, ev) => {
      // console.log('tree drag over: ', dropNode.label)
    }
    const fun_drag_end = (draggingNode, dropNode, dropType, ev) => {
      // console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    }
    const fun_drop = (draggingNode, dropNode, dropType, ev) => {
      // console.log('tree drop: ', dropNode.label, dropType)
    }
    const fun_allow_drop = (draggingNode, dropNode, type) => {
      if (draggingNode.parent.data.id === dropNode.parent.data.id) {
        if (draggingNode.data.level === dropNode.data.level) {
          if (type !== 'inner') {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return false
      }
    }

    const fun_allow_drag = draggingNode => {
      return draggingNode.data.level.indexOf('project') === -1
    }

    const fun_size_change = val => {
      contextData.aside_tree_obj.page_size = val
    }

    const fun_page_change = val => {
      contextData.aside_tree_obj.page_index = val
    }

    const fun_mouseenter = () => {
      // contextData.increase_style_aside.overflowY = 'scroll'
    }

    const fun_mouseleave = () => {
      // contextData.increase_style_aside.overflowY = 'auto'
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_increase_icon,
      fun_drag_start,
      fun_drag_enter,
      fun_drag_leave,
      fun_drag_over,
      fun_drag_end,
      fun_drop,
      fun_allow_drop,
      fun_allow_drag,
      fun_mouseenter,
      fun_mouseleave,
      fun_size_change,
      fun_page_change
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-aside {
  overflow-y: 'scroll';
  background: $color-bg-4;
  border-radius: 6px;
  position: relative;
  .tree-aside--header {
    height: 59px;
    border-bottom: 1px solid $color-border-1;
    .tree-aside--text {
      font-size: 16px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      color: $color-text-main;
    }
    .tree-aside--icon {
      width: 53px;
      height: 100%;
      border-left: 1px solid $color-border-1;
    }
  }
  .tree-aside--select {
    margin: 20px 10px -5px 10px;
    .input--box {
      width: 200px;
    }
  }
  .tree-aside--content {
    margin-top: 17px;
  }
  .tree-aside--pagination {
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 0;
    .tree-pagination {
      font-size: 14px;
      height: 28px;
      button {
        border: none;
        padding: 0 6px;
        background: 0 0;
      }
      button:disabled {
        color: #c0c4cc;
        cursor: not-allowed;
      }
      .tree-pagination__jump {
        margin-left: 10px;
      }
      .tree-pagination__total {
        height: 28px;
        margin: 0 10px 3.5px 20px;
      }
    }
  }
}
.tree-aside-icon--color {
  color: $color-primary-hover;
}
.tree-aside-icon--color:hover {
  color: $color-primary;
}
.hidden-tree-aside {
  width: 30px;
  background: $color-bg-3;
  margin-right: 10px;
  border-radius: 6px;
  .hidden-tree-aside--icon {
    height: 30px;
  }
}
</style>
