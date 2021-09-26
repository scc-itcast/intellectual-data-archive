<template>
  <div id="sz-aside-tree">
    <div v-if="flexibletag" :style="aside_tree_obj.style">
      <div class="tree-aside" :style="increase_style_aside">
        <div class="head">
          <div class="list">项目列表</div>
          <i
            aria-hidden="true"
            class="fa fa-iconfont guilian-icon"
            @click="fun_aside_flexible"
            style="height: 50px; line-height: 50px; text-align: center; margin-right: 10px"
          ></i>
        </div>
        <div class="link-top"></div>
        <el-tree :data="data" :props="defaultProps" @node-click="fun_handleNodeClick"></el-tree>
      </div>
    </div>

    <div
      class="hidden-tree-aside"
      :style="increase_style_aside"
      @click="fun_aside_flexible"
      v-if="!flexibletag"
    ></div>
  </div>
</template>
<script>
import FileStatus from '@/views/menu/file-bgf-menu/components-table-a/fileStatus.vue'
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import {
  onMounted,
  computed,
  reactive,
  watchEffect,
  toRefs,
  onBeforeUnmount,
} from '@vue/composition-api'
import log from '@/libs/util.log'
export default {
  mixins: [mixinAsideShowTrue],
  props: ['aside_tree_obj'],
  setup(prop, context) {
    let contextData = reactive({
      flexibletag: true,
      increase_style_aside: {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll',
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
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
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll',
      }
    }
    const fun_aside_flexible = () => {
      contextData.flexibletag = !contextData.flexibletag
    }
    const fun_handleNodeClick = (val) => {
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
    return {
      contextData,
      ...toRefs(contextData),
      fun_aside_flexible,
      fun_handleNodeClick,
    }
  },
}
</script>
<style lang="scss" scoped>
// @import '~./index.scss';
.tree-aside {
  // width: 300px;
  background: white;
  margin-right: 10px;
  border-radius: 6px;
  .head {
    display: flex;
    justify-content: space-between;
    .list {
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin-left: 20px;
      font-size: 16px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      font-weight: 500;
      color: #303133;
    }
  }
  .link-top {
    // width: 300px;
    height: 2px;
    background: #dcdfe6;
  }
}
.hidden-tree-aside {
  width: 20px;
  background: #1c9399;
  margin-right: 10px;
  border-radius: 6px;
}
</style>