<template>
  <div id="sz-aside-tree">
    <div v-if="flexibletag" class="tree-aside" :style="increase_style_aside">
      <div class="head">
        <div class="list">项目列表</div>
        <el-button @click="fun_aside_flexible">伸缩</el-button>
      </div>
      <div class="link-top"></div>
      <el-tree :data="data" :props="defaultProps" @node-click="fun_handleNodeClick"></el-tree>
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
  setup(prop, context) {
    let contextData = reactive({
      flexibletag: true,
      increase_style_aside: {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll',
      },
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
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
      console.log(val)
      
    }
    return {
      contextData,
      ...toRefs(contextData),
      fun_aside_flexible,
      fun_handleNodeClick
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
    background: #DCDFE6;
  }
}
.hidden-tree-aside {
  width: 20px;
  background: #1c9399;
  margin-right: 10px;
  border-radius: 6px;
}
</style>