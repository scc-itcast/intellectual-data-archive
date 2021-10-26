<template>
  <div id="sz-text-input" v-if="!queryObject.isHide">
    <div :class="className">
      <div class="input--title">{{ queryObject.title }}</div>
      <div class="input--box">
        <el-date-picker
          v-if="queryObject.type == 'datetime'"
          v-model="data_value"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="fun_value_change"
          :clearable="false"
        >
        </el-date-picker>
        <el-select
          v-else-if="queryObject.type == 'select'"
          v-model="data_value"
          placeholder="请输入关键字"
          @change="fun_value_change"
          :disabled="queryObject.isDisabled"
        >
          <el-option
            v-for="item in queryObject.list"
            :key="item.prop"
            :label="item.label"
            :value="item.prop"
          >
          </el-option>
        </el-select>
        <el-input
          v-else
          v-model="data_value"
          placeholder="请输入关键字"
          @change="fun_value_change"
        ></el-input>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['queryObject', 'className', 'index'],
  setup(prop, context) {
    let contextData = reactive({
      data_value: ''
    })
    watchEffect(() => {
      contextData.data_value = prop.queryObject.value
    })

    const fun_value_change = val => {
      let obj = { value: val, index: prop.index }
      context.emit('fun_value_change', obj)
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_value_change
    }
  }
}
</script>
<style lang="scss">
#sz-text-input {
  .primary {
    color: $color-text-main;
    display: flex;
    line-height: 40px;
    .input--title {
      margin-right: 10px;
    }
    .input--box {
      width: 220px;
      margin-right: 15px;
    }
  }
}
</style>
