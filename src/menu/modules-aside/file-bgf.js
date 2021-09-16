export default {
  path: '/file-bgf',
  title: '档案整编',
  icon: 'plug',
  children: [
    {
      path: '/file-bgf/receive-confirm',
      title: '接收确认',
      icon: 'window-restore'
    },
    {
      path: '/file-bgf/file-description/com-file-record',
      title: '档案著录',
      icon: 'tasks',
      children: [
        { path: '/file-bgf/file-description/com-file-record', title: '竣工档案著录' },
        { path: '/file-bgf/file-description/man-file-desc', title: '管理档案著录' }
      ]
    },
    {
      path: '/file-bgf/warehouse-audit',
      title: '入库审核',
      icon: 'window-restore'
    },
    {
      path: '/file-bgf/inven-file-modi/pro-manage',
      title: '库存档案修改',
      icon: 'window-restore',
      children: [
        { path: '/file-bgf/inven-file-modi/pro-manage', title: '项目管理' },
        { path: '/file-bgf/inven-file-modi/eng-manage', title: '工程管理' },
        { path: '/file-bgf/inven-file-modi/book-manage', title: '案卷管理' }
      ]
    },
    {
      path: '/file-bgf/data-adjust',
      title: '资料调整',
      icon: 'window-restore'
    },
    {
      path: '/file-bgf/file-articulated',
      title: '档案挂接',
      icon: 'window-restore'
    },
    {
      path: '/file-bgf/file-box-manage',
      title: '档案盒管理',
      icon: 'window-restore'
    },
    {
      path: '/file-bgf/cd-manage',
      title: '光盘管理',
      icon: 'window-restore'
    }
  ]
}
