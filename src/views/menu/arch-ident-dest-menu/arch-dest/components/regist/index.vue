<template>
  <div>
    <div v-show="home_page_show" class="increase--box" :style="increase_style">
      <div class="global-end-center--flex">
        <div class="global-between-center--flex">
          <div class="global--mr20" v-for="(item, index) in button_list" :key="index">
            <sz-button
              :title="item.title"
              :type="item.type"
              @click="fun_button_click(item, index)"
            ></sz-button>
          </div>
          <sz-button title="返回" @click="fun_go_back"></sz-button>
          <sz-button
            class="global--ml20"
            title="保存"
            type="primary"
            @click="fun_save_submit"
          ></sz-button>
        </div>
      </div>
      <div class="increase--title global--weight" style="margin: 0 0 20px 0;">
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
            <div class="content-basic-info increase-content--item">
              <div class="content-title-btn" @click="fun_show_shrink('basic_info')">
                <sz-show-shrink :show_shrink="show_shrink.basic_info" title="基本信息" />
              </div>
              <div class="content--form" :style="{ display: show_shrink_dispaly.basic_info }">
                <div class="content-form-item-box">
                  <div class="global-content-form-item">
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">销毁人</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.destroy_people"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">销毁日期</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.destroy_time"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">销毁监督人员</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.destroy_super_people"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column global-column-remark">
                        <div class="ceil-text asterisk_before">销毁事由</div>
                        <div class="ceil-value">
                          <el-input
                            type="textarea"
                            v-model="increase_from.destroy_reason"
                            placeholder="请输入"
                            rows="4"
                            resize="none"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column global-column-remark">
                        <div class="ceil-text asterisk_before">销毁结果</div>
                        <div class="ceil-value">
                          <el-input
                            type="textarea"
                            v-model="increase_from.destroy_results"
                            placeholder="请输入"
                            rows="4"
                            resize="none"
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
                          <el-date-picker
                            :disabled="true"
                            v-model="increase_from.enter_time"
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
            <div class="content-case-status increase-content--item">
              <div class="content-title-btn" @click="fun_show_shrink('advice_ident')">
                <sz-show-shrink
                  :show_shrink="show_shrink.advice_ident"
                  title="鉴定列表"
                  :increase="true"
                  @fun_increase_click="fun_increase_ident"
                />
              </div>
              <div
                class="content--form file-generic-table"
                :style="{ display: show_shrink_dispaly.advice_ident }"
              >
                <sz-table :config="table_case_list"></sz-table>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div v-show="!home_page_show" class="increase-case">
      <div class="increase-case-top--box global--flex">
        <div class="top-btn--box global--flex">
          <sz-button title="返回" type="primary" @click="fun_switch"></sz-button>
          <sz-button class="global--ml20" title="查询" @click="fun_advanced_query"></sz-button>
        </div>
      </div>
      <template>
        <div class="table-list--box">
          <sz-table
            class="table-padding-left30"
            :config="increase_case_list"
            @fun_db_click="fun_increase_db_click"
          ></sz-table>
        </div>
      </template>
    </div>
    <div v-if="advanced_query_obj_show">
      <sz-advanced-query
        :advanced_query_obj="advanced_query_obj"
        @fun_advanced_query_close="fun_advanced_query_close"
      />
    </div>
    <div v-if="look_project_obj_show">
      <look-project
        :look_project_obj="look_project_obj"
        @fun_look_project_close="fun_look_project_close"
      />
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
import LookProject from '@/views/menu/arch-ident-dest-menu/components/regist/look_project.vue'
export default {
  name: 'increase-project',
  components: {
    LookProject
  },
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let table_case_list = reactive({
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
        { label: '总登记号', prop: 'total_registration', checked: true, width: '80' },
        { label: '案卷题名', prop: 'books_title', checked: true, width: '200' },
        { label: '案卷档号', prop: 'books_no', checked: true, width: '100' },
        { label: '存放位置', prop: 'stor_location', checked: true, width: '100' },
        { label: '归档时间', prop: 'archive_date', checked: true, width: '100' },
        { label: '文字材料(张)', prop: 'sub_word_z', checked: true, width: '100' },
        { label: '图纸材料(张)', prop: 'sub_draw_v', checked: true, width: '100' },
        { label: '其他材料数量', prop: 'other_materi_num', checked: true, width: '100' },
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
              handler: data => fun_delete_case(data)
            },
            {
              label: '查看',
              type: 'text',
              event: 'button',
              handler: data => fun_look_project(data)
            }
          ]
        }
      ]
    })

    let increase_case_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: true,
      // expand: true,
      table_height: 362,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '总登记号', prop: 'total_registration', checked: true, width: '80' },
        { label: '案卷题名', prop: 'books_title', checked: true, width: '200' },
        { label: '档号', prop: 'no', checked: true, width: '100' },
        { label: '存放地址', prop: 'stor_address', checked: true, disabled: true, width: '80' },
        { label: '保管期限', prop: 'safe_duration', checked: true, width: '80' },
        { label: '密级', prop: 'security_class', checked: true, width: '80' },
        { label: '起始时间', prop: 'prepare_date_first', checked: true, width: '100' },
        { label: '终止时间', prop: 'prepare_date_second', checked: true, width: '100' },
        { label: '编制单位', prop: 'compile_unit', checked: true, width: '100' },
        { label: '附注', prop: 'remark', checked: true, width: '150' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '查看',
              type: 'text',
              event: 'button',
              handler: data => fun_look_project(data)
            },
            {
              label: '取消',
              type: 'text',
              event: 'button',
              handler: data => fun_cancel_project(data)
            },
            {
              label: '添加',
              type: 'text',
              event: 'button',
              handler: data => fun_increase_project(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '添加项目信息',
      title: '档案鉴定登记信息( 修改 )',
      increase_style: {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll'
      },
      button_list: {},
      button_list_all: {
        modify: {
          export: { title: '导出', value: '' },
          submit: { title: '提交', value: '' }
        }
      },
      increase_from: {
        destroy_people: '', // 销毁人
        destroy_time: '', // 销毁日期
        destroy_super_people: '', // 销毁监督人员
        destroy_reason: '', // 销毁事由
        destroy_results: '', // 销毁结果
        remark: '', // 备注
        enter_pepole: '', //录入人
        enter_time: '' //录入时间
      },
      increase_rules: {
        receive_date: [
          { required: true, message: '请输入接收日期', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        file_receiver: [
          { required: true, message: '请输入项目类型', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      file_generic_table: [
        {
          document_title: '', // 文件题名
          engin_name: '', // 工程名称
          document_number: '', // 文件数量
          carr_type: '', // 载体类型
          use_type: '', // 利用类型
          remark: '' // 备注
        }
      ],
      table_height: document.body.clientHeight - 284,
      show_shrink: {
        basic_info: false,
        advice_ident: false,
        business_info: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        advice_ident: 'block',
        business_info: 'block',
        custom_info: 'block'
      },
      safe_duration_list: [
        { label: '短期', prop: 1 },
        { label: '长期', prop: 2 },
        { label: '永久', prop: 3 }
      ],
      security_class_list: [
        { label: '无', prop: 1 },
        { label: '内部', prop: 2 },
        { label: '私密', prop: 3 },
        { label: '机密', prop: 4 },
        { label: '绝密', prop: 5 },
        { label: '1', prop: 6 }
      ],
      arch_dest_list: [
        { label: '否', prop: 1 },
        { label: '是', prop: 2 }
      ],
      modify_id: '',
      delete_current_row: null,
      look_project_obj: {
        look_project_dialog: false,
        row: null
      },
      look_project_obj_show: false,
      home_page_show: true,
      advanced_query_obj: {
        advanced_query_dialog: false,
        project_query_disabled: false,
        type_query_value: 2,
        query_field_list: []
      },
      advanced_query_obj_show: false
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
      fun_init()
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

    const fun_init = () => {
      const { id, type } = context.root.$route.query
      contextData.modify_id = id
      const btn = contextData.button_list_all.modify
      contextData.button_list = id ? btn : {}
      const title = id ? '修改' : '新增'
      contextData.title = `档案鉴定登记信息( ${title} )`
    }

    const fun_go_back = () => {
      context.root.$router.go(-1)
    }

    const fun_button_click = (item, index) => {
      switch (index) {
        case 'export': {
          fun_export()
          break
        }
        case 'submit': {
          fun_submit()
          break
        }
        default: {
        }
      }
    }

    const fun_export = () => {}

    const fun_submit = () => {}

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

    const fun_create_project = () => {}

    const fun_increase_ident = () => {
      console.log('鉴定列表')
      contextData.home_page_show = false
    }

    const fun_input_handle = (row, e, text) => {
      context.root.$set(row, text, e)
      // console.log(contextData.file_generic_table)
    }

    const fun_delete_case = row => {
      contextData.delete_current_row = row
      context.root.$confirm('', '', {
        title: '',
        message: '记录删除后不可恢复,是否删除记录？',
        center: true, // 是否使用圆角按钮
        lockScroll: true, // 是否在 MessageBox 出现时将 body 滚动锁定
        callback: fun_delete_callback // 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
      })
    }

    const fun_delete_callback = (action, instance) => {
      // console.log(action, contextData.delete_current_row)
      let row = contextData.delete_current_row
      if (action == 'cancel') {
        context.root.$notify({
          title: '提示信息',
          message: '取消删除',
          iconClass: 'iconfont happy-full', // 自定义图标的类名。若设置了 type，则 iconClass 会被覆盖
          position: 'bottom-right', // 自定义弹出位置
          duration: 2000 // 显示时间, 毫秒。设为 0 则不会自动关闭
        })
        return
      }
      context.root.$notify({
        title: '提示信息',
        message: '删除成功',
        iconClass: 'iconfont guilian', // 自定义图标的类名。若设置了 type，则 iconClass 会被覆盖
        position: 'bottom-right', // 自定义弹出位置
        duration: 2000 // 显示时间, 毫秒。设为 0 则不会自动关闭
      })
    }

    const fun_look_project = row => {
      contextData.look_project_obj.look_project_dialog = true
      contextData.look_project_obj.row = JSON.parse(JSON.stringify(row))
      contextData.look_project_obj_show = true
    }

    const fun_look_project_close = val => {
      console.log(val)
      contextData.look_project_obj.look_project_dialog = false
      contextData.look_project_obj_show = false
    }

    const fun_switch = () => {
      contextData.home_page_show = true
    }

    const fun_advanced_query = () => {
      contextData.advanced_query_obj.query_field_list = JSON.parse(
        JSON.stringify(increase_case_list.thead)
      )
      contextData.advanced_query_obj.advanced_query_dialog = true
      contextData.advanced_query_obj_show = true
    }

    const fun_advanced_query_close = () => {
      contextData.advanced_query_obj.advanced_query_dialog = false
      contextData.advanced_query_obj_show = false
    }

    const fun_increase_db_click = row => {
      fun_look_project(row)
    }

    const fun_cancel_project = row => {}

    const fun_increase_project = row => {}

    return {
      contextData,
      ...toRefs(contextData),
      table_case_list,
      ...toRefs(table_case_list),
      increase_case_list,
      ...toRefs(increase_case_list),
      fun_go_back,
      fun_button_click,
      fun_save_submit,
      fun_show_shrink,
      fun_create_project,
      fun_increase_ident,
      fun_input_handle,
      fun_delete_case,
      fun_look_project,
      fun_look_project_close,
      fun_switch,
      fun_advanced_query,
      fun_advanced_query_close,
      fun_increase_db_click,
      fun_cancel_project,
      fun_increase_project
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
