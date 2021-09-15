<template>
  <div id="sz-advanced-query-item">
    <!-- <div v-show="data_state" @click="fun_text_click">
      <span class="query-item--text">{{ data_text }}</span>
    </div> -->
    <div v-show="!data_input">
      <el-select
        ref="select_ref"
        v-model="data_prop"
        placeholder="请选择"
        :popper-append-to-body="false"
        @blur="fun_select_blur"
      >
        <el-option
          v-for="(item, index) in data_list"
          :key="index"
          :label="item.label"
          :value="item.prop"
        >
        </el-option>
      </el-select>
    </div>
    <div v-show="data_input">
      <el-input v-model="data_prop" placeholder="请输入内容" @blur="fun_select_blur"></el-input>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['current_prop', 'current_list', 'current_key', 'current_index', 'current_state'],
  setup(prop, context) {
    let contextData = reactive({
      data_text: '',
      data_prop: 'project_name',
      data_list: [
        { label: '项目名称', prop: 'project_name' },
        { label: '项目地点', prop: 'project_adress' },
        { label: '项目类型', prop: 'project_type' },
        { label: '录入人', prop: 'enter_pepole' },
        { label: '录入时间', prop: 'enter_time' }
      ],
      data_state: false,
      data_input: false
    })

    watchEffect(() => {
      const { current_prop, current_list, current_key, current_state } = prop
      contextData.data_prop = current_prop
      contextData.data_list = current_list?.filter(item => item.label != '操作')
      // contextData.data_state = current_state
      current_list?.forEach(item => {
        if (item.prop == current_prop) {
          contextData.data_text = item.label
        }
      })
      if (current_key == 'query_params') {
        contextData.data_input = true
      }
    })

    const fun_text_click = () => {
      // contextData.data_state = false
      setTimeout(() => {
        context.refs.select_ref.focus()
      }, 50)
    }

    const fun_select_blur = () => {
      let obj = {
        current_key: prop.current_key,
        current_index: prop.current_index,
        current_prop: contextData.data_prop
      }
      if (contextData.data_prop) {
        context.emit('fun_state_change', obj)
      }
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_text_click,
      fun_select_blur
    }
  }
}
</script>

<style lang="scss">
#sz-advanced-query-item {
  .query-item--text {
    padding: 0 10px;
  }
}
</style>
