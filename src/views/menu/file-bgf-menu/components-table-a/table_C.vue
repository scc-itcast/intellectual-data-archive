// 三级树形表格
<template>
  <div class="increase--box" :style="increase_style">
    <template>
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
          <!-- 基本信息 -->
          <div class="content-basic-info increase-content--item">
            <div class="content-title-btn" @click="fun_show_shrink('basic_info')">
              <sz-show-shrink :show_shrink="show_shrink.basic_info" title="基本信息" />
            </div>
            <div class="content--form" :style="{ display: show_shrink_dispaly.basic_info }">
              <div class="content-form-item-box">
                <div class="global-content-form-item">
                  <!-- 档号 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">档号</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.No" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">总登记号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.total_registration"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <!-- 旧档号	 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">旧档号</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.old_no" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">存放地址</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.store_address"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">所属工程</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.subordinate_project"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text asterisk_before">案卷题名</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.books_title"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <!-- 主题词 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">主题词</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.subject_headings"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>

                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">分类大纲</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.classification_outline"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">责任者</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.responsible"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">编制单位</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.unit" placeholder="请输入"></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">保管期限</div>
                      <div class="ceil-value">
                        <el-select v-model="increase_from.the_duration" placeholder="请选择">
                          <el-option
                            v-for="item in the_duration_list"
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
                        <el-select v-model="increase_from.the_classification" placeholder="请选择">
                          <el-option
                            v-for="item in the_classification_list"
                            :key="item.prop"
                            :label="item.label"
                            :value="item.prop"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <!-- 编制日期-->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">编制日期</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.prepare_date_first"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">至</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.prepare_date_second"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <!-- 立卷人 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">立卷人</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.establish_person"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">立卷日期</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.establish_date"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :clearable="false"
                        >
                        </el-date-picker>
                      </div>
                    </div>
                  </div>
                  <!-- 审核人 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">审核人</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.reviewer" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">审核日期</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.reviewer_date"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :clearable="false"
                        >
                        </el-date-picker>
                      </div>
                    </div>
                  </div>
                  <!-- 归档人 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">归档人</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.archive_people"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">归档时间</div>
                      <div class="ceil-value">
                        <el-date-picker
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
                  <!-- 备注 -->
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
                  <!-- 录入人 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">录入人</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.enter_one" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">录入时间</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.enter_date"
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
          <!-- 档案状况 -->
          <div class="content-file-status increase-content--item">
            <div class="content-title-btn" @click="fun_show_shrink('file_status')">
              <sz-show-shrink :show_shrink="show_shrink.file_status" title="档案状况" />
            </div>
            <div class="content--form" :style="{ display: show_shrink_dispaly.file_status }">
              <file-status></file-status>
            </div>
          </div>
          <!-- 自定义字段信息 -->
          <div class="content-custom-info increase-content--item">
            <div class="content-title-btn" @click="fun_show_shrink('custom_info')">
              <sz-show-shrink :show_shrink="show_shrink.custom_info" title="自定义字段信息" />
            </div>
            <div class="content--form" :style="{ display: show_shrink_dispaly.custom_info }">
              <div class="content-form-item-box">
                <div class="global-content-form-item">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">测试字段显示</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.test_field"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text"></div>
                      <div class="ceil-value"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
import FileStatus from '@/views/menu/file-bgf-menu/components-table-a/fileStatusB.vue'
import mixinAsideShowTrue from '@/views/menu/mixins/aside-show-true'
import {
  onMounted,
  computed,
  reactive,
  watchEffect,
  toRefs,
  onBeforeUnmount,
} from '@vue/composition-api'
export default {
  props: ['title'],
  name: 'accept-onfirmed',
  mixins: [mixinAsideShowTrue],
  components: {
    FileStatus,
  },

  setup(prop, context) {
    let contextData = reactive({
      name: '接受确认',
      breadcrumb: [
        { path: '/archives-makeup', title: '档案编整' },
        { path: '/archives-makeup/archives-makeup', title: '项目登记' },
      ],
      increase_style: {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll',
      },
      queryList: {
        project_name: { title: '项目名称', value: '' },
      },
      show_shrink: {
        basic_info: false,
        file_status: true,
        custom_info: false,
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        file_status: 'none',
        custom_info: 'block',
      },
      increase_from: {
        No: '', //档号
        total_registration: '', //总登记号
        old_no: '', //旧档号
        store_address: '', //存放地址
        subordinate_project: '', //所属工程
        books_title: '', //案卷题名
        subject_headings: '', //主题词
        classification_outline: '', //分类大纲
        responsible: '', //责任者
        unit: '', //编制单位
        the_duration: '', //保管期限
        the_classification: '', //密级
        prepare_date_first: '', //起始编制日期
        prepare_date_second: '', //结束编制日期
        establish_person: '', //立卷人
        establish_date: '', //立卷日期
        reviewer: '', //审核人
        reviewer_date: '', //审核日期
        archive_people: '', //归档人
        archive_date: '', //归档时间
        remark: '', //备注
        enter_one: '', //录入人
        enter_date: '', //录入时间
        test_field: '', //测试字段显示
      },
      increase_rules: {
        books_title: [
          { required: true, message: '请输入案卷题名', trigger: 'blur' },
        ],
      },
      the_duration_list: [
        { label: '短期', prop: 'short_term' },
        { label: '长期', prop: 'long_time' },
        { label: '永久', prop: 'permanent' },
      ],
      the_classification_list: [
        { label: '无', prop: 'nothing' },
        { label: '内部', prop: 'internal' },
        { label: '秘密', prop: 'secret' },
        { label: '机密', prop: 'confidential' },
        { label: '绝密', prop: 'top_secret' },
      ],
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
      // this.$on('select-tabel', (mes) => {
      //   this.message = mes
      // })
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })
    const onResize = () => {
      contextData.increase_style = {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll',
      }
    }
    const fun_project_type_change = () => {
      let project_type = contextData.increase_from.project_type
      console.log(project_type)
    }
    const fun_base_type_change = () => {}
    const fun_structure_type_change = () => {}
    const fun_show_shrink = (val) => {
      contextData.show_shrink[val] = !contextData.show_shrink[val]
      let flag = contextData.show_shrink[val]
      contextData.show_shrink_dispaly[val] = flag ? 'none' : 'block'
    }
    return {
      fun_project_type_change,
      fun_structure_type_change,
      contextData,
      ...toRefs(contextData),
      fun_show_shrink,
      fun_base_type_change,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~./index.scss';
</style>
