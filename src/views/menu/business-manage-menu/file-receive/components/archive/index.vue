<template>
  <div class="increase--box" :style="increase_style">
    <div class="global-between-center--flex">
      <div class="global-between-center--flex">
        <div class="global--mr20">接收模板</div>
        <div>
          <el-select
            v-model="increase_from.project_type"
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
        <div class="increase-title--text"></div>
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
        <el-tabs v-model="active_name" @tab-click="fun_tab_click">
          <el-tab-pane label="接收登记" name="receive_regist">
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
                            v-model="increase_from.receive_date"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">档案接收人</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.file_receiver"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">卷数</div>
                        <div class="ceil-value">
                          <el-input v-model="increase_from.volume" placeholder="请输入"></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">审核工作日</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.audit_day"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">报送文字材料(张)</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.submit_word_z"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">报送图纸材料(张)</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.sub_draw_z"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">报送文字材料(卷)</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.submit_word_v"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">报送图纸材料(卷)</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.sub_draw_v"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">报送照片材料(张)</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.sub_photo_z"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text asterisk_before">报送录像带材料(盘)</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.report_video_p"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="content-form-wrapper">
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">送审人</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.peview_people"
                            placeholder="请输入"
                          ></el-input>
                        </div>
                      </div>
                      <div class="content-form-wrapper-column">
                        <div class="ceil-text">联系电话</div>
                        <div class="ceil-value">
                          <el-input
                            v-model="increase_from.contact_phone"
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
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="接收内容表" name="receive_direct">
            <div class="tree-grid--box" id="sz-tree-table">
              <div class="tree-grid--header">
                <div class="tree-grid-header--title">文件名称</div>
                <div class="tree-grid-header--item">
                  <div style="width: 15%;">接收数量</div>
                  <div style="width: 15%;">复印数量</div>
                  <div style="width: 120px;">文件状态</div>
                  <div style="width: 35%;">备注</div>
                  <div class="tree-grid-header--operat">操作</div>
                </div>
              </div>
              <div class="tree-grid--body">
                <el-tree
                  :data="tree_list"
                  node-key="id"
                  :default-expand-all="false"
                  :expand-on-click-node="false"
                  :check-on-click-node="true"
                  empty-text="暂无数据"
                  ref="tree_ref"
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <div class="custom-tree-node--box">
                      <div class="custom-tree-node--title">
                        <div><i class="fa fa-iconfont" :class="fun_increase_icon(node)"></i></div>
                        <div class="custom-tree-node--label">
                          <span>
                            <el-input
                              type="text"
                              :value="node.label"
                              @input="fun_input_handle(node, $event, 'label')"
                            >
                            </el-input>
                          </span>
                        </div>
                      </div>
                      <div class="custom-tree-node--item">
                        <div style="width: 15%;">
                          <span>
                            <el-input
                              type="text"
                              :value="node.data.receive_num"
                              @input="fun_input_handle(node, $event, 'receive_num')"
                            >
                            </el-input>
                          </span>
                        </div>
                        <div style="width: 15%;">
                          <span>
                            <el-input
                              type="text"
                              :value="node.data.copy_num"
                              @input="fun_input_handle(node, $event, 'copy_num')"
                            >
                            </el-input>
                          </span>
                        </div>
                        <div style="width: 120px;" :class="file_state_obj[node.data.file_state]">
                          <span>
                            <el-select
                              :value="node.data.file_state"
                              @change="fun_input_handle(node, $event, 'file_state')"
                            >
                              <el-option
                                v-for="(item, index) in file_state_list"
                                :key="index"
                                :label="item.label"
                                :value="item.prop"
                              >
                              </el-option>
                            </el-select>
                          </span>
                        </div>
                        <div style="width: 35%;">
                          <span>
                            <span>
                              <el-input
                                type="text"
                                :value="node.data.remark"
                                @input="fun_input_handle(node, $event, 'remark')"
                              >
                              </el-input>
                            </span>
                          </span>
                        </div>
                        <div class="custom-tree-node--operat">
                          <el-button type="text" size="mini" @click="() => fun_insert_before(data)">
                            添同级
                          </el-button>
                          <el-button type="text" size="mini" @click="() => fun_append_node(data)">
                            添加下级
                          </el-button>
                          <el-button
                            type="text"
                            size="mini"
                            @click="() => fun_remove_node(node, data)"
                          >
                            删除
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </span>
                </el-tree>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
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
import FileStatus from '@/views/menu/business-manage-menu/file-receive/components/fileStatus.vue'
export default {
  name: 'increase-project',
  mixins: [mixinAsideShowTrue],
  components: {
    FileStatus
  },
  setup(prop, context) {
    let id = 1000
    let contextData = reactive({
      name: '添加项目信息',
      title: '项目级著录单',
      increase_style: {
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll'
      },
      increase_from: {
        receive_date: '', // 接收日期
        file_receiver: '', // 档案接收人
        volume: '', // 卷数
        audit_day: '', // 审核工作日
        submit_word_z: '', // 报送文字材料（张）
        sub_draw_z: '', // 报送图纸材料（张）
        submit_word_v: '', // 报送文字材料（卷）
        sub_draw_v: '', // 报送图纸材料（卷）
        sub_photo_z: '', // 报送照片材料（张）
        report_video_p: '', // 报送录像带材料（盘）
        peview_people: '', // 送审人
        contact_phone: '', // 联系电话
        remark: '' // 备注
      },
      increase_rules: {
        receive_date: [
          { required: true, message: '请输入接收日期', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        file_receiver: [
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
      active_name: 'receive_direct',
      tree_list: [
        {
          id: 1,
          label: '一级 1',
          receive_num: 5,
          copy_num: 2,
          file_state: '合格',
          remark: 'beizhu123',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              receive_num: 5,
              copy_num: 2,
              file_state: '合格',
              remark: 'beizhu123',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                  receive_num: 5,
                  copy_num: 2,
                  file_state: '合格',
                  remark: 'beizhu123'
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                  receive_num: 5,
                  copy_num: 2,
                  file_state: '合格',
                  remark: 'beizhu123'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        },
        {
          id: 4,
          label: '一级 4'
        }
      ],
      file_state_list: [
        { label: '合格', prop: '合格' },
        { label: '不合格', prop: '不合格' }
      ],
      file_state_obj: {
        合格: 'qualified',
        不合格: 'unqualified'
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
        height: document.body.clientHeight - 200 + 'px',
        overflowY: 'scroll'
      }
    }

    const fun_go_back = () => {
      context.root.$router.push({ path: '/business-manage/file-receive' })
    }

    const fun_save_submit = () => {
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

    const fun_project_type_change = () => {}

    const fun_create_project = () => {}

    const fun_tab_click = (tab, event) => {
      console.log(tab, event)
    }

    const fun_append_node = data => {
      const newChild = {
        id: id++,
        label: 'test',
        receive_num: 0,
        copy_num: 0,
        file_state: '',
        remark: 'beizhu',
        children: []
      }
      if (!data.children) {
        context.root.$set(data, 'children', [])
      }
      data.children.push(newChild)
    }

    const fun_insert_before = data => {
      const newChild = {
        id: id++,
        label: 'test',
        receive_num: 0,
        copy_num: 0,
        file_state: '',
        remark: 'beizhu',
        children: []
      }
      context.refs.tree_ref.insertBefore(newChild, data)
    }

    const fun_remove_node = (node, data) => {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }

    const fun_increase_icon = node => {
      const flag = node.data.children?.length > 0
      return flag ? 'wenjianjiaweigongxiang' : 'wenjian'
    }

    const fun_input_handle = (node, e, text) => {
      context.root.$set(node.data, text, e)
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_go_back,
      fun_save_submit,
      fun_show_shrink,
      fun_project_type_change,
      fun_create_project,
      fun_tab_click,
      fun_insert_before,
      fun_append_node,
      fun_remove_node,
      fun_increase_icon,
      fun_input_handle
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>
