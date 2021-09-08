export default {
  path: '/business-manage',
  title: '业务管理',
  icon: 'plug',
  children: [
    {
      path: '/business-manage/project-regist',
      title: '项目登记',
      icon: 'window-restore',
    },
    {
      path: '/business-manage/report-respons-regist',
      title: '报送责任书登记',
      icon: 'window-restore'
    },
    {
      path: '/business-manage/business-guid-regist',
      title: '业务指导登记',
      icon: 'window-restore'
    },
    {
      path: '/business-manage/pre-acceptance-files',
      title: '档案预验收',
      icon: 'window-restore'
    },
    {
      path: '/business-manage/file-receive',
      title: '档案接收',
      icon: 'window-restore'
    },
    {
      path: '/business-manage/receive-review-files',
      title: '档案接收审核',
      icon: 'window-restore'
    },
    {
      path: '/business-manage/certificate-issued/handover-book',
      title: '证件发放',
      icon: 'tasks',
      children: [
        { path: '/business-manage/certificate-issued/handover-book', title: '移交书' },
        { path: '/business-manage/certificate-issued/handover-certificate', title: '移交证明书' }
      ]
    },
    {
      path: '/business-manage/business-queries/handover-book',
      title: '业务查询',
      icon: 'tasks',
      children: [
        { path: '/business-manage/business-queries/handover-book', title: '移交书' },
        { path: '/business-manage/business-queries/handover-certificate', title: '移交证明书' }
      ]
    }
  ]
}
