export default {
  path: '/file-statistics',
  title: '档案统计',
  icon: 'plug',
  children: [
    {
      path: '/file-statistics/collect-statis',
      title: '馆藏统计',
      icon: 'window-restore'
    },
    {
      path: '/file-statistics/profess-statis',
      title: '专业统计',
      icon: 'window-restore'
    },
    {
      path: '/file-statistics/use-statis/au-use-statis',
      title: '利用统计',
      icon: 'tasks',
      children: [
        { path: '/file-statistics/use-statis/au-use-statis', title: '利用统计' },
        { path: '/file-statistics/use-statis/au-grow-analy', title: '档案利用增长/同比统计分析' },
        { path: '/file-statistics/use-statis/au-statis-analy', title: '档案利用分布统计分析' },
        { path: '/file-statistics/use-statis/au-custom-analy', title: '档案利用自定义统计分析' }
      ]
    },
    {
      path: '/file-statistics/busi-statis',
      title: '业务统计',
      icon: 'window-restore'
    },
    {
      path: '/file-statistics/case-file-direct/total-direct',
      title: '案卷目录',
      icon: 'tasks',
      children: [
        { path: '/file-statistics/case-file-direct/total-direct', title: '案卷总目录' },
        { path: '/file-statistics/case-file-direct/class-direct', title: '案卷分类目录' }
      ]
    },
    {
      path: '/file-statistics/statis-analy/sum-report',
      title: '统计分析',
      icon: 'tasks',
      children: [
        { path: '/file-statistics/statis-analy/sum-report', title: '汇总报表' },
        { path: '/file-statistics/statis-analy/busi-analy', title: '业务分析' },
        { path: '/file-statistics/statis-analy/par-analy', title: '对比分析' },
        { path: '/file-statistics/statis-analy/legal-analy', title: '报建分析' }
      ]
    },
    {
      path: '/file-statistics/pro-sum-statis',
      title: '项目工程概要统计',
      icon: 'window-restore'
    },
    {
      path: '/file-statistics/descrip-statis',
      title: '著录统计',
      icon: 'window-restore'
    },
    {
      path: '/file-statistics/entry-rate-statis',
      title: '录入率统计',
      icon: 'window-restore'
    }
  ]
}
