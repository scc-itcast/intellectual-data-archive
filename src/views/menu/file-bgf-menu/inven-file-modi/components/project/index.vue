<template>
  <div class="increase--box" :style="increase_style">
    <div class="increase--title">
      <div class="global-line--bottom global--color-text-main">
        <div class="increase-title--text global--weight">{{ project_unit_title }}</div>
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
                    <div class="ceil-text asterisk_before">项目名称</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.project_name"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">项目地点</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.project_adress"
                        placeholder="请输入"
                      ></el-input>
                      <sz-button
                        class="global--ml20"
                        title="标注位置"
                        @click="fun_label_position"
                      ></sz-button>
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
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">项目类型</div>
                    <div class="ceil-value">
                      <el-select
                        v-model="increase_from.project_type"
                        placeholder="请选择"
                        @change="fun_project_type_change"
                        :disabled="tree_item.modify"
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
                <div v-show="project_type_more_info" class="content-from-column-height">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">代建单位</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.d_construct_unit"
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
                      <div class="ceil-text">设计单位</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.design_unit"
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
                      <div class="ceil-text">监理单位</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.super_unit"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">国有土地使用证号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.certificate_number"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">勘察单位</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.pros_unit" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">施工许可证号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.const_permit_number"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="position_left">
                    责 任 者
                  </div>
                  <div class="position_right">
                    文 号 项
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
              </div>
            </div>
          </div>
        </div>
        <div class="content-file-status increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('file_status')">
            <sz-show-shrink :show_shrink="show_shrink.file_status" title="档案状况" />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.file_status }">
            <sz-file-status></sz-file-status>
          </div>
        </div>
        <div class="content-archive-info increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('archive_info')">
            <sz-show-shrink :show_shrink="show_shrink.archive_info" title="归档信息" />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.archive_info }">
            <div class="content-form-item-box">
              <div class="global-content-form-item">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">项目档号</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.pro_file_num"
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
        <div class="content-business-info increase-content--item">
          <div class="content-title-btn" @click="fun_show_shrink('business_info')">
            <sz-show-shrink :show_shrink="show_shrink.business_info" title="业务信息" />
          </div>
          <div class="content--form" :style="{ display: show_shrink_dispaly.business_info }">
            <div class="content-form-item-box">
              <div class="global-content-form-item">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">项目序号</div>
                    <div class="ceil-value">
                      <el-input
                        :disabled="true"
                        v-model="increase_from.project_number"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">进馆日期</div>
                    <div class="ceil-value">
                      <el-date-picker
                        v-model="increase_from.hen_date"
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
                    <div class="ceil-text">移交单位</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.project_number"
                        placeholder="请输入"
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
                      <el-input v-model="increase_from.enter_time" placeholder="请输入"></el-input>
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
      name: '添加项目信息',
      title: '项目级著录单',
      increase_style: {
        height: document.body.clientHeight - 242 + 'px',
        overflowY: 'scroll'
      },
      increase_from: {
        project_name: '', // 项目名称
        project_adress: '', // 项目地点
        construct_unit: '', // 建设单位
        project_type: '', // 项目类型
        d_construct_unit: '', // 代建单位
        project_appr_number: '', // 立项批准文号
        project_appr_unit: '', // 立项批准单位
        plan_permis_number: '', // 规划许可证号
        design_unit: '', // 设计单位
        plan_permit_number: '', // 用地规划许可证号
        super_unit: '', // 监理单位
        certificate_number: '', // 国有土地使用证号
        pros_unit: '', // 勘察单位
        const_permit_number: '', // 施工许可证号
        remark: '', // 备注
        pro_file_num: '', // 项目档号
        project_number: '', // 项目序号
        hen_date: '', // 进馆日期
        handed_ove_unit: '', // 移交单位
        enter_pepole: '', // 录入人
        enter_time: '', // 录入时间
        modify_pepole: '杨那', // 修改人
        modify_time: '2021.02.27  21:34:12', // 修改时间
        test_field: '' // 测试字段显示
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
      project_type_list: [
        { label: '房屋建筑工程', prop: 'build_engin' },
        { label: '市政基础设施', prop: 'munici_infrast' },
        { label: '城市管线工程', prop: 'ur_pipe_engin' },
        { label: '其他通用类', prop: 'other_gene_class' },
        { label: '道路工程', prop: 'road_engin' },
        { label: '桥梁工程', prop: 'bridge_engin' },
        { label: '园林绿化工程', prop: 'landscap_work' }
      ],
      project_type_more_info: false,
      project_unit_title: '项目级著录单',
      project_unit_id: '',
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
      }
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
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
      // contextData.increase_from = prop.tree_item
      const { id, type } = prop.tree_item
      contextData.increase_from.project_type = type === '其他通用类' ? 'other_gene_class' : ''
      const flag = type === '其他通用类' ? false : true
      contextData.project_unit_title = type + '项目级著录单'
      contextData.project_unit_id = id
      contextData.project_type_more_info = type === '' ? false : flag
    })

    const fun_created = () => {
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

    const fun_project_type_change = () => {
      let project_type = contextData.increase_from.project_type
      contextData.project_type_more_info = project_type == 'other_gene_class' ? false : true
    }

    const fun_label_position = () => {}

    const fun_create_project = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      fun_created,
      fun_show_shrink,
      fun_project_type_change,
      fun_label_position,
      fun_create_project
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
