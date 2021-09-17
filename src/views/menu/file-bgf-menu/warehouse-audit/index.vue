// 入库审核
<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template slot="header">
      <div class="query--box global--flex">
        <div class="query-list--box global--flex">
          <div v-for="(item, index) in queryList" :key="index">
            <sz-text-input
              :queryObject="item"
              :index="index"
              className="primary"
              @fun_value_change="fun_value_change"
            ></sz-text-input>
          </div>
        </div>
        <div class="query-btn--box global--flex">
          <sz-button title="查询" type="primary" @click="fun_general_query"></sz-button>
          <sz-button class="global--ml20" title="高级查询" @click="fun_advanced_query"></sz-button>
          <sz-button class="global--ml20" title="保存" @click="fun_save"></sz-button>
          <sz-button class="global--ml20" title="通过" @click="fun_through"></sz-button>
          <sz-button class="global--ml20" title="不通过" @click="fun_unthrough"></sz-button>
        </div>
      </div>
    </template>
    <commonc title="房屋建筑工程项目级著录单" tag="1"></commonc>
  </d2-container>
</template>

<script>
import commonc from '@/views/menu/file-bgf-menu/components-table-a/table.vue'

import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  name: 'warehouse-audit',
  mixins: [mixinAsideShowTrue],
  components: {
    commonc,
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '入库审核',
      breadcrumb: [
        { path: '/file-bgf', title: '档案整编' },
        { path: '/file-bgf/warehouse-audit', title: '入库审核' },
      ],
      queryList: {
        project_name: { title: '项目名称', value: '' },
      },
    })

    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })
    const fun_value_change = () => {}
    const fun_general_query = () => {}
    const fun_save = () => {}
    const fun_through = () => {}
    const fun_unthrough = () => {}
    return {
      contextData,
      ...toRefs(contextData),
      fun_value_change,
      fun_general_query,
      fun_save,
      fun_through,
      fun_unthrough,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../components-table-a/index.scss';
</style>
