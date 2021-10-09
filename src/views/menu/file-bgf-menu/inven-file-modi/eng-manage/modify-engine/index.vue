<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <!-- <engine :tree_item="tree_item"></engine> -->
      <sz-engine-level :tree_item="tree_item" />
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
import Engine from '@/views/menu/file-bgf-menu/inven-file-modi/components/engine/index.vue'
export default {
  name: 'modify-engine',
  components: {
    Engine
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '修改工程信息',
      breadcrumb: [
        { path: '/file-bgf', title: '档案整编' },
        { path: '/file-bgf/inven-file-modi', title: '库存档案修改' },
        { path: '/file-bgf/inven-file-modi/eng-manage', title: '项目管理' },
        { path: '/file-bgf/inven-file-modi/eng-manage/modify-engine', title: ' 修改工程信息' },
      ],
      tree_item: {
        id: '',
        type: '',
        go_btn: true,
        archive_info: false,
        page_height: 200
      }
    })
    onMounted(async () => {
      const { id, type } = context.root.$route.query
      contextData.tree_item = Object.assign(contextData.tree_item, { id, type })
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
