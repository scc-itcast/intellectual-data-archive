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
  name: 'collect-statis',
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let contextData = reactive({
      name: '馆藏统计',
      breadcrumb: [
        { path: '/audio-video-files', title: '声像档案' },
        { path: '/audio-video-files/file-statis/collect-statis', title: '档案统计' },
        { path: '/audio-video-files/file-statis/collect-statis', title: '馆藏统计' }
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
