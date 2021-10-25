<template>
  <d2-container type="ghost" better-scroll :breadcrumb="breadcrumb">
    <template>
      <regist />
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
import Regist from '@/views/menu/audio-video-files-menu/vaarch-util/components/regist/index.vue'
export default {
  name: 'increase-regist',
  components: {
    Regist
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '添加查阅信息',
      breadcrumb: [
        { path: '/audio-video-files', title: '声像档案' },
        { path: '/audio-video-files/vaarch-util', title: '声像档案利用' },
        { path: '/audio-video-files/vaarch-util/increase-regist', title: '添加查阅信息' }
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
