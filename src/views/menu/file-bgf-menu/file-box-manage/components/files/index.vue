<template>
  <div class="increase--box" :style="increase_style">
    <div class="global-end-center--flex">
      <div class="global-between-center--flex">
        <div v-if="files_box_id" class="global--ml20" v-for="(item, index) in button_list" :key="index">
          <sz-button
            :title="item.title"
            :type="item.type"
            @click="fun_button_click(item, index)"
            size="medium"
          ></sz-button>
        </div>
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
                    <div class="ceil-text asterisk_before">盒名称</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.box_name" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">盒档号</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.box_no" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">盒编号</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.box_num" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">编制单位</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.pro_site" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">盒整理人</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.box_tidy_p" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">保管期限</div>
                    <div class="ceil-value">
                      <el-select v-model="increase_from.safe_duration" placeholder="请选择">
                        <el-option
                          v-for="item in safe_duration_list"
                          :key="item.prop"
                          :label="item.label"
                          :value="item.prop"
                        >
                        </el-option>
                      </el-select>
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
                    <div class="ceil-text">存放地址</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.store_address"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">所属单元格</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.own_cell" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">背脊宽度</div>
                    <div class="ceil-value">
                      <el-select v-model="increase_from.spine_width" placeholder="请选择">
                        <el-option
                          v-for="item in spine_width_list"
                          :key="item.prop"
                          :label="item.label"
                          :value="item.prop"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">盒内案卷数</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.files_box_num"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">编制日期</div>
                    <div class="ceil-value">
                      <el-date-picker
                        v-model="increase_from.prepare_date_first"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :clearable="false"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">至</div>
                    <div class="ceil-value">
                      <el-date-picker
                        v-model="increase_from.prepare_date_second"
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
          <div class="content-title-btn" @click="fun_show_shrink('pre_files_pro')">
            <sz-show-shrink
              :show_shrink="show_shrink.pre_files_pro"
              title="案卷列表"
              :increase="true"
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
        { label: '案卷题名', prop: 'project_name', checked: true, width: '200' },
        { label: '案卷档号', prop: 'project_adress', checked: true, width: '200' },
        {
          label: '操作',
          prop: 'operation',
          checked: true,
          width: '200',
          type: 'operation',
          disabled: true,
          buttonGroup: [
            {
              label: '打印封面',
              type: 'text',
              event: 'button',
              handler: data => fun_print_cover(data)
            },
            {
              label: '打印目录',
              type: 'text',
              event: 'button',
              handler: data => fun_print_directory(data)
            },
            {
              label: '打印备考表',
              type: 'text',
              event: 'button',
              handler: data => fun_print_table(data)
            },
            {
              label: '取消关联',
              type: 'text',
              event: 'button',
              handler: data => fun_cancel_associated(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '添加项目信息',
      title: '档案盒信息',
      increase_style: {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll'
      },
      increase_from: {
        box_name: '', // 盒名称
        box_no: '', // 盒档号
        box_num: '', // 盒编号
        compile_unit: '', //编制单位
        box_tidy_p: '', // 盒整理人
        safe_duration: '', //保管期限
        security_class: '', //密级
        store_address: '', //存放地址
        own_cell: '', // 所属单元格
        spine_width: '', // 背脊宽度
        files_box_num: '', // 盒内案卷数
        prepare_date_first: '', //编制日期 开始日期
        prepare_date_second: '', //至 结束日期
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
      button_list: {
        print_cover: { title: '打印封面', value: '' },
        print_back: { title: '打印脊背', value: '' },
        print_directory: { title: '打印目录', value: '' },
        print_table: { title: '打印备考表', value: '' }
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
        pre_files_pro: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        pre_files_pro: 'block',
        custom_info: 'block'
      },
      files_box_id: ''
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
      contextData.title = id ? '档案盒信息( 修改 )' : '档案盒信息( 添加 )'
    }

    const fun_go_back = () => {
      // context.root.$router.push({ path: '/business-manage/pre-filestance-files' })
      context.root.$router.go(-1)
    }

    const fun_button_click = (item, index) => {
      switch (index) {
        case 'print_cover': {
          fun_print_cover(item)
          break
        }
        case 'print_back': {
          fun_print_back(item)
          break
        }
        case 'print_directory': {
          fun_print_directory(item)
          break
        }
        case 'print_table': {
          fun_print_table(item)
          break
        }
        default: {
        }
      }
    }

    const fun_print_cover = item => {}

    const fun_print_back = item => {}

    const fun_print_directory = item => {}

    const fun_print_table = item => {}

    const fun_cancel_associated = item => {}

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

    const fun_increase_files = () => {
      console.log('案卷列表')
    }

    return {
      contextData,
      ...toRefs(contextData),
      table_files_list,
      ...toRefs(table_files_list),
      fun_go_back,
      fun_button_click,
      fun_save_submit,
      fun_show_shrink,
      fun_print_cover,
      fun_print_directory,
      fun_print_table,
      fun_cancel_associated,
      fun_print_back,
      fun_increase_files
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
