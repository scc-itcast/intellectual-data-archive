import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/audio-video-files',
  name: 'audio-video-files',
  meta,
  redirect: { name: 'audio-video-files-arch-collection-complete-file' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'arch-collection/complete-file',
      name: 'audio-video-files-arch-collection-complete-file',
      component: _import('menu/audio-video-files-menu/arch-collection/complete-file/index.vue'),
      meta: { ...meta, title: '档案归集-竣工档案' }
    },
    {
      path: 'arch-collection/compre-file',
      name: 'audio-video-files-arch-collection-compre-file',
      component: _import('menu/audio-video-files-menu/arch-collection/compre-file/index.vue'),
      meta: { ...meta, title: '档案归集-综合档案' }
    },
    {
      path: 'file-storage/complete-file',
      name: 'audio-video-files-file-storage-complete-file',
      component: _import('menu/audio-video-files-menu/file-storage/complete-file/index.vue'),
      meta: { ...meta, title: '档案入库-竣工档案' }
    },
    {
      path: 'file-storage/compre-file',
      name: 'audio-video-files-file-storage-compre-file',
      component: _import('menu/audio-video-files-menu/file-storage/compre-file/index.vue'),
      meta: { ...meta, title: '档案入库-综合档案' }
    },
    {
      path: 'file-query/ple-eng-query',
      name: 'audio-video-files-file-query-ple-eng-query',
      component: _import('menu/audio-video-files-menu/file-query/ple-eng-query/index.vue'),
      meta: { ...meta, title: '档案查询-竣工工程查询' }
    },
    {
      path: 'file-query/pre-eng-query',
      name: 'audio-video-files-file-query-pre-eng-query',
      component: _import('menu/audio-video-files-menu/file-query/pre-eng-query/index.vue'),
      meta: { ...meta, title: '档案查询-综合工程查询' }
    },
    {
      path: 'file-query/vagroup-query',
      name: 'audio-video-files-file-query-vagroup-query',
      component: _import('menu/audio-video-files-menu/file-query/vagroup-query/index.vue'),
      meta: { ...meta, title: '档案查询-声像组查询' }
    },
    {
      path: 'file-query/vafile-query',
      name: 'audio-video-files-file-query-vafile-query',
      component: _import('menu/audio-video-files-menu/file-query/vafile-query/index.vue'),
      meta: { ...meta, title: '档案查询-声像文件查询' }
    },
    {
      path: 'file-query/class-query',
      name: 'audio-video-files-file-query-class-query',
      component: _import('menu/audio-video-files-menu/file-query/class-query/index.vue'),
      meta: { ...meta, title: '档案查询-分类查询' }
    },
    {
      path: 'file-query/photo-query',
      name: 'audio-video-files-file-query-photo-query',
      component: _import('menu/audio-video-files-menu/file-query/photo-query/index.vue'),
      meta: { ...meta, title: '档案查询-拍摄者查询' }
    },
    {
      path: 'vaarch-util',
      name: 'audio-video-files-vaarch-util',
      component: _import('menu/audio-video-files-menu/vaarch-util/index.vue'),
      meta: { ...meta, title: '声像档案利用' }
    },
    {
      path: 'file-statis/collect-statis',
      name: 'audio-video-files-file-statis-collect-statis',
      component: _import('menu/audio-video-files-menu/file-statis/collect-statis/index.vue'),
      meta: { ...meta, title: '档案统计-馆藏统计' }
    },
    {
      path: 'file-statis/class-statis',
      name: 'audio-video-files-file-statis-class-statis',
      component: _import('menu/audio-video-files-menu/file-statis/class-statis/index.vue'),
      meta: { ...meta, title: '档案统计-分类统计' }
    },
    {
      path: 'svafile-modifi/ple-file-manage',
      name: 'audio-video-files-svafile-modifi-ple-file-manage',
      component: _import('menu/audio-video-files-menu/svafile-modifi/ple-file-manage/index.vue'),
      meta: { ...meta, title: '库存声像档案修改-竣工档案管理' }
    },
    {
      path: 'svafile-modifi/pre-file-manage',
      name: 'audio-video-files-svafile-modifi-pre-file-manage',
      component: _import('menu/audio-video-files-menu/svafile-modifi/pre-file-manage/index.vue'),
      meta: { ...meta, title: '库存声像档案修改-综合档案管理' }
    },
    {
      path: 'svafile-modifi/ple-vag-manage',
      name: 'audio-video-files-svafile-modifi-ple-vag-manage',
      component: _import('menu/audio-video-files-menu/svafile-modifi/ple-vag-manage/index.vue'),
      meta: { ...meta, title: '库存声像档案修改-竣工声像组管理' }
    },
    {
      path: 'svafile-modifi/pre-vag-manage',
      name: 'audio-video-files-svafile-modifi-pre-vag-manage',
      component: _import('menu/audio-video-files-menu/svafile-modifi/pre-vag-manage/index.vue'),
      meta: { ...meta, title: '库存声像档案修改-综合声像组管理' }
    },
    {
      path: 'special-prod',
      name: 'audio-video-files-special-prod',
      component: _import('menu/audio-video-files-menu/special-prod/index.vue'),
      meta: { ...meta, title: '专题制作' }
    }
  ]
}
