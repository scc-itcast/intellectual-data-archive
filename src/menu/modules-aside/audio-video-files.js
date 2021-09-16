export default {
  path: '/audio-video-files',
  title: '声像档案',
  icon: 'plug',
  children: [
    {
      path: '/audio-video-files/arch-collection/complete-file',
      title: '档案归集',
      icon: 'window-restore',
      children: [
        {
          path: '/audio-video-files/arch-collection/complete-file',
          title: '竣工档案',
          icon: 'window-restore'
        },
        {
          path: '/audio-video-files/arch-collection/compre-file',
          title: '综合档案',
          icon: 'window-restore'
        }
      ]
    },
    {
      path: '/audio-video-files/file-storage/complete-file',
      title: '档案入库',
      icon: 'window-restore',
      children: [
        {
          path: '/audio-video-files/file-storage/complete-file',
          title: '竣工档案',
          icon: 'window-restore'
        },
        {
          path: '/audio-video-files/file-storage/compre-file',
          title: '综合档案',
          icon: 'window-restore'
        }
      ]
    },
    {
      path: '/audio-video-files/file-query/ple-eng-query',
      title: '档案查询',
      icon: 'window-restore',
      children: [
        {
          path: '/audio-video-files/file-query/ple-eng-query',
          title: '竣工工程查询',
          icon: 'window-restore'
        },
        {
          path: '/audio-video-files/file-query/pre-eng-query',
          title: '综合工程查询',
          icon: 'window-restore'
        },
        {
          path: '/audio-video-files/file-query/vagroup-query',
          title: '声像组查询',
          icon: 'window-restore'
        },
        {
          path: '/audio-video-files/file-query/vafile-query',
          title: '声像文件查询',
          icon: 'window-restore'
        },
        {
          path: '/audio-video-files/file-query/class-query',
          title: '分类查询',
          icon: 'window-restore'
        },
        {
          path: '/audio-video-files/file-query/photo-query',
          title: '拍摄者查询',
          icon: 'window-restore'
        }
      ]
    },
    {
      path: '/audio-video-files/vaarch-util',
      title: '声像档案利用',
      icon: 'window-restore'
    },
    {
      path: '/audio-video-files/file-statis/collect-statis',
      title: '档案统计',
      icon: 'window-restore',
      children: [
        {
          path: '/audio-video-files/file-statis/collect-statis',
          title: '馆藏统计',
          icon: 'window-restore'
        },
        {
          path: '/audio-video-files/file-statis/class-statis',
          title: '分类统计',
          icon: 'window-restore'
        }
      ]
    },
    {
      path: '/audio-video-files/svafile-modifi/ple-file-manage',
      title: '库存声像档案修改',
      icon: 'window-restore',
      children: [
        {
          path: '/audio-video-files/svafile-modifi/ple-file-manage',
          title: '竣工档案管理',
          icon: 'window-restore'
        },
        {
          path: '/audio-video-files/svafile-modifi/pre-file-manage',
          title: '综合档案管理',
          icon: 'window-restore'
        },
        {
          path: '/audio-video-files/svafile-modifi/ple-vag-manage',
          title: '竣工声像组管理',
          icon: 'window-restore'
        },
        {
          path: '/audio-video-files/svafile-modifi/pre-vag-manage',
          title: '综合声像组管理',
          icon: 'window-restore'
        }
      ]
    },
    {
      path: '/audio-video-files/special-prod',
      title: '专题制作',
      icon: 'window-restore'
    }
  ]
}
