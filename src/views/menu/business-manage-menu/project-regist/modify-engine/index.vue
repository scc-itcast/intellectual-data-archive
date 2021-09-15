<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template>
      <other-gene-class></other-gene-class>
    </template>
  </d2-container>
</template>

<script>
import {
  onMounted,
  onBeforeUnmount,
  computed,
  reactive,
  watchEffect,
  toRefs
} from '@vue/composition-api'
import BuildEngin from '@/views/menu/business-manage-menu/project-regist/components/engine/build_engin.vue'
import MuniciInfrast from '@/views/menu/business-manage-menu/project-regist/components/engine/munici_infrast.vue'
import UrPipeEngin from '@/views/menu/business-manage-menu/project-regist/components/engine/ur_pipe_engin.vue'
import OtherGeneClass from '@/views/menu/business-manage-menu/project-regist/components/engine/other_gene_class.vue'
import RoadEngin from '@/views/menu/business-manage-menu/project-regist/components/engine/road_engin.vue'
import BridgeEngin from '@/views/menu/business-manage-menu/project-regist/components/engine/bridge_engin.vue'
import LandscapWork from '@/views/menu/business-manage-menu/project-regist/components/engine/landscap_work.vue'
export default {
  name: 'increase-engine',
  components: {
    BuildEngin, // 房屋建筑工程
    MuniciInfrast, // 市政基础设施
    UrPipeEngin, // 城市管线工程
    OtherGeneClass, // 其他通用类
    RoadEngin, // 道路工程
    BridgeEngin, // 桥梁工程
    LandscapWork, // 园林绿化工程
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '修改工程信息',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/project-regist', title: '项目登记' },
        { path: '/business-manage/project-regist/increase-engine', title: '修改工程信息' }
      ]
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })

    return {
      contextData,
      ...toRefs(contextData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
