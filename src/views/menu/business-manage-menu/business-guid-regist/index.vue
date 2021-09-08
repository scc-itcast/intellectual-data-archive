<template>
  <d2-container type="ghost" better-scroll :breadcrumb="breadcrumb">
    <div>{{ name }}</div>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  name: 'business-guid-regist',
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let contextData = reactive({
      name: '业务指导登记',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/business-guid-regist', title: '业务指导登记' }
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
