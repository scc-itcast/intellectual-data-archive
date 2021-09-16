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
  name: 'use-return',
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let contextData = reactive({
      name: '利用归还',
      breadcrumb: [
        { path: '/file-using', title: '档案查询' },
        { path: '/file-using/use-return', title: '利用归还' }
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
