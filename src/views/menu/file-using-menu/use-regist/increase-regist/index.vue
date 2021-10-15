<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <regist />
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
import Regist from '@/views/menu/file-using-menu/use-regist/components/regist/index.vue'
export default {
  name: 'increase-regist',
  components: {
    Regist
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '添加利用登记信息',
      breadcrumb: [
        { path: '/file-using', title: '档案利用' },
        { path: '/file-using/use-regist', title: '利用登记' },
        { path: '/file-using/use-regist/increase-regist', title: '添加利用登记信息' }
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
