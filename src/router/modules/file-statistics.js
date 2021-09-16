import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/file-statistics',
  name: 'file-statistics',
  meta,
  redirect: { name: 'file-statistics-collect-statis' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'collect-statis',
      name: 'file-statistics-collect-statis',
      component: _import('menu/file-statistics-menu/collect-statis/index.vue'),
      meta: { ...meta, title: '馆藏统计' }
    },
    {
      path: 'profess-statis',
      name: 'file-statistics-profess-statis',
      component: _import('menu/file-statistics-menu/profess-statis/index.vue'),
      meta: { ...meta, title: '专业统计' }
    },
    {
      path: 'use-statis/au-use-statis',
      name: 'file-statistics-use-statis-au-use-statis',
      component: _import('menu/file-statistics-menu/use-statis/au-use-statis/index.vue'),
      meta: { ...meta, title: '利用统计-利用统计' }
    },
    {
      path: 'use-statis/au-grow-analy',
      name: 'file-statistics-use-statis-au-grow-analy',
      component: _import('menu/file-statistics-menu/use-statis/au-grow-analy/index.vue'),
      meta: { ...meta, title: '利用统计-档案利用增长/同比统计分析' }
    },
    {
      path: 'use-statis/au-statis-analy',
      name: 'file-statistics-use-statis-au-statis-analy',
      component: _import('menu/file-statistics-menu/use-statis/au-statis-analy/index.vue'),
      meta: { ...meta, title: '利用统计-档案利用分布统计分析' }
    },
    {
      path: 'use-statis/au-custom-analy',
      name: 'file-statistics-use-statis-au-custom-analy',
      component: _import('menu/file-statistics-menu/use-statis/au-custom-analy/index.vue'),
      meta: { ...meta, title: '利用统计-档案利用自定义统计分析' }
    },
    {
      path: 'busi-statis',
      name: 'file-statistics-busi-statis',
      component: _import('menu/file-statistics-menu/busi-statis/index.vue'),
      meta: { ...meta, title: '业务统计' }
    },
    {
      path: 'case-file-direct/total-direct',
      name: 'file-statistics-case-file-direct-total-direct',
      component: _import('menu/file-statistics-menu/case-file-direct/total-direct/index.vue'),
      meta: { ...meta, title: '案卷目录-案卷总目录' }
    },
    {
      path: 'case-file-direct/class-direct',
      name: 'file-statistics-case-file-direct-class-direct',
      component: _import('menu/file-statistics-menu/case-file-direct/class-direct/index.vue'),
      meta: { ...meta, title: '案卷目录-案卷分类目录' }
    },
    {
      path: 'statis-analy/sum-report',
      name: 'file-statistics-statis-analy-sum-report',
      component: _import('menu/file-statistics-menu/statis-analy/sum-report/index.vue'),
      meta: { ...meta, title: '统计分析-汇总报表' }
    },
    {
      path: 'statis-analy/busi-analy',
      name: 'file-statistics-statis-analy-busi-analy',
      component: _import('menu/file-statistics-menu/statis-analy/busi-analy/index.vue'),
      meta: { ...meta, title: '统计分析-业务分析' }
    },
    {
      path: 'statis-analy/par-analy',
      name: 'file-statistics-statis-analy-par-analy',
      component: _import('menu/file-statistics-menu/statis-analy/par-analy/index.vue'),
      meta: { ...meta, title: '统计分析-对比分析' }
    },
    {
      path: 'statis-analy/legal-analy',
      name: 'file-statistics-statis-analy-legal-analy',
      component: _import('menu/file-statistics-menu/statis-analy/legal-analy/index.vue'),
      meta: { ...meta, title: '统计分析-报建分析' }
    },
    {
      path: 'pro-sum-statis',
      name: 'file-statistics-pro-sum-statis',
      component: _import('menu/file-statistics-menu/pro-sum-statis/index.vue'),
      meta: { ...meta, title: '项目工程概要统计' }
    },
    {
      path: 'descrip-statis',
      name: 'file-statistics-descrip-statis',
      component: _import('menu/file-statistics-menu/descrip-statis/index.vue'),
      meta: { ...meta, title: '著录统计' }
    },
    {
      path: 'entry-rate-statis',
      name: 'file-statistics-entry-rate-statis',
      component: _import('menu/file-statistics-menu/entry-rate-statis/index.vue'),
      meta: { ...meta, title: '录入率统计' }
    }
  ]
}
