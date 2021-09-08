<template>
  <d2-container type="ghost" better-scroll :breadcrumb="breadcrumb">
    <div>{{ name }}</div>
  </d2-container>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  name: 'receive-review-files',
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let contextData = reactive({
      name: '档案接收审核',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/receive-review-files', title: '档案接收审核' }
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
