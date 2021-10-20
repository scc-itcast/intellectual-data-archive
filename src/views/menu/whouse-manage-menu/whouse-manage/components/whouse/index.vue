<template>
  <div id="sz-advanced-query" class="whouse_project">
    <el-dialog
      :title="advanced_query_title"
      :visible.sync="whouse_project_dialog"
      width="75%"
      :fullscreen="fullscreen"
      :lock-scroll="true"
      custom-class="advanced-query--dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="fun_whouse_project_close"
    >
      <template slot="title">
        <div>{{ advanced_query_title }}</div>
        <div class="look-project-dialog--zoom" @click="fun_whouse_project_zoom">
          <i aria-hidden="true" class="fa fa-iconfont guilian-icon"></i>
        </div>
      </template>
      <div class="look-project-dialog--body" :style="whouse_project_style">
        <div class="look-project-body--box">
          <div class="look-project-body--title global--weight">{{ page_title }}</div>
          <div class="look-project-body--content">
            <div class="content-form-item-box">
              <div class="global-content-form-item">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">库房名称</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.whouse_name" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">库房地址</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.whouse_adress" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">库房长度(m)</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.whouse_length" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">库房高度(m)</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.whouse_height" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">库房宽度(m)</div>
                    <div class="ceil-value">
                      <el-input v-model="test_form.whouse_width" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">库房密集架间距(m)</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="test_form.whouse_frame_space"
                        placeholder="请输入"
                      ></el-input>
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
          <sz-button title="取消" @click="fun_whouse_project_close"></sz-button>
          <sz-button
            class="global--ml20"
            title="保存"
            type="primary"
            @click="fun_whouse_project_submit"
          ></sz-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['whouse_project_obj'],
  setup(prop, context) {
    let contextData = reactive({
      advanced_query_title: '库房信息',
      page_title: '库房信息( 添加 )',
      whouse_project_dialog: false,
      data_row: null,
      test_form: {
        whouse_name: '', // 库房名称
        whouse_adress: '', // 库房地址
        whouse_length: '', // 库房长度(m)
        whouse_height: '', // 库房高度(m)
        whouse_width: '', // 库房宽度(m)
        whouse_frame_space: '' // 库房密集架间距(m)
      },
      fullscreen: false,
      whouse_project_style: {}
    })

    watchEffect(() => {
      contextData.whouse_project_dialog = prop.whouse_project_obj.whouse_project_dialog
      const row = prop.whouse_project_obj.row
      contextData.data_row = row
      contextData.page_title = row ? '库房信息( 修改 )' : '库房信息( 添加 )'
    })

    const fun_whouse_project_zoom = () => {
      contextData.fullscreen = !contextData.fullscreen
      contextData.whouse_project_style = {}
      if (contextData.fullscreen) {
        contextData.whouse_project_style = {
          height: document.body.clientHeight - 109 - 46 + 68 + 'px'
        }
      }
    }

    const fun_whouse_project_close = () => {
      context.emit('fun_whouse_project_close')
    }

    const fun_whouse_project_submit = () => {
      context.emit('fun_whouse_project_close', contextData.test_form)
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_whouse_project_zoom,
      fun_whouse_project_close,
      fun_whouse_project_submit
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
