<template>
  <div class="increase--box">
    <div class="increase--title">
      <div class="">
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
              <div class="global-content-form-item-look">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">档号</div>
                    <div class="ceil-value">
                      {{ increase_from.file_num }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">总登记号</div>
                    <div class="ceil-value">
                      {{ increase_from.total_registration }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">旧档号</div>
                    <div class="ceil-value">
                      {{ increase_from.old_no }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">存放地址</div>
                    <div class="ceil-value global-between-center--flex ceil-value-item">
                      <span>{{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' }}</span>
                      <span>库</span>
                      <span>{{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' }}</span>
                      <span>列</span>
                      <span>{{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' }}</span>
                      <span>节(柜)</span>
                      <span>{{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' }}</span>
                      <span>层</span>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">所属工程</div>
                    <div class="ceil-value">
                      {{ increase_from.subordinate_project }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">案卷题名</div>
                    <div class="ceil-value">
                      {{ increase_from.books_title }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">主题词</div>
                    <div class="ceil-value">
                      {{ increase_from.subject_headings }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">分类大纲</div>
                    <div class="ceil-value">
                      {{ increase_from.class_outline }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">责任者</div>
                    <div class="ceil-value">
                      {{ increase_from.res_people }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">编制单位</div>
                    <div class="ceil-value">
                      {{ increase_from.compile_unit }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">保管期限</div>
                    <div class="ceil-value">
                      {{ increase_from.safe_duration }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">密级</div>
                    <div class="ceil-value">
                      {{ increase_from.security_class }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">编制日期</div>
                    <div class="ceil-value">
                      {{ increase_from.prepare_date_first }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">至</div>
                    <div class="ceil-value">
                      {{ increase_from.prepare_date_second }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">立卷人</div>
                    <div class="ceil-value">
                      {{ increase_from.engin_adress }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">立卷日期</div>
                    <div class="ceil-value">
                      {{ increase_from.archive_date }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">审核人</div>
                    <div class="ceil-value">
                      {{ increase_from.engin_adress }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">审核日期</div>
                    <div class="ceil-value">
                      {{ increase_from.archive_date }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">归档人</div>
                    <div class="ceil-value">
                      {{ increase_from.engin_adress }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">归档时间</div>
                    <div class="ceil-value">
                      {{ increase_from.archive_date }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">备注</div>
                    <div class="ceil-value">
                      {{ increase_from.remark }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录入人</div>
                    <div class="ceil-value">
                      {{ increase_from.engin_adress }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录入时间</div>
                    <div class="ceil-value">
                      {{ increase_from.archive_date }}
                    </div>
                  </div>
                </div>
                <div v-if="increase_from.modify_pepole" class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">修改人</div>
                    <div class="ceil-value">
                      {{ increase_from.modify_pepole }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">修改时间</div>
                    <div class="ceil-value">
                      {{ increase_from.modify_time }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-file-status increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('file_status')">
            <sz-show-shrink :show_shrink="show_shrink.file_status" title="档案状况" />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.file_status }">
            <sz-case-file-status file_status_obj="null" />
          </div>
        </div>
        <div class="content-custom-info increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('custom_info')">
            <sz-show-shrink :show_shrink="show_shrink.custom_info" title="自定义字段信息" />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.custom_info }">
            <div class="content-form-item-box">
              <div class="global-content-form-item-look">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">bz</div>
                    <div class="ceil-value">
                      {{ increase_from.enter_time }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">LX</div>
                    <div class="ceil-value">
                      {{ increase_from.enter_time }}
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
  props: ['tree_item'],
  setup(prop, context) {
    let contextData = reactive({
      name: '工程(项目)案卷级著录单',
      title: '工程(项目)案卷级著录单',
      increase_style: {
        height: document.body.clientHeight - 242 + 'px'
      },
      increase_from: {
        file_num: '', // 档号
        total_registration: '', //总登记号
        old_no: '', //旧档号
        store_address: '', //存放地址
        subordinate_project: '', //所属工程
        books_title: '', //案卷题名
        subject_headings: '', //主题词
        class_outline: '', //分类大纲
        res_people: '', //责任者
        compile_unit: '', //编制单位
        safe_duration: '', //保管期限
        security_class: '', //密级
        prepare_date_first: '', //起始编制日期
        prepare_date_second: '', //结束编制日期
        establish_person: '', //立卷人
        establish_date: '', //立卷日期
        reviewer: '', //审核人
        reviewer_date: '', //审核日期
        archive_people: '', //归档人
        archive_date: '', //归档时间
        remark: '', //备注
        enter_pepole: '', //录入人
        enter_time: '', //录入时间
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
        file_status: true,
        archive_info: false,
        business_info: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        file_status: 'none',
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
      engine_unit_title: '工程(项目)案卷级著录单',
      engine_unit_id: '',
      page_config: {
        id: '',
        type: '',
        modify: false,
        go_btn: false,
        archive_info: true,
        page_height: 242
      }
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })
        
    watchEffect(() => {
      console.log(prop.tree_item);
    })

    const fun_show_shrink = val => {
      contextData.show_shrink[val] = !contextData.show_shrink[val]
      let flag = contextData.show_shrink[val]
      contextData.show_shrink_dispaly[val] = flag ? 'none' : 'block'
    }

    const fun_cascader_change = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      fun_show_shrink,
      fun_cascader_change
    }
  }
}
</script>

<style lang="scss" scoped>
.increase--box {
  // padding: 10px 20px;
  font-size: 16px;
  .increase--title {
    .increase-title--text {
      text-align: center;
      line-height: 46px;
    }
  }
  .increase-content--box {
    margin-top: 7px;
    .increase-content--item {
      .content-title-btn {
        margin-bottom: 27px;
        cursor: pointer;
      }
      .content-width-percent {
        width: 88.7%;
      }
      .content--form {
        transition: all 1s;
        margin-bottom: 27px;
        .content-from-column-height {
          .position_left,
          .position_right {
            height: 204px;
          }
        }
      }
    }
  }
}
</style>
