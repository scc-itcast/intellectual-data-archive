<template>
  <div id="sz-advanced-query" class="modifi_num">
    <el-dialog
      :title="advanced_query_title"
      :visible.sync="modifi_num_dialog"
      width="35%"
      :lock-scroll="true"
      custom-class="advanced-query--dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="fun_modifi_num_close"
    >
      <template slot="title">
        {{ advanced_query_title }}
      </template>
      <div class="modifi-num-dialog--body global-center-center--flex">
        <div class="modifi-num-body--box global-column-center--flex">
          <div class="global-center-center--flex">
            <!-- <div class="modifi-num-body--text global--mr20">发证序号</div> -->
            <div class="modifi-num-body--input">
              <el-select v-model="modifi_num_from.simil_analy" placeholder="请选择">
                <el-option
                  v-for="item in simil_analy_list"
                  :key="item.prop"
                  :label="item.label"
                  :value="item.prop"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <div class="advanced-query--box">
          <sz-button title="取消" @click="fun_modifi_num_close"></sz-button>
          <sz-button
            class="global--ml20"
            title="保存"
            type="primary"
            @click="fun_modifi_num_submit"
          ></sz-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['modifi_num_obj'],
  setup(prop, context) {
    let contextData = reactive({
      advanced_query_title: '选择范围',
      modifi_num_dialog: false,
      modifi_num_from: {
        simil_analy: ''
      },
      simil_analy_list: [
        { label: '相似度100%', prop: 1 },
        { label: '相似度90%及以上', prop: 2 },
        { label: '相似度80%及以上', prop: 3 },
        { label: '相似度60%及以上', prop: 4 },
        { label: '全部', prop: 5 }
      ]
    })

    watchEffect(() => {
      contextData.modifi_num_dialog = prop.modifi_num_obj.modifi_num_dialog
    })

    const fun_modifi_num_close = () => {
      context.emit('fun_modifi_num_close')
    }

    const fun_modifi_num_submit = () => {
      context.emit('fun_modifi_num_close', contextData.modifi_num_from)
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_modifi_num_close,
      fun_modifi_num_submit
    }
  }
}
</script>
<style lang="scss" scoped>
.modifi-num-dialog--body {
  height: 136px;
  .modifi-num-body--box {
    > div {
      margin: 10px 0;
    }
    .modifi-num-body--text {
      font-size: 16px;
      color: $color-text-main;
      width: 70px;
      text-align: right;
    }
    .modifi-num-body--input {
      width: 300px;
    }
  }
}
.advanced-query--box {
  display: flex;
}
</style>
