<template>
  <div class="increase--box" :style="increase_style">
    <div class="global-end-center--flex">
      <div class="global-between-center--flex">
        <sz-button title="返回" @click="fun_go_back"></sz-button>
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
        <div class="increase-title--text">{{ engine_unit_title }}</div>
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
                <div class="content-from-wrapper-height">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text asterisk_before">工程名称</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.engin_name"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column-emty"></div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程地点</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.engin_adress"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column-emty"></div>
                  </div>
                  <template v-if="!engine_unit.other">
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
                      <div class="content-form-wrapper-column-emty"></div>
                    </div>
                  </template>
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
                    <div class="content-form-wrapper-column-emty"></div>
                  </div>
                  <template v-if="engine_unit.other">
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">联系电话</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.contact_phone_or"
                            placeholder="请输入"
                          ></el-input>
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
                          <el-input
                            v-model="increase_from.d_construct_unit"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column-emty"></div>
                    </div>
                  </template>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">施工单位</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.construct_organiza"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column-emty"></div>
                  </div>
                  <template v-if="engine_unit.other">
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">联系电话</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.contact_phone_un"
                            placeholder="请输入"
                          ></el-input>
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
                      <el-input v-model="increase_from.design_unit" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">勘察单位</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.pros_unit" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <template v-if="!engine_unit.other">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">用地规划许可证号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.plan_permit_number"
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
                      <div class="ceil-text">立项批准文号</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.project_appr_number"
                          placeholder="请输入"
                        ></el-input>
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
                </template>
                <template v-if="engine_unit.brmg">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">结构类型</div>
                      <div class="ceil-value">
                        <el-select v-model="increase_from.struct_type" placeholder="请选择">
                          <el-option
                            v-for="item in struct_type_list"
                            :key="item.prop"
                            :label="item.label"
                            :value="item.prop"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">道路级别</div>
                      <div class="ceil-value">
                        <el-select v-model="increase_from.road_level" placeholder="请选择">
                          <el-option
                            v-for="item in road_level_list"
                            :key="item.prop"
                            :label="item.label"
                            :value="item.prop"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">荷载</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.load_num" placeholder="请输入"></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">长度（m）</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.length_m" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">宽度（m）</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.width_m" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">高度（m）</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.height_m" placeholder="请输入"></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">跨径（m）</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.span_m" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">孔数</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.num_holes" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">净空</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.clearance" placeholder="请输入"></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">建筑面积（m²）</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.floor_area"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">开工日期</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.ment_date"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :clearable="false"
                        >
                        </el-date-picker>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">竣工日期</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.ple_date"
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
                      <div class="ceil-text">用地面积（m²）</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.site_area" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程预算（万元）</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.pro_budget"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程结算（万元）</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.pro_settle"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-if="engine_unit.city">
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">地形图号</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.topo_map" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">起点</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.start_point"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">止点</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.end_point" placeholder="请输入"></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">长度（m）</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.length_m" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">规格</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.specific" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">材质</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.material" placeholder="请输入"></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">荷载</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.load_num" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">开工日期</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.ment_date"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :clearable="false"
                        >
                        </el-date-picker>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">竣工日期</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.ple_date"
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
                      <div class="ceil-text">工程预算（万元）</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.pro_budget"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程结算（万元）</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.pro_settle"
                          placeholder="请输入"
                        ></el-input>
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
                        <el-input v-model="increase_from.height_m" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">地上层数（层）</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.up_layer" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">地下层数（层）</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.un_layer" placeholder="请输入"></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">基础类型</div>
                      <div class="ceil-value">
                        <el-select v-model="increase_from.base_type" placeholder="请选择">
                          <el-option
                            v-for="item in base_type_list"
                            :key="item.prop"
                            :label="item.label"
                            :value="item.prop"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">建筑面积（m²）</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.floor_area"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">用地面积（m²）</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.site_area" placeholder="请输入"></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">结构类型</div>
                      <div class="ceil-value">
                        <el-select v-model="increase_from.struct_type" placeholder="请选择">
                          <el-option
                            v-for="item in struct_type_list"
                            :key="item.prop"
                            :label="item.label"
                            :value="item.prop"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">开工日期</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.ment_date"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :clearable="false"
                        >
                        </el-date-picker>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">竣工日期</div>
                      <div class="ceil-value">
                        <el-date-picker
                          v-model="increase_from.ple_date"
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
                      <div class="ceil-text">幢数</div>
                      <div class="ceil-value">
                        <el-input v-model="increase_from.house_num" placeholder="请输入"></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程预算（万元）</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.pro_budget"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">工程结算（万元）</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.pro_settle"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                </template>
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
  setup(prop, context) {
    let contextData = reactive({
      name: '添加工程信息',
      title: '城市管线工程单位工程级著录单',
      increase_style: {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll'
      },
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
        business_info: false,
        custom_info: false
      },
      show_shrink_dispaly: {
        basic_info: 'block',
        file_status: 'none',
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
      engine_unit_title: '',
      engine_unit_id: ''
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
      engine_unit_type_show()
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

    const engine_unit_type_show = () => {
      const { id, type } = context.root.$route.query
      const engine_unit = contextData.engine_unit_type[type]
      contextData.engine_unit[engine_unit] = true
      contextData.engine_unit_title = type + '单位工程级著录单'
      contextData.engine_unit_id = id
    }

    const fun_go_back = () => {
      // context.root.$router.push({ path: '/business-manage/project-regist' })
      context.root.$router.go(-1)
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
      fun_go_back,
      fun_save_submit,
      fun_show_shrink,
      fun_create_project
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
