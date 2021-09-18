<template>
  <div id="sz-advanced-query">
    <el-dialog
      :title="advanced_query_title"
      :visible.sync="advanced_query_dialog"
      width="45%"
      :lock-scroll="true"
      custom-class="advanced-query--dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="fun_advanced_query_close"
    >
      <template slot="title">
        {{ advanced_query_title }}
      </template>
      <div class="advanced-query--body">
        <div>
          <el-select v-model="type_query" placeholder="请选择" :disabled="project_query_disabled">
            <el-option
              v-for="(item, index) in type_query_list"
              :key="index"
              :label="item.label"
              :value="item.prop"
            >
            </el-option>
          </el-select>
        </div>
        <div class="sz-advanced-query--table">
          <el-table :data="table_data" style="width: 100%" border>
            <el-table-column label="查询字段">
              <template slot-scope="scope">
                <sz-select-item
                  :current_prop="scope.row.query_field"
                  :current_list="query_field_list"
                  :current_state="current_state"
                  current_key="query_field"
                  :current_index="scope.$index"
                  @fun_state_change="fun_state_change"
                />
              </template>
            </el-table-column>
            <el-table-column label="查询方式" width="100">
              <template slot-scope="scope">
                <sz-select-item
                  :current_prop="scope.row.query_way"
                  :current_list="query_way_list"
                  :current_state="current_state"
                  current_key="query_way"
                  :current_index="scope.$index"
                  @fun_state_change="fun_state_change"
                />
              </template>
            </el-table-column>
            <el-table-column prop="query_params" label="查询参数">
              <template slot-scope="scope">
                <sz-select-item
                  :current_prop="scope.row.query_params"
                  :current_state="current_state"
                  current_key="query_params"
                  :current_index="scope.$index"
                  @fun_state_change="fun_state_change"
                />
              </template>
            </el-table-column>
            <el-table-column label="连接条件" width="100">
              <template slot-scope="scope">
                <sz-select-item
                  :current_prop="scope.row.connect_condition"
                  :current_list="connect_condition_list"
                  :current_state="current_state"
                  current_key="connect_condition"
                  :current_index="scope.$index"
                  @fun_state_change="fun_state_change"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <div class="global--ml10">
                  <el-button
                    v-if="scope.$index != table_data.length - 1"
                    class="delete-button--active"
                    type="text"
                    size="small"
                    @click="fun_delete(scope.$index)"
                  >
                    删除
                  </el-button>
                  <el-button class="delete-button" v-else type="text" size="small">
                    删除
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <template slot="footer">
        <div class="advanced-query--box">
          <sz-button title="取消" @click="fun_advanced_query_close"></sz-button>
          <sz-button
            class="global--ml20"
            title="查询"
            type="primary"
            @click="fun_advanced_query_submit"
          ></sz-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
import szSelectItem from './components/item'
export default {
  components: {
    szSelectItem
  },
  props: ['advanced_query_obj'],
  setup(prop, context) {
    let contextData = reactive({
      advanced_query_title: '高级查询',
      advanced_query_dialog: false,
      project_query_disabled: false,
      type_query: 1,
      type_query_list: [
        { label: '工程查询-全部类型', prop: 1 },
        { label: '工程查询-房屋建筑工程', prop: 2 },
        { label: '工程查询-市政基础设施', prop: 3 },
        { label: '工程查询-城市管线工程', prop: 4 },
        { label: '工程查询-其他通用类', prop: 5 },
        { label: '工程查询-道路工程', prop: 6 },
        { label: '工程查询-桥梁工程', prop: 7 },
        { label: '工程查询-园林绿化工程', prop: 8 }
      ],
      query_field: 'engin_name',
      query_field_list: [
        { label: '项目名称', prop: 'project_name' },
        { label: '项目地点', prop: 'project_adress' },
        { label: '项目类型', prop: 'project_type' },
        { label: '录入人', prop: 'enter_pepole' },
        { label: '录入时间', prop: 'enter_time' }
      ],
      query_way: '',
      query_way_list: [
        { label: '包含', prop: 1 },
        { label: '等于', prop: 2 },
        { label: '不等于', prop: 3 }
      ],
      query_params: '',
      connect_condition: 1,
      connect_condition_list: [
        { label: '且', prop: 1 },
        { label: '或', prop: 2 }
      ],
      table_data: [
        {
          query_field: 'project_name',
          query_way: 1,
          query_params: '',
          connect_condition: 1
        }
      ],
      current_state: true
    })

    watchEffect(() => {
      const {
        advanced_query_dialog,
        query_field_list,
        project_query_disabled,
        type_query_value
      } = prop.advanced_query_obj
      contextData.advanced_query_dialog = advanced_query_dialog
      contextData.query_field_list = query_field_list
      contextData.project_query_disabled = project_query_disabled
      contextData.type_query_value = type_query_value
      contextData.advanced_query_dialog = true
    })

    const fun_advanced_query_close = () => {
      context.emit('fun_advanced_query_close')
    }

    const fun_advanced_query_submit = () => {
      context.emit('fun_advanced_query_close')
    }

    const fun_state_change = obj => {
      const { current_key, current_index, current_prop } = obj
      console.log(current_prop)
      contextData.table_data[current_index][current_key] = current_prop
      if (current_key == 'query_params') {
        contextData.table_data.push({
          query_field: 'project_name',
          query_way: 1,
          query_params: '',
          connect_condition: 1
        })
      }
    }

    const fun_delete = i => {
      let list = contextData.table_data.filter(item => item.query_field)
      contextData.table_data = []
      contextData.table_data = list.filter((item, index) => index != i)
      console.log(list, contextData.table_data)
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_advanced_query_close,
      fun_advanced_query_submit,
      fun_state_change,
      fun_delete
    }
  }
}
</script>
<style lang="scss" scoped>
.advanced-query--box {
  display: flex;
}
.sz-advanced-query--table {
  margin-top: 18px;
}
</style>
