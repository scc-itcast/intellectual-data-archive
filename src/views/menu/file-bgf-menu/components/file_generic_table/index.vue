<template>
  <div class="file-generic-table">
    <div class="file-generic-table--header global-between-center--flex">
      <div class="file-generic-table--text global--ml20">文件信息</div>
    </div>
    <div class="file-generic-table--content">
      <el-table
        ref="multipleTable"
        :data="file_generic_table"
        style="width: 100%"
        :height="table_height"
        @selection-change="fun_selection_change"
      >
        <el-table-column type="index" width="20"> </el-table-column>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column property="file_name" label="文件名" width="200">
          <template slot-scope="scope">
            <span>
              <el-input
                type="text"
                :value="scope.row.file_name"
                @input="fun_input_handle(scope.row, $event, 'file_name')"
              >
              </el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column property="res_people" label="责任者" width="100">
          <template slot-scope="scope">
            <span>
              <el-input
                type="text"
                :value="scope.row.res_people"
                @input="fun_input_handle(scope.row, $event, 'res_people')"
              >
              </el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column property="article_draw" label="文图号" width="100">
          <template slot-scope="scope">
            <span>
              <el-input
                type="text"
                :value="scope.row.article_draw"
                @input="fun_input_handle(scope.row, $event, 'article_draw')"
              >
              </el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column property="start_date" label="起始日期" width="120">
          <template slot-scope="scope">
            <span>
              <el-date-picker
                v-model="scope.row.start_date"
                type="datetime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :clearable="false"
                @change="fun_input_handle(scope.row, $event, 'start_date')"
              >
              </el-date-picker>
            </span>
          </template>
        </el-table-column>
        <el-table-column property="end_date" label="终止日期" width="120">
          <template slot-scope="scope">
            <span>
              <el-date-picker
                v-model="scope.row.end_date"
                type="datetime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dds"
                :clearable="false"
                @change="fun_input_handle(scope.row, $event, 'end_date')"
              >
              </el-date-picker>
            </span>
          </template>
        </el-table-column>
        <el-table-column property="carr_type" label="载体类型" width="100">
          <template slot-scope="scope">
            <span>
              <el-select
                :value="scope.row.carr_type"
                @change="fun_input_handle(scope.row, $event, 'carr_type')"
              >
                <el-option
                  v-for="(item, index) in file_generic_table_obj.carr_type_list"
                  :key="index"
                  :label="item.label"
                  :value="item.prop"
                >
                </el-option>
              </el-select>
            </span>
          </template>
        </el-table-column>
        <el-table-column property="start_page" label="起始页" width="100">
          <template slot-scope="scope">
            <span>
              <el-input
                type="text"
                :value="scope.row.start_page"
                @input="fun_input_handle(scope.row, $event, 'start_page')"
              >
              </el-input>
            </span>
          </template>
        </el-table-column>
        <el-table-column property="note" label="附注" width="100">
          <template slot-scope="scope">
            <span>
              <el-input
                type="text"
                :value="scope.row.note"
                @input="fun_input_handle(scope.row, $event, 'note')"
              >
              </el-input>
            </span>
          </template>
        </el-table-column>
      </el-table>
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
  props: ['file_generic_table_obj'],
  setup(prop, context) {
    let contextData = reactive({
      file_generic_table: [],
      multiple_selection: [],
      table_height: document.body.clientHeight - 284,
      carr_type_list: [],
      file_generic_table_index: []
    })

    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onResize = () => {
      contextData.table_height = document.body.clientHeight - 284
    }

    watchEffect(() => {
      contextData.file_generic_table = prop.file_generic_table_obj.file_generic_table
    })

    const fun_selection_change = val => {
      contextData.multiple_selection = val
      contextData.file_generic_table_index = val.map(item => item.index)
      context.emit('fun_selection_change', contextData.file_generic_table_index)
    }

    const fun_input_handle = (row, e, text) => {
      context.root.$set(row, text, e)
      // console.log(contextData.file_generic_table)
    }

    const fun_delete = () => {
      console.log('delete')
      context.emit('fun_file_generic_table_delete', contextData.file_generic_table_index) // 不传递参数也没事,可以不用
    }

    const fun_created = () => {
      console.log('created')
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_selection_change,
      fun_input_handle,
      fun_delete,
      fun_created
    }
  }
}
</script>
<style lang="scss" scoped>
.file-generic-table {
  width: 100%;
  background: $color-bg-4;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  .file-generic-table--header {
    height: 59px;
    border-bottom: 1px solid $color-border-1;
    .file-generic-table--text {
      font-size: 16px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      color: $color-text-main;
    }
  }
  .file-generic-table--content {
    width: 100%;
  }
}
</style>
