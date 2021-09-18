import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/business-manage',
  name: 'business-manage',
  meta,
  redirect: { name: 'business-manage-project-regist' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'project-regist',
      name: 'business-manage-project-regist',
      component: _import('menu/business-manage-menu/project-regist/index.vue'),
      meta: { ...meta, title: '项目登记' }
    },
    {
      path: 'project-regist/increase-project',
      name: 'business-manage-project-regist-increase-project',
      component: _import('menu/business-manage-menu/project-regist/increase-project/index.vue'),
      meta: { ...meta, title: '添加项目信息' }
    },
    {
      path: 'project-regist/modify-project',
      name: 'business-manage-project-regist-modify-project',
      component: _import('menu/business-manage-menu/project-regist/modify-project/index.vue'),
      meta: { ...meta, title: '修改项目信息' }
    },
    {
      path: 'project-regist/increase-engine',
      name: 'business-manage-project-regist-increase-engine',
      component: _import('menu/business-manage-menu/project-regist/increase-engine/index.vue'),
      meta: { ...meta, title: '添加工程信息' }
    },
    {
      path: 'project-regist/modify-engine',
      name: 'business-manage-project-regist-modify-engine',
      component: _import('menu/business-manage-menu/project-regist/modify-engine/index.vue'),
      meta: { ...meta, title: '修改工程信息' }
    },
    {
      path: 'report-respons-regist',
      name: 'business-manage-report-respons-regist',
      component: _import('menu/business-manage-menu/report-respons-regist/index.vue'),
      meta: { ...meta, title: '报送责任书登记' }
    },
    {
      path: 'report-respons-regist/increase-report',
      name: 'business-manage-report-respons-regist-increase-report',
      component: _import('menu/business-manage-menu/report-respons-regist/increase-report/index.vue'),
      meta: { ...meta, title: '添加档案报送责任书' }
    },
    {
      path: 'report-respons-regist/modify-report',
      name: 'business-manage-report-respons-regist-modify-report',
      component: _import('menu/business-manage-menu/report-respons-regist/modify-report/index.vue'),
      meta: { ...meta, title: '编辑档案报送责任书' }
    },
    {
      path: 'business-guid-regist',
      name: 'business-manage-business-guid-regist',
      component: _import('menu/business-manage-menu/business-guid-regist/index.vue'),
      meta: { ...meta, title: '业务指导登记' }
    },
    {
      path: 'pre-acceptance-files',
      name: 'business-manage-pre-acceptance-files',
      component: _import('menu/business-manage-menu/pre-acceptance-files/index.vue'),
      meta: { ...meta, title: '档案预验收' }
    },
    {
      path: 'file-receive',
      name: 'business-manage-file-receive',
      component: _import('menu/business-manage-menu/file-receive/index.vue'),
      meta: { ...meta, title: '档案接收' }
    },
    {
      path: 'receive-review-files',
      name: 'business-manage-receive-review-files',
      component: _import('menu/business-manage-menu/receive-review-files/index.vue'),
      meta: { ...meta, title: '档案接收审核' }
    },
    {
      path: 'certificate-issued/handover-book',
      name: 'business-manage-certificate-issued-handover-book',
      component: _import('menu/business-manage-menu/certificate-issued/handover-book/index.vue'),
      meta: { ...meta, title: '证件发放-移交书' }
    },
    {
      path: 'certificate-issued/handover-certificate',
      name: 'business-manage-certificate-issued-handover-certificate',
      component: _import('menu/business-manage-menu/certificate-issued/handover-certificate/index.vue'),
      meta: { ...meta, title: '证件发放-移交证明书' }
    },
    {
      path: 'business-queries/handover-book',
      name: 'business-manage-business-queries-handover-book',
      component: _import('menu/business-manage-menu/business-queries/handover-book/index.vue'),
      meta: { ...meta, title: '业务查询-移交书' }
    },
    {
      path: 'business-queries/handover-certificate',
      name: 'business-manage-business-queries-handover-certificate',
      component: _import('menu/business-manage-menu/business-queries/handover-certificate/index.vue'),
      meta: { ...meta, title: '业务查询-移交证明书' }
    }
  ]
}
