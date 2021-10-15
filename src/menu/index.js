import { uniqueId } from 'lodash'

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
/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...(e.children
      ? {
          children: supplementPath(e.children)
        }
      : {})
  }))
}

// 菜单 侧边栏
export const menuAsideArray = supplementPath([
  demoPlugins,
  demoComponents,
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
])

// 菜单 顶栏

export const menuHeaderList = supplementPath([
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
])
