<template>
  <div id="sz-table">
    <slot name="content"></slot>
    <el-table
      v-loading="loading_table"
      element-loading-text="加载中"
      :data="table_data"
      style="width: 100%"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @expand-change="fun_expand_change"
      :height="table_height"
      row-class-name="table_th_class"
      header-row-class-name="table_th_header_class"
      @row-dblclick="fun_db_click"
      @selection-change="fun_selection_change"
    >
      <!-- 整改意见列表展开 -->
      <el-table-column v-if="table_config.expand_input" type="expand" width="21.6">
        <template slot-scope="scope">
          <template v-for="item in contextData.table_config.thead">
            <div v-if="item.type === 'expand_input'" :key="item.prop" class="expand--input">
              <div class="expand-input--text">整改意见:</div>
              <div>
                <el-input
                  type="textarea"
                  v-model="scope.row[item.prop]"
                  placeholder="请输入"
                  rows="4"
                  resize="none"
                ></el-input>
              </div>
            </div>
          </template>
        </template>
      </el-table-column>
      <!-- 项目,工程,案卷,文件,利用记录等信息列表展开 -->
      <el-table-column v-if="table_config.expand_info_look" type="expand" width="21.6">
        <template slot-scope="scope">
          <template>
            <div style="margin: 10px 60px;">
              <!-- <sz-project-look /> -->
              <component
                :is="table_config.component_info_look"
                :tree_item="child_table_data[0]"
              ></component>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column v-if="table_config.expand" type="expand" width="21.6">
        <template slot-scope="scope_p">
          <el-table
            v-loading="loading_table"
            element-loading-text="加载中"
            :data="fun_child_table_data(scope_p.$index)"
            @row-dblclick="fun_child_db_click"
          >
            <el-table-column v-if="table_config.checkbox" type="selection" width="20">
            </el-table-column>
            <el-table-column v-if="table_config.number" label="序号" type="index" width="80">
            </el-table-column>
            <template v-for="item in contextData.table_config.children_thead">
              <el-table-column
                v-if="item.type === 'operation'"
                :key="item.label"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              >
                <template slot-scope="scope">
                  <!-- 按钮组 -->
                  <template v-if="item.buttonGroup && item.buttonGroup.length > 0">
                    <template v-for="button in item.buttonGroup">
                      <!-- 事件 -->
                      <el-button
                        v-if="button.event === 'button'"
                        :type="button.type"
                        :key="button.id"
                        @click="button.handler && button.handler(scope.row)"
                        size="small"
                      >
                        {{ button.label }}
                      </el-button>
                      <!-- 路由跳转 -->
                      <router-link
                        v-if="button.event === 'link'"
                        :key="button.id"
                        :to="{
                          name: button.name,
                          query: { [button.key]: scope.row[button.value || 'id'] }
                        }"
                        class="mr-10"
                      >
                        <el-button :type="button.type" size="small">{{ button.label }}</el-button>
                      </router-link>
                    </template>
                  </template>
                  <!-- slot -->
                  <slot v-if="item.slotName" :name="item.slotName" :data="scope.row"></slot>
                </template>
              </el-table-column>
              <!-- 纯文本渲染 -->
              <el-table-column
                v-else
                :key="item.label"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
              />
            </template>
          </el-table>
          <el-row class="padding-top-10" v-if="table_config.pagination_children">
            <el-col :span="24">
              <el-pagination
                v-if="table_config.pagination"
                class="pull-right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="child_currentPage"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="child_pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="child_total"
              >
              </el-pagination>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column v-if="table_config.checkbox" type="selection" width="40"> </el-table-column>
      <el-table-column v-if="table_config.number" label="序号" type="index" width="80">
      </el-table-column>
      <template v-for="item in contextData.table_config.thead">
        <template v-if="item.checked">
          <!--回调-->
          <el-table-column
            v-if="item.type === 'function'"
            :key="item.prop + 1"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          >
            <template slot-scope="scope">
              <!-- 对当前数据做格式化 -->
              <span v-html="item.callback && item.callback(scope.row, item.prop)"></span>
            </template>
          </el-table-column>
          <!--插槽slot-->
          <el-table-column
            v-else-if="item.type === 'slot'"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          >
            <template slot-scope="scope">
              <slot :name="item.slotName" :data="scope.row"></slot>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            v-else-if="item.type === 'operation'"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          >
            <template slot-scope="scope">
              <!-- 按钮组 -->
              <template v-if="item.buttonGroup && item.buttonGroup.length > 0">
                <template v-for="button in item.buttonGroup">
                  <!-- 事件 -->
                  <el-button
                    v-if="button.event === 'button'"
                    :type="button.type"
                    :key="button.id"
                    @click="button.handler && button.handler(scope.row)"
                    size="small"
                  >
                    {{ button.label }}
                  </el-button>
                  <!-- 路由跳转 -->
                  <router-link
                    v-if="button.event === 'link'"
                    :key="button.id"
                    :to="{
                      name: button.name,
                      query: { [button.key]: scope.row[button.value || 'id'] }
                    }"
                    class="mr-10"
                  >
                    <el-button :type="button.type" size="small">{{ button.label }}</el-button>
                  </router-link>
                </template>
              </template>
              <!-- slot -->
              <slot v-if="item.slotName" :name="item.slotName" :data="scope.row"></slot>
            </template>
          </el-table-column>
          <!-- 纯文本渲染 -->
          <el-table-column
            v-else-if="item.type !== 'expand_input'"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          />
        </template>
      </template>
    </el-table>
    <el-row v-if="table_config.pagination" class="padding-top-30">
      <el-col :span="24">
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/**
 * @description table组件(Beta)，内涵table,pagination, searchForm  通过外部配置项开启
 * @name table组件
 * @author ....
//  */
// const  = api;
import ProjectInfo from '@/components/sz-project-look/index.vue'
import EngineInfo from '@/components/sz-engine-look/index.vue'
import CaseFileInfo from '@/components/sz-case-file-look/index.vue'
import FileGenericInfo from '@/components/sz-file-generic-look/index.vue'
import AudioVideo from '@/components/sz-audio-video-look/index.vue'
import UseRecords from '@/components/sz-use-records-look/index.vue'
import ReturnRecord from '@/components/sz-return-record/index.vue'
import IdentBook from '@/components/sz-ident-book/index.vue'
import util from '@/libs/util.js'
import {
  onMounted,
  onBeforeUnmount,
  computed,
  reactive,
  watch,
  watchEffect,
  toRefs
} from '@vue/composition-api'
export default {
  name: 'TableComponent',
  components: {
    ProjectInfo,
    EngineInfo,
    CaseFileInfo,
    FileGenericInfo,
    AudioVideo,
    UseRecords,
    ReturnRecord,
    IdentBook
  },
  props: ['config'],
  setup(prop, context) {
    let contextData = reactive({
      // 加载提示
      table_height: document.body.clientHeight - 278 - 102 - 30,
      loading_table: false,
      child_loading_table: false,
      //设置row-key只展示一行
      expands: [], //只展开一行放入当前行id
      getRowKeys: row => {
        //获取当前行id
        // console.log(row)
        return row.id //这里看这一行中需要根据哪个属性值是id
      },
      // tableData
      table_data: [
        {
          id: 1,
          project_name: '上海奕坤公司兰城城投项目',
          project_adress: '上海市闵行区新龙路38号',
          project_type: '房屋建筑工程',
          enter_pepole: '邓为',
          enter_time: '2019.11.20  14:20:18',
          rectify_sug: '（三）施工文件  1、（三）施工文件：'
        },
        {
          id: 2,
          project_name: '上海奕坤公司兰城城投项目',
          project_adress: '上海市闵行区新龙路38号',
          project_type: '城市管线工程',
          enter_pepole: '邓为',
          enter_time: '2019.11.20  14:20:18'
        },
        {
          id: 3,
          project_name: '上海奕坤公司兰城城投项目',
          project_adress: '上海市闵行区新龙路38号',
          project_type: '其他通用类',
          enter_pepole: '邓为',
          enter_time: '2019.11.20  14:20:18'
        },
        {
          id: 4,
          project_name: '上海奕坤公司兰城城投项目',
          project_adress: '上海市闵行区新龙路38号',
          project_type: '市政基础设施',
          enter_pepole: '邓为',
          enter_time: '2019.11.20  14:20:18'
        },
        {
          id: 5,
          project_name: '上海奕坤公司兰城城投项目',
          project_adress: '上海市闵行区新龙路38号',
          project_type: '道路工程',
          enter_pepole: '邓为',
          enter_time: '2019.11.20  14:20:18'
        },
        {
          id: 6,
          project_name: '上海奕坤公司兰城城投项目',
          project_adress: '上海市闵行区新龙路38号',
          project_type: '桥梁工程',
          enter_pepole: '邓为',
          enter_time: '2019.11.20  14:20:18'
        },
        {
          id: 7,
          project_name: '上海奕坤公司兰城城投项目',
          project_adress: '上海市闵行区新龙路38号',
          project_type: '园林绿化工程',
          enter_pepole: '邓为',
          enter_time: '2019.11.20  14:20:18'
        },
        {
          id: 8,
          project_name: '上海奕坤公司兰城城投项目',
          project_adress: '上海市闵行区新龙路38号',
          project_type: '房屋建筑工程',
          enter_pepole: '邓为',
          enter_time: '2019.11.20  14:20:18'
        }
      ],
      child_table_data: [
        {
          id: 1,
          engin_name: '上海奕坤公司兰城城投项目',
          engin_adress: '上海市闵行区新龙路38号',
          engin_type: '房屋建筑工程',
          enter_pepole: '邓为',
          enter_time: '2019.11.20  14:20:18'
        },
        {
          id: 2,
          engin_name: '上海奕坤公司兰城城投项目',
          engin_adress: '上海市闵行区新龙路38号',
          engin_type: '房屋建筑工程',
          enter_pepole: '邓为',
          enter_time: '2019.11.20  14:20:18'
        }
      ],
      table_config: {
        // 初始化是否请求接口
        isRequest: true,
        // table的label prop
        thead: [],
        // table的label prop
        children_thead: [],
        // 是否开启多选
        checkbox: false,
        // 是否显示序号
        number: false,
        // 是否显示展开行功能
        expand: false,
        // 整改意见列表展开
        expand_input: false,
        // 项目,工程,案卷,文件,利用记录等信息列表展开
        expand_info_look: false,
        // 展开切换不同组件
        component_info_look: 'ProjectInfo',
        // 移交书
        expand_handover: false,
        // 请求列表的接口路径 默认 '/getattr/0'
        apiType: 'CommonFun',
        // table表格要减去的高度
        table_height: 278 + 102 + 30,
        url: '',
        // 请求参数
        data: {},
        // 是否开启分页
        pagination: true,
        // 子table是否开启分页
        pagination_children: false,
        // 是否拥有筛选条件
        search_form: true,
        // form
        form_item: [],
        form_handler: [],
        form_config: {
          resetButton: false
        }
      },
      // 总条数
      total: 0,
      child_total: 0,
      // 当前页码
      currentPage: 1,
      child_currentPage: 1,
      pageSize: 30,
      child_pageSize: 30
    })

    watchEffect(() => {
      for (let key in prop.config) {
        if (Object.keys(contextData.table_config).includes(key)) {
          contextData.table_config[key] = prop.config[key]
        }
      }
      contextData.table_height = document.body.clientHeight - contextData.table_config.table_height
      contextData.pageSize = contextData.table_config.data.PageSize
      // 配置完成后开始读取接口数据
      contextData.table_config.isRequest && loadData()
    })

    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onResize = () => {
      contextData.table_height = document.body.clientHeight - contextData.table_config.table_height
    }

    const search = data => {
      const searchData = data
      searchData.pageIndex = 1
      searchData.PageSize = 10
      contextData.requestData(searchData)
    }

    const loadData = async () => {
      const params = {
        url: contextData.table_config.url, // 列表接口 url
        data: contextData.table_config.data // 列表接口参数
      }
      // contextData.loading_table = true;

      // 获取当前时间
      params.data.endTime = params.data.endTime || util.tool.fun_now_format_date()

      let data = await context.root.CommonFun(params.data, params.url)
      if (data.errcode == 401 && data.message == 'Token 不存在！') {
        return false
      }
      if (data.code === 0 || data.errcode === 0) {
        contextData.table_data = data.data.list || (Array.isArray(data.data) ? data.data : []) // 获取列表数据
        contextData.total = data.data.total || data.count
        // contextData.total = data.total || data.search_count; // 获取列表总数  count 根据后端修改，所有都要统一
        // contextData.$nextTick(() => { // 考虑到DOM元素渲染完成时候
        // 可以做些什么。。。
        // })
      }
      // contextData.loading_table = false; // loading 关闭
    }

    const requestData = (params = '') => {
      if (params) {
        // 处理业务逻辑
        contextData.table_config.data = params
      }
      loadData()
    }

    const handleSizeChange = val => {
      contextData.table_config.data.PageSize = val
      loadData()
    }

    const handleCurrentChange = val => {
      contextData.table_config.data.pageIndex = val
      loadData()
    }

    const fun_expand_change = (row, expandedRows) => {
      // console.log('expandedRows', expandedRows)
      // console.log('row', row)
      let flag = contextData.table_config.expand_handover
      if (flag) return false
      if (expandedRows.length) {
        contextData.expands = []
        if (row) {
          contextData.expands.push(row.id) // 每次push进去的是每行的ID
        }
      } else {
        contextData.expands = [] // 默认不展开
      }
      context.emit('fun_expand_change', row)
      // console.log('contextData.expands', contextData.expands)
    }

    const fun_child_table_data = index => {
      let list = []
      let flag = contextData.table_config.expand_handover
      list.push(contextData.table_data[index])
      return flag ? list : contextData.child_table_data
    }

    const fun_db_click = row => {
      context.emit('fun_db_click', row)
    }

    const fun_child_db_click = row => {
      context.emit('fun_child_db_click', row)
    }

    const fun_selection_change = val => {
      context.emit('fun_selection_change', val)
    }

    return {
      contextData,
      ...toRefs(contextData),
      search,
      requestData,
      handleSizeChange,
      handleCurrentChange,
      fun_expand_change,
      fun_db_click,
      fun_child_db_click,
      fun_child_table_data,
      fun_selection_change
    }
  },
  beforeMount() {
    // console.log(YktFun);
  }
}
</script>
<style lang="scss" scoped>
#sz-table .padding-top-10 {
  padding-top: 8px;
  padding-bottom: 5px;
  background-color: $color-bg-2;
}

#sz-table .padding-top-10 .el-col {
  display: flex;
  justify-content: flex-start;
  padding-left: 119px;
}

#sz-table .padding-top-30 {
  padding-top: 43px;
  padding-bottom: 30px;
}

#sz-table .padding-top-30 .el-col {
  display: flex;
  justify-content: center;
}

.mr-10 {
  margin-right: 10px;
}
.expand--input {
  padding: 5px 40px;
  .expand-input--text {
    margin-bottom: 10px;
  }
}
</style>
