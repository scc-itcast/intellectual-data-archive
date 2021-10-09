<template>
  <div class="tree-item--page">
    <project-level v-show="tree_item_flag.project" :tree_item="tree_item" />
    <engine-level v-show="tree_item_flag.engine" :tree_item="tree_item" />
    <case-file-level v-show="tree_item_flag.case_file" :tree_item="tree_item" />
    <file-generic-level v-show="tree_item_flag.file_generic" :tree_item="tree_item" />
  </div>
</template>
<script>
import ProjectLevel from '@/views/menu/file-bgf-menu/components/project_level/index.vue'
import EngineLevel from '@/views/menu/file-bgf-menu/components/engine_level/index.vue'
import CaseFileLevel from '@/views/menu/file-bgf-menu/components/case_file_level/index.vue'
import FileGenericLevel from '@/views/menu/file-bgf-menu/components/file_generic_level/index.vue'
import {
  onMounted,
  computed,
  reactive,
  watchEffect,
  toRefs,
  onBeforeUnmount
} from '@vue/composition-api'
export default {
  components: {
    CaseFileLevel,
    FileGenericLevel,
    ProjectLevel,
    EngineLevel
  },
  props: ['tree_item'],
  setup(prop, context) {
    let contextData = reactive({
      tree_item_flag: {
        project: false,
        engine: false,
        case_file: false,
        file_generic: false
      }
    })
    watchEffect(() => {
      const { id, type, level } = prop.tree_item
      // console.log(prop.tree_item)
      for (const key in contextData.tree_item_flag) {
        contextData.tree_item_flag[key] = false
      }
      contextData.tree_item_flag[level] = true
    })
    return {
      contextData,
      ...toRefs(contextData)
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-item--page {
  width: 100%;
  background-color: $color-bg-4;
  border-radius: 6px;
}
</style>
