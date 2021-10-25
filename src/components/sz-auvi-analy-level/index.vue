<template>
  <div class="sz-auvi-analy-level">
    <div class="increase-content--box"></div>
    <div class="increase-content--box">分析完毕</div>
    <div v-if="modifi_num_obj_show">
      <analy-select :modifi_num_obj="modifi_num_obj" @fun_modifi_num_close="fun_modifi_num_close" />
    </div>
  </div>
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
import AnalySelect from './components/analy_select.vue'
export default {
  name: 'increase-engine',
  components: {
    AnalySelect,
  },
  props: ['tree_item'],
  setup(prop, context) {
    let contextData = reactive({
      name: '添加工程信息',
      title: '城市管线工程单位工程级著录单',
      modifi_num_obj: {
        modifi_num_dialog: false
      },
      modifi_num_obj_show: false,
      page_config: {
        id: '',
        type: ''
      }
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })

    watchEffect(() => {
      contextData.page_config = prop.tree_item
      
    })

    const fun_serial_project = () => {
      contextData.modifi_num_obj.modifi_num_dialog = true
      contextData.modifi_num_obj_show = true
    }

    const fun_modifi_num_close = obj => {
      contextData.modifi_num_obj.modifi_num_dialog = false
      contextData.modifi_num_obj_show = false
    }

    const fun_create_project = () => {}

    const fun_upload = () => {}

    const fun_batch_modify = () => {}

    const fun_select_all = () => {}

    const fun_deselect = () => {}

    const fun_refresh = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      fun_serial_project,
      fun_modifi_num_close,
      fun_create_project,
      fun_upload,
      fun_batch_modify,
      fun_select_all,
      fun_deselect,
      fun_refresh
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
