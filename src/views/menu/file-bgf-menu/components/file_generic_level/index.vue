<template>
  <div class="increase--box" :style="increase_style">
    <div class="increase--title">
      <div class="global-line--bottom global--color-text-main">
        <div class="increase-title--text global--weight">{{ engine_unit_title }}</div>
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
                    <div class="ceil-text">所属案卷</div>
                    <div class="ceil-value">
                      {{ increase_from.belong_book }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">文件档号</div>
                    <div class="ceil-value">
                      <el-input
                        :disabled="true"
                        v-model="increase_from.document_no"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">主题词</div>
                    <div class="ceil-value">
                      <el-input
                        :disabled="true"
                        v-model="increase_from.subject_headings"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">文件题名</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.document_title"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">责任者</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.res_people" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">文图号</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.article_draw"
                        placeholder="请输入"
                      ></el-input>
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
                    <div class="ceil-text">起始日期</div>
                    <div class="ceil-value">
                      <el-date-picker
                        :disabled="true"
                        v-model="increase_from.start_date"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :clearable="false"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">终止日期</div>
                    <div class="ceil-value">
                      <el-date-picker
                        :disabled="true"
                        v-model="increase_from.end_date"
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
                    <div class="ceil-text asterisk_before">载体类型</div>
                    <div class="ceil-value">
                      <el-select v-model="increase_from.carr_type">
                        <el-option
                          v-for="(item, index) in tree_item.carr_type_list"
                          :key="index"
                          :label="item.label"
                          :value="item.prop"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">数量</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.number" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">规格</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.specific" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">提要</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.feed_summary"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">文种</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.record_type" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">稿本</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.manuscript" placeholder="请输入"></el-input>
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
                        :disabled="true"
                        v-model="increase_from.engin_adress"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录入时间</div>
                    <div class="ceil-value">
                      <el-date-picker
                        :disabled="true"
                        v-model="increase_from.archive_date"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :clearable="false"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                </div>
                <div v-if="increase_from.modify_pepole" class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">修改人</div>
                    <div class="ceil-value">
                      <el-input
                        :disabled="true"
                        v-model="increase_from.modify_pepole"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">修改时间</div>
                    <div class="ceil-value">
                      <el-date-picker
                        :disabled="true"
                        v-model="increase_from.modify_time"
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
          <div class="content-title-btn" @click="fun_show_shrink('electric_file')">
            <sz-show-shrink
              :show_shrink="show_shrink.electric_file"
              title="电子文件"
              :increase="true"
              btn_text="上传"
              @fun_increase_click="fun_upload_electric_file"
            />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.electric_file }">
            <sz-table class="table-padding-left30" :config="table_electric_file_list"></sz-table>
          </div>
        </div>
        <div class="content-custom-info increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('custom_info')">
            <sz-show-shrink :show_shrink="show_shrink.custom_info" title="自定义字段信息" />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.custom_info }">
            <div class="content-form-item-box">
              <div class="global-content-form-item">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">bz</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.enter_time" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">LX</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.enter_time" placeholder="请输入"></el-input>
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
  name: 'increase-engine',
  mixins: [mixinAsideShowTrue],
  props: ['tree_item'],
  setup(prop, context) {
    let table_electric_file_list = reactive({
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
        { label: '文件格式', prop: 'file_format', checked: true, width: '200' },
        { label: '文件大小（MB）', prop: 'file_size', checked: true, width: '200' },
        { label: '文件状态', prop: 'file_status', checked: true, width: '200' },
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
              handler: data => fun_look_electric_file(data)
            },
            {
              label: '删除',
              type: 'text',
              event: 'button',
              handler: data => fun_delete_electric_file(data)
            },
            {
              label: '下载',
              type: 'text',
              event: 'button',
              handler: data => fun_download_electric_file(data)
            },
            {
              label: '打印',
              type: 'text',
              event: 'button',
              handler: data => fun_print_electric_file(data)
            }
          ]
        }
      ]
    })

    let contextData = reactive({
      name: '工程(项目)文件级通用著录单',
      title: '工程(项目)文件级通用著录单',
      increase_style: {
        height: document.body.clientHeight - 242 + 'px',
        overflowY: 'scroll'
      },
      increase_from: {
        belong_book: '02', //所属案卷
        document_no: '', //文件档号
        subject_headings: '', //主题词
        document_title: '', //文件题名
        res_people: '', //责任者
        article_draw: '', //文图号
        safe_duration: '', //保管期限
        security_class: '', //密级
        start_date: '', //起始日期
        end_date: '', //终止日期
        carr_type: '', //载体类型
        number: '', //数量
        specific: '', //规格
        feed_summary: '', //提要
        record_type: '', //文种
        manuscript: '', //稿本
        remark: '', //附注
        establish_person: '', //立卷人
        establish_date: '', //立卷日期
        test_field: '', //测试字段显示
        modify_pepole: '杨那', // 修改人
        modify_time: '2021.02.27  21:34:12' // 修改时间
      },
      increase_rules: {
        engin_name: [
          { required: true, message: '请输入工程名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      show_shrink: {
        basic_info: false,
        electric_file: false,
        archive_info: false,
        business_info: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        electric_file: 'block',
        archive_info: 'block',
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
      class_outline_list: [
        {
          label: 'A/综合类',
          prop: 'A',
          children: [
            {
              label: 'A01/政策法规',
              prop: 'A01',
              children: [
                { label: 'A0101/上级1121', prop: 'A0101' },
                { label: 'A0201/国家级', prop: 'A0201' }
              ]
            },
            {
              label: 'A02/会议',
              prop: 'A02',
              children: [
                { label: 'A0201/国家级', prop: 'A0201' },
                { label: 'A0202/省级', prop: 'A0202' }
              ]
            }
          ]
        },
        { label: 'B/城市勘察类', prop: 'Bc' }
      ],
      props: {
        label: 'label',
        value: 'prop'
      },
      engine_unit_title: '工程(项目)文件级通用著录单',
      engine_unit_id: ''
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
      // engine_unit_type_show()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onResize = () => {
      contextData.increase_style = {
        height: document.body.clientHeight - 242 + 'px',
        overflowY: 'scroll'
      }
    }

    watchEffect(() => {
      const { id, type } = prop.tree_item
      contextData.engine_unit_id = id
    })

    const fun_created = () => {
      context.root.$notify({
        title: '案卷级信息添加成功',
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

    const fun_cascader_change = () => {}

    const fun_create_project = () => {}

    const fun_upload_electric_file = () => {
      console.log('整改意见通知单列表')
    }

    const fun_look_electric_file = () => {}

    const fun_delete_electric_file = () => {}

    const fun_download_electric_file = () => {}

    const fun_print_electric_file = () => {}

    const fun_refresh = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      table_electric_file_list,
      ...toRefs(table_electric_file_list),
      fun_created,
      fun_show_shrink,
      fun_cascader_change,
      fun_create_project,
      fun_upload_electric_file,
      fun_look_electric_file,
      fun_delete_electric_file,
      fun_download_electric_file,
      fun_print_electric_file,
      fun_refresh
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
