<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <project></project>
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
import Project from '@/views/menu/business-manage-menu/business-guid-regist/components/guide/index.vue'
export default {
  name: 'increase-guid',
  components: {
    Project
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '添加业务指导',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/business-guid-regist/increase-guid', title: '业务指导登记' },
        { path: '/business-manage/business-guid-regist/increase-guid', title: '添加业务指导' }
      ],
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
