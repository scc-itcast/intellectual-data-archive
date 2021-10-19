<template>
  <d2-container type="ghost" better-scroll :breadcrumb="breadcrumb">
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
import Regist from '@/views/menu/arch-ident-dest-menu/arch-ident-regist/components/regist/index.vue'
export default {
  name: 'increase-regist',
  components: {
    Regist
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '添加鉴定登记信息',
      breadcrumb: [
        { path: '/arch-ident-dest', title: '档案鉴定销毁' },
        { path: '/arch-ident-dest/arch-ident-regist', title: '档案鉴定登记' },
        { path: '/arch-ident-dest/arch-ident-regist/increase-regist', title: '添加鉴定登记信息' }
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
