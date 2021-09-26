<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <archive></archive>
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
import Archive from '@/views/menu/business-manage-menu/file-receive/components/archive/index.vue'
export default {
  name: 'modify-archive',
  components: {
    Archive
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '修改档案接收',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/file-receive', title: '档案接收' },
        { path: '/business-manage/file-receive/modify-archive', title: '修改档案接收' }
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
