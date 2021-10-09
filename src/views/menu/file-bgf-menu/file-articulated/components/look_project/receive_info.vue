<template>
  <div class="increase--box">
    <div class="increase-content--box">
      <el-form
        :model="increase_from"
        :rules="increase_rules"
        ref="increase_ref"
        label-width="100px"
        class="increase-content--form"
      >
        <div class="content-basic-info increase-content--item">
          <div class="content--form">
            <div class="content-form-item-box">
              <div class="global-content-form-item-look">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">项目名称</div>
                    <div class="ceil-value">
                      {{ increase_from.receive_date }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">档案接收人</div>
                    <div class="ceil-value">
                      {{ increase_from.file_receiver }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">卷数</div>
                    <div class="ceil-value">
                      {{ increase_from.volume }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">审核工作日</div>
                    <div class="ceil-value">
                      {{ increase_from.audit_day }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">报送文字材料(张)</div>
                    <div class="ceil-value">
                      {{ increase_from.submit_word_z }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">报送图纸材料(张)</div>
                    <div class="ceil-value">
                      {{ increase_from.sub_draw_z }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">报送文字材料(卷)</div>
                    <div class="ceil-value">
                      {{ increase_from.submit_word_v }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">报送图纸材料(卷)</div>
                    <div class="ceil-value">
                      {{ increase_from.sub_draw_v }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">报送照片材料(张)</div>
                    <div class="ceil-value">
                      {{ increase_from.sub_photo_z }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">报送录像带材料(盘)</div>
                    <div class="ceil-value">
                      {{ increase_from.report_video_p }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">送审人</div>
                    <div class="ceil-value">
                      {{ increase_from.peview_people }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">联系电话</div>
                    <div class="ceil-value">
                      {{ increase_from.contact_phone }}
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
      </el-form>
    </div>
  </div>
</template>

<script>
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import {
  onMounted,
  onBeforeUnmount,
  computed,
  reactive,
  watchEffect,
  toRefs
} from '@vue/composition-api'
export default {
  name: 'increase-project',
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let contextData = reactive({
      name: '添加项目信息',
      title: '项目级著录单',
      increase_from: {
        receive_date: '', // 接收日期
        file_receiver: '', // 档案接收人
        volume: '', // 卷数
        audit_day: '', // 审核工作日
        submit_word_z: '', // 报送文字材料（张）
        sub_draw_z: '', // 报送图纸材料（张）
        submit_word_v: '', // 报送文字材料（卷）
        sub_draw_v: '', // 报送图纸材料（卷）
        sub_photo_z: '', // 报送照片材料（张）
        report_video_p: '', // 报送录像带材料（盘）
        peview_people: '', // 送审人
        contact_phone: '', // 联系电话
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
      project_type_more_info: true
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })

    const fun_save_submit = () => {
      context.root.$notify({
        title: '项目信息添加成功',
        message: '即将跳转到上级',
        iconClass: 'iconfont iconfont guilian',
        position: 'bottom-right',
        duration: 2000
      })
    }

    const fun_label_position = () => {}

    const fun_create_project = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      fun_save_submit,
      fun_label_position,
      fun_create_project
    }
  }
}
</script>

<style lang="scss" scoped>
.increase--box {
  // padding: 10px 20px;
  font-size: 16px;
  .increase--title {
    .increase-title--text {
      text-align: center;
      line-height: 46px;
    }
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
}
</style>
