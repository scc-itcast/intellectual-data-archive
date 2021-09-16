import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/system-manage',
  name: 'system-manage',
  meta,
  redirect: { name: 'system-manage-binfo-manage-class-outline' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'binfo-manage/class-outline',
      name: 'system-manage-binfo-manage-class-outline',
      component: _import('menu/system-manage-menu/binfo-manage/class-outline/index.vue'),
      meta: { ...meta, title: '基础信息管理-分类大纲' }
    },
    {
      path: 'binfo-manage/file-sub-list',
      name: 'system-manage-binfo-manage-file-sub-list',
      component: _import('menu/system-manage-menu/binfo-manage/file-sub-list/index.vue'),
      meta: { ...meta, title: '基础信息管理-档案报送清单' }
    },
    {
      path: 'arch-manage',
      name: 'system-manage-arch-manage',
      component: _import('menu/system-manage-menu/arch-manage/index.vue'),
      meta: { ...meta, title: '档案馆管理' }
    },
    {
      path: 'com-manage',
      name: 'system-manage-com-manage',
      component: _import('menu/system-manage-menu/com-manage/index.vue'),
      meta: { ...meta, title: '常用资料管理' }
    },
    {
      path: 'data-center',
      name: 'system-manage-data-center',
      component: _import('menu/system-manage-menu/data-center/index.vue'),
      meta: { ...meta, title: '数据中心' }
    },
    {
      path: 'custom-manage',
      name: 'system-manage-custom-manage',
      component: _import('menu/system-manage-menu/custom-manage/index.vue'),
      meta: { ...meta, title: '自定义表单管理' }
    },
    {
      path: 'sys-config',
      name: 'system-manage-sys-config',
      component: _import('menu/system-manage-menu/sys-config/index.vue'),
      meta: { ...meta, title: '系统配置' }
    },
    {
      path: 'log-query/efsl-query',
      name: 'system-manage-log-query-efsl-query',
      component: _import('menu/system-manage-menu/log-query/efsl-query/index.vue'),
      meta: { ...meta, title: '日志查询-电子文件同步日志查询' }
    },
    {
      path: 'log-query/login-query',
      name: 'system-manage-log-query-login-query',
      component: _import('menu/system-manage-menu/log-query/login-query/index.vue'),
      meta: { ...meta, title: '日志查询-登录日志查询' }
    },
    {
      path: 'log-query/efbl-query',
      name: 'system-manage-log-query-efbl-query',
      component: _import('menu/system-manage-menu/log-query/efbl-query/index.vue'),
      meta: { ...meta, title: '日志查询-电子文件备份日志查询' }
    },
    {
      path: 'log-query/efol-query',
      name: 'system-manage-log-query-efol-query',
      component: _import('menu/system-manage-menu/log-query/efol-query/index.vue'),
      meta: { ...meta, title: '日志查询-电子文件操作日志查询' }
    },
    {
      path: 'log-query/sol-query',
      name: 'system-manage-log-query-sol-query',
      component: _import('menu/system-manage-menu/log-query/sol-query/index.vue'),
      meta: { ...meta, title: '日志查询-系统操作日志查询' }
    },
    {
      path: 'proc-config',
      name: 'system-manage-proc-config',
      component: _import('menu/system-manage-menu/proc-config/index.vue'),
      meta: { ...meta, title: '流程配置' }
    }
  ]
}
