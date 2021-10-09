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
          <div class="look-project-body--title global--weight">报送责任书</div>
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
                          <div class="ceil-text">盒名称</div>
                          <div class="ceil-value">
                            {{ increase_from.box_name }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">盒档号</div>
                          <div class="ceil-value">
                            {{ increase_from.box_no }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">盒编号</div>
                          <div class="ceil-value">
                            {{ increase_from.box_num }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">编制单位</div>
                          <div class="ceil-value">
                            {{ increase_from.pro_site }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">盒整理人</div>
                          <div class="ceil-value">
                            {{ increase_from.box_tidy_p }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">保管期限</div>
                          <div class="ceil-value">
                            {{ increase_from.safe_duration }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">密级</div>
                          <div class="ceil-value">
                            {{ increase_from.security_class }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">存放地址</div>
                          <div class="ceil-value">
                            {{ increase_from.store_address }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">所属单元格</div>
                          <div class="ceil-value">
                            {{ increase_from.own_cell }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">背脊宽度</div>
                          <div class="ceil-value">
                            {{ increase_from.spine_width }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">盒内案卷数</div>
                          <div class="ceil-value">
                            {{ increase_from.files_box_num }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">编制日期</div>
                          <div class="ceil-value">
                            {{ increase_from.prepare_date_first }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">至</div>
                          <div class="ceil-value">
                            {{ increase_from.prepare_date_second }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">录入人</div>
                          <div class="ceil-value">
                            {{ increase_from.enter_pepole }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">录入时间</div>
                          <div class="ceil-value">
                            {{ increase_from.certificate_date }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-file-status increase-content--item">
                <div class="content-title-btn" @click="fun_show_shrink('pre_files_pro')">
                  <sz-show-shrink :show_shrink="show_shrink.pre_files_pro" title="案卷列表" />
                </div>
                <div class="content--form" :style="{ display: show_shrink_dispaly.pre_files_pro }">
                  <sz-table class="table-padding-left30" :config="table_files_list"></sz-table>
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
      table_height: 676,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '案卷题名', prop: 'project_name', checked: true, width: '200' },
        { label: '案卷档号', prop: 'project_adress', checked: true, width: '200' }
      ]
    })

    let contextData = reactive({
      advanced_query_title: '',
      look_project_dialog: false,
      data_row: null,
      increase_from: {
        box_name: '', // 盒名称
        box_no: '', // 盒档号
        box_num: '', // 盒编号
        compile_unit: '', //编制单位
        box_tidy_p: '', // 盒整理人
        safe_duration: '', //保管期限
        security_class: '', //密级
        store_address: '', //存放地址
        own_cell: '', // 所属单元格
        spine_width: '', // 背脊宽度
        files_box_num: '', // 盒内案卷数
        prepare_date_first: '', //编制日期 开始日期
        prepare_date_second: '', //至 结束日期
        enter_pepole: '', //录入人
        enter_time: '' //录入时间
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
