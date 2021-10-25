<template>
  <div id="sz-auvi-file-table">
    <slot name="content"></slot>
    <div class="table-content-box" :style="table_style">
      <template>
        <div class="table-content-ul">
          <div
            v-for="item in table_data"
            :key="item.id"
            :class="fun_filter_img_class(item.id)"
            @click="fun_preview_img(item, item.id)"
          >
            <div class="table-content global-column-center--flex">
              <div class="table-content-btn-img global-column-center--flex">
                <img :src="item.project_img" alt="" />
                <div class="table-content-btn">
                  <template v-for="button in table_config.buttonGroup">
                    <!-- 事件 -->
                    <el-button
                      v-if="button.event === 'button'"
                      :type="button.type"
                      :key="button.id"
                      @click.stop="button.handler && button.handler(item, table_data)"
                      size="small"
                    >
                      {{ button.label }}
                    </el-button>
                    <!-- 路由跳转 -->
                  </template>
                </div>
              </div>
              <div class="table-content-name">
                {{ item.project_name }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
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
  props: ['config'],
  setup(prop, context) {
    let contextData = reactive({
      table_style: document.body.clientHeight - 375 + 'px',
      table_data: [
        {
          id: 1,
          project_name: '中心广场.jpg',
          project_img:
            'http://demo.e-square.com.cn:8085/images/001/ucamisweb/00001/thumb/8934416f-1c5e-4e71-997d-4cc43719ad69/8934416f-1c5e-4e71-997d-4cc43719ad69.jpg?t=1634788068004'
        },
        {
          id: 2,
          project_name: '中心广场.jpg',
          project_img:
            'http://demo.e-square.com.cn:8085/images/001/ucamisweb/00001/thumb/8934416f-1c5e-4e71-997d-4cc43719ad69/8934416f-1c5e-4e71-997d-4cc43719ad69.jpg?t=1634788068004'
        },
        {
          id: 3,
          project_name: '中心广场.jpg',
          project_img:
            'http://demo.e-square.com.cn:8085/images/001/ucamisweb/00001/thumb/8934416f-1c5e-4e71-997d-4cc43719ad69/8934416f-1c5e-4e71-997d-4cc43719ad69.jpg?t=1634788068004'
        },
        {
          id: 4,
          project_name: '中心广场.jpg',
          project_img:
            'http://demo.e-square.com.cn:8085/images/001/ucamisweb/00001/thumb/8934416f-1c5e-4e71-997d-4cc43719ad69/8934416f-1c5e-4e71-997d-4cc43719ad69.jpg?t=1634788068004'
        },
        {
          id: 5,
          project_name: '中心广场.jpg',
          project_img:
            'http://demo.e-square.com.cn:8085/images/001/ucamisweb/00001/thumb/8934416f-1c5e-4e71-997d-4cc43719ad69/8934416f-1c5e-4e71-997d-4cc43719ad69.jpg?t=1634788068004'
        },
        {
          id: 6,
          project_name: '中心广场.jpg',
          project_img:
            'http://demo.e-square.com.cn:8085/images/001/ucamisweb/00001/thumb/8934416f-1c5e-4e71-997d-4cc43719ad69/8934416f-1c5e-4e71-997d-4cc43719ad69.jpg?t=1634788068004'
        },
        {
          id: 7,
          project_name: '中心广场.jpg',
          project_img:
            'http://demo.e-square.com.cn:8085/images/001/ucamisweb/00001/thumb/8934416f-1c5e-4e71-997d-4cc43719ad69/8934416f-1c5e-4e71-997d-4cc43719ad69.jpg?t=1634788068004'
        },
        {
          id: 8,
          project_name: '中心广场.jpg',
          project_img:
            'http://demo.e-square.com.cn:8085/images/001/ucamisweb/00001/thumb/8934416f-1c5e-4e71-997d-4cc43719ad69/8934416f-1c5e-4e71-997d-4cc43719ad69.jpg?t=1634788068004'
        },
        {
          id: 9,
          project_name: '中心广场.jpg',
          project_img:
            'http://demo.e-square.com.cn:8085/images/001/ucamisweb/00001/thumb/8934416f-1c5e-4e71-997d-4cc43719ad69/8934416f-1c5e-4e71-997d-4cc43719ad69.jpg?t=1634788068004'
        }
      ],
      table_config: {
        // 初始化是否请求接口
        isRequest: true,
        // table的按钮组
        buttonGroup: [],
        // 是否开启多选
        checkbox: false,
        // 初始化是否显示浏览
        istable: true,
        // 初始化是否显示详情
        isDetail: true,
        // table页面要减去的高度
        table_height: 375,
        // 请求url
        url: '',
        // 请求参数
        data: {},
        // 是否开启分页
        pagination: true
      },
      // 总条数
      total: 0,
      // 当前页码
      currentPage: 1,
      pageSize: 30,
      current_preview_id_list: [],
      current_preview_list: []
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onResize = () => {
      contextData.table_style = {
        height: document.body.clientHeight - contextData.table_config.table_height + 'px'
      }
    }

    watchEffect(() => {
      for (let key in prop.config) {
        if (Object.keys(contextData.table_config).includes(key)) {
          contextData.table_config[key] = prop.config[key]
        }
      }
      contextData.table_style = {
        height: document.body.clientHeight - contextData.table_config.table_height + 'px'
      }
      contextData.pageSize = contextData.table_config.data.PageSize
      // 配置完成后开始读取接口数据
      contextData.table_config.isRequest && loadData()
    })

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

    // 支持外部调用的方法
    const search = data => {
      const searchData = data
      searchData.pageIndex = 1
      searchData.PageSize = 10
      requestData(searchData)
    }

    // 支持外部调用的方法
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

    const fun_preview_img = (item, id) => {
      if (!contextData.table_config.checkbox) return
      const list = contextData.current_preview_id_list
      if (list.indexOf(id) === -1) {
        contextData.current_preview_id_list.push(id)
      } else {
        contextData.current_preview_id_list = list.filter(item => item !== id)
      }
      contextData.current_preview_list = contextData.table_data.filter(
        item => contextData.current_preview_id_list.indexOf(item.id) !== -1
      )
      fun_selection_change(contextData.current_preview_list)
    }

    const fun_filter_img_class = id => {
      const flag = contextData.current_preview_id_list.indexOf(id) !== -1
      return flag ? 'table-content-li_active' : 'table-content-li'
    }

    const fun_selection_change = val => {
      context.emit('fun_selection_change', val)
    }

    const fun_select_all = () => {
      contextData.current_preview_id_list = contextData.table_data.map(item => item.id)
      contextData.current_preview_list = contextData.table_data
      fun_selection_change(contextData.current_preview_list)
    }

    const fun_deselect = () => {
      contextData.current_preview_id_list = []
      contextData.current_preview_list = []
      fun_selection_change(contextData.current_preview_list)
    }

    const fun_refresh = () => {
      return
      loadData()
    }

    return {
      contextData,
      ...toRefs(contextData),
      search,
      requestData,
      handleSizeChange,
      handleCurrentChange,
      fun_preview_img,
      fun_filter_img_class,
      fun_select_all,
      fun_deselect,
      fun_refresh
    }
  }
}
</script>

<style lang="scss" scoped>
#sz-auvi-file-table {
  padding: 0 18px;
  .table-content-box {
    overflow: auto;
  }
  .table-content-ul {
    .table-content-li {
      float: left;
      margin: 1px;
      width: 212px;
      height: 212px;
      border-radius: 3px;
      border: 1px solid $color-border-1;
    }

    .table-content-li:hover {
      background-color: #eaf2ff;
    }
    .table-content-li:hover,
    .table-content-li_active:hover {
      .table-content {
        .table-content-btn-img {
          .table-content-btn {
            display: block;
          }
        }
      }
    }
    .table-content-li_active {
      float: left;
      margin: 1px;
      width: 212px;
      height: 212px;
      border-radius: 3px;
      border: 1px solid $color-border-1;
      background-color: #ffe48d;
    }
    .table-content {
      height: 100%;
      .table-content-btn-img {
        position: relative;
        width: 140px;
        height: 140px;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 100%;
        }
        .table-content-btn {
          display: none;
          position: absolute;
          left: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.29);
          width: 140px;
          height: 30px;
          padding-left: 10px;

          .el-button {
            color: $color-text-5;
            padding: 0;
            height: 30px;
            line-height: 30px;
          }

          .el-button:hover {
            color: $color-link;
          }
        }
      }
      .table-content-name {
        margin-top: 10px;
        font-size: 14px;
      }
    }
  }
  .padding-top-30 {
    padding-top: 43px;
    padding-bottom: 30px;
    .el-col {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
