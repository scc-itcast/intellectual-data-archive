<template>
  <div>
    <tree-view
      v-show="computed_view_show.tree_view"
      :breadcrumb="breadcrumb"
      @fun_view_toggle="fun_view_toggle"
    />
    <list-view
      v-show="computed_view_show.list_view"
      :breadcrumb="breadcrumb"
      @fun_view_toggle="fun_view_toggle"
    />
  </div>
</template>

<script>
import ListView from '@/views/menu/file-bgf-menu/inven-file-modi/pro-manage/list_view/index.vue'
import TreeView from '@/views/menu/file-bgf-menu/inven-file-modi/pro-manage/tree_view/index.vue'
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  name: 'pro-manage',
  mixins: [mixinAsideShowTrue],
  components: {
    ListView,
    TreeView
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '项目管理',
      breadcrumb: [
        { path: '/file-bgf', title: '档案整编' },
        { path: '/file-bgf/inven-file-modi/pro-manage', title: '库存档案修改' },
        { path: '/file-bgf/inven-file-modi/pro-manage', title: '项目管理' }
      ],
    })

    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })

    const computed_view_show = computed(() => {
      return context.root.$store.state.d2admin.tree.view_tree_list_toggle
    })

    const fun_view_toggle = val => {
      context.root.$store.commit('d2admin/tree/tree_list_set', val)
    }

    return {
      contextData,
      ...toRefs(contextData),
      computed_view_show,
      fun_view_toggle
    }
  }
}
</script>

<style lang="scss" scoped></style>
