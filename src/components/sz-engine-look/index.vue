<template>
  <div class="increase--box">
    <div class="increase--title">
      <div class="">
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
              <div class="global-content-form-item-look">
                <div class="content-from-wrapper-height">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程名称</div>
                      <div class="ceil-value">
                        {{ increase_from.engin_name }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column-emty"></div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程地点</div>
                      <div class="ceil-value">
                        {{ increase_from.engin_adress }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column-emty"></div>
                  </div>
                  <template v-if="!engine_unit.other">
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">监理单位</div>
                        <div class="ceil-value">
                          {{ increase_from.super_unit }}
                        </div>
                      </div>
                      <div class="content-form-wrapper-column-emty"></div>
                    </div>
                  </template>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">建设单位</div>
                      <div class="ceil-value">
                        {{ increase_from.construct_unit }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column-emty"></div>
                  </div>
                  <template v-if="engine_unit.other">
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">联系电话</div>
                        <div class="ceil-value">
                          {{ increase_from.contact_phone_or }}
                        </div>
                      </div>
                      <div class="content-form-wrapper-column-emty"></div>
                    </div>
                  </template>
                  <template v-if="!engine_unit.other">
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">代建单位</div>
                        <div class="ceil-value">
                          {{ increase_from.d_construct_unit }}
                        </div>
                      </div>
                      <div class="content-form-wrapper-column-emty"></div>
                    </div>
                  </template>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">施工单位</div>
                      <div class="ceil-value">
                        {{ increase_from.construct_organiza }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column-emty"></div>
                  </div>
                  <template v-if="engine_unit.other">
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">联系电话</div>
                        <div class="ceil-value">
                          {{ increase_from.contact_phone_un }}
                        </div>
                      </div>
                      <div class="content-form-wrapper-column-emty"></div>
                    </div>
                  </template>
                  <div class="position_right">
                    未设置
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">设计单位</div>
                    <div class="ceil-value">
                      {{ increase_from.design_unit }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">勘察单位</div>
                    <div class="ceil-value">
                      {{ increase_from.pros_unit }}
                    </div>
                  </div>
                </div>
                <template v-if="!engine_unit.other">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">用地规划许可证号</div>
                      <div class="ceil-value">
                        {{ increase_from.plan_permit_number }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">规划许可证号</div>
                      <div class="ceil-value">
                        {{ increase_from.plan_permis_number }}
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">立项批准文号</div>
                      <div class="ceil-value">
                        {{ increase_from.project_appr_number }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">施工许可证号</div>
                      <div class="ceil-value">
                        {{ increase_from.const_permit_number }}
                      </div>
                    </div>
                  </div>
                </template>
                <template v-if="engine_unit.brmg">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">结构类型</div>
                      <div class="ceil-value">
                        {{ increase_from.struct_type }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">道路级别</div>
                      <div class="ceil-value">
                        {{ increase_from.road_level }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">荷载</div>
                      <div class="ceil-value">
                        {{ increase_from.load_num }}
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">长度（m）</div>
                      <div class="ceil-value">
                        {{ increase_from.length_m }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">宽度（m）</div>
                      <div class="ceil-value">
                        {{ increase_from.width_m }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">高度（m）</div>
                      <div class="ceil-value">
                        {{ increase_from.height_m }}
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">跨径（m）</div>
                      <div class="ceil-value">
                        {{ increase_from.span_m }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">孔数</div>
                      <div class="ceil-value">
                        {{ increase_from.num_holes }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">净空</div>
                      <div class="ceil-value">
                        {{ increase_from.clearance }}
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">建筑面积（m²）</div>
                      <div class="ceil-value">
                        {{ increase_from.floor_area }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">开工日期</div>
                      <div class="ceil-value">
                        {{ increase_from.ment_date }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">竣工日期</div>
                      <div class="ceil-value">
                        {{ increase_from.ple_date }}
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">用地面积（m²）</div>
                      <div class="ceil-value">
                        {{ increase_from.site_area }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程预算（万元）</div>
                      <div class="ceil-value">
                        {{ increase_from.pro_budget }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程结算（万元）</div>
                      <div class="ceil-value">
                        {{ increase_from.pro_settle }}
                      </div>
                    </div>
                  </div>
                </template>
                <template v-if="engine_unit.city">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">地形图号</div>
                      <div class="ceil-value">
                        {{ increase_from.topo_map }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">起点</div>
                      <div class="ceil-value">
                        {{ increase_from.start_point }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">止点</div>
                      <div class="ceil-value">
                        {{ increase_from.end_point }}
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">长度（m）</div>
                      <div class="ceil-value">
                        {{ increase_from.length_m }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">规格</div>
                      <div class="ceil-value">
                        {{ increase_from.specific }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">材质</div>
                      <div class="ceil-value">
                        {{ increase_from.material }}
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">荷载</div>
                      <div class="ceil-value">
                        {{ increase_from.load_num }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">开工日期</div>
                      <div class="ceil-value">
                        {{ increase_from.ment_date }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">竣工日期</div>
                      <div class="ceil-value">
                        {{ increase_from.ple_date }}
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程预算（万元）</div>
                      <div class="ceil-value">
                        {{ increase_from.pro_budget }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程结算（万元）</div>
                      <div class="ceil-value">
                        {{ increase_from.pro_settle }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text"></div>
                      <div class="ceil-value"></div>
                    </div>
                  </div>
                </template>
                <template v-if="engine_unit.house">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">高度（m）</div>
                      <div class="ceil-value">
                        {{ increase_from.height_m }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">地上层数（层）</div>
                      <div class="ceil-value">
                        {{ increase_from.up_layer }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">地下层数（层）</div>
                      <div class="ceil-value">
                        {{ increase_from.un_layer }}
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">基础类型</div>
                      <div class="ceil-value">
                        {{ increase_from.base_type }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">建筑面积（m²）</div>
                      <div class="ceil-value">
                        {{ increase_from.floor_area }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">用地面积（m²）</div>
                      <div class="ceil-value">
                        {{ increase_from.site_area }}
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">结构类型</div>
                      <div class="ceil-value">
                        {{ increase_from.struct_type }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">开工日期</div>
                      <div class="ceil-value">
                        {{ increase_from.ment_date }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">竣工日期</div>
                      <div class="ceil-value">
                        {{ increase_from.ple_date }}
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">幢数</div>
                      <div class="ceil-value">
                        {{ increase_from.house_num }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程预算（万元）</div>
                      <div class="ceil-value">
                        {{ increase_from.pro_budget }}
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程结算（万元）</div>
                      <div class="ceil-value">
                        {{ increase_from.pro_settle }}
                      </div>
                    </div>
                  </div>
                </template>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">备注</div>
                    <div class="ceil-value">
                      {{ increase_from.remark }}
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
              <div class="global-content-form-item-look">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">工程档号</div>
                    <div class="ceil-value">
                      {{ increase_from.eng_file_num }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text"></div>
                    <div class="ceil-value"></div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">分类大纲</div>
                    <div class="ceil-value">
                      {{ increase_from.eng_file_num }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text"></div>
                    <div class="ceil-value"></div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">归档人</div>
                    <div class="ceil-value">
                      {{ increase_from.archive_people }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">归档日期</div>
                    <div class="ceil-value">
                      {{ increase_from.archive_date }}
                    </div>
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
              <div class="global-content-form-item-look">
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">项目序号</div>
                    <div class="ceil-value">
                      {{ increase_from.project_number }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">进馆日期</div>
                    <div class="ceil-value">
                      {{ increase_from.hen_date }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">移交单位</div>
                    <div class="ceil-value">
                      {{ increase_from.project_number }}
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
                    <div class="ceil-text">录入人</div>
                    <div class="ceil-value">
                      {{ increase_from.enter_pepole }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录入时间</div>
                    <div class="ceil-value">
                      {{ increase_from.enter_time }}
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
          <div class="content--form" :style="{ display: show_shrink_dispaly.custom_info }"></div>
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
    let contextData = reactive({
      name: '添加工程信息',
      title: '城市管线工程单位工程级著录单',
      increase_from: {
        engin_name: '', // 工程名称
        engin_adress: '', // 工程地点
        construct_unit: '', // 建设单位
        d_construct_unit: '', // 代建单位
        contact_phone_or: '', // 建设联系电话
        construct_organiza: '', // 施工单位
        super_unit: '', // 监理单位
        plan_permit_number: '', // 用地规划许可证号
        plan_permis_number: '', // 规划许可证号
        project_appr_number: '', // 立项批准文号
        const_permit_number: '', // 施工许可证号
        struct_type: '', // 结构类型
        road_level: '', // 道路级别
        load_num: '', // 荷载
        length_m: '', // 长度（m）
        width_m: '', // 宽度（m）
        height_m: '', // 高度（m）
        span_m: '', // 跨径（m）
        num_holes: '', // 孔数
        clearance: '', // 净空
        floor_area: '', // 建筑面积（m²）
        ment_date: '', // 开工日期
        ple_date: '', // 竣工日期
        site_area: '', // 用地面积（m²）
        pro_budget: '', // 工程预算（万元）
        pro_settle: '', // 工程结算（万元）
        topo_map: '', // 地形图号
        start_point: '', // 起点
        end_point: '', // 止点
        specific: '', // 规格
        material: '', // 材质
        up_layer: '', // 地上层数（层）
        un_layer: '', // 地下层数（层）
        base_type: '', // 基础类型
        house_num: '', // 幢数
        contact_phone_un: '', // 施工联系电话
        design_unit: '', // 设计单位
        pros_unit: '', // 勘察单位
        remark: '', // 备注
        eng_file_num: '', // 工程档号
        eng_file_num: '', // 工程档号
        class_outline: '', // 分类大纲
        archive_people: '', // 归档人
        archive_date: '', // 归档日期
        project_number: '', // 项目序号
        security_class: '', // 密级
        enter_time: '', // 录入时间
        hen_date: '', // 进馆日期
        handed_ove_unit: '', // 移交单位
        safe_duration: '', // 保管期限
        enter_pepole: '' // 录入人
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
      road_level_list: [
        { label: '主干道', prop: 1 },
        { label: '次干道', prop: 2 },
        { label: '支路', prop: 3 },
        { label: '街坊路', prop: 4 },
        { label: '其他', prop: 5 }
      ],
      base_type_list: [
        { label: '条形基础', prop: 1 },
        { label: '独立基础', prop: 2 },
        { label: '桩基础', prop: 3 },
        { label: '筏形基础', prop: 4 }
      ],
      struct_type_list: [
        { label: '框架', prop: 1 },
        { label: '框剪', prop: 2 },
        { label: '砖混', prop: 3 },
        { label: '排架', prop: 4 },
        { label: '钢结构', prop: 5 },
        { label: '剪力墙', prop: 6 },
        { label: '其他', prop: 7 }
      ],
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
      engine_unit: {
        brmg: false,
        city: false,
        house: false,
        other: false
      },
      engine_unit_type: {
        房屋建筑工程: 'house',
        城市管线工程: 'city',
        其他通用类: 'other',
        市政基础设施: 'brmg',
        道路工程: 'brmg',
        桥梁工程: 'brmg',
        园林绿化工程: 'brmg'
      },
      engine_unit_title: '单位工程级著录单',
      engine_unit_id: ''
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      // engine_unit_type_show()
    })
    
    watchEffect(() => {
      console.log(prop.tree_item);
    })

    const engine_unit_type_show = () => {
      const { id, type } = context.root.$route.query
      const engine_unit = contextData.engine_unit_type[type]
      contextData.engine_unit[engine_unit] = true
      contextData.engine_unit_title = type + '单位工程级著录单'
      contextData.engine_unit_id = id
    }

    const fun_save_submit = () => {
      context.root.$notify({
        title: '工程信息添加成功',
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

    return {
      contextData,
      ...toRefs(contextData),
      fun_save_submit,
      fun_show_shrink,
      fun_create_project
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
        .content-from-wrapper-height {
          position: relative;
          width: 100%;
          height: auto;
          .position_right {
            position: absolute;
            right: 0;
            top: 0;
            width: 37.6%;
            height: 246px;
            display: flex;
            justify-content: center;
            align-items: center;
            // background-color: $color-text-5;
            border-right: 1px solid $color-border-1;
            border-bottom: 1px solid $color-border-1;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
