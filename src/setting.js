export default {
  // 快捷键
  // 支持快捷键 例如 ctrl+shift+s
  hotkey: {
    search: {
      open: 's',
      close: 'esc'
    }
  },
  // 侧边栏默认配置
  tree: {
    view_tree_list_toggle: {
      list_view: true,
      tree_view: false
    },
  },
  // 侧边栏默认配置
  menu: {
    asideCollapse: false,
    asideTransition: true,
    asideShow: false,
    tabsShow: false,
    toggleAside: false
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        fullPath: '/index',
        meta: {
          title: '首页',
          auth: false
        }
      }
    ]
  },
  // 菜单搜索
  search: {
    enable: true
  },
  // 注册的主题
  theme: {
    list: [
      {
        title: 'd2admin 经典',
        name: 'd2',
        preview: 'static/image/theme/d2/preview@2x.png'
      },
      {
        title: 'Chester',
        name: 'chester',
        preview: 'static/image/theme/chester/preview@2x.png'
      },
      {
        title: 'Element',
        name: 'element',
        preview: 'static/image/theme/element/preview@2x.png'
      },
      {
        title: '紫罗兰',
        name: 'violet',
        preview: 'static/image/theme/violet/preview@2x.png'
      },
      {
        title: '简约线条',
        name: 'line',
        backgroundImage: 'static/image/theme/line/bg.jpg',
        preview: 'static/image/theme/line/preview@2x.png'
      },
      {
        title: '流星',
        name: 'star',
        backgroundImage: 'static/image/theme/star/bg.jpg',
        preview: 'static/image/theme/star/preview@2x.png'
      },
      {
        title: 'Tomorrow Night Blue (vsCode)',
        name: 'tomorrow-night-blue',
        preview: 'static/image/theme/tomorrow-night-blue/preview@2x.png'
      }
    ]
  },
  // 是否默认开启页面切换动画
  transition: {
    active: true
  }
}
