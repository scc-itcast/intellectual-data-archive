<template>
  <div id="sz-aside-tree" @mouseenter="fun_mouseenter" @mouseleave="fun_mouseleave">
    <div v-if="flexibletag" :style="aside_tree_obj.style">
      <div class="tree-aside" :style="increase_style_aside">
        <div class="tree-aside--header global-between-center--flex">
          <div class="tree-aside--text global--ml20">项目列表</div>
          <div class="tree-aside--icon global-center-center--flex">
            <i
              @click="fun_aside_flexible"
              class="fa fa-iconfont zhankaicaidan tree-aside-icon--color"
            ></i>
          </div>
        </div>
        <div class="tree-aside--content">
          <el-tree
            :data="data"
            node-key="id"
            :default-expand-all="false"
            :expand-on-click-node="true"
            :props="defaultProps"
            @node-click="fun_handleNodeClick"
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
    </div>

    <div
      class="hidden-tree-aside"
      :style="increase_style_aside"
      @click="fun_aside_flexible"
      v-if="!flexibletag"
    >
      <div class="hidden-tree-aside--icon global-center-center--flex">
        <i
          @click="fun_aside_flexible"
          class="fa fa-iconfont zhankaicaidan tree-aside-icon--color"
        ></i>
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
      flexibletag: true,
      increase_style_aside: {
        height: document.body.clientHeight - 222 + 'px',
        overflowY: 'auto'
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    watchEffect(() => {
      contextData.data = prop.aside_tree_obj.tree_list
    })

    const onResize = () => {
      contextData.increase_style_aside = {
        height: document.body.clientHeight - 222 + 'px'
      }
    }

    const fun_aside_flexible = () => {
      contextData.flexibletag = !contextData.flexibletag
    }

    const fun_handleNodeClick = val => {
      var regA = new RegExp('一级')
      var regB = new RegExp('二级')
      var regC = new RegExp('三级')

      // 一级表格，二级表格，三级表格
      if (val.label.match(regA)) {
        context.emit('tableSelcet', '1')
        console.log('一级表格')
      } else if (val.label.match(regB)) {
        context.emit('tableSelcet', '2')
        console.log('二级表格')
      } else if (val.label.match(regC)) {
        context.emit('tableSelcet', '3')
        console.log('三级表格')
      } else {
        context.emit('tableSelcet', '4')
        console.log('四级表格')
      }
    }

    const fun_increase_icon = node => {
      const flag = node.data.children?.length > 0
      return flag ? 'wenjianjiaweigongxiang' : 'wenjian'
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
      fun_aside_flexible,
      fun_handleNodeClick,
      fun_increase_icon,
      fun_mouseenter,
      fun_mouseleave
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-aside {
  overflow-y: 'scroll';
}
.tree-aside {
  background: white;
  margin-right: 10px;
  border-radius: 6px;
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
  .tree-aside--content {
    margin-top: 17px;
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
