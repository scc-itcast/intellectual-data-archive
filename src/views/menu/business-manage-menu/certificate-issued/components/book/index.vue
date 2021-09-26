<template>
  <div class="increase--box" :style="increase_style">
    <div class="global-end-center--flex">
      <div class="global-between-center--flex">
        <sz-button title="打印档案移交书" @click="fun_print_archives"></sz-button>
        <sz-button class="global--ml20" title="返回" @click="fun_go_back"></sz-button>
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
                    <div class="ceil-text">编号</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.serial" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">发证日期</div>
                    <div class="ceil-value">
                      <el-date-picker
                        v-model="increase_from.certificate_date"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :clearable="false"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">工程名称</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.project_name"
                        placeholder="请输入"
                      ></el-input>
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
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">负责人</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.con_res_people"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">联系电话</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.con_contact_phone"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">施工单位</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.construct_organiza"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">负责人</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.org_res_people"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">联系电话</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.org_contact_phone"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">移交人</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.handed_over_people"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">联系电话</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.handed_contact_phone"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">接收人</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.receiver_people"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">密级</div>
                    <div class="ceil-value">
                      <el-select v-model="increase_from.security_class" placeholder="请选择">
                        <el-option
                          v-for="item in security_class_list"
                          :key="item.prop"
                          :label="item.label"
                          :value="item.prop"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">材料总数(张)</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.handed_over_people"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">移交日期</div>
                    <div class="ceil-value">
                      <el-date-picker
                        v-model="increase_from.handed_ove_date"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :clearable="false"
                      >
                      </el-date-picker>
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
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录入人</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.hen_date" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录入时间</div>
                    <div class="ceil-value">
                      <el-date-picker
                        v-model="increase_from.test_field"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :clearable="false"
                      >
                      </el-date-picker>
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
      increase_style: {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll'
      },
      increase_from: {
        serial: '', // 编号
        certificate_date: '', // 发证日期
        project_name: '', // 工程名称
        construct_unit: '', // 建设单位
        con_res_people: '', // 负责人
        con_contact_phone: '', // 联系电话
        construct_organiza: '', // 施工单位
        org_res_people: '', // 负责人
        org_contact_phone: '', // 联系电话
        handed_over_people: '', // 移交人
        handed_contact_phone: '', // 联系电话
        receiver_people: '', // 接收人
        security_class: '', // 密级
        material_num: '', // 材料总数（张）
        handed_ove_date: '', // 移交日期
        remark: '', // 备注
        enter_pepole: '', // 录入人
        enter_time: '' // 录入时间
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
      project_type_more_info: false,
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
      ]
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
      // context.root.$router.push({ path: '/business-manage/project-regist' })
      context.root.$router.go(-1)
    }

    const fun_print_archives = () => {}

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
      fun_print_archives,
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
