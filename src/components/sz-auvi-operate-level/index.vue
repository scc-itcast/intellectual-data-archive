<template>
  <div class="increase--box">
    <div class="increase-content--box">批量操作</div>
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
  name: 'increase-engine',
  props: ['tree_item'],
  setup(prop, context) {
    let contextData = reactive({
      name: '添加工程信息',
      title: '城市管线工程单位工程级著录单',
      page_config: {
        id: '',
        type: ''
      }
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })

    watchEffect(() => {
      contextData.page_config = prop.tree_item
    })

    const fun_create_project = () => {}

    const fun_upload = () => {}

    const fun_batch_modify = () => {}

    const fun_select_all = () => {}

    const fun_deselect = () => {}

    const fun_refresh = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      fun_create_project,
      fun_upload,
      fun_batch_modify,
      fun_select_all,
      fun_deselect,
      fun_refresh
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
