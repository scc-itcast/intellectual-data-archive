<template>
  <d2-container type="ghost" better-scroll>
    <div>{{ name }}</div>
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
      name: '首页'
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
