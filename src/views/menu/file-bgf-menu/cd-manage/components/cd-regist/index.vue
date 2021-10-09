<template>
  <div class="increase--box" :style="increase_style">
    <div class="global-end-center--flex">
      <div class="global-between-center--flex">
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
        <div class="increase-title--text global--weight">{{ title }}</div>
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
                    <div class="ceil-text asterisk_before">移交人</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.handed_over_people"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">移交日期</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.handed_ove_date"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">移交单位</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.handed_ove_unit"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">光盘编号</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.disc_num" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">存放地址</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.store_address"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column global-column-remark">
                    <div class="ceil-text asterisk_before">光盘内容</div>
                    <div class="ceil-value">
                      <el-input
                        type="textarea"
                        v-model="increase_from.disc_content"
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
              </div>
            </div>
          </div>
        </div>
        <div class="content-file-status increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('advice_project')">
            <sz-show-shrink
              :show_shrink="show_shrink.advice_project"
              title="单位工程列表"
              :increase="true"
              @fun_increase_click="fun_increase_project"
            />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.advice_project }">
            <sz-table class="table-padding-left30" :config="table_project_list"></sz-table>
          </div>
        </div>
        <div class="content-file-status increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('pre_files_pro')">
            <sz-show-shrink
              :show_shrink="show_shrink.pre_files_pro"
              title="光盘文件"
              :increase="true"
              btn_text="上传"
              @fun_increase_click="fun_increase_files"
            />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.pre_files_pro }">
            <sz-table class="table-padding-left30" :config="table_files_list"></sz-table>
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
    let table_project_list = reactive({
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
        { label: '工程名称', prop: 'project_name', checked: true, width: '200' },
        { label: '工程地点', prop: 'project_address', checked: true, width: '200' },
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
              handler: data => fun_delete_project(data)
            }
          ]
        }
      ]
    })

    let table_files_list = reactive({
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
        { label: '工程名称', prop: 'project_name', checked: true, width: '200' },
        { label: '文件大小（MB）', prop: 'file_size', checked: true, width: '200' },
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
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '添加项目信息',
      title: '光盘登记信息',
      increase_style: {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll'
      },
      increase_from: {
        handed_over_people: '', // 移交人
        handed_ove_date: '', // 移交日期
        handed_ove_unit: '', // 移交单位
        disc_num: '', //光盘编号
        store_address: '', // 存放地址
        disc_content: '', //光盘内容
        remark: '', //备注
        enter_pepole: '', //录入人
        enter_time: '' //录入时间
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
      spine_width_list: [
        { label: '2cm', prop: 1 },
        { label: '3cm', prop: 2 },
        { label: '4cm', prop: 3 },
        { label: '5cm', prop: 4 },
        { label: '6cm', prop: 5 }
      ],
      show_shrink: {
        basic_info: false,
        advice_project: false,
        pre_files_pro: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        advice_project: 'block',
        pre_files_pro: 'block',
        custom_info: 'block'
      }
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
      files_box_show()
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

    const files_box_show = () => {
      const { id } = context.root.$route.query
      contextData.files_box_id = id
      contextData.title = id ? '光盘登记信息( 修改 )' : '光盘登记信息( 添加 )'
    }

    const fun_go_back = () => {
      // context.root.$router.push({ path: '/business-manage/pre-filestance-files' })
      context.root.$router.go(-1)
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

    const fun_delete_project = row => {}

    const fun_delete_file = row => {
      console.log('光盘文件')
    }

    const fun_create_project = () => {}

    const fun_increase_project = () => {
      console.log('单位工程列表')
    }

    const fun_increase_files = () => {
      console.log('光盘文件')
    }

    return {
      contextData,
      ...toRefs(contextData),
      table_project_list,
      ...toRefs(table_project_list),
      table_files_list,
      ...toRefs(table_files_list),
      fun_go_back,
      fun_save_submit,
      fun_show_shrink,
      fun_delete_project,
      fun_delete_file,
      fun_create_project,
      fun_increase_project,
      fun_increase_files
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
