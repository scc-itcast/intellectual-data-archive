import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/arch-ident-dest',
  name: 'arch-ident-dest',
  meta,
  redirect: { name: 'arch-ident-dest-arch-ident-regist' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'arch-ident-regist',
      name: 'arch-ident-dest-arch-ident-regist',
      component: _import('menu/arch-ident-dest-menu/arch-ident-regist/index.vue'),
      meta: { ...meta, title: '档案鉴定登记' }
    },
    {
      path: 'arch-ident-regist/increase-regist',
      name: 'arch-ident-dest-arch-ident-regist-increase-regist',
      component: _import('menu/arch-ident-dest-menu/arch-ident-regist/increase-regist/index.vue'),
      meta: { ...meta, title: '档案鉴定登记-添加鉴定登记信息' }
    },
    {
      path: 'arch-ident-regist/modify-regist',
      name: 'arch-ident-dest-arch-ident-regist-modify-regist',
      component: _import('menu/arch-ident-dest-menu/arch-ident-regist/modify-regist/index.vue'),
      meta: { ...meta, title: '档案鉴定登记-修改鉴定登记信息' }
    },
    {
      path: 'arch-ident-audit',
      name: 'arch-ident-dest-arch-ident-audit',
      component: _import('menu/arch-ident-dest-menu/arch-ident-audit/index.vue'),
      meta: { ...meta, title: '档案鉴定审核' }
    },
    {
      path: 'arch-dest',
      name: 'arch-ident-dest-arch-dest',
      component: _import('menu/arch-ident-dest-menu/arch-dest/index.vue'),
      meta: { ...meta, title: '档案销毁' }
    },
    {
      path: 'arch-dest/increase-regist',
      name: 'arch-ident-dest-arch-dest-increase-regist',
      component: _import('menu/arch-ident-dest-menu/arch-dest/increase-regist/index.vue'),
      meta: { ...meta, title: '档案销毁-添加销毁登记' }
    },
    {
      path: 'arch-restore',
      name: 'arch-ident-dest-arch-restore',
      component: _import('menu/arch-ident-dest-menu/arch-restore/index.vue'),
      meta: { ...meta, title: '档案还原' }
    }
  ]
}
