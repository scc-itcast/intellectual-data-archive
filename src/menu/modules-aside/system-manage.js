export default {
  path: '/system-manage',
  title: '系统管理',
  icon: 'plug',
  children: [
    {
      path: '/system-manage/binfo-manage/class-outline',
      title: '基础信息管理',
      icon: 'tasks',
      children: [
        { path: '/system-manage/binfo-manage/class-outline', title: '分类大纲' },
        { path: '/system-manage/binfo-manage/file-sub-list', title: '档案报送清单' }
      ]
    },
    {
      path: '/system-manage/arch-manage',
      title: '档案馆管理',
      icon: 'window-restore'
    },
    {
      path: '/system-manage/com-manage',
      title: '常用资料管理',
      icon: 'window-restore'
    },
    {
      path: '/system-manage/data-center',
      title: '数据中心',
      icon: 'window-restore'
    },
    {
      path: '/system-manage/custom-manage',
      title: '自定义表单管理',
      icon: 'window-restore'
    },
    {
      path: '/system-manage/sys-config',
      title: '系统配置',
      icon: 'window-restore'
    },
    {
      path: '/system-manage/log-query/efsl-query',
      title: '日志查询',
      icon: 'tasks',
      children: [
        { path: '/system-manage/log-query/efsl-query', title: '电子文件同步日志查询' },
        { path: '/system-manage/log-query/login-query', title: '登录日志查询' },
        { path: '/system-manage/log-query/efbl-query', title: '电子文件备份日志查询' },
        { path: '/system-manage/log-query/efol-query', title: '电子文件操作日志查询' },
        { path: '/system-manage/log-query/sol-query', title: '系统操作日志查询' }
      ]
    },
    {
      path: '/system-manage/proc-config',
      title: '流程配置',
      icon: 'window-restore'
    }
  ]
}
