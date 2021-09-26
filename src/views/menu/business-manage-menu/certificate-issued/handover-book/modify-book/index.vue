<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <book></book>
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
import Book from '@/views/menu/business-manage-menu/certificate-issued/components/book/index.vue'
export default {
  name: 'modify-book',
  components: {
    Book
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '修改移交书',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/certificate-issued/handover-book', title: '证件发放' },
        { path: '/business-manage/certificate-issued/handover-book', title: '移交书' },
        { path: '/business-manage/certificate-issued/handover-book/modify-book', title: '修改移交书' }
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
