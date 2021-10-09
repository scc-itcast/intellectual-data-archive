import Vue from 'vue'

import d2Container from './d2-container'
import d2ContainerFrame from './d2-container-frame'
import d2LinkBtn from './d2-link-btn'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-container-frame', d2ContainerFrame)
Vue.component('d2-link-btn', d2LinkBtn)
Vue.component('d2-count-up', () => import('./d2-count-up'))
Vue.component('d2-highlight', () => import('./d2-highlight'))
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))
Vue.component('d2-icon-select', () => import('./d2-icon-select/index.vue'))
Vue.component('d2-icon-svg-select', () => import('./d2-icon-svg-select/index.vue'))
Vue.component('d2-markdown', () => import('./d2-markdown'))
Vue.component('d2-mde', () => import('./d2-mde'))
Vue.component('d2-module-index-banner', () => import('./d2-module-index-banner'))
Vue.component('d2-module-index-menu', () => import('./d2-module-index-menu'))
Vue.component('d2-quill', () => import('./d2-quill'))
Vue.component('d2-scrollbar', () => import('./d2-scrollbar'))
Vue.component('d2-ueditor', () => import('./d2-ueditor'))
Vue.component('sz-button', () => import('./sz-button'))
Vue.component('sz-text-input', () => import('./sz-text-input'))
Vue.component('sz-custom-header', () => import('./sz-custom-header'))
Vue.component('sz-table', () => import('./sz-table'))
Vue.component('sz-advanced-query', () => import('./sz-advanced-query'))
Vue.component('sz-show-shrink', () => import('./sz-show-shrink'))
Vue.component('sz-aside-tree', () => import('./sz-aside-tree'))
Vue.component('sz-file-status', () => import('./sz-file-status'))
Vue.component('sz-case-file-status', () => import('./sz-case-file-status'))
Vue.component('sz-project-level', () => import('./sz-project-level'))
Vue.component('sz-engine-level', () => import('./sz-engine-level'))
Vue.component('sz-case-file-level', () => import('./sz-case-file-level'))
Vue.component('sz-file-generic-level', () => import('./sz-file-generic-level'))
