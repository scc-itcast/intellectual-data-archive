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
          <div class="look-project-body--title global--weight">鉴定登记单</div>
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
                          <div class="ceil-text">鉴定申请人</div>
                          <div class="ceil-value">
                            {{ increase_from.ident_apply_people }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">鉴定申请时间</div>
                          <div class="ceil-value">
                            {{ increase_from.ident_apply_time }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">鉴定参与人员</div>
                          <div class="ceil-value">
                            {{ increase_from.ident_part_people }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">鉴定事由</div>
                          <div class="ceil-value">
                            {{ increase_from.ident_reason }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">鉴定审核意见</div>
                          <div class="ceil-value">
                            {{ increase_from.ident_audit_opin }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">鉴定审核结论</div>
                          <div class="ceil-value">
                            {{ increase_from.ident_audit_conc }}
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
                            {{ increase_from.enter_time }}
                          </div>
                        </div>
                      </div>
                      <div class="content-form-wrapper">
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">修改人</div>
                          <div class="ceil-value">
                            {{ increase_from.modify_pepole }}
                          </div>
                        </div>
                        <div class="content-form-wrapper-column">
                          <div class="ceil-text">修改时间</div>
                          <div class="ceil-value">
                            {{ increase_from.modify_time }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-file-status increase-content--item">
                <div class="content-title-btn" @click="fun_show_shrink('pre_files_pro')">
                  <sz-show-shrink :show_shrink="show_shrink.pre_files_pro" title="鉴定案卷列表" />
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
      expand_info_look: true,
      component_info_look: 'IdentBook',
      table_height: 506,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '总登记号', prop: 'total_registration', checked: true, width: '80' },
        { label: '案卷题名', prop: 'books_title', checked: true, width: '120' },
        { label: '归档时间', prop: 'archive_date', checked: true, width: '80' },
        { label: '鉴定通过', prop: 'ident_pass', checked: true, width: '80' },
        { label: '保管期限', prop: 'safe_duration', checked: true, width: '80' },
        { label: '密级', prop: 'security_class', checked: true, width: '80' },
        { label: '新保管期限', prop: 'new_safe_duration', checked: true, width: '90' },
        { label: '新密级', prop: 'new_security_class', checked: true, width: '80' },
        { label: '是否销毁', prop: 'arch_dest', checked: true, width: '80' }
      ]
    })

    let contextData = reactive({
      advanced_query_title: '',
      look_project_dialog: false,
      data_row: null,
      increase_from: {
        ident_apply_people: '', // 鉴定申请人
        ident_apply_time: '', // 鉴定申请时间
        ident_part_people: '', // 鉴定参与人员
        ident_reason: '', // 鉴定事由
        ident_audit_opin: '', // 鉴定审核意见
        ident_audit_conc: '', // 鉴定审核结论
        remark: '', // 备注
        enter_pepole: '', //录入人
        enter_time: '', //录入时间
        modify_pepole: '杨那', // 修改人
        modify_time: '2021.02.27  21:34:12' // 修改时间
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
