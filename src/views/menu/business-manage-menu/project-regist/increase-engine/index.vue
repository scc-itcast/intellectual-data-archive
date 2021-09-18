<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <engine></engine>
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
import Engine from '@/views/menu/business-manage-menu/project-regist/components/engine/index.vue'
export default {
  name: 'increase-engine',
  components: {
    Engine, 
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '添加工程信息',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/project-regist', title: '项目登记' },
        { path: '/business-manage/project-regist/increase-engine', title: '添加工程信息' }
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
