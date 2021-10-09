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
            <div class="modifi-num-body--text global--mr20">文件名</div>
            <div class="modifi-num-body--input">
              <el-input v-model="modifi_num_from.file_name" placeholder=""></el-input>
            </div>
            <div class="global--ml20">
              <el-checkbox v-model="modifi_num_from_checked.file_name"></el-checkbox>
            </div>
          </div>
          <div class="global-center-center--flex">
            <div class="modifi-num-body--text global--mr20">责任者</div>
            <div class="modifi-num-body--input">
              <el-input v-model="modifi_num_from.res_people" placeholder=""></el-input>
            </div>
            <div class="global--ml20">
              <el-checkbox v-model="modifi_num_from_checked.res_people"></el-checkbox>
            </div>
          </div>
          <div class="global-center-center--flex">
            <div class="modifi-num-body--text global--mr20">文图号</div>
            <div class="modifi-num-body--input">
              <el-input v-model="modifi_num_from.article_draw" placeholder=""></el-input>
            </div>
            <div class="global--ml20">
              <el-checkbox v-model="modifi_num_from_checked.article_draw"></el-checkbox>
            </div>
          </div>
          <div class="global-center-center--flex">
            <div class="modifi-num-body--text global--mr20">载体类型</div>
            <div class="modifi-num-body--input">
              <el-select v-model="modifi_num_from.carr_type">
                <el-option
                  v-for="(item, index) in modifi_num_obj.carr_type_list"
                  :key="index"
                  :label="item.label"
                  :value="item.prop"
                >
                </el-option>
              </el-select>
            </div>
            <div class="global--ml20">
              <el-checkbox v-model="modifi_num_from_checked.carr_type"></el-checkbox>
            </div>
          </div>
          <div class="global-center-center--flex">
            <div class="modifi-num-body--text global--mr20">起始日期</div>
            <div class="modifi-num-body--input">
              <el-date-picker
                v-model="modifi_num_from.start_date"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false"
              >
              </el-date-picker>
            </div>
            <div class="global--ml20">
              <el-checkbox v-model="modifi_num_from_checked.start_date"></el-checkbox>
            </div>
          </div>
          <div class="global-center-center--flex">
            <div class="modifi-num-body--text global--mr20">终止日期</div>
            <div class="modifi-num-body--input">
              <el-date-picker
                v-model="modifi_num_from.end_date"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false"
              >
              </el-date-picker>
            </div>
            <div class="global--ml20">
              <el-checkbox v-model="modifi_num_from_checked.end_date"></el-checkbox>
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
      advanced_query_title: '批量修改记录',
      modifi_num_dialog: false,
      modifi_num_from: {},
      modifi_num_from_checked: {}
    })

    watchEffect(() => {
      contextData.modifi_num_dialog = prop.modifi_num_obj.modifi_num_dialog
      contextData.modifi_num_from = prop.modifi_num_obj.modifi_num_from
      contextData.modifi_num_from_checked = prop.modifi_num_obj.modifi_num_from_checked
    })

    const fun_modifi_num_close = () => {
      context.emit('fun_modifi_num_close')
    }

    const fun_modifi_num_submit = () => {
      const obj = {
        modifi_num_from: contextData.modifi_num_from,
        modifi_num_from_checked: contextData.modifi_num_from_checked
      }
      context.emit('fun_modifi_num_close', obj)
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
  height: 370px;
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
