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
          <div class="global-look-project-body--title">档案移交证明书</div>
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
                    <div class="ceil-text">工程地址</div>
                    <div class="ceil-value">
                      {{ test_form.eng_address }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">勘察单位</div>
                    <div class="ceil-value">
                      {{ test_form.pros_unit }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">设计单位</div>
                    <div class="ceil-value">
                      {{ test_form.design_unit }}
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
                    <div class="ceil-text">监理单位</div>
                    <div class="ceil-value">
                      {{ test_form.super_unit }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">开工日期</div>
                    <div class="ceil-value">
                      {{ test_form.ment_date }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">竣工日期</div>
                    <div class="ceil-value">
                      {{ test_form.ple_date }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">总投资(万元)</div>
                    <div class="ceil-value">
                      {{ test_form.invest_total }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">建筑面积(m²)</div>
                    <div class="ceil-value">
                      {{ test_form.floor_area }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">结构类型</div>
                    <div class="ceil-value">
                      {{ test_form.struct_type }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">案卷总数</div>
                    <div class="ceil-value">
                      {{ test_form.case_file_total }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">文字材料(卷)</div>
                    <div class="ceil-value">
                      {{ test_form.word_v }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">图纸(卷)</div>
                    <div class="ceil-value">
                      {{ test_form.draw_v }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">照片(张)</div>
                    <div class="ceil-value">
                      {{ test_form.photo_z }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录像带(盒)</div>
                    <div class="ceil-value">
                      {{ test_form.video_b }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">联系人</div>
                    <div class="ceil-value">
                      {{ test_form.contact_people }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">联系电话</div>
                    <div class="ceil-value">
                      {{ test_form.contact_phone }}
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
        serial: '(2006)001', // 编号
        certificate_date: '2006-03-12', // 发证日期
        eng_name: '石门大桥1期', // 工程名称
        construct_unit: '中铁十七局', // 建设单位
        eng_address: '重庆市南岸区', // 工程地址
        pros_unit: '', // 勘察单位
        design_unit: '', // 设计单位
        construct_organiza: '', // 施工单位
        super_unit: '', // 监理单位
        ment_date: '', // 开工日期
        ple_date: '', // 竣工日期
        invest_total: '', // 总投资（万元）
        floor_area: '', // 建筑面积（m²）
        struct_type: '', // 结构类型
        case_file_total: '0', // 案卷总数
        word_v: '0', // 文字材料（卷）
        draw_v: '0', // 图纸（卷）
        photo_z: '0', // 照片（张）
        video_b: '0', // 录像带（盒）
        contact_people: '', // 联系人
        contact_phone: '', // 联系电话
        remark: '', // 备注
        enter_pepole: '系统管理员', // 录入人
        enter_time: '2018-02-28 16:23:33' // 录入时间
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
