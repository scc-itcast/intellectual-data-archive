// 管理档案著录 二级树形表格
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
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text asterisk_before">工程名称</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.project_name"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程地点</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.project_adress"
                          placeholder="请输入"
                        ></el-input>
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
                  <div class="content-from-column-height">
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">用地单位</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.unitsusing_land"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">立项批准文号</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.project_appr_number"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">立项批准单位</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.project_appr_unit"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">规划许可证号</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.plan_permis_number"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">被征单位</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.expropriation_unit"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">用地规划许可证号</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.plan_permit_number"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">规划批准单位</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.approval_unit"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">用地选址许可证号</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.landsite_license"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text"></div>
                        <div class="ceil-value"></div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">地形图号</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.topographic_map"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="position_left">责 任 者</div>
                    <div class="position_right">文 号 项</div>
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
          <!-- 归档信息:管理 -->
          <div class="content-the-archive increase-content--item">
            <div class="content-title-btn" @click="fun_show_shrink('archive_information2')">
              <sz-show-shrink :show_shrink="show_shrink.archive_information" title="归档信息" />
            </div>
            <div
              class="content--form"
              :style="{ display: show_shrink_dispaly.archive_information2 }"
            >
              <div class="content-form-item-box">
                <div class="global-content-form-item">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程档号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.project_no"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text"></div>
                      <div class="ceil-value"></div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text asterisk_before">分类大纲</div>
                      <div class="ceil-value">
                        <el-select
                          v-model="increase_from.classification_outline1"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in classification_outline1_list"
                            :key="item.prop"
                            :label="item.label"
                            :value="item.prop"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <div class="ceil-value">
                        <el-select
                          v-model="increase_from.classification_outline2"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in classification_outline2_list"
                            :key="item.prop"
                            :label="item.label"
                            :value="item.prop"
                          >
                          </el-option>
                        </el-select>
                      </div>
                      <div class="ceil-value">
                        <el-select
                          v-model="increase_from.classification_outline3"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in classification_outline3_list"
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
                      <div class="ceil-text">归档人</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.archive_people"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">归档日期</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.filing_date"
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
          <!-- 业务信息:管理 -->
          <div class="content-business-info increase-content--item">
            <div class="content-title-btn" @click="fun_show_shrink('business_info')">
              <sz-show-shrink :show_shrink="show_shrink.business_info" title="业务信息" />
            </div>
            <div class="content--form" :style="{ display: show_shrink_dispaly.business_info }">
              <div class="content-form-item-box">
                <div class="global-content-form-item">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">移交单位</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.handed_unit"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">进馆日期</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.hen_date2"
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
                      <div class="ceil-text">保管期限</div>
                      <div class="ceil-value">
                        <el-select v-model="increase_from.the_duration" placeholder="请选择">
                          <el-option
                            v-for="item in project_type_list"
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
                        <el-select
                          v-model="increase_from.classification"
                          placeholder="请选择"
                          @change="fun_project_type_change"
                        >
                          <el-option
                            v-for="item in project_type_list"
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
                      <div class="ceil-text">录入人</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.enter_one" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">录入时间</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.entry_time"
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
import log from '@/libs/util.log'
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
      // title: '房屋建筑工程项目级著录单',
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
        business_info: false,
        custom_info: false,
        archive_information: false,
        archive_information2: false,
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        file_status: 'none',
        business_info: 'block',
        custom_info: 'block',
        archive_information: 'block',
        archive_information2: 'block',
      },
      increase_from: {
        project_name: '', // 工程名称
        project_adress: '', // 工程地点
        construct_unit: '', // 建设单位
        unitsusing_land: '', //用地单位
        project_appr_number: '', // 立项批准文号
        project_appr_unit: '', // 立项批准单位
        plan_permis_number: '', // 规划许可证号
        expropriation_unit: '', //被征单位
        plan_permit_number: '', // 用地规划许可证号
        approval_unit: '', //规划批准单位
        landsite_license: '', //用地选址许可证号
        topographic_map: '', //地形图号
        remark: '', // 备注
        project_no: '', //工程档号
        classification_outline1: '', //分类大纲1
        classification_outline2: '', //分类大纲2
        classification_outline3: '', //分类大纲3
        archive_people: '', //归档人
        filing_date: '', //归档日期
        handed_unit: '', //移交单位
        hen_date2: '', //进馆日期
        the_duration: '', //保管期限
        classification: '', //密级
        enter_one: '', //录入人
        entry_time: '', //录入时间
        test_field: '', // 测试字段显示
      },
      increase_rules: {
        project_name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        project_type: [
          { required: true, message: '请输入项目类型', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
      project_type_list: [
        { label: '房屋建筑工程', prop: 'build_engin' },
        { label: '市政基础设施', prop: 'munici_infrast' },
        { label: '城市管线工程', prop: 'ur_pipe_engin' },
        { label: '其他通用类', prop: 'other_gene_class' },
        { label: '道路工程', prop: 'road_engin' },
        { label: '桥梁工程', prop: 'bridge_engin' },
        { label: '园林绿化工程', prop: 'landscap_work' },
      ],
      classification_outline1_list: [{ label: 'A/综合类', prop: 'A/综合类' }],
      classification_outline2_list: [{ label: 'A01/政策法规', prop: 'A01' }],
      classification_outline3_list: [{ label: 'A0101/上级1121', prop: 'A0101' }],

      project_type_more_info: false,
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
      contextData.project_type_more_info = project_type == 'other_gene_class' ? false : true
    }
    const fun_general_query = () => {
      console.log('chax')
    }
    const fun_advanced_query = () => {
      console.log('chax2')
    }
    const fun_value_change = (obj) => {
      let { value, index } = obj
      contextData.queryList[index].value = value
    }
    const fun_show_shrink = (val) => {
      contextData.show_shrink[val] = !contextData.show_shrink[val]
      let flag = contextData.show_shrink[val]
      contextData.show_shrink_dispaly[val] = flag ? 'none' : 'block'
    }
    return {
      fun_project_type_change,
      contextData,
      ...toRefs(contextData),
      fun_value_change,
      fun_general_query,
      fun_advanced_query,
      fun_show_shrink,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~./index.scss';
</style>