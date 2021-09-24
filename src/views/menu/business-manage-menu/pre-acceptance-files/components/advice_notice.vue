<template>
  <div id="advice-notice">
    <el-table :data="table_list" style="width: 100%" height="200">
      <el-table-column type="expand" width="20">
        <template slot-scope="scope">
          <div class="advice-notice-rectify-sug">
            <div>整改意见:</div>
            <div>
              <el-input
                type="textarea"
                v-model="scope.row.rectify_sug"
                placeholder="请输入"
                rows="4"
                resize="none"
              ></el-input>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="advice_notice_num" label="整改意见通知单编号" min-width="180">
      </el-table-column>
      <el-table-column prop="issue_date" label="发放日期" min-width="180"> </el-table-column>
      <el-table-column label="操作" min-width="180"> 
        <template>
          <el-button type="text" size="small" tip="通过报送清单添加增改意见">编辑</el-button>
          <el-button type="text" size="small" tip="通过报送清单添加增改意见">保存</el-button>
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small">打印</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  onMounted,
  onBeforeUnmount,
  computed,
  reactive,
  watchEffect,
  toRefs
} from '@vue/composition-api'
export default {
  props: ['advice_notice_obj'],
  setup(prop, context) {
    let contextData = reactive({
      name: '整改意见通知单列表',
      table_list: []
    })

    onMounted(() => {
      contextData.table_list = prop.advice_notice_obj.table_list
    })

    return {
      contextData,
      ...toRefs(contextData)
    }
  }
}
</script>
