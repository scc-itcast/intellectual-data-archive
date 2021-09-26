<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <project></project>
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
import Project from '@/views/menu/business-manage-menu/pre-acceptance-files/components/files/index.vue'
export default {
  name: 'modify-files',
  components: {
    Project
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '修改档案预验收',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/pre-acceptance-files', title: '档案预验收' },
        { path: '/business-manage/pre-acceptance-files/modify-files', title: '修改档案预验收' }
      ],
    })
    onMounted(async () => {
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
