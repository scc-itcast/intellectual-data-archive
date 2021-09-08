import util from '@/libs/util'

// 插件
import demoPlugins from './modules/demo-plugins'
// 组件
import demoComponents from './modules/demo-components'
// 功能
import demoPlayground from './modules/demo-playground'
// 业务管理
import businessManageAside from './modules-aside/business-manage'



// 业务管理
import businessManageHeader from './modules-header/business-manage'


function hasPermission(roles, route) {
  if (route && route.roles) {
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

const user_type = util.cookies.get('user_type') || 'admin'
const roles = user_type && (user_type.split(',') || [])
export const menuAsideArray = filterAsyncRoutes(
  [
    demoComponents,
    demoPlugins,
    demoPlayground,
    businessManageAside
  ],
  roles
)

export const menuHeaderList = [
  {
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  businessManageHeader
]
