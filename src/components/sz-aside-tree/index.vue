<template>
  <div id="sz-aside-tree" @mouseenter="fun_mouseenter" @mouseleave="fun_mouseleave">
    <div v-show="aside_toggle" :style="aside_tree_obj.style">
      <div class="tree-aside" :style="increase_style_aside">
        <div class="tree-aside--header global-between-center--flex">
          <div class="tree-aside--text global--ml20">{{ aside_tree_obj.tree_title }}</div>
          <template v-if="aside_tree_obj.show_icon">
            <div class="tree-aside--icon global-center-center--flex">
              <i
                @click="fun_aside_toggle"
                class="fa fa-iconfont zhankaicaidan tree-aside-icon--color"
              ></i>
            </div>
          </template>
        </div>
        <div>
          <template v-if="aside_tree_obj.select_list">
            <div class="global-between-center--flex tree-aside--select">
              <div class="input--title">项目名称</div>
              <div class="input--box">
                <el-select
                  v-model="select_item"
                  placeholder="请输入关键字"
                  @change="fun_select_list(select_item)"
                >
                  <el-option
                    v-for="item in aside_tree_obj.select_list"
                    :key="item.prop"
                    :label="item.label"
                    :value="item.prop"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </template>
          <div class="tree-aside--content">
            <el-tree
              ref="tree_ref"
              class="el-tree--highlight-current"
              :data="tree_list"
              node-key="id"
              :default-expand-all="default_expand_all"
              :expand-on-click-node="true"
              :props="defaultProps"
              @node-click="fun_node_click"
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
          <div
            class="tree-aside--pagination global-center-center--flex"
            :style="aside_tree_obj.style"
          >
            <div class="tree-pagination global-between-center--flex">
              <button type="button" class="btn-prev" :disabled="prev_disabled">
                <i class="el-icon el-icon-arrow-left"></i>
              </button>
              <span class="tree-pagination__jump">
                <span>第</span>
                <div class="el-input el-input--default el-pagination__editor is-in-pagination">
                  <input
                    v-model="page_index"
                    @keyup.enter="fun_page_change(page_index)"
                    type="number"
                    autocomplete="off"
                    min="1"
                    max="100"
                    class="el-input__inner"
                  />
                </div>
                <span>页</span>
              </span>
              <span class="tree-pagination__total global-center-center--flex"
                >共 {{ aside_tree_obj.tree_total }} 页</span
              >
              <button type="button" class="btn-next" :disabled="next_disabled">
                <i class="el-icon el-icon-arrow-right"></i>
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div
      class="hidden-tree-aside"
      :style="increase_style_aside"
      @click="fun_aside_toggle"
      v-show="!aside_toggle"
    >
      <div class="hidden-tree-aside--icon global-center-center--flex">
        <i class="fa fa-iconfont zhankaicaidan tree-aside-icon--color"></i>
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
  props: ['aside_tree_obj'],
  setup(prop, context) {
    let contextData = reactive({
      aside_toggle: true,
      increase_style_aside: {
        height: document.body.clientHeight - 222 + 'px',
        overflowY: 'auto'
      },
      tree_list: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      default_expanded_key: [],
      default_expand_all: false,
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

    const onResize = () => {
      contextData.increase_style_aside = {
        height: document.body.clientHeight - 222 + 'px',
        overflowY: 'auto'
      }
    }

    watchEffect(() => {
      contextData.tree_list = prop.aside_tree_obj.tree_list
      const id = contextData.tree_list[0].id
      console.log()
      context.root.$nextTick(() => {
        context.refs.tree_ref.setCurrentKey(id)
        contextData.default_expanded_key = []
        contextData.default_expanded_key.push(id)
      })
      contextData.select_item = prop.aside_tree_obj.select_item
      contextData.page_index = prop.aside_tree_obj.page_index
    })

    const fun_aside_toggle = () => {
      contextData.aside_toggle = !contextData.aside_toggle
    }

    const fun_node_click = node => {
      if (new Date().getTime() - contextData.touchtime < 500) {
        context.emit('fun_dbclick_tree_item', node)
      } else {
        contextData.touchtime = new Date().getTime()
        context.emit('fun_tree_item', node)
      }
    }

    const fun_increase_icon = node => {
      if (prop.aside_tree_obj.tree_type === 'gis_map') {
        return 'guilian-icon'
      }
      const flag = node.data.children?.length > 0
      return flag ? 'wenjianjiaweigongxiang' : 'wenjian'
    }

    const fun_default_expanded_key = node => {
      context.refs.tree_ref.setCurrentKey(node.id)
      contextData.default_expanded_key = []
      contextData.default_expanded_key.push(node.id)
    }

    const fun_expand_all = bool => {
      var nodes = context.refs.tree_ref.store.nodesMap
      for (var i in nodes) {
        nodes[i].expanded = bool
      }
    }

    const fun_select_list = val => {
      context.emit('fun_select_list', val)
    }

    const fun_page_change = val => {
      context.emit('fun_page_change', val)
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
      fun_aside_toggle,
      fun_node_click,
      fun_increase_icon,
      fun_mouseenter,
      fun_mouseleave,
      fun_default_expanded_key,
      fun_expand_all,
      fun_select_list,
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
