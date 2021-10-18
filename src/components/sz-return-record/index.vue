<template>
  <div class="increase--box tabs-none" id="audio-video-info">
    <div class="increase--title">
      <div class="">
        <!-- <div class="increase-title--text global--weight">{{ title }}</div> -->
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
                    <div class="ceil-text">归还人</div>
                    <div class="ceil-value">
                      {{ increase_from.restitutor }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">归还人电话</div>
                    <div class="ceil-value">
                      {{ increase_from.restitutor_phone }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">归还人单位</div>
                    <div class="ceil-value">
                      {{ increase_from.restitutor_unit }}
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">接待人</div>
                    <div class="ceil-value">
                      {{ increase_from.receiver }}
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">利用效果</div>
                    <div class="ceil-value">
                      {{ increase_from.use_effect }}
                    </div>
                  </div>
                </div>
                <div v-if="increase_from.enter_pepole" class="content-form-wrapper">
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
              <div class="content-from--tabs">
                <el-tabs v-model="active_name" @tab-click="fun_tab_click">
                  <el-tab-pane label="案卷信息" name="case_file_info">
                    <sz-table :config="case_file_info_list"></sz-table>
                  </el-tab-pane>
                  <el-tab-pane label="未录入信息" name="no_entry_info">
                    <sz-table :config="no_entry_info_list"></sz-table>
                  </el-tab-pane>
                </el-tabs>
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
    let case_file_info_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: false,
      // checkbox: true,
      number: true,
      expand: false,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '总登记号', prop: 'total_registration', checked: true, width: '80' },
        { label: '案卷题名', prop: 'books_title', checked: true, width: '200' },
        { label: '文A4(张)', prop: 'text_a4', checked: true, width: '80' },
        { label: '文A3(张)', prop: 'text_a3', checked: true, width: '80' },
        { label: '图(张)', prop: 'figure', checked: true, width: '80' },
        { label: '利用类型', prop: 'use_type', checked: true, width: '80' },
        { label: '备注', prop: 'remark', checked: true, width: '100' }
      ]
    })

    let no_entry_info_list = reactive({
      search_form: false,
      isRequest: false,
      pagination: true,
      // checkbox: true,
      number: true,
      expand: false,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '文件题名', prop: 'document_title', checked: true, disabled: true, width: '200' },
        { label: '工程名称', prop: 'engin_name', checked: true, disabled: true, width: '200' },
        { label: '文件数量', prop: 'document_number', checked: true, width: '80' },
        { label: '载体类型', prop: 'carr_type', checked: true, width: '100' },
        { label: '利用类型', prop: 'use_type', checked: true, width: '80' },
        { label: '备注', prop: 'remark', checked: true, width: '100' }
      ]
    })

    let contextData = reactive({
      name: '声像组著录单',
      title: '声像组著录单',
      increase_style: {
        height: document.body.clientHeight - 242 + 'px'
      },
      increase_from: {
        restitutor: '', // 归还人
        restitutor_phone: '', // 归还人电话
        restitutor_unit: '', // 归还人单位
        receiver: '', // 接待人
        use_effect: '', // 利用效果
        enter_pepole: '', //录入人
        enter_time: '' //录入时间
      },
      increase_rules: {
        engin_name: [
          { required: true, message: '请输入工程名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      active_name: 'case_file_info',
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
      engine_unit_title: '声像组著录单',
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
      console.log(prop.tree_item)
    })

    const fun_show_shrink = val => {
      contextData.show_shrink[val] = !contextData.show_shrink[val]
      let flag = contextData.show_shrink[val]
      contextData.show_shrink_dispaly[val] = flag ? 'none' : 'block'
    }

    const fun_cascader_change = () => {}

    const fun_tab_click = (tab, event) => {
      // console.log(tab, event)
    }

    return {
      contextData,
      ...toRefs(contextData),
      case_file_info_list,
      ...toRefs(case_file_info_list),
      no_entry_info_list,
      ...toRefs(no_entry_info_list),
      fun_show_shrink,
      fun_tab_click,
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
        .content-from--tabs {
          border: 1px solid $color-line-1;
          border-top: 0;
          padding: 0 0 10px 0;
        }
      }
    }
  }
}
</style>
