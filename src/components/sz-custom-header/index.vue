<template>
  <div id="sz-custom-header">
    <div :class="className">
      <el-popover
        placement="bottom"
        width="200"
        trigger="click"
        @show="visible_change=true"
        @hide="visible_change=false"
      >
        <div class="global-group-checkbox--box">
          <el-checkbox-group v-model="checkList" @change="fun_checkbox_change">
            <div class="global-group--checkbox">
              <div v-for="(item, index) in thead" :key="index">
                <el-checkbox
                  :label="item.label"
                  :disabled="item.disabled"
                  :checked="item.checked"
                ></el-checkbox>
              </div>
            </div>
          </el-checkbox-group>
        </div>
        <div slot="reference">
          <div class="sz-button-box">
            <sz-button
            class=""
            :icon="customObject.icon"
            :title="customObject.title"
            type="text"
            size="medium"
          />
          <template>
            <span v-if="visible_change" class="global-triangle-black-bottom"></span>
            <span v-else class="global-triangle-black-top"></span>
          </template>
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['customObject', 'className', 'index', 'thead'],
  setup(prop, context) {
    let contextData = reactive({
      checkList: [],
      visible_change: false
    })
    watchEffect(() => {})

    const fun_checkbox_change = list => {
      context.emit('fun_checkbox_change', list)
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_checkbox_change
    }
  }
}
</script>
<style lang="scss">
#sz-custom-header {
  .primary {
  }
  .sz-button-box {
    display: flex;
    align-items: center;
  }
}
</style>
