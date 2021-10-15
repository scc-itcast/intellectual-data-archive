import { menuAsideArray, menuHeaderList } from '@/menu'

function hasPermission(roles, route) {
  if (route.roles) {
    return roles.some(role => route.roles.includes(role))
  } else {
    return true
  }
}

function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

export default {
  namespaced: true,
  state: {
    menuAsideArray: [],
    menuHeaderList
  },
  actions: {
    /**
     * 设置侧边栏菜单
     * @param {Object} context
     * @param {Boolean} aside is aside
     */
    generateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes = filterAsyncRoutes(menuAsideArray, roles)
        commit('asideAllSet', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  },
  mutations: {
    /**
     * @description 设置 菜单
     * @param {Object} state state
     * @param {Boolean} active active
     */
    asideAllSet: (state, routes) => {
      state.menuAsideArray = routes
    }
  }
}
