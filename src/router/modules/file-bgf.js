import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/file-bgf',
  name: 'file-bgf',
  meta,
  redirect: { name: 'file-bgf-receive-confirm' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'receive-confirm',
      name: 'file-bgf-receive-confirm',
      component: _import('menu/file-bgf-menu/receive-confirm/index.vue'),
      meta: { ...meta, title: '接收确认' }
    },
    {
      path: 'file-description/com-file-record',
      name: 'file-bgf-file-description-com-file-record',
      component: _import('menu/file-bgf-menu/file-description/com-file-record/index.vue'),
      meta: { ...meta, title: '档案著录-竣工档案著录' }
    },
    {
      path: 'file-description/man-file-desc',
      name: 'file-bgf-file-description-man-file-desc',
      component: _import('menu/file-bgf-menu/file-description/man-file-desc/index.vue'),
      meta: { ...meta, title: '档案著录-管理档案著录' }
    },
    {
      path: 'warehouse-audit',
      name: 'file-bgf-warehouse-audit',
      component: _import('menu/file-bgf-menu/warehouse-audit/index.vue'),
      meta: { ...meta, title: '入库审核' }
    },
    {
      path: 'inven-file-modi/pro-manage',
      name: 'file-bgf-inven-file-modi-pro-manage',
      component: _import('menu/file-bgf-menu/inven-file-modi/pro-manage/index.vue'),
      meta: { ...meta, title: '库存档案修改-项目管理' }
    },
    {
      path: 'inven-file-modi/pro-manage/modify-project',
      name: 'file-bgf-inven-file-modi-pro-manage-modify-project',
      component: _import('menu/file-bgf-menu/inven-file-modi/pro-manage/modify-project/index.vue'),
      meta: { ...meta, title: '库存档案修改-项目管理-编辑' }
    },
    {
      path: 'inven-file-modi/eng-manage',
      name: 'file-bgf-inven-file-modi-eng-manage',
      component: _import('menu/file-bgf-menu/inven-file-modi/eng-manage/index.vue'),
      meta: { ...meta, title: '库存档案修改-工程管理' }
    },
    {
      path: 'inven-file-modi/eng-manage/modify-engine',
      name: 'file-bgf-inven-file-modi-eng-manage-modify-engine',
      component: _import('menu/file-bgf-menu/inven-file-modi/eng-manage/modify-engine/index.vue'),
      meta: { ...meta, title: '库存档案修改-工程管理-编辑' }
    },
    {
      path: 'inven-file-modi/book-manage',
      name: 'file-bgf-inven-file-modi-book-manage',
      component: _import('menu/file-bgf-menu/inven-file-modi/book-manage/index.vue'),
      meta: { ...meta, title: '库存档案修改-案卷管理' }
    },
    {
      path: 'inven-file-modi/book-manage/modify-book',
      name: 'file-bgf-inven-file-modi-book-manage-modify-book',
      component: _import('menu/file-bgf-menu/inven-file-modi/book-manage/modify-book/index.vue'),
      meta: { ...meta, title: '库存档案修改-案卷管理-编辑' }
    },
    {
      path: 'data-adjust',
      name: 'file-bgf-data-adjust',
      component: _import('menu/file-bgf-menu/data-adjust/index.vue'),
      meta: { ...meta, title: '资料调整' }
    },
    {
      path: 'file-articulated',
      name: 'file-bgf-file-articulated',
      component: _import('menu/file-bgf-menu/file-articulated/index.vue'),
      meta: { ...meta, title: '档案挂接' }
    },
    {
      path: 'file-box-manage',
      name: 'file-bgf-file-box-manage',
      component: _import('menu/file-bgf-menu/file-box-manage/index.vue'),
      meta: { ...meta, title: '档案盒管理' }
    },
    {
      path: 'file-box-manage/increase-files-box',
      name: 'file-bgf-file-box-manage-increase-files-box',
      component: _import('menu/file-bgf-menu/file-box-manage/increase-files-box/index.vue'),
      meta: { ...meta, title: '档案盒管理-新增' }
    },
    {
      path: 'file-box-manage/modify-files-box',
      name: 'file-bgf-file-box-manage-modify-files-box',
      component: _import('menu/file-bgf-menu/file-box-manage/modify-files-box/index.vue'),
      meta: { ...meta, title: '档案盒管理-修改' }
    },
    {
      path: 'cd-manage',
      name: 'file-bgf-cd-manage',
      component: _import('menu/file-bgf-menu/cd-manage/index.vue'),
      meta: { ...meta, title: '光盘管理' }
    },
    {
      path: 'cd-manage/increase-cd-regist',
      name: 'file-bgf-cd-manage-increase-cd-regist',
      component: _import('menu/file-bgf-menu/cd-manage/increase-cd-regist/index.vue'),
      meta: { ...meta, title: '光盘管理-添加' }
    },
    {
      path: 'cd-manage/modify-cd-regist',
      name: 'file-bgf-cd-manage-modify-cd-regist',
      component: _import('menu/file-bgf-menu/cd-manage/modify-cd-regist/index.vue'),
      meta: { ...meta, title: '光盘管理-修改' }
    }
  ]
}
