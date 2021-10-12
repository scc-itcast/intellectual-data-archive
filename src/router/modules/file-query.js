import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/file-query',
  name: 'file-query',
  meta,
  redirect: { name: 'file-query-tradition-query-pro-query' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'tradition-query/pro-query',
      name: 'file-query-tradition-query-pro-query',
      component: _import('menu/file-query-menu/tradition-query/pro-query/index.vue'),
      meta: { ...meta, title: '传统查询-项目查询' }
    },
    {
      path: 'tradition-query/eng-query',
      name: 'file-query-tradition-query-eng-query',
      component: _import('menu/file-query-menu/tradition-query/eng-query/index.vue'),
      meta: { ...meta, title: '传统查询-工程查询' }
    },
    {
      path: 'tradition-query/case-query',
      name: 'file-query-tradition-query-case-query',
      component: _import('menu/file-query-menu/tradition-query/case-query/index.vue'),
      meta: { ...meta, title: '传统查询-案卷查询' }
    },
    {
      path: 'tradition-query/file-query',
      name: 'file-query-tradition-query-file-query',
      component: _import('menu/file-query-menu/tradition-query/file-query/index.vue'),
      meta: { ...meta, title: '传统查询-文件查询' }
    },
    {
      path: 'gis-query',
      name: 'file-query-gis-query',
      component: _import('menu/file-query-menu/gis-query/index.vue'),
      meta: { ...meta, title: 'GIS查询' }
    },
    {
      path: 'con-retrieval',
      name: 'file-query-con-retrieval',
      component: _import('menu/file-query-menu/con-retrieval/index.vue'),
      meta: { ...meta, title: '全文检索' }
    },
    {
      path: 'class-query',
      name: 'file-query-class-query',
      component: _import('menu/file-query-menu/class-query/index.vue'),
      meta: { ...meta, title: '分类查询' }
    },
    {
      path: 'easy-search',
      name: 'file-query-easy-search',
      component: _import('menu/file-query-menu/easy-search/index.vue'),
      meta: { ...meta, title: '易搜索' }
    }
  ]
}
