<template>
  <div class="receive-direct">
    <div class="tree-grid--box" id="sz-tree-table">
      <div class="tree-grid--header">
        <div class="tree-grid-header--title">文件名称</div>
        <div class="tree-grid-header--item">
          <div style="width: 15%;">接收数量</div>
          <div style="width: 15%;">复印数量</div>
          <div style="width: 120px;">文件状态</div>
          <div style="width: 35%;">备注</div>
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
          <span class="custom-tree-node" slot-scope="{ node }">
            <div class="custom-tree-node--box">
              <div class="custom-tree-node--title">
                <div><i class="fa fa-iconfont" :class="fun_increase_icon(node)"></i></div>
                <div class="custom-tree-node--label">
                  <span>
                    {{ node.label }}
                  </span>
                </div>
              </div>
              <div class="custom-tree-node--item">
                <div style="width: 15%;">
                  <span>
                    {{ node.data.receive_num }}
                  </span>
                </div>
                <div style="width: 15%;">
                  <span>
                    {{ node.data.copy_num }}
                  </span>
                </div>
                <div style="width: 120px;" :class="file_state_obj[node.data.file_state]">
                  <span>
                    {{ node.data.file_state }}
                  </span>
                </div>
                <div style="width: 35%;">
                  <span>
                    <span>
                      {{ node.data.remark }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  setup(prop, context) {
    let id = 1000
    let contextData = reactive({
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

    const fun_increase_icon = node => {
      const flag = node.data.children?.length > 0
      return flag ? 'wenjianjiaweigongxiang' : 'wenjian'
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_increase_icon
    }
  }
}
</script>
