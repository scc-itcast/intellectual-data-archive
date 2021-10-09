<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <!-- <project></project> -->
      <sz-project-level :tree_item="tree_item" />
    </template>
  </d2-container>
</template>

<script>
import {
  onMounted,
  onBeforeUnmount,
  computed,
  reactive,
  watchEffect,
  toRefs
} from '@vue/composition-api'
import Project from '@/views/menu/business-manage-menu/project-regist/components/project/index.vue'
export default {
  name: 'increase-project',
  components: {
    Project
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '添加工程信息',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/project-regist', title: '项目登记' },
        { path: '/business-manage/project-regist/increase-project', title: '添加项目信息' }
      ],
      tree_item: {
        id: '',
        type: '',
        go_btn: true,
        archive_info: false,
        page_height: 200
      }
    })
    onMounted(async () => {
      const { id, type } = context.root.$route.query
      contextData.tree_item = Object.assign(contextData.tree_item, { id, type })
      // 调用方法, 方法里调用接口
    })

    return {
      contextData,
      ...toRefs(contextData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
