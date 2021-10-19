<template>
  <div>
    <div>鉴定人员: 綦伟</div>
    <div style="margin: 10px 0;">鉴定时间: 2021-09-02 14:59:13</div>
    <div>鉴定意见: 通过</div>
  </div>
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
export default {
  props: ['tree_item'],
  setup(prop, context) {
    let contextData = reactive({
      name: '添加工程信息'
    })

    return {
      contextData,
      ...toRefs(contextData)
    }
  }
}
</script>
