import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/file-using',
  name: 'file-using',
  meta,
  redirect: { name: 'file-using-use-regist' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'use-regist',
      name: 'file-using-use-regist',
      component: _import('menu/file-using-menu/use-regist/index.vue'),
      meta: { ...meta, title: '利用登记' }
    },
    {
      path: 'use-regist/increase-regist',
      name: 'file-using-use-regist-increase-regist',
      component: _import('menu/file-using-menu/use-regist/increase-regist/index.vue'),
      meta: { ...meta, title: '利用登记-添加利用登记信息' }
    },
    {
      path: 'use-regist/modify-regist',
      name: 'file-using-use-regist-modify-regist',
      component: _import('menu/file-using-menu/use-regist/modify-regist/index.vue'),
      meta: { ...meta, title: '利用登记-修改利用登记信息' }
    },
    {
      path: 'use-return',
      name: 'file-using-use-return',
      component: _import('menu/file-using-menu/use-return/index.vue'),
      meta: { ...meta, title: '利用归还' }
    },
    {
      path: 'use-query',
      name: 'file-using-use-query',
      component: _import('menu/file-using-menu/use-query/index.vue'),
      meta: { ...meta, title: '利用查询' }
    },
    {
      path: 'pro-export',
      name: 'file-using-pro-export',
      component: _import('menu/file-using-menu/pro-export/index.vue'),
      meta: { ...meta, title: '项目导出' }
    }
  ]
}
