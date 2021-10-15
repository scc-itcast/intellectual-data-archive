<template>
  <div class="increase--box" :style="increase_style">
    <div class="global-end-center--flex">
      <div class="global-between-center--flex">
        <div class="global--mr20" v-for="(item, index) in button_list" :key="index">
          <sz-button
            :title="item.title"
            :type="item.type"
            @click="fun_button_click(item, index)"
          ></sz-button>
        </div>
        <div v-show="modify_id" class="global-between-center--flex">
          <sz-button title="打印" @click="fun_print_page" class="global--mr20"></sz-button>
          <sz-button title="完成" @click="fun_complete_page" class="global--mr20"></sz-button>
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
    <div class="increase--title">
      <div class="global-line--bottom">
        <div class="increase-title--text"></div>
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
        <el-tabs v-model="active_name" @tab-click="fun_tab_click">
          <el-tab-pane label="利用登记信息" name="use_regist_info">
            <div class="increase--title global--weight" style="margin: 0 0 20px 0;">
              <div class="global-line--bottom">
                <div class="increase-title--text">{{ title }}</div>
              </div>
            </div>
            <div class="content-basic-info increase-content--item">
              <div class="content-title-btn" @click="fun_show_shrink('basic_info')">
                <sz-show-shrink :show_shrink="show_shrink.basic_info" title="基本信息" />
              </div>
              <div class="content--form" :style="{ display: show_shrink_dispaly.basic_info }">
                <div class="content-form-item-box">
                  <div class="global-content-form-item">
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">查档单位</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.whthin_unit"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">证件编号</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.ident_num"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">职务</div>
                        <div class="ceil-value">
                          <el-input v-model="increase_from.job_pos" placeholder="请输入"></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">清点人</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.count_people"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">查档人</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.whthin_people"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">查档人电话</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.whthin_phone"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">查档类型</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.whthin_type"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">数量(张)-文-A4</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.number_text_a4"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">查档日期</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.whthin_type"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">数量(张)-文-A3</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.number_text_a3"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">用途</div>
                        <div class="ceil-value">
                          <el-input v-model="increase_from.use_pos" placeholder="请输入"></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">数量(张)-图</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.number_figure"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">接待人</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.receiver"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">案卷数量</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.case_num"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column global-column-remark">
                        <div class="ceil-text">利用说明</div>
                        <div class="ceil-value">
                          <el-input
                            type="textarea"
                            v-model="increase_from.use_explain"
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
                        <div class="ceil-text">修改人</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.modify_pepole"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">修改时间</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.modify_time"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-case-status increase-content--item">
              <div class="content-title-btn" @click="fun_show_shrink('advice_case')">
                <sz-show-shrink
                  :show_shrink="show_shrink.advice_case"
                  title="案卷信息"
                  :increase="true"
                  @fun_increase_click="fun_increase_case"
                />
              </div>
              <div class="content--form" :style="{ display: show_shrink_dispaly.advice_case }">
                <sz-table :config="table_case_list" @fun_db_click="fun_case_db_click"></sz-table>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="未录入文件信息" name="no_entry_info">
            <div class="file-generic-table">
              <el-table
                ref="multipleTable"
                :data="file_generic_table"
                style="width: 100%"
                :height="table_height"
              >
                <el-table-column type="index" width="20"> </el-table-column>
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column label="文件题名" width="200">
                  <template slot-scope="scope">
                    <span>
                      <el-input
                        type="text"
                        :value="scope.row.document_title"
                        @input="fun_input_handle(scope.row, $event, 'document_title')"
                      >
                      </el-input>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="工程名称" width="200">
                  <template slot-scope="scope">
                    <span>
                      <el-input
                        type="text"
                        :value="scope.row.engin_name"
                        @input="fun_input_handle(scope.row, $event, 'engin_name')"
                      >
                      </el-input>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="文件数量" width="200">
                  <template slot-scope="scope">
                    <span>
                      <el-input
                        type="text"
                        :value="scope.row.document_number"
                        @input="fun_input_handle(scope.row, $event, 'document_number')"
                      >
                      </el-input>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="载体类型" width="100">
                  <template slot-scope="scope">
                    <span>
                      <el-select
                        :value="scope.row.carr_type"
                        @change="fun_input_handle(scope.row, $event, 'carr_type')"
                      >
                        <el-option
                          v-for="(item, index) in carr_type_list"
                          :key="index"
                          :label="item.label"
                          :value="item.prop"
                        >
                        </el-option>
                      </el-select>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="利用类型" width="100">
                  <template slot-scope="scope">
                    <span>
                      <el-select
                        :value="scope.row.use_type"
                        @change="fun_input_handle(scope.row, $event, 'use_type')"
                      >
                        <el-option
                          v-for="(item, index) in use_type_list"
                          :key="index"
                          :label="item.label"
                          :value="item.prop"
                        >
                        </el-option>
                      </el-select>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="备注" width="100">
                  <template slot-scope="scope">
                    <span>
                      <el-input
                        type="text"
                        :value="scope.row.remark"
                        @input="fun_input_handle(scope.row, $event, 'remark')"
                      >
                      </el-input>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <span>
                      <el-button type="text" @click="fun_cancel_case(scope.row, scope.$index)">
                        取消
                      </el-button>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
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
    let table_case_list = reactive({
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
        { label: '借/查阅页次', prop: 'borrow_look_times', checked: true, width: '100' },
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
              handler: data => fun_delete_file(data)
            },
            {
              label: 'pdf',
              type: 'text',
              event: 'button',
              handler: data => fun_file_pdf(data)
            }
          ]
        }
      ],
      thead: [
        { label: '总登记号', prop: 'total_registration', checked: true, width: '80' },
        { label: '案卷题名', prop: 'books_title', checked: true, width: '200' },
        { label: '文A4(张)', prop: 'text_a4', checked: true, width: '80' },
        { label: '文A3(张)', prop: 'text_a3', checked: true, width: '80' },
        { label: '图(张)', prop: 'figure', checked: true, width: '80' },
        { label: '利用类型', prop: 'use_type', checked: true, width: '80' },
        { label: '备注', prop: 'remark', checked: true, width: '100' },
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
              handler: data => fun_modify_case(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_case(data)
            },
            {
              label: '新增',
              type: 'text',
              event: 'button',
              handler: data => fun_increase_file(data)
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
      button_list: {},
      button_list_all: {
        download_page: {
          download_page: { title: '下载', value: '' }
        },
        add_no_entry_file: {
          add_no_entry_file: { title: '添加未录入文件', value: '' }
        }
      },
      increase_from: {
        whthin_unit: '', // 查档单位
        ident_num: '', // 证件编号
        job_pos: '', // 职务
        count_people: '', // 清点人
        whthin_people: '', // 查档人
        whthin_phone: '', // 查档人电话
        whthin_type: '', // 查档类型
        whthin_date: '', // 查档日期
        use_pos: '', // 用途
        number_text_a4: '', // 数量(张)-文-A4
        number_text_a3: '', // 数量(张)-文-A3
        number_figure: '', // 数量(张)-图
        receiver: '', // 接待人
        case_num: '', // 案卷数量
        use_explain: '', // 利用说明
        remark: '', // 备注
        modify_pepole: '杨那', // 修改人
        modify_time: '2021.02.27  21:34:12' // 修改时间
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
      carr_type_list: [
        { label: '文字(张)', prop: '文字(张)' },
        { label: '图纸(张)', prop: '图纸(张)' },
        { label: '底图(张)', prop: '底图(张)' },
        { label: '照片(张)', prop: '照片(张)' },
        { label: '底片(张)', prop: '底片(张)' },
        { label: '载体测试', prop: '载体测试' },
        { label: '录音带(盒)', prop: '录音带(盒)' },
        { label: '录像带(盒)', prop: '录像带(盒)' },
        { label: '光盘(盘)', prop: '光盘(盘)' },
        { label: '计算机磁盘(盘)', prop: '计算机磁盘(盘)' },
        { label: '计算机磁带(盘)', prop: '计算机磁带(盘)' },
        { label: '缩微片(盘)', prop: '缩微片(盘)' },
        { label: '缩微片(张)', prop: '缩微片(张)' },
        { label: '其它', prop: '其它' }
      ],
      use_type_list: [
        { label: '查阅', prop: '查阅' },
        { label: '借阅', prop: '借阅' }
      ],
      show_shrink: {
        basic_info: false,
        advice_case: false,
        business_info: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        advice_case: 'block',
        business_info: 'block',
        custom_info: 'block'
      },
      active_name: 'use_regist_info',
      modify_id: ''
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
      fun_active_name()
    }

    const fun_go_back = () => {
      context.root.$router.go(-1)
    }

    const fun_complete_page = () => {}

    const fun_print_page = () => {}

    const fun_button_click = (item, index) => {
      switch (index) {
        case 'download_page': {
          fun_download_page()
          break
        }
        case 'add_no_entry_file': {
          fun_add_no_entry_file()
          break
        }
        default: {
        }
      }
    }

    const fun_download_page = () => {}

    const fun_add_no_entry_file = () => {}

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

    const fun_tab_click = (tab, event) => {
      // console.log(tab, event, contextData.active_name)
      fun_active_name()
    }

    const fun_active_name = (tab, event) => {
      switch (contextData.active_name) {
        case 'use_regist_info': {
          const btn = contextData.button_list_all.download_page
          const id = contextData.modify_id
          contextData.button_list = id ? btn : {}
          break
        }
        case 'no_entry_info': {
          contextData.button_list = contextData.button_list_all.add_no_entry_file
          break
        }
        default: {
        }
      }
    }

    const fun_case_db_click = row => {
      console.log('案卷信息双击了')
    }

    const fun_increase_case = () => {
      console.log('案卷信息')
    }

    const fun_modify_case = () => {}

    const fun_delete_case = () => {}

    const fun_increase_file = () => {}

    const fun_delete_file = () => {}

    const fun_file_pdf = () => {}

    const fun_no_entry_db_click = row => {
      console.log('未录入文件信息双击了')
    }

    const fun_input_handle = (row, e, text) => {
      context.root.$set(row, text, e)
      // console.log(contextData.file_generic_table)
    }

    const fun_cancel_case = row => {
      console.log('取消未录入文件信息')
    }

    return {
      contextData,
      ...toRefs(contextData),
      table_case_list,
      ...toRefs(table_case_list),
      fun_go_back,
      fun_complete_page,
      fun_print_page,
      fun_button_click,
      fun_save_submit,
      fun_show_shrink,
      fun_create_project,
      fun_tab_click,
      fun_case_db_click,
      fun_increase_case,
      fun_modify_case,
      fun_delete_case,
      fun_increase_file,
      fun_delete_file,
      fun_file_pdf,
      fun_no_entry_db_click,
      fun_input_handle,
      fun_cancel_case
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
