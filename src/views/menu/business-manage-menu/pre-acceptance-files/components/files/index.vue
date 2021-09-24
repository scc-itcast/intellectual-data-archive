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
                    <div class="ceil-text">编号</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.busi_guide_num"
                        placeholder="请输入"
                      ></el-input>
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
                    <div class="ceil-text">工程名称</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.project_name"
                        placeholder="请输入"
                      ></el-input>
                      <sz-button
                        class="global--ml20"
                        title="关联工程"
                        @click="fun_label_position"
                      ></sz-button>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">工程地点</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.pro_site" placeholder="请输入"></el-input>
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
                    <div class="ceil-text">建筑面积（m²）</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.construct_area"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">工程造价（万元）</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.pro_cost" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">开工日期</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.starts_date" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">拟竣工日期</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.completed_date"
                        placeholder="请输入"
                      ></el-input>
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
                      <el-input
                        v-model="increase_from.enter_pepole"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录入时间</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.enter_time" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-file-status increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('advice_notice')">
            <sz-show-shrink
              :show_shrink="show_shrink.advice_notice"
              title="整改意见通知单列表"
              :increase="true"
              @fun_increase_click="fun_increase_notice"
            />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.advice_notice }">
            <sz-table :config="table_notice_list" @fun_db_click="fun_db_click"></sz-table>
          </div>
        </div>
        <div class="content-file-status increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('pre_accep_pro')">
            <sz-show-shrink
              :show_shrink="show_shrink.pre_accep_pro"
              title="预验收工程列表"
              :increase="true"
              @fun_increase_click="fun_increase_accep"
            />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.pre_accep_pro }">
            <sz-table :config="table_accep_list"></sz-table>
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
    let table_notice_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: false,
      // checkbox: true,
      number: true,
      expand_input: true,
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
              label: '修改',
              type: 'text',
              event: 'button',
              handler: data => fun_modify_notice(data)
            },
            {
              label: '保存',
              type: 'text',
              event: 'button',
              handler: data => fun_save_notice(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_notice(data)
            },
            {
              label: '打印',
              type: 'text',
              event: 'button',
              handler: data => fun_print_notice(data)
            }
          ]
        }
      ]
    })

    let table_accep_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: false,
      // checkbox: true,
      number: true,
      expand_input: true,
      table_height: 676,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '工程名称', prop: 'project_name', checked: true, width: '200' },
        { label: '工程地点', prop: 'project_adress', checked: true, width: '200' },
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
              handler: data => fun_delete_accep(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '添加项目信息',
      title: '建设工程档案报送责任书( 修改 )',
      increase_style: {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll'
      },
      increase_from: {
        busi_guide_num: '', // 编号
        certificate_date: '', // 发证日期
        project_name: '', // 工程名称
        pro_site: '', // 工程地点
        construct_unit: '', // 建设单位
        construct_organiza: '', // 施工单位
        construct_area: '', // 建筑面积（m²）
        pro_cost: '', // 工程造价（万元）
        starts_date: '', // 开工日期
        completed_date: '', // 拟竣工日期
        contact_people: '', // 联系人
        contact_phone: '', // 联系电话
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
      show_shrink: {
        basic_info: true,
        advice_notice: false,
        pre_accep_pro: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'none',
        advice_notice: 'block',
        pre_accep_pro: 'block',
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
      context.root.$router.push({ path: '/business-manage/pre-acceptance-files' })
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

    const fun_db_click = row => {
      console.log('双击了');
    }

    const fun_modify_notice = () => {}

    const fun_save_notice = row => {
      console.log(row)
    }

    const fun_delete_notice = () => {}

    const fun_print_notice = () => {}

    const fun_create_project = () => {}

    const fun_increase_notice = () => {
      console.log('整改意见通知单列表')
    }

    const fun_increase_accep = () => {
      console.log('整改意见通知单列表')
    }

    return {
      contextData,
      ...toRefs(contextData),
      table_notice_list,
      ...toRefs(table_notice_list),
      table_accep_list,
      ...toRefs(table_accep_list),
      fun_go_back,
      fun_save_submit,
      fun_show_shrink,
      fun_label_position,
      fun_db_click,
      fun_modify_notice,
      fun_save_notice,
      fun_delete_notice,
      fun_print_notice,
      fun_create_project,
      fun_increase_notice,
      fun_increase_accep
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
