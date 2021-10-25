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
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text asterisk_before">组名称</div>
                    <div class="ceil-value">
                      <el-input v-model="increase_from.group_name" placeholder="请输入"></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">组地点</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.group_address"
                        placeholder="请输入"
                      ></el-input>
                    </div>
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
                    <div class="ceil-text">起始拍摄时间</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.start_shoot_time"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">终止拍摄时间</div>
                    <div class="ceil-value">
                      <el-input
                        v-model="increase_from.end_shoot_time"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="content-form-wrapper">
                  <div class="content-form-wrapper-column global-column-remark">
                    <div class="ceil-text">组描述</div>
                    <div class="ceil-value">
                      <el-input
                        type="textarea"
                        v-model="increase_from.group_descript"
                        placeholder="请输入"
                        rows="4"
                        resize="none"
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
                        v-model="increase_from.engin_adress"
                        placeholder="请输入"
                      ></el-input>
                    </div>
                  </div>
                  <div class="content-form-wrapper-column">
                    <div class="ceil-text">录入时间</div>
                    <div class="ceil-value">
                      <el-date-picker
                        :disabled="true"
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
      name: '声像组著录单',
      title: '声像组著录单',
      increase_style: {
        height: document.body.clientHeight - 242 + 'px'
      },
      increase_from: {
        group_name: '', // 组名称
        group_address: '', //组地点
        keyword: '', //关键字
        start_shoot_time: '', //起始拍摄时间
        end_shoot_time: '', //终止拍摄时间
        group_descript: '', //组描述
        remark: '', //备注
        enter_pepole: '', //录入人
        enter_time: '' //录入时间
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
      window.addEventListener('resize', onResize)
      // engine_unit_type_show()
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
@import '~./index.scss';
</style>
