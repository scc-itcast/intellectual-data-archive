// 设置文件
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 树形视图与列表视图
    view_tree_list_toggle: setting.tree.view_tree_list_toggle
  },
  actions: {},
  mutations: {
    /**
     * @description 设置树形视图与列表视图
     * @param {Object} state state
     * @param {Array} tree tree setting
     */
     tree_list_set(state, toggle) {
      // store 赋值
      state.view_tree_list_toggle = toggle
    }
  }
}
