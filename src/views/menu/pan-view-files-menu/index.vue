<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <div>{{ name }}</div>
    </template>
  </d2-container>
</template>

<script>
import mixinAsideShowFalse from '@/views/menu/mixins/aside-show-false'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  name: 'index-menu',
  mixins: [mixinAsideShowFalse],
  setup(prop, context) {
    let contextData = reactive({
      name: '全景档案',
      breadcrumb: [{ path: '/pan-view-files', title: '全景档案' }]
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
