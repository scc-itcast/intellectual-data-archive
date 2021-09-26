// 添加文件-表格
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
                  <div class="content-from-wrapper-height">
                    <!-- 所属案卷 -->
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">所属案卷</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.belongs_books"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column-emty"></div>
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
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">文件题名</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.document_title"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column-emty"></div>
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
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column-emty"></div>
                    </div>
                    <!-- 设计单位 -->
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">设计单位</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.design_unit"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column-emty"></div>
                    </div>
                    <div class="position_right">未设置</div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">监理单位</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.supervisor_unit"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">勘察单位</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.reconnaissance_unit"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">用地规划许可证号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.land_planning_license"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">规划许可证号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.planning_license"
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
                          v-model="increase_from.project_approval"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">施工许可证号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.construction_license"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <!-- 地形图号 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">地形图号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.topographic_map"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">起点</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.starting_point"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">止点</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.check_point"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <!-- 长度(m) -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">长度(m)</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.length" placeholder="请输入"></el-input>
                      </div>
                    </div>
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
                      <div class="ceil-text">材质</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.material" placeholder="请输入"></el-input>
                      </div>
                    </div>
                  </div>
                  <!-- 结构类型 -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">荷载</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.load" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">开工日期</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.commencement_date"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">竣工日期</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.completion_date"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <!-- 工程预算(万元) -->
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程预算(万元)</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.project_budget"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程结算(万元)</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.engineering_settlement"
                          placeholder="请输入"
                        ></el-input>
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
                </div>
              </div>
            </div>
          </div>
          <!-- 电子文件 -->
          <div class="content-file-status increase-content--item">
            <div class="content-title-btn" @click="fun_show_shrink('electronic_file')">
              <sz-show-shrink :show_shrink="show_shrink.electronic_file" title="电子文件" />
            </div>
            <div
              class="content--form"
              :style="{ display: show_shrink_dispaly.electronic_file }"
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
  components: {},
  setup(prop, context) {
    let contextData = reactive({
      name: '添加文件',
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
        electronic_file: true,
        business_info: false,
        custom_info: false,
        archive_information: false,
        archive_information2: false,
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        electronic_file: 'none',
        business_info: 'block',
        custom_info: 'block',
        archive_information: 'block',
        archive_information2: 'block',
      },
      increase_from: {
        project_name: '', // 项目名称
        project_adress: '', // 项目地点
        construct_unit: '', // 建设单位
        agent_unit: '', //代理单位
        build_unit: '', //施工单位
        design_unit: '', // 设计单位
        supervisor_unit: '', //监理单位
        reconnaissance_unit: '', //勘察单位
        land_planning_license: '', //用地规划许可证号
        planning_license: '', //规划许可证号
        project_approval: '', //立项批准单位
        construction_license: '', //施工许可证号
        topographic_map: '', //地形图号
        starting_point: '', //起点
        check_point: '', //止点
        length: '', //长度(m)
        specifications: '', //规格
        material: '', //材质
        load: '', //荷载
        commencement_date: '', //开工日期
        completion_date: '', //竣工日期
        project_budget: '', //工程预算
        engineering_settlement: '', //工程结算
        remark: '', // 备注
        project_no: '', // 项目档号
        project_type: '', // 分类大纲
        archive_people: '', // 归档人
        filing_date: '', // 归档日期
        project_number: '', // 项目序号
        hen_date: '', // 进馆日期
        handed_ove_unit: '', // 移交单位
        enter_pepole: '', // 录入人
        enter_time: '', // 录入时间
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
      classification_outline1_list: [{ label: 'A/综合类', prop: 'A/综合类' }],
      classification_outline2_list: [{ label: 'A01/政策法规', prop: 'A01' }],
      classification_outline3_list: [{ label: 'A0101/上级1121', prop: 'A0101' }],
      cduration_list: [
        {
          label: '短期',
          prop: 'duanqi',
        },
        {
          label: '长期',
          prop: 'changqi',
        },
        {
          label: '永久',
          prop: 'yongjiu',
        },
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