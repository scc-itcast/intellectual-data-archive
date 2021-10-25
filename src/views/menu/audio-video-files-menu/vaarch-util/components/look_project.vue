<template>
  <div id="sz-advanced-query" class="look_project">
    <el-dialog
      :title="advanced_query_title"
      :visible.sync="look_project_dialog"
      width="75%"
      :fullscreen="fullscreen"
      :lock-scroll="true"
      custom-class="advanced-query--dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="fun_look_project_close"
    >
      <template slot="title">
        <div class="look-project-dialog--zoom" @click="fun_look_project_zoom">
          <i aria-hidden="true" class="fa fa-iconfont guilian-icon"></i>
        </div>
      </template>
      <div class="look-project-dialog--body" :style="look_project_style">
        <div class="look-project-body--box">
          <div class="look-project-body--title global--weight">查阅信息</div>
          <div class="increase-content--box">
            <el-form
              :model="increase_from"
              :rules="increase_rules"
              ref="increase_ref"
              label-width="100px"
              class="increase-content--form"
            >
              <div class="content-basic-info increase-content--item">
                <div class="content-title-btn" @click="fun_show_shrink('basic_info')">
                  <sz-show-shrink :show_shrink="show_shrink.basic_info" title="基本信息" />
                </div>
                <div class="content--form" :style="{ display: show_shrink_dispaly.basic_info }">
                  <div class="content-form-item-box">
                    <div class="global-content-form-item-look">
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">查阅单位</div>
                          <div class="ceil-value">
                            {{ increase_from.refer_unit }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">用途</div>
                          <div class="ceil-value">
                            {{ increase_from.use_pos }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">查阅人</div>
                          <div class="ceil-value">
                            {{ increase_from.refer_people }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">查阅人电话</div>
                          <div class="ceil-value">
                            {{ increase_from.refer_phone }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">证件类型</div>
                          <div class="ceil-value">
                            {{ increase_from.certificate_type }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">证件号码</div>
                          <div class="ceil-value">
                            {{ increase_from.certificate_num }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">查阅类型</div>
                          <div class="ceil-value">
                            {{ increase_from.refer_type }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">数量-照片(张)</div>
                          <div class="ceil-value">
                            {{ increase_from.num_photo_z }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">查阅日期</div>
                          <div class="ceil-value">
                            {{ increase_from.refer_date }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">数量-视频(个)</div>
                          <div class="ceil-value">
                            {{ increase_from.num_video_g }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">接待人</div>
                          <div class="ceil-value">
                            {{ increase_from.receiver }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">数量-音频(个)</div>
                          <div class="ceil-value">
                            {{ increase_from.num_audio_g }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">利用说明</div>
                          <div class="ceil-value">
                            {{ increase_from.use_explain }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">备注</div>
                          <div class="ceil-value">
                            {{ increase_from.remark }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-file-status increase-content--item">
                <div class="content-title-btn" @click="fun_show_shrink('pre_files_pro')">
                  <sz-show-shrink :show_shrink="show_shrink.pre_files_pro" title="文件信息" />
                </div>
                <div class="content--form" :style="{ display: show_shrink_dispaly.pre_files_pro }">
                  <sz-table :config="table_files_list"></sz-table>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <template slot="footer">
        <!-- <div class="advanced-query--box">
          <sz-button title="取消" @click="fun_look_project_close"></sz-button>
          <sz-button
            class="global--ml20"
            title="保存"
            type="primary"
            @click="fun_look_project_submit"
          ></sz-button>
        </div> -->
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['look_project_obj'],
  setup(prop, context) {
    let table_files_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: false,
      // checkbox: true,
      number: true,
      expand: false,
      table_height: 506,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '文件档号', prop: 'document_no', checked: true, width: '100' },
        { label: '文件题名', prop: 'document_title', checked: true, width: '150' },
        { label: '盘号', prop: 'plate_no', checked: true, width: '80' },
        { label: '底片号', prop: 'film_no', checked: true, width: '80' },
        { label: '文件类型', prop: 'file_type', checked: true, width: '80' },
        { label: '载体类型', prop: 'carr_type', checked: true, width: '80' },
        { label: '备注', prop: 'remark', checked: true, width: '100' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '80',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '下载',
              type: 'text',
              event: 'button',
              handler: data => fun_download_project(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      advanced_query_title: '',
      look_project_dialog: false,
      data_row: null,
      increase_from: {
        refer_unit: '', // 查阅单位
        use_pos: '', // 用途
        refer_people: '', // 查阅人
        refer_phone: '', // 查阅人电话
        certificate_type: '', // 证件类型
        certificate_num: '', // 证件号码
        refer_type: '', // 查阅类型
        refer_date: '', // 查阅日期
        receiver: '', // 接待人
        num_photo_z: '', // 数量-照片(张)
        num_video_g: '', // 数量-视频(个)
        num_audio_g: '', // 数量-音频(个)
        use_explain: '', // 利用说明
        remark: '' // 备注
      },
      increase_rules: {
        project_name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        project_type: [
          { required: true, message: '请输入项目类型', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      show_shrink: {
        basic_info: false,
        pre_files_pro: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        pre_files_pro: 'block',
        custom_info: 'block'
      },
      fullscreen: false,
      look_project_style: {}
    })

    watchEffect(() => {
      contextData.look_project_dialog = prop.look_project_obj.look_project_dialog
      contextData.data_row = prop.look_project_obj.row
    })

    const fun_look_project_zoom = () => {
      contextData.fullscreen = !contextData.fullscreen
      contextData.look_project_style = {}
      if (contextData.fullscreen) {
        contextData.look_project_style = {
          height: document.body.clientHeight - 109 - 46 + 68 + 'px'
        }
      }
    }

    const fun_download_project = () => {}

    const fun_look_project_close = () => {
      context.emit('fun_look_project_close')
    }

    const fun_look_project_submit = () => {
      context.emit('fun_look_project_close')
    }

    const fun_show_shrink = val => {
      contextData.show_shrink[val] = !contextData.show_shrink[val]
      let flag = contextData.show_shrink[val]
      contextData.show_shrink_dispaly[val] = flag ? 'none' : 'block'
    }

    return {
      contextData,
      ...toRefs(contextData),
      table_files_list,
      ...toRefs(table_files_list),
      fun_show_shrink,
      fun_look_project_zoom,
      fun_download_project,
      fun_look_project_close,
      fun_look_project_submit
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
.increase-content--box {
  margin-top: 7px;
  .increase-content--item {
    .content-title-btn {
      margin-bottom: 27px;
      cursor: pointer;
    }
    .content-width-percent {
      width: 88.7%;
    }
    .content--form {
      transition: all 1s;
      margin-bottom: 27px;
      .content-from-column-height {
        .position_left,
        .position_right {
          height: 204px;
        }
      }
    }
  }
}
</style>
