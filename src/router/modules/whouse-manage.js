import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/whouse-manage',
  name: 'whouse-manage',
  meta,
  redirect: { name: 'whouse-manage-whouse-manage' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'whouse-manage',
      name: 'whouse-manage-whouse-manage',
      component: _import('menu/whouse-manage-menu/whouse-manage/index.vue'),
      meta: { ...meta, title: '库房管理' }
    },
    {
      path: 'virtual-whouse',
      name: 'whouse-manage-virtual-whouse',
      component: _import('menu/whouse-manage-menu/virtual-whouse/index.vue'),
      meta: { ...meta, title: '虚拟库房' }
    },
    {
      path: 'stor-location',
      name: 'whouse-manage-stor-location',
      component: _import('menu/whouse-manage-menu/stor-location/index.vue'),
      meta: { ...meta, title: '存放位置' }
    }
  ]
}
