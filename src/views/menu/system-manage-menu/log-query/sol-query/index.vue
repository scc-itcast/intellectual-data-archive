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
  name: 'sol-query',
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let contextData = reactive({
      name: '系统操作日志查询',
      breadcrumb: [
        { path: '/system-manage', title: '系统管理' },
        { path: '/system-manage/log-query/sol-query', title: '日志查询' },
        { path: '/system-manage/log-query/sol-query', title: '系统操作日志查询' }
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
