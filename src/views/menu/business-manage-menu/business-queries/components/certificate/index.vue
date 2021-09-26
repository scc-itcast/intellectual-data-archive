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
                      <el-input v-model="increase_from.eng_name" placeholder="请输入"></el-input>
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
                    <div class="ceil-text">工程地址</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.eng_address" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">勘察单位</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.pros_unit" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">勘察单位</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.pros_unit" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">设计单位</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.design_unit" placeholder="请输入"></el-input>
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
                    <div class="ceil-text">监理单位</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.super_unit" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">开工日期</div>
                    <div class="ceil-value">
                      <el-date-picker
                        v-model="increase_from.ment_date"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :clearable="false"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">竣工日期</div>
                    <div class="ceil-value">
                      <el-date-picker
                        v-model="increase_from.ple_date"
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
                    <div class="ceil-text">总投资(万元)</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.invest_total"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">建筑面积(m²)</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.floor_area" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">结构类型</div>
                    <div class="ceil-value">
                      <el-select v-model="increase_from.struct_type" placeholder="请选择">
                        <el-option
                          v-for="item in struct_type_list"
                          :key="item.prop"
                          :label="item.label"
                          :value="item.prop"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">案卷总数</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.case_file_total"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">文字材料(卷)</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.word_v" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">图纸(卷)</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.draw_v" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">照片(张)</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.photo_z" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录像带(盒)</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.video_b" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">联系人</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.contact_people"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">联系电话</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.contact_phone"
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
        <div class="content-file-status increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('handover_pro')">
            <sz-show-shrink
              :show_shrink="show_shrink.handover_pro"
              title="移交证明书工程列表"
              :increase="true"
              @fun_increase_click="fun_increase_handover"
            />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.handover_pro }">
            <sz-table class="table-padding-left30" :config="table_handover_list" @fun_db_click="fun_db_click"></sz-table>
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
    let table_handover_list = reactive({
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
        { label: '整改意见通知单编号', prop: 'advice_notice_num', checked: true, width: '200' },
        { label: '发放日期', prop: 'issue_date', checked: true, width: '200' },
        { label: '', prop: 'rectify_sug', checked: true, width: '200', type: 'expand_input' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_handover(data)
            }
          ]
        }
      ]
    })

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
        eng_name: '', // 工程名称
        construct_unit: '', // 建设单位
        eng_address: '', // 工程地址
        pros_unit: '', // 勘察单位
        design_unit: '', // 设计单位
        construct_organiza: '', // 施工单位
        super_unit: '', // 监理单位
        ment_date: '', // 开工日期
        ple_date: '', // 竣工日期
        invest_total: '', // 总投资（万元）
        floor_area: '', // 建筑面积（m²）
        struct_type: '', // 结构类型
        case_file_total: '', // 案卷总数
        word_v: '', // 文字材料（卷）
        draw_v: '', // 图纸（卷）
        photo_z: '', // 照片（张）
        video_b: '', // 录像带（盒）
        contact_people: '', // 联系人
        contact_phone: '', // 联系电话
        remark: '', // 备注
        enter_pepole: '', // 录入人
        enter_time: '' // 录入时间
      },
      increase_rules: {
        eng_name: [
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
        handover_pro: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        file_status: 'none',
        handover_pro: 'block',
        custom_info: 'block'
      },
      struct_type_list: [
        { label: '框架', prop: 1 },
        { label: '框剪', prop: 2 },
        { label: '砖混', prop: 3 },
        { label: '排架', prop: 4 },
        { label: '钢结构', prop: 5 },
        { label: '剪力墙', prop: 6 },
        { label: '其他', prop: 7 }
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

    const fun_db_click = row => {
      console.log('双击了')
    }

    const fun_increase_handover = () => {
      console.log('移交证明书工程列表')
    }

    const fun_delete_handover = () => {
      console.log('移交证明书工程列表')
    }

    return {
      contextData,
      ...toRefs(contextData),
      table_handover_list,
      ...toRefs(table_handover_list),
      fun_go_back,
      fun_print_archives,
      fun_save_submit,
      fun_show_shrink,
      fun_label_position,
      fun_create_project,
      fun_db_click,
      fun_increase_handover,
      fun_delete_handover
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
