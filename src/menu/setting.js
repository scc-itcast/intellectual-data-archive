import util from '@/libs/util'

// 插件
import demoPlugins from './modules/demo-plugins'
// 组件
import demoComponents from './modules/demo-components'
// 功能
import demoPlayground from './modules/demo-playground'
// 业务管理
import businessManageAside from './modules-aside/business-manage'
// 档案整编
import fileBgfAside from './modules-aside/file-bgf'
// 档案查询
import fileQueryAside from './modules-aside/file-query'
// 档案利用
import fileUsingAside from './modules-aside/file-using'
// 档案鉴定销毁
import archIdentDestAside from './modules-aside/arch-ident-dest'
// 库房管理
import whouseManageAside from './modules-aside/whouse-manage'
// 声像档案
import audioVideoFilesAside from './modules-aside/audio-video-files'
// 档案统计
import fileStatisticsAside from './modules-aside/file-statistics'
// 系统管理
import systemManageAside from './modules-aside/system-manage'

// 业务管理
import businessManageHeader from './modules-header/business-manage'
// 档案整编
import fileBgfHeader from './modules-header/file-bgf'
// 档案查询
import fileQueryHeader from './modules-header/file-query'
// 档案利用
import fileUsingHeader from './modules-header/file-using'
// 档案鉴定销毁
import archIdentDestHeader from './modules-header/arch-ident-dest'
// 存放位置
import whouseManageHeader from './modules-header/whouse-manage'
// 声像档案
import audioVideoFilesHeader from './modules-header/audio-video-files'
// 全景档案
import panViewFilesHeader from './modules-header/pan-view-files'
// 档案统计
import fileStatisticsHeader from './modules-header/file-statistics'
// 系统管理
import systemManageHeader from './modules-header/system-manage'

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
    businessManageAside,
    fileBgfAside,
    fileQueryAside,
    fileUsingAside,
    archIdentDestAside,
    whouseManageAside,
    audioVideoFilesAside,
    fileStatisticsAside,
    systemManageAside
  ],
  roles
)

export const menuHeaderList = [
  {
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  businessManageHeader,
  fileBgfHeader,
  fileQueryHeader,
  fileUsingHeader,
  archIdentDestHeader,
  whouseManageHeader,
  audioVideoFilesHeader,
  panViewFilesHeader,
  fileStatisticsHeader,
  systemManageHeader
]
