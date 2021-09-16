export default {
  path: '/file-query',
  title: '档案查询',
  icon: 'plug',
  children: [
    {
      path: '/file-query/tradition-query/pro-query',
      title: '传统查询',
      icon: 'tasks',
      children: [
        { path: '/file-query/tradition-query/pro-query', title: '项目查询' },
        { path: '/file-query/tradition-query/eng-query', title: '工程查询' },
        { path: '/file-query/tradition-query/book-query', title: '案卷查询' },
        { path: '/file-query/tradition-query/file-query', title: '文件查询' }
      ]
    },
    {
      path: '/file-query/gis-query',
      title: 'GIS查询',
      icon: 'window-restore'
    },
    {
      path: '/file-query/con-retrieval',
      title: '全文检索',
      icon: 'iconfont guilian-icon'
    },
    {
      path: '/file-query/class-query',
      title: '分类查询',
      icon: 'iconfont pluscircleyuanjiahao'
    },
    {
      path: '/file-query/easy-search',
      title: '易搜索',
      icon: 'window-restore'
    }
  ]
}
