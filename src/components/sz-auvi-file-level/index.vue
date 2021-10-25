<template>
  <div class="increase--box global-increase--box" :style="increase_style">
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
                <div class="content-from-wrapper-height">
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
                    <div class="content-form-wrapper-column-emty"></div>
                  </div>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">原名称</div>
                      <div class="ceil-value">
                        <el-input
                          v-model="increase_from.origin_name"
                          placeholder="请输入"
                        ></el-input>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column-emty"></div>
                  </div>
                  <template v-if="!engine_unit.other">
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">责任者</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.res_people"
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
                        <div class="ceil-text">版权所有者</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.copyright"
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
                        <div class="ceil-text">拍摄地点</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.shoot_address"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column-emty"></div>
                    </div>
                  </template>
                  <div class="content-form-wrapper">
                    <div class="content-form-wrapper-column">
                      <div class="ceil-text">拍摄事由</div>
                      <div class="ceil-value">
                        <el-select v-model="increase_from.shoot_reason" placeholder="请选择">
                          <el-option
                            v-for="item in shoot_reason_list"
                            :key="item.prop"
                            :label="item.label"
                            :value="item.prop"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="content-form-wrapper-column-emty"></div>
                  </div>
                  <div class="position_right">
                    <div>未设置</div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">拍摄者</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.shoot_people"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">拍摄日期</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.shoot_date" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">文件档号</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.document_no" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">原编号</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.origin_number"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">文件类型</div>
                    <div class="ceil-value">
                      <el-select v-model="increase_from.file_type" placeholder="请选择">
                        <el-option
                          v-for="item in file_type_list"
                          :key="item.prop"
                          :label="item.label"
                          :value="item.prop"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">载体类型</div>
                    <div class="ceil-value">
                      <el-select v-model="increase_from.carr_type" placeholder="请选择">
                        <el-option
                          v-for="item in carr_type_list"
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
                    <div class="ceil-text">底片号</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.film_no" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">参见号</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.see_no" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">盘号</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.plate_no" placeholder="请输入"></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">人物</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.figure" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">保管期限</div>
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
                    <div class="ceil-text asterisk_before">来源</div>
                    <div class="ceil-value">
                      <el-select v-model="increase_from.source" placeholder="请选择">
                        <el-option
                          v-for="item in source_list"
                          :key="item.prop"
                          :label="item.label"
                          :value="item.prop"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">接收日期</div>
                    <div class="ceil-value">
                      <el-date-picker
                        :disabled="true"
                        v-model="increase_from.receive_date"
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
                    <div class="ceil-text asterisk_before">声像文件顺序号</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.serial_number"
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
                    <div class="ceil-text">关键字</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.keyword" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
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
                    <div class="ceil-text">描述</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.group_descript"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">文字说明</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.text_instruct"
                        placeholder="请输入"
                      ></el-input>
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
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">修改人</div>
                    <div class="ceil-value">
                      <el-input
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
      increase_style: {
        height: document.body.clientHeight - 242 + 'px'
      },
      increase_from: {
        document_title: '', // 文件题名
        origin_name: '', // 原名称
        res_people: '', // 责任者
        copyright: '', // 版权所有者
        shoot_address: '', // 拍摄地点
        shoot_reason: '', // 拍摄事由
        shoot_people: '', // 拍摄者
        shoot_date: '', // 拍摄日期
        document_no: '', // 文件档号
        origin_number: '', // 原编号
        file_type: '', // 文件类型
        carr_type: '', // 载体类型
        film_no: '', // 底片号
        see_no: '', // 参见号
        plate_no: '', // 盘号
        figure: '', // 人物
        safe_duration: '', // 保管期限
        security_class: '', // 密级
        source: '', // 来源
        receive_date: '', // 接收日期
        serial_number: '', // 声像文件顺序号
        keyword: '', // 关键字
        subject_headings: '', // 主题词
        group_descript: '', // 描述
        text_instruct: '', // 文字说明
        remark: '', // 备注
        enter_pepole: '', // 录入人
        enter_time: '', // 录入时间
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
      shoot_reason_list: [
        { label: '工程档案收集', prop: 1 },
        { label: '指定拍摄收集', prop: 2 },
        { label: '城市面貌收集', prop: 3 },
        { label: '专题片制作', prop: 4 }
      ],
      file_type_list: [
        { label: '照片', prop: 1 },
        { label: '视频', prop: 2 }
      ],
      carr_type_list: [
        { label: '数码照片', prop: 1 },
        { label: '黑白照片', prop: 2 },
        { label: '彩色照片', prop: 3 },
        { label: '反转照片', prop: 4 }
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
      source_list: [
        { label: '移交', prop: 1 },
        { label: '自拍', prop: 2 },
        { label: '征集', prop: 3 }
      ],
      props: {
        label: 'label',
        value: 'prop'
      },
      engine_unit: {
        brmg: false,
        city: false,
        house: false,
        other: false
      },

      engine_unit_title: '声像文件著录单',
      engine_unit_id: '',
      page_config: {
        id: '',
        type: '',
        modify: false,
        go_btn: false,
        archive_info: true,
        archive_status: true,
        business_info: true,
        custom_info: true,
        page_height: 242,
        show_audio_video: false
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
        height: document.body.clientHeight - contextData.page_config.page_height + 'px'
      }
    }

    watchEffect(() => {
      for (let key in prop.tree_item) {
        if (Object.keys(contextData.page_config).includes(key)) {
          contextData.page_config[key] = prop.tree_item[key] || ''
        }
      }
      contextData.increase_style = {
        height: document.body.clientHeight - contextData.page_config.page_height + 'px'
      }
    })

    const fun_created = () => {
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

    const fun_cascader_change = () => {}

    const fun_create_project = () => {}

    const fun_complete = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      fun_created,
      fun_show_shrink,
      fun_cascader_change,
      fun_create_project,
      fun_complete
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
