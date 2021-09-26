<template>
  <div id="sz-advanced-query" class="look_project">
    <el-dialog
      :title="advanced_query_title"
      :visible.sync="look_handover_dialog"
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
      <div class="look-project-dialog--body" :style="look_handover_style">
        <div class="look-project-body--box">
          <div class="global-look-project-body--title">档案移交书</div>
          <div class="look-project-body--content">
            <div class="content-form-item-box">
              <div class="global-content-form-item-look">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">编号</div>
                    <div class="ceil-value">
                      {{ test_form.serial }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">发证日期</div>
                    <div class="ceil-value">
                      {{ test_form.certificate_date }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">工程名称</div>
                    <div class="ceil-value">
                      {{ test_form.project_name }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">建设单位</div>
                    <div class="ceil-value">
                      {{ test_form.construct_unit }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">负责人</div>
                    <div class="ceil-value">
                      {{ test_form.con_res_people }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">联系电话</div>
                    <div class="ceil-value">
                      {{ test_form.con_contact_phone }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">施工单位</div>
                    <div class="ceil-value">
                      {{ test_form.construct_organiza }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">负责人</div>
                    <div class="ceil-value">
                      {{ test_form.org_res_people }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">联系电话</div>
                    <div class="ceil-value">
                      {{ test_form.org_contact_phone }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">移交人</div>
                    <div class="ceil-value">
                      {{ test_form.handed_over_people }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">联系电话</div>
                    <div class="ceil-value">
                      {{ test_form.handed_contact_phone }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">接收人</div>
                    <div class="ceil-value">
                      {{ test_form.receiver_people }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">密级</div>
                    <div class="ceil-value">
                      {{ test_form.security_class }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">材料总数(张)</div>
                    <div class="ceil-value">
                      {{ test_form.material_num }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">移交日期</div>
                    <div class="ceil-value">
                      {{ test_form.handed_ove_date }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">备注</div>
                    <div class="ceil-value">
                      {{ test_form.remark }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录入人</div>
                    <div class="ceil-value">
                      {{ test_form.enter_pepole }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录入时间</div>
                    <div class="ceil-value">
                      {{ test_form.enter_time }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  props: ['look_handover_obj'],
  setup(prop, context) {
    let contextData = reactive({
      advanced_query_title: '',
      look_handover_dialog: false,
      data_row: null,
      test_form: {
        serial: '(2004)001', // 编号
        certificate_date: '2004-09-02', // 发证日期
        project_name: '万达广场0001（工程1）', // 工程名称
        construct_unit: '', // 建设单位
        con_res_people: '', // 负责人
        con_contact_phone: '', // 联系电话
        construct_organiza: '', // 施工单位
        org_res_people: '', // 负责人
        org_contact_phone: '', // 联系电话
        handed_over_people: '', // 移交人
        handed_contact_phone: '', // 联系电话
        receiver_people: '系统管理员', // 接收人
        security_class: '无', // 密级
        material_num: '', // 材料总数（张）
        handed_ove_date: '2018-02-02', // 移交日期
        remark: '', // 备注
        enter_pepole: '系统管理员', // 录入人
        enter_time: '2018-02-02 19:27:46' // 录入时间
      },
      fullscreen: false,
      look_handover_style: {}
    })

    watchEffect(() => {
      contextData.look_handover_dialog = prop.look_handover_obj.look_handover_dialog
      contextData.data_row = prop.look_handover_obj.row
    })

    const fun_look_project_zoom = () => {
      contextData.fullscreen = !contextData.fullscreen
      contextData.look_handover_style = {}
      if (contextData.fullscreen) {
        contextData.look_handover_style = {
          height: document.body.clientHeight - 109 - 46 + 68 + 'px'
        }
      }
    }

    const fun_look_project_close = () => {
      context.emit('fun_look_handover_close')
    }

    const fun_look_project_submit = () => {
      context.emit('fun_look_handover_close')
    }

    return {
      contextData,
      ...toRefs(contextData),
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
    .look-project-body--content {
      font-size: 14px;
    }
  }
}
.advanced-query--box {
  display: flex;
}
</style>
