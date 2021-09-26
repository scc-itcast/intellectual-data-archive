<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <certificate></certificate>
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
import Certificate from '@/views/menu/business-manage-menu/certificate-issued/components/certificate/index.vue'
export default {
  name: 'modify-certificate',
  components: {
    Certificate
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '修改移交证明书',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/certificate-issued/handover-certificate', title: '证件发放' },
        { path: '/business-manage/certificate-issued/handover-certificate', title: '移交证明书' },
        { path: '/business-manage/certificate-issued/handover-certificate/modify-certificate', title: '修改移交证明书' }
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
