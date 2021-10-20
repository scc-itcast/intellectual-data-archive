<template>
  <div id="sz-advanced-query" class="frame_project">
    <el-dialog
      :title="advanced_query_title"
      :visible.sync="frame_project_dialog"
      width="75%"
      :fullscreen="fullscreen"
      :lock-scroll="true"
      custom-class="advanced-query--dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="fun_frame_project_close"
    >
      <template slot="title">
        <div>{{ advanced_query_title }}</div>
        <div class="look-project-dialog--zoom" @click="fun_frame_project_zoom">
          <i aria-hidden="true" class="fa fa-iconfont guilian-icon"></i>
        </div>
      </template>
      <div class="look-project-dialog--body" :style="frame_project_style">
        <div class="look-project-body--box">
          <div class="look-project-body--title global--weight">{{ page_title }}</div>
          <div class="look-project-body--content">
            <div class="content-form-item-box">
              <div class="global-content-form-item">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">起始密集架序号</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.frame_serial" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">密集架数量</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.frame_number" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">密集架行数</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.frame_row" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">密集架列数</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.frame_column" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">密集架深度(m)</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.frame_depth" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">密集架长度(m)</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.frame_length" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">密集架高度(m)</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.frame_height" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text"></div>
                    <div class="ceil-value">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <div class="advanced-query--box">
          <sz-button title="取消" @click="fun_frame_project_close"></sz-button>
          <sz-button
            class="global--ml20"
            title="保存"
            type="primary"
            @click="fun_frame_project_submit"
          ></sz-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['frame_project_obj'],
  setup(prop, context) {
    let contextData = reactive({
      advanced_query_title: '库房信息',
      page_title: '库房信息( 添加 )',
      frame_project_dialog: false,
      data_row: null,
      test_form: {
        frame_serial: '', // 起始密集架序号
        frame_number: '', // 密集架数量
        frame_row: '', // 密集架行数
        frame_column: '', // 密集架列数
        frame_depth: '', // 密集架深度(m)
        frame_length: '', // 密集架长度(m)
        frame_height: '' // 密集架高度(m)
      },
      fullscreen: false,
      frame_project_style: {}
    })

    watchEffect(() => {
      contextData.frame_project_dialog = prop.frame_project_obj.frame_project_dialog
      const row = prop.frame_project_obj.row
      contextData.data_row = row
      contextData.page_title = row ? '库房信息( 修改 )' : '库房信息( 添加 )'
    })

    const fun_frame_project_zoom = () => {
      contextData.fullscreen = !contextData.fullscreen
      contextData.frame_project_style = {}
      if (contextData.fullscreen) {
        contextData.frame_project_style = {
          height: document.body.clientHeight - 109 - 46 + 68 + 'px'
        }
      }
    }

    const fun_frame_project_close = () => {
      context.emit('fun_frame_project_close')
    }

    const fun_frame_project_submit = () => {
      context.emit('fun_frame_project_close', contextData.test_form)
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_frame_project_zoom,
      fun_frame_project_close,
      fun_frame_project_submit
    }
  }
}
</script>
<style lang="scss" scoped>
.look-project-dialog--zoom {
  position: absolute;
  top: 40%;
  right: 50px;
  cursor: pointer;
}
.look-project-dialog--body {
  height: 550px;
  padding: 0 155px;
  overflow-y: scroll;
  .look-project-body--box {
    width: 100%;
    color: $color-text-main;
    .look-project-body--title {
      text-align: center;
      font-size: 16px;
      margin: 8px 0 27px 0;
    }
    .look-project-body--content {
      font-size: 14px;
    }
  }
}
.advanced-query--box {
  display: flex;
}
</style>
