<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <div>{{ name }}</div>
    </template>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  name: 'man-file-desc',
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let contextData = reactive({
      name: '管理档案著录',
      breadcrumb: [
        { path: '/file-bgf', title: '档案整编' },
        { path: '/file-bgf/file-description/man-file-desc', title: '档案著录' },
        { path: '/file-bgf/file-description/man-file-desc', title: '管理档案著录' },
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

<style lang="scss" scoped></style>
