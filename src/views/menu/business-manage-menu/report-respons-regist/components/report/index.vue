<template>
  <div class="increase--box" :style="increase_style">
    <div class="global-end-center--flex">
      <div class="global-between-center--flex">
        <sz-button title="返回" @click="fun_go_back"></sz-button>
        <sz-button
          class="global--ml20"
          title="保存"
          type="primary"
          @click="fun_save_submit"
        ></sz-button>
      </div>
    </div>
    <div class="increase--title">
      <div class="global-line--bottom">
        <div class="increase-title--text">{{ title }}</div>
      </div>
    </div>
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
              <div class="global-content-form-item">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">项目名称</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.project_name"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">项目地点</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.project_adress"
                        placeholder="请输入"
                      ></el-input>
                      <sz-button
                        class="global--ml20"
                        title="标注位置"
                        @click="fun_label_position"
                      ></sz-button>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">建设单位</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.construct_unit"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column global-column-remark">
                    <div class="ceil-text">备注</div>
                    <div class="ceil-value">
                      <el-input
                        type="textarea"
                        v-model="increase_from.remark"
                        placeholder="请输入"
                        rows="4"
                        resize="none"
                      ></el-input>
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
import FileStatus from '@/views/menu/business-manage-menu/project-regist/components/fileStatus.vue'
export default {
  name: 'increase-project',
  mixins: [mixinAsideShowTrue],
  components: {
    FileStatus
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '添加项目信息',
      title: '项目级著录单',
      increase_style: {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll'
      },
      increase_from: {
        project_name: '', // 项目名称
        project_adress: '', // 项目地点
        construct_unit: '', // 建设单位
        project_type: '', // 项目类型
        d_construct_unit: '', // 代建单位
        project_appr_number: '', // 立项批准文号
        project_appr_unit: '', // 立项批准单位
        plan_permis_number: '', // 规划许可证号
        design_unit: '', // 设计单位
        plan_permit_number: '', // 用地规划许可证号
        super_unit: '', // 监理单位
        certificate_number: '', // 国有土地使用证号
        pros_unit: '', // 勘察单位
        const_permit_number: '', // 施工许可证号
        remark: '', // 备注
        project_number: '', // 项目序号
        hen_date: '', // 进馆日期
        handed_ove_unit: '', // 移交单位
        enter_pepole: '', // 录入人
        enter_time: '', // 录入时间
        test_field: '' // 测试字段显示
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
        file_status: true,
        business_info: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        file_status: 'none',
        business_info: 'block',
        custom_info: 'block'
      }
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onResize = () => {
      contextData.increase_style = {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll'
      }
    }

    const fun_go_back = () => {
      context.root.$router.push({ path: '/business-manage/report-respons-regist' })
    }

    const fun_save_submit = () => {
      context.root.$notify({
        title: '项目信息添加成功',
        message: '即将跳转到上级',
        iconClass: 'iconfont iconfont guilian',
        position: 'bottom-right',
        duration: 2000
      })
    }

    const fun_show_shrink = val => {
      contextData.show_shrink[val] = !contextData.show_shrink[val]
      let flag = contextData.show_shrink[val]
      contextData.show_shrink_dispaly[val] = flag ? 'none' : 'block'
    }

    const fun_label_position = () => {}

    const fun_create_project = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      fun_go_back,
      fun_save_submit,
      fun_show_shrink,
      fun_label_position,
      fun_create_project
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
