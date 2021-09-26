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
                  <!-- 所属案卷 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">所属案卷</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.No" placeholder="请输入"></el-input>
                      </div>
                    </div>
                  </div>
                  <!-- 文件档号	 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">文件档号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.document_no"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
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
                  <!-- 文件题名 -->
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
                        <el-input
                          v-model="increase_from.responsible"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">文图号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.article_drawing"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <!-- 保管期限 -->
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

                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">起始日期</div>
                      <div class="ceil-value">
                        <el-date-picker
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
                  <!-- 载体类型 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text asterisk_before">载体类型</div>
                      <div class="ceil-value">
                        <el-select v-model="increase_from.carrier_type" placeholder="请选择">
                          <el-option
                            v-for="item in carrier_type_list"
                            :key="item.prop"
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
                  <!-- 规格 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">规格</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.specifications"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">提要</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.the_feed" placeholder="请输入"></el-input>
                      </div>
                    </div>
                  </div>
                  <!-- 文种-->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">文种</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.zhuang" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">稿本</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.manuscript"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <!-- 附注 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column global-column-remark">
                      <div class="ceil-text">附注</div>
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
                </div>
              </div>
            </div>
          </div>
          <!-- 电子文件 -->
          <div class="content-file-status increase-content--item">
            <div class="content-title-btn" @click="fun_show_shrink('ectronic_file')">
              <sz-show-shrink :show_shrink="show_shrink.ectronic_file" title="电子文件" />
            </div>
            <div
              class="content--form"
              :style="{ display: show_shrink_dispaly.ectronic_file }"
            ></div>
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
        ectronic_file: true,
        custom_info: false,
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        ectronic_file: 'none',
        custom_info: 'block',
      },
      increase_from: {
        No: '', //所属案卷
        document_no: '', //文件档号
        subject_headings: '', //主题词
        document_title: '', //文件题名
        responsible: '', //责任者
        article_drawing: '', //文图号
        the_duration: '', //保管期限
        the_classification: '', //密级
        start_date: '', //起始日期
        end_date: '', //终止日期
        carrier_type: '', //载体类型
        number: '', //数量
        specifications: '', //规格
        the_feed: '', //提要
        zhuang: '', //文种
        manuscript: '', //稿本
        remark: '', //附注
        establish_person: '', //立卷人
        establish_date: '', //立卷日期
        test_field: '', //测试字段显示
      },
      increase_rules: {
        books_title: [{ required: true, message: '请输入案卷题名', trigger: 'blur' }],
        carrier_type: [{ required: true, message: '请输入载体类型', trigger: 'blur' }],
        number: [{ required: true, message: '请输入数量', trigger: 'blur' }],
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
      carrier_type_list: [
        { label: '文字(张)', prop: 'nothing' },
        { label: '图纸(张)', prop: 'nothing' },
        { label: '底图(张)', prop: 'nothing' },
        { label: '照片(张)', prop: 'nothing' },
        { label: '底片(张)', prop: 'nothing' },
        { label: '载体测试', prop: 'nothing' },
        { label: '录音带(盒)', prop: 'nothing' },
        { label: '录像带(盒)', prop: 'nothing' },
        { label: '光盘(盘)', prop: 'nothing' },
        { label: '计算机磁盘(盘)', prop: 'nothing' },
        { label: '计算机磁带(盘)', prop: 'nothing' },
        { label: '缩微片(盘)', prop: 'nothing' },
        { label: '缩微片(张)', prop: 'nothing' },
        { label: '其它', prop: 'nothing' },
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

    const fun_show_shrink = (val) => {
      contextData.show_shrink[val] = !contextData.show_shrink[val]
      let flag = contextData.show_shrink[val]
      contextData.show_shrink_dispaly[val] = flag ? 'none' : 'block'
    }
    return {
      contextData,
      ...toRefs(contextData),
      fun_show_shrink,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~./index.scss';
</style>
