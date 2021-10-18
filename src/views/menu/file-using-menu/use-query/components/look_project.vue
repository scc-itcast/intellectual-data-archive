<template>
  <div id="sz-advanced-query" class="look_project tabs-none">
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
                        <div class="ceil-text">组名称</div>
                        <div class="ceil-value">
                          {{ increase_from.group_name }}
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
                          {{ increase_from.engin_adress }}
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">录入时间</div>
                        <div class="ceil-value">
                          {{ increase_from.archive_date }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content-from--tabs">
                    <el-tabs v-model="active_name" @tab-click="fun_tab_click">
                      <el-tab-pane label="案卷信息" name="case_file_info">
                        <sz-table :config="case_file_info_list"></sz-table>
                      </el-tab-pane>
                      <el-tab-pane label="未录入信息" name="no_entry_info">
                        <sz-table :config="no_entry_info_list"></sz-table>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <!-- <template slot="footer">
        <div class="advanced-query--box">
          <sz-button title="取消" @click="fun_look_project_close"></sz-button>
          <sz-button
            class="global--ml20"
            title="归还"
            type="primary"
            @click="fun_look_project_submit"
          ></sz-button>
        </div>
      </template> -->
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['look_project_obj'],
  setup(prop, context) {
    let case_file_info_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: false,
      // checkbox: true,
      number: true,
      expand: true,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      children_thead: [
        { label: '文件题名', prop: 'document_title', checked: true, disabled: true, width: '200' },
        { label: '文件数量', prop: 'document_number', checked: true, width: '80' },
        { label: '载体类型', prop: 'carr_type', checked: true, width: '100' },
        { label: '借/查阅页次', prop: 'borrow_look_times', checked: true, width: '100' }
      ],
      thead: [
        { label: '总登记号', prop: 'total_registration', checked: true, width: '80' },
        { label: '案卷题名', prop: 'books_title', checked: true, width: '200' },
        { label: '文A4(张)', prop: 'text_a4', checked: true, width: '80' },
        { label: '文A3(张)', prop: 'text_a3', checked: true, width: '80' },
        { label: '图(张)', prop: 'figure', checked: true, width: '80' },
        { label: '利用类型', prop: 'use_type', checked: true, width: '80' },
        { label: '备注', prop: 'remark', checked: true, width: '100' }
      ]
    })

    let no_entry_info_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: false,
      // checkbox: true,
      number: true,
      expand: false,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '文件题名', prop: 'document_title', checked: true, disabled: true, width: '200' },
        { label: '工程名称', prop: 'engin_name', checked: true, disabled: true, width: '200' },
        { label: '文件数量', prop: 'document_number', checked: true, width: '80' },
        { label: '载体类型', prop: 'carr_type', checked: true, width: '100' },
        { label: '利用类型', prop: 'use_type', checked: true, width: '80' },
        { label: '备注', prop: 'remark', checked: true, width: '100' }
      ]
    })

    let contextData = reactive({
      advanced_query_title: '',
      look_project_dialog: false,
      data_row: null,
      increase_from: {
        restitutor: '', // 归还人
        restitutor_phone: '', // 归还人电话
        restitutor_unit: '', // 归还人单位
        receiver: '', // 接待人
        use_effect: '' // 利用效果
      },
      increase_rules: {
        engin_name: [
          { required: true, message: '请输入工程名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      show_shrink: {
        basic_info: false,
        file_status: true,
        archive_info: false,
        business_info: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        file_status: 'none',
        archive_info: 'block',
        business_info: 'block',
        custom_info: 'block'
      },
      fullscreen: false,
      look_project_style: {},
      active_name: 'case_file_info'
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
      context.emit('fun_look_project_close', '归还')
    }

    const fun_tab_click = (tab, event) => {
      // console.log(tab, event, contextData.active_name)
    }

    const fun_case_selection_change = val => {
      console.log(val)
    }

    const fun_no_entry_selection_change = val => {
      console.log(val)
    }

    const fun_show_shrink = val => {
      contextData.show_shrink[val] = !contextData.show_shrink[val]
      let flag = contextData.show_shrink[val]
      contextData.show_shrink_dispaly[val] = flag ? 'none' : 'block'
    }

    return {
      contextData,
      ...toRefs(contextData),
      case_file_info_list,
      ...toRefs(case_file_info_list),
      no_entry_info_list,
      ...toRefs(no_entry_info_list),
      fun_show_shrink,
      fun_look_project_zoom,
      fun_look_project_close,
      fun_look_project_submit,
      fun_tab_click,
      fun_case_selection_change,
      fun_no_entry_selection_change
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
    .look-project-body--content {
      font-size: 14px;
    }
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
        .content-from--tabs {
          border: 1px solid $color-line-1;
          border-top: 0;
          padding: 0 0 10px 0;
        }
      }
    }
  }
}
.advanced-query--box {
  display: flex;
}
</style>
