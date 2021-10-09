<template>
  <div id="case-manage-tree">
    <div>
      <div class="case-manage">
        <div class="case-manage--header global-between-center--flex">
          <div class="case-manage--text global--ml20">项目名称：</div>
        </div>
        <div :style="height_style">
          <div class="receive-direct">
            <div class="case-manage--box" id="sz-tree-table">
              <div class="case-manage--body">
                <el-table
                  :data="tree_list"
                  highlight-current-row
                  @current-change="fun_current_change"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  :tree-props="{ children: 'children' }"
                >
                  <el-table-column type="index" label="" width="40">
                    <template slot-scope="scope">
                      <div class="case-manage--index">
                        <div class="case-manage--index">
                          {{ scope.$index + 1 }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="label" label="题名" width="280">
                    <template slot-scope="scope">
                      <div class="custom-tree-node--title">
                        <div>
                          <i class="fa fa-iconfont" :class="fun_increase_icon(scope.row)"></i>
                        </div>
                        <div class="custom-tree-node--label">
                          <span>
                            {{ scope.row.label }}
                          </span>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="receive_num" label="总登记号" width="100">
                  </el-table-column>
                  <el-table-column prop="copy_num" label="档号" width="180"> </el-table-column>
                  <el-table-column prop="remark" label="存放地址"> </el-table-column>
                  <el-table-column prop="file_state" label="宽度" width="100">
                    <template slot-scope="scope">
                      <template v-if="scope.row.level == 'case_file'">
                        <el-select v-model="scope.row.file_state">
                          <el-option
                            v-for="(item, index) in file_state_list"
                            :key="index"
                            :label="item.label"
                            :value="item.prop"
                          >
                          </el-option>
                        </el-select>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <template v-if="scope.row.level == 'case_file'">
                        <el-button type="text" size="mini" @click="() => fun_print_back(scope.row)">
                          打印脊背
                        </el-button>
                      </template>
                      <template v-else>
                        <el-button
                          type="text"
                          size="mini"
                          @click="() => fun_print_cover(scope.row)"
                        >
                          打印封面
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          @click="() => fun_print_directory(scope.row)"
                        >
                          打印目录
                        </el-button>
                        <el-button
                          type="text"
                          size="mini"
                          @click="() => fun_print_table(scope.row)"
                        >
                          打印备考表
                        </el-button>
                      </template>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  onMounted,
  computed,
  reactive,
  watchEffect,
  toRefs,
  onBeforeUnmount
} from '@vue/composition-api'
export default {
  props: ['tree_item'],
  setup(prop, context) {
    let id = 1000
    let contextData = reactive({
      height_style: {
        height: document.body.clientHeight - 222 - 60 + 'px',
        overflowY: 'auto'
      },
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
              remark: 'beizhu123'
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
          id: 44,
          label: '一级 4'
        }
      ],
      file_state_list: [
        { label: '2厘米', prop: '2厘米' },
        { label: '3厘米', prop: '3厘米' },
        { label: '4厘米', prop: '4厘米' },
        { label: '5厘米', prop: '5厘米' },
        { label: '6厘米', prop: '6厘米' }
      ],
      file_state_obj: {
        合格: 'qualified',
        不合格: 'unqualified'
      },
      select_current_row: null
    })

    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onResize = () => {
      contextData.height_style = {
        height: document.body.clientHeight - 222 - 60 + 'px',
        overflowY: 'auto'
      }
    }

    watchEffect(() => {
      contextData.tree_list = prop.tree_item.children
      console.log(prop.tree_item);
    })

    const fun_increase_icon = node => {
      const flag = node.children?.length > 0
      return flag ? 'wenjianjiaweigongxiang' : 'wenjian'
    }

    const fun_input_handle = (node, e, text) => {
      context.root.$set(node.data, text, e)
    }

    const fun_current_change = val => {
      contextData.select_current_row = val
      context.emit('fun_current_change', val)
    }

    const fun_print_back = val => {}

    const fun_print_cover = val => {}

    const fun_print_directory = val => {}

    const fun_print_table = (node, val) => {}

    const fun_case_manage = () => {}

    const fun_created = () => {}

    return {
      contextData,
      ...toRefs(contextData),
      fun_increase_icon,
      fun_input_handle,
      fun_current_change,
      fun_print_back,
      fun_print_cover,
      fun_print_directory,
      fun_print_table,
      fun_case_manage,
      fun_created
    }
  }
}
</script>
<style lang="scss" scoped>
.case-manage {
  overflow-y: 'scroll';
  background: $color-bg-4;
  border-radius: 6px;
  position: relative;
  .case-manage--header {
    height: 59px;
    border-bottom: 1px solid $color-border-1;
    .case-manage--text {
      font-size: 16px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      color: $color-text-main;
    }
  }
  .receive-direct {
    margin: 30px 20px;
  }
  .case-manage--box {
    .case-manage--index {
      text-align: center;
      width: 100%;
    }
  }
}
</style>
