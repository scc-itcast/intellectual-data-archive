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
          <div
            class="content--form content-width-percent"
            :style="{ display: show_shrink_dispaly.basic_info }"
          >
            <div class="global-between-center--flex">
              <div class="content-form-item" id="content-from-height">
                <el-form-item label="工程名称" prop="engin_name">
                  <el-input v-model="increase_from.engin_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="工程地点" prop="engin_adress">
                  <el-input v-model="increase_from.engin_adress" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="建设单位" prop="construct_unit">
                  <el-input v-model="increase_from.construct_unit" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="contact_phone_or">
                  <el-input
                    v-model="increase_from.contact_phone_or"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item label="施工单位" prop="construct_organiza">
                  <el-input
                    v-model="increase_from.construct_organiza"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="contact_phone_un">
                  <el-input
                    v-model="increase_from.contact_phone_un"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item label="设计单位" prop="design_unit">
                  <el-input v-model="increase_from.design_unit" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="content-form-item">
                <div :style="not_set_box_style">
                  <div
                    class="content-form-not-set global-center-center--flex"
                    :style="not_set_style"
                  >
                    未设置
                  </div>
                </div>
                <el-form-item label="勘察单位" prop="pros_unit">
                  <el-input v-model="increase_from.pros_unit" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="">
              <el-form-item label="备注" prop="remark">
                <el-input
                  type="textarea"
                  v-model="increase_from.remark"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="content-file-status increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('file_status')">
            <sz-show-shrink :show_shrink="show_shrink.file_status" title="档案状况" />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.file_status }">
            <file-status></file-status>
          </div>
        </div>
        <div class="content-business-info increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('business_info')">
            <sz-show-shrink :show_shrink="show_shrink.business_info" title="业务信息" />
          </div>
          <div
            class="content--form content-width-percent"
            :style="{ display: show_shrink_dispaly.business_info }"
          >
            <div class="global-between-center--flex">
              <div class="content-form-item">
                <el-form-item label="项目序号" prop="project_number">
                  <el-input v-model="increase_from.project_number" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="移交单位" prop="handed_ove_unit">
                  <el-input v-model="increase_from.handed_ove_unit" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="密级" prop="security_class">
                  <el-select v-model="increase_from.security_class" placeholder="请选择">
                    <el-option
                      v-for="item in security_class_list"
                      :key="item.prop"
                      :label="item.label"
                      :value="item.prop"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="录入时间" prop="enter_time">
                  <el-input v-model="increase_from.enter_time" :disabled="true"></el-input>
                </el-form-item>
              </div>
              <div class="content-form-item">
                <el-form-item label="进馆日期" prop="hen_date">
                  <el-date-picker
                    v-model="increase_from.hen_date"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :clearable="false"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="保管期限" prop="safe_duration">
                  <el-select v-model="increase_from.safe_duration" placeholder="请选择">
                    <el-option
                      v-for="item in safe_duration_list"
                      :key="item.prop"
                      :label="item.label"
                      :value="item.prop"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="录入人" prop="enter_pepole">
                  <el-input v-model="increase_from.enter_pepole" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <div class="content-custom-info increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('custom_info')">
            <sz-show-shrink :show_shrink="show_shrink.custom_info" title="自定义字段信息" />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.custom_info }"></div>
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
  name: 'increase-engine',
  mixins: [mixinAsideShowTrue],
  components: {
    FileStatus
  },
  setup(prop, context) {
    let contextData = reactive({
      name: '添加工程信息',
      title: '其他通用类单位工程级著录单',
      breadcrumb: [
        { path: '/business-manage', title: '业务管理' },
        { path: '/business-manage/project-regist', title: '项目登记' },
        { path: '/business-manage/project-regist/increase-engine', title: '添加工程信息' }
      ],
      increase_style: {
        height: document.body.clientHeight - 160 + 'px',
        overflowY: 'scroll'
      },
      increase_from: {
        engin_name: '', // 工程名称
        engin_adress: '', // 工程地点
        construct_unit: '', // 建设单位
        contact_phone_or: '', // 建设联系电话
        construct_organiza: '', // 施工单位
        contact_phone_un: '', // 施工联系电话
        design_unit: '', // 设计单位
        pros_unit: '', // 勘察单位
        remark: '', // 备注
        project_number: '', // 项目序号
        security_class: '', // 密级
        enter_time: '', // 录入时间
        hen_date: '', // 进馆日期
        handed_ove_unit: '', // 移交单位
        safe_duration: '', // 保管期限
        enter_pepole: '' // 录入人
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
        business_info: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        file_status: 'none',
        business_info: 'block',
        custom_info: 'block'
      },
      security_class_list: [
        { label: '无', prop: 1 },
        { label: '内部', prop: 2 },
        { label: '私密', prop: 3 },
        { label: '机密', prop: 4 },
        { label: '绝密', prop: 5 },
        { label: '1', prop: 6 }
      ],
      safe_duration_list: [
        { label: '短期', prop: 1 },
        { label: '长期', prop: 2 },
        { label: '永久', prop: 3 }
      ],
      not_set_box_style: {
        height: 200 + 'px'
      },
      not_set_style: {
        height: 200 + 'px'
      },
      not_set_style_timer: null
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
      fun_not_set_style()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
      contextData.not_set_style_timer = null
      clearTimeout(contextData.not_set_style_timer)
    })

    const onResize = () => {
      contextData.increase_style = {
        height: document.body.clientHeight - 160 + 'px',
        overflowY: 'scroll'
      }
    }

    const fun_not_set_style = () => {
      contextData.not_set_style_timer = setTimeout(() => {
        let height = document.querySelector('#content-from-height').offsetHeight
        contextData.not_set_box_style = {
          height: height - 62 + 'px'
        }
        contextData.not_set_style = {
          height: height - 62 - 22 + 'px'
        }
      }, 50)
    }

    const fun_go_back = () => {
      context.root.$router.push({ path: '/business-manage/project-regist' })
    }

    const fun_save_submit = () => {
      context.root.$notify({
        title: '工程信息添加成功',
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

    const fun_create_project = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      fun_go_back,
      fun_save_submit,
      fun_show_shrink,
      fun_create_project
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
