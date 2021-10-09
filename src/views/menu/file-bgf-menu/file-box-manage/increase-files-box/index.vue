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
import Project from '@/views/menu/file-bgf-menu/file-box-manage/components/files/index.vue'
export default {
  name: 'increase-files-box',
  components: {
    Project
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '添加档案盒信息',
      breadcrumb: [
        { path: '/file-bgf', title: '业务管理' },
        { path: '/file-bgf/file-box-manage', title: '档案预验收' },
        { path: '/file-bgf/file-box-manage/increase-files-box', title: '添加档案盒信息' }
      ]
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
