<template>
  <div id="sz-advanced-query" class="export_setting">
    <el-dialog
      :title="advanced_query_title"
      :visible.sync="export_setting_dialog"
      width="35%"
      :lock-scroll="true"
      custom-class="advanced-query--dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="fun_export_setting_close"
    >
      <template slot="title">
        {{ advanced_query_title }}
      </template>
      <div class="modifi-num-dialog--body global-center-center--flex">
        <div class="modifi-num-body--box global-column-center--flex">
          <div class="global-center-center--flex">
            <div class="modifi-num-body--text global--mr20">项目级</div>
            <div class="modifi-num-body--input">
              <el-select v-model="export_setting_from.project" placeholder="请选择">
                <el-option
                  v-for="item in select_obj.project_list"
                  :key="item.prop"
                  :label="item.label"
                  :value="item.prop"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="global-center-center--flex">
            <div class="modifi-num-body--text global--mr20">工程级</div>
            <div class="modifi-num-body--input">
              <el-select v-model="export_setting_from.engine" placeholder="请选择">
                <el-option
                  v-for="item in select_obj.engine_list"
                  :key="item.prop"
                  :label="item.label"
                  :value="item.prop"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="global-center-center--flex">
            <div class="modifi-num-body--text global--mr20">案卷级</div>
            <div class="modifi-num-body--input">
              <el-select v-model="export_setting_from.case" placeholder="请选择">
                <el-option
                  v-for="item in select_obj.case_list"
                  :key="item.prop"
                  :label="item.label"
                  :value="item.prop"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="global-center-center--flex">
            <div class="modifi-num-body--text global--mr20">文件级</div>
            <div class="modifi-num-body--input">
              <el-select v-model="export_setting_from.file" placeholder="请选择">
                <el-option
                  v-for="item in select_obj.file_list"
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
          <sz-button title="取消" @click="fun_export_setting_close"></sz-button>
          <sz-button
            class="global--ml20"
            title="保存"
            type="primary"
            @click="fun_export_setting_submit"
          ></sz-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['export_setting_obj'],
  setup(prop, context) {
    let contextData = reactive({
      advanced_query_title: '项目导出目录规则设置',
      export_setting_dialog: false,
      export_setting_from: {
        project: '',
        engine: '',
        case: '',
        file: ''
      },
      select_obj: {}
    })

    watchEffect(() => {
      contextData.export_setting_from = prop.export_setting_obj.export_setting_from
      contextData.select_obj = prop.export_setting_obj.select_obj
      contextData.export_setting_dialog = prop.export_setting_obj.export_setting_dialog
    })

    const fun_export_setting_close = () => {
      context.emit('fun_export_setting_close')
    }

    const fun_export_setting_submit = () => {
      context.emit('fun_export_setting_close', contextData.export_setting_from)
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_export_setting_close,
      fun_export_setting_submit
    }
  }
}
</script>
<style lang="scss" scoped>
.modifi-num-dialog--body {
  height: 270px;
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
