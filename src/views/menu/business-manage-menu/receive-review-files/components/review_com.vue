<template>
  <div id="sz-advanced-query" class="review_com">
    <el-dialog
      :title="advanced_query_title"
      :visible.sync="review_com_dialog"
      width="35%"
      :lock-scroll="true"
      custom-class="advanced-query--dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="fun_review_com_close"
    >
      <template slot="title">
        {{ advanced_query_title }}
      </template>
      <div class="modifi-num-dialog--body global-center-center--flex">
        <div class="modifi-num-body--box global-column-center--flex">
          <div class="global-center-center--flex">
            <div class="modifi-num-body--input">
              <el-select v-model="review_com_from.opinio_tem" placeholder="请选择">
                <el-option
                  v-for="item in opinio_tem_list"
                  :key="item.prop"
                  :label="item.label"
                  :value="item.prop"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="global-center-center--flex">
            <div class="modifi-num-body--input">
              <el-input
                type="textarea"
                v-model="review_com_from.opinio_text"
                placeholder="请输入"
                rows="4"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <div class="advanced-query--box">
          <sz-button title="取消" @click="fun_review_com_close"></sz-button>
          <sz-button
            class="global--ml20"
            title="保存"
            type="primary"
            @click="fun_review_com_submit"
          ></sz-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['review_com_obj'],
  setup(prop, context) {
    let contextData = reactive({
      advanced_query_title: '添加审核意见',
      review_com_dialog: false,
      review_com_from: {
        opinio_tem: '',
        opinio_text: ''
      },
      opinio_tem_list: [
        { label: '通过', prop: '通过' },
        { label: '不通过', prop: '不通过' },
        { label: '存在问题', prop: '存在问题' },
        { label: '缺失文件', prop: '缺失文件' },
      ]
    })

    watchEffect(() => {
      contextData.review_com_dialog = prop.review_com_obj.review_com_dialog
    })

    const fun_review_com_close = () => {
      context.emit('fun_review_com_close')
    }

    const fun_review_com_submit = () => {
      context.emit('fun_review_com_close', contextData.review_com_from)
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_review_com_close,
      fun_review_com_submit
    }
  }
}
</script>
<style lang="scss" scoped>
.modifi-num-dialog--body {
  height: auto;
  width: 100%;
  .modifi-num-body--box {
    width: 100%;
    padding: 2px 0;
    > div {
      width: 100%;
      margin: 5px 0;
    }
    .modifi-num-body--input {
      width: 100%;
    }
  }
}
.advanced-query--box {
  display: flex;
}
</style>
