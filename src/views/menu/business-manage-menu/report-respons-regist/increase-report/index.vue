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
import Project from '@/views/menu/business-manage-menu/report-respons-regist/components/report/index.vue'
export default {
  name: 'increase-report',
  components: {
    Project
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '添加档案报送责任书',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/report-respons-regist', title: '报送责任书登记' },
        { path: '/business-manage/report-respons-regist/increase-report', title: '添加档案报送责任书' }
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
