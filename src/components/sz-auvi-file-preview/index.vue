<template>
  <div id="sz-auvi-file-preview" class="preview_project">
    <el-dialog
      :title="advanced_query_title"
      :visible.sync="preview_project_dialog"
      width="75%"
      :fullscreen="fullscreen"
      :lock-scroll="true"
      custom-class="advanced-query--dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="fun_preview_project_close"
    >
      <template slot="title">
        <div class="preview-project-dialog--zoom" @click="fun_preview_project_zoom">
          <i aria-hidden="true" class="fa fa-iconfont guilian-icon"></i>
        </div>
      </template>
      <div class="preview-project-dialog--body" :style="preview_project_style">
        <div class="preview-project-dialog--left">
          <div class="preview-left-top">
            <img :src="current_preview_obj.preview_img" alt="" />
          </div>
          <div class="preview-left-bottom">
            <div v-show="preview_bottom_toggle" class="preview-bottom-show">
              <div class="preview--header global-between-center--flex">
                <div class="preview--text global--ml20">文件列表</div>
                <template>
                  <div class="preview--icon global-center-center--flex">
                    <i
                      @click="fun_preview_toggle('bottom')"
                      class="fa fa-iconfont zhankaicaidan preview-icon--color"
                    ></i>
                  </div>
                </template>
              </div>
              <div class="preview-bottom-content">
                <div v-for="(item, index) in preview_list" :key="index">
                  <div
                    class="global-center-center--flex"
                    :class="fun_filter_img_class(index)"
                    @click="fun_preview_img(item, index)"
                  >
                    <img class="preview-bottom-img" :src="item.preview_img" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div
              @click="fun_preview_toggle('bottom')"
              v-show="!preview_bottom_toggle"
              class="preview-bottom-hidden"
            >
              <div class="preview--header global-between-center--flex">
                <div class="preview--text global--ml20">文件列表</div>
                <template>
                  <div class="preview--icon global-center-center--flex">
                    <i class="fa fa-iconfont zhankaicaidan preview-icon--color"></i>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="preview-project-dialog--right">
          <div v-show="preview_right_toggle" class="preview-right-show">
            <div class="preview--header global-between-center--flex">
              <div class="preview--text global--ml20">文件信息</div>
              <template>
                <div class="preview--icon global-center-center--flex">
                  <i
                    @click="fun_preview_toggle('right')"
                    class="fa fa-iconfont zhankaicaidan preview-icon--color"
                  ></i>
                </div>
              </template>
            </div>
            <div class="preview-right-content">
              <div class="preview-right-item">
                <archive
                  v-show="current_preview_btn == 'archive'"
                  :current_preview_obj="current_preview_obj.archive"
                />
                <metadata
                  v-show="current_preview_btn == 'metadata'"
                  :current_preview_obj="current_preview_obj.metadata"
                />
              </div>
            </div>
            <div class="preview-right-btn--box">
              <div v-for="(item, index) in button_group_obj" :key="index">
                <div :class="fun_filter_button_class(index)" @click="fun_preview_button(index)">
                  {{ item.label }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="preview-right-hidden"
            @click="fun_preview_toggle('right')"
            v-show="!preview_right_toggle"
          >
            <div class="preview-right-hidden--icon global-center-center--flex">
              <i class="fa fa-iconfont zhankaicaidan preview-right-icon--color"></i>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <!-- <div class="advanced-query--box">
          <sz-button title="取消" @click="fun_preview_project_close"></sz-button>
          <sz-button
            class="global--ml20"
            title="保存"
            type="primary"
            @click="fun_preview_project_submit"
          ></sz-button>
        </div> -->
      </template>
    </el-dialog>
  </div>
</template>
<script>
import Archive from '@/components/sz-auvi-file-preview/components/archive.vue'
import Metadata from '@/components/sz-auvi-file-preview/components/metadata.vue'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['preview_project_obj'],
  components: {
    Archive,
    Metadata
  },
  setup(prop, context) {
    let contextData = reactive({
      preview_right_toggle: true,
      preview_bottom_toggle: true,
      advanced_query_title: '',
      preview_project_dialog: false,
      preview_title: '文件信息',
      data_row: null,
      preview_list: [
        {
          preview_img:
            'http://demo.e-square.com.cn:8085/images/001/ucamisweb/00001/thumb/8934416f-1c5e-4e71-997d-4cc43719ad69/8934416f-1c5e-4e71-997d-4cc43719ad69.jpg?t=1634788068004',
          archive: {},
          metadata: {}
        },
        {
          preview_img:
            'http://demo.e-square.com.cn:8085//images/001/ucamisweb/00001/thumb/2a252cc5-3aa9-4b55-93aa-acac9aac36b4/2a252cc5-3aa9-4b55-93aa-acac9aac36b4.jpg?t=1634804837946',
          archive: {},
          metadata: {}
        }
      ],
      current_preview_obj: {
        preview_img:
          'http://demo.e-square.com.cn:8085//images/001/ucamisweb/00001/thumb/2a252cc5-3aa9-4b55-93aa-acac9aac36b4/2a252cc5-3aa9-4b55-93aa-acac9aac36b4.jpg?t=1634804837946',
        archive: {},
        metadata: {}
      },
      fullscreen: false,
      preview_project_style: {},
      button_group_obj: {
        archive: { label: '档案信息' },
        metadata: { label: '元数据信息' }
      },
      current_preview_img_index: null,
      current_preview_btn: 'archive'
    })

    watchEffect(() => {
      contextData.preview_project_dialog = prop.preview_project_obj.preview_project_dialog
      contextData.data_row = prop.preview_project_obj.row
    })

    const fun_preview_project_zoom = () => {
      contextData.fullscreen = !contextData.fullscreen
      contextData.preview_project_style = {}
      if (contextData.fullscreen) {
        contextData.preview_project_style = {
          height: document.body.clientHeight - 109 - 46 + 68 + 'px'
        }
      }
    }

    const fun_preview_toggle = text => {
      switch (text) {
        case 'right': {
          contextData.preview_right_toggle = !contextData.preview_right_toggle
          break
        }
        case 'bottom': {
          contextData.preview_bottom_toggle = !contextData.preview_bottom_toggle
          break
        }
        default: {
        }
      }
    }

    const fun_preview_button = index => {
      contextData.current_preview_btn = index
    }

    const fun_filter_button_class = index => {
      const flag = index === contextData.current_preview_btn
      return flag ? 'preview-right-btn_active' : 'preview-right-btn'
    }

    const fun_preview_img = (item, index) => {
      contextData.current_preview_img_index = index
      contextData.current_preview_obj = item
    }

    const fun_filter_img_class = index => {
      const flag = index === contextData.current_preview_img_index
      return flag ? 'preview-bottom-item_active' : 'preview-bottom-item'
    }

    const fun_preview_project_close = () => {
      context.emit('fun_preview_project_close')
    }

    const fun_preview_project_submit = () => {
      context.emit('fun_preview_project_close')
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_preview_toggle,
      fun_preview_img,
      fun_filter_img_class,
      fun_preview_button,
      fun_filter_button_class,
      fun_preview_project_zoom,
      fun_preview_project_close,
      fun_preview_project_submit
    }
  }
}
</script>
<style lang="scss" scoped>
.preview-project-dialog--zoom {
  position: absolute;
  top: 40%;
  right: 50px;
  cursor: pointer;
}
.preview-project-dialog--body {
  height: 600px;
  display: flex;
  .preview-project-dialog--left {
    flex: 1;
    display: flex;
    flex-direction: column;
    .preview-left-top {
      flex: 1;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .preview-left-bottom {
      .preview-bottom-show {
        width: 100%;
        height: 160px;
        .preview-bottom-content {
          height: 130px;
          width: 100%;
          overflow: auto;
          padding: 5px;
          box-sizing: border-box;
          > div {
            width: 134px;
            height: 100px;
            display: inline-block;
            margin: 1px;
          }
          .preview-bottom-item {
            height: 100%;
            border: 1px solid $color-border-1;
            border-radius: 3px;
            .preview-bottom-img {
              border-radius: 2px;
              max-height: 80%;
              max-width: 90%;
            }
          }
          .preview-bottom-item:hover {
            background-color: #eaf2ff;
          }
          .preview-bottom-item_active {
            height: 100%;
            border: 1px solid $color-border-1;
            border-radius: 3px;
            background-color: #ffe48d;
            .preview-bottom-img {
              border-radius: 2px;
              max-height: 80%;
              max-width: 90%;
            }
          }
        }
      }
      .preview-bottom-hidden {
        .preview--header {
          background: $color-bg-3;
        }
      }
    }
  }
  .preview-project-dialog--right {
    .preview-right-show {
      width: 300px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-left: 5px solid #e6eef8;
      .preview-right--header {
        color: #0e2d5f;
        background-color: $color-border-1;
        height: 30px;
        .preview-right--text {
          font-size: 16px;
          font-family: SourceHanSansSC-Medium, SourceHanSansSC;
          color: $color-text-main;
        }
        .preview-right--icon {
          width: 53px;
          height: 100%;
        }
      }
      .preview-right-content {
        flex: 1;
        overflow: auto;
        .preview-right-item {
        }
      }
      .preview-right-btn--box {
        width: 100%;
        height: 40px;
        background-color: $color-border-1;
        display: flex;
        .preview-right-btn {
          padding: 0 5px;
          height: 40px;
          line-height: 40px;
          color: #0e2d5f;
          background-color: #a9cdfc;
        }
        .preview-right-btn:hover {
          background-color: #c2dcff;
        }
        .preview-right-btn_active {
          padding: 0 5px;
          height: 40px;
          line-height: 40px;
          color: #0e2d5f;
          background-color: $color-bg-4;
        }
      }
    }

    .preview-right-hidden {
      width: 30px;
      height: 100%;
      background: $color-bg-3;
      border-radius: 6px;
      .preview-right-hidden--icon {
        height: 30px;
      }
    }
  }
}
.preview--header {
  color: #0e2d5f;
  background-color: $color-border-1;
  height: 30px;
  .preview--text {
    font-size: 16px;
    font-family: SourceHanSansSC-Medium, SourceHanSansSC;
    color: $color-text-main;
  }
  .preview--icon {
    width: 53px;
    height: 100%;
  }
}
.advanced-query--box {
  display: flex;
}
</style>
