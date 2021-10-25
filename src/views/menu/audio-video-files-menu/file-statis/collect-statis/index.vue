<template>
  <d2-container type="ghost" better-scroll :breadcrumb="breadcrumb">
    <template slot="header">
      <div class="query--box global--flex">
        <div class="query-list--box global--flex">
          <div v-for="(item, index) in queryList" :key="index">
            <sz-text-input
              :queryObject="item"
              :index="index"
              className="primary"
              @fun_value_change="fun_value_change"
            ></sz-text-input>
          </div>
        </div>
      </div>
    </template>
    <template>
      <div class="content-background" style="padding-bottom: 20px;">
        <div class="table-list--box">
          <sz-table
            class="table-padding-left30"
            :config="tableList"
            @fun_db_click="fun_db_click"
          ></sz-table>
        </div>
      </div>
      <div class="content-background" style="margin-top: 10px;">
        <div class="echart--box">
          <div class="echart-btn--box">
            <div v-show="toggle_echart_type === 'line'" class="line-echart-btn--box">
              <template v-for="(item, index) in legend_list">
                <div
                  :key="index"
                  class="pie-line-echart-btn--item"
                  :class="fun_legend_list_btn_class(index)"
                  @click="fun_legend_list(index)"
                >
                  <div class="global--mr10 pie-line-btn--icon">
                    <i aria-hidden="true" class="fa fa-iconfont pluscircleyuanjiahao"></i>
                  </div>
                  <div class="pie-line-btn--text">{{ item.text }}</div>
                </div>
              </template>
            </div>
            <div v-show="toggle_echart_type === 'pie'" class="pie-echart-btn--box">
              <template v-for="(item, index) in legend_list">
                <div
                  :key="index"
                  class="pie-line-echart-btn--item"
                  :class="fun_legend_list_btn_class(index)"
                  @click="fun_legend_list(index)"
                >
                  <div class="global--mr10 pie-line-btn--icon">
                    <i aria-hidden="true" class="fa fa-iconfont pluscircleyuanjiahao"></i>
                  </div>
                  <div class="pie-line-btn--text">{{ item.text }}</div>
                </div>
              </template>
            </div>
            <div class="line-pie-toggle-btn">
              <template v-for="(item, index) in pie_toggle_list">
                <span :key="index" :class="fun_toggle_btn_class(index)" class="toggle-btn">
                  <i @click="fun_toggle_btn(index)" :class="item.icon" class="fa fa-iconfont"></i>
                </span>
              </template>
            </div>
          </div>
          <div class="collect_statis_echart-box">
            <div id="collect_statis_echart_line" :style="{ zIndex: line_pie_z_index.line }"></div>
            <div id="collect_statis_echart_pie" :style="{ zIndex: line_pie_z_index.pie }"></div>
          </div>
        </div>
      </div>
      <div v-if="advanced_query_obj_show">
        <sz-advanced-query
          :advanced_query_obj="advanced_query_obj"
          @fun_advanced_query_close="fun_advanced_query_close"
        />
      </div>
    </template>
  </d2-container>
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
import { collect_statis_echart } from '@/views/menu/audio-video-files-menu/file-statis/collect-statis/echartOption'
export default {
  name: 'collect-statis',
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let tableList = reactive({
      search_form: false,
      isRequest: false,
      table_total: true,
      pagination: false,
      // checkbox: true,
      number: true,
      // expand: true,
      table_height: 610,
      url: '',
      data: {
        pageIndex: 1,
        PageSize: 10,
        startTime: '2021-01-01 00:00:00'
      },
      thead: [
        { label: '时间', prop: 'time', checked: true, width: '100' },
        { label: '照片数量(张)', prop: 'photos_num', checked: true, width: '100' },
        { label: '照片存储大小(GB)', prop: 'photos_sto_size', checked: true, width: '100' },
        { label: '视频数量(个)', prop: 'video_num', checked: true, width: '100' },
        { label: '视频存储大小(GB)', prop: 'video_sto_size', checked: true, width: '100' },
        { label: '音频数量(个)', prop: 'audio_num', checked: true, width: '100' },
        { label: '音频存储大小(GB)', prop: 'audio_sto_size', checked: true, width: '100' },
        { label: '总数量', prop: 'total_num', checked: true, width: '100' },
        { label: '总存储大小(GB)', prop: 'total_sto_size', checked: true, width: '100' }
      ]
    })

    let contextData = reactive({
      name: '馆藏统计',
      breadcrumb: [
        { path: '/audio-video-files', title: '声像档案' },
        { path: '/audio-video-files/file-statis/collect-statis', title: '档案统计' },
        { path: '/audio-video-files/file-statis/collect-statis', title: '馆藏统计' }
      ],
      queryList: {
        statistical_methods: {
          title: '统计方式',
          value: 'year_statistics',
          type: 'select',
          list: []
        },
        year_mouth_statistical: {
          title: '',
          value: 2021,
          type: 'select',
          list: [],
          isHide: false
        },
        time_period_statistical_start: {
          title: '',
          value: '',
          type: 'datetime',
          isHide: true
        },
        time_period_statistical_end: {
          title: '',
          value: '',
          type: 'datetime',
          isHide: true
        }
      },
      conditionsList: {
        // remove: { title: '删除项目信息', icon: 'iconfont guilian-icon' },
        // lock: { title: '锁定', icon: 'iconfont guilian-icon' },
        // export: { title: '导出项目信息', icon: 'iconfont guilian-icon' },
        // custom: { title: '自定义表头', icon: 'iconfont guilian-icon' }
      },
      statistical_methods_list: [
        { label: '按年度统计', prop: 'year_statistics' },
        { label: '按月度统计', prop: 'mouth_statistics' },
        { label: '指定时间段统计', prop: 'time_period_statistics' }
      ],
      advanced_query_obj: {
        advanced_query_dialog: false,
        project_query_disabled: false,
        type_query_value: 2,
        query_field_list: []
      },
      advanced_query_obj_show: false,
      delete_current_row: null,
      complete_current_row: null,
      export_setting_from: {
        project: '项目id',
        engine: '项目id',
        case: '项目id',
        file: '项目id'
      },
      select_obj: {
        project_list: [
          { label: '项目名称', prop: '项目名称' },
          { label: '项目档号', prop: '项目档号' },
          { label: '项目id', prop: '项目id' }
        ],
        engine_list: [
          { label: '工程名称', prop: '工程名称' },
          { label: '工程档号', prop: '工程档号' },
          { label: '工程id', prop: '工程id' }
        ],
        case_list: [
          { label: '案卷名称', prop: '案卷名称' },
          { label: '案卷档号', prop: '案卷档号' },
          { label: '案卷id', prop: '案卷id' }
        ],
        file_list: [
          { label: '文件名称', prop: '文件名称' },
          { label: '文件档号', prop: '文件档号' },
          { label: '文件id', prop: '文件id' }
        ]
      },
      export_current_row: null,
      _timer: null,
      pie_toggle_list: {
        line: {
          icon: 'pluscircleyuanjiahao'
        },
        pie: {
          icon: 'zhankaicaidan'
        }
      },
      legend_list: {
        photos_num: {
          text: '照片数量'
        },
        photos_sto_size: {
          text: '照片存储大小'
        },
        video_num: {
          text: '视频数量'
        },
        video_sto_size: {
          text: '视频存储大小'
        },
        audio_num: {
          text: '音频数量'
        },
        audio_sto_size: {
          text: '音频存储大小'
        },
        total_num: {
          text: '总数量'
        },
        total_sto_size: {
          text: '总存储大小'
        }
      },
      legend_list_index: 'photos_num',
      toggle_echart_type: 'line',
      line_pie_z_index: {
        line: 1,
        pie: 2
      },
      year_data: ['2017年', '2018年', '2019年', '2020年', '2021年']
    })
    onMounted(async () => {
      // 调用方法, 方法里调用接口
      fun_init()
      contextData._timer = setTimeout(() => {
        fun_init_echart()
      }, 300)
    })

    onBeforeUnmount(() => {
      clearInterval(contextData._timer)
      contextData._timer = null
    })

    const fun_init = () => {
      contextData.queryList.statistical_methods.list = contextData.statistical_methods_list
      let array = []
      for (var index = 2021; index >= 1995; index--) {
        array.push({ label: index, prop: index })
      }
      contextData.queryList.year_mouth_statistical.list = array
    }

    const fun_value_change = obj => {
      let { value, index } = obj
      contextData.queryList[index].value = value
      if (index === 'statistical_methods') {
        fun_statistical_methods(value)
      }
    }

    const fun_statistical_methods = value => {
      switch (value) {
        case 'time_period_statistics': {
          contextData.queryList.year_mouth_statistical.isHide = true
          contextData.queryList.time_period_statistical_start.isHide = false
          contextData.queryList.time_period_statistical_end.isHide = false
          break
        }
        default: {
          contextData.queryList.time_period_statistical_start.isHide = true
          contextData.queryList.time_period_statistical_end.isHide = true
          contextData.queryList.year_mouth_statistical.isHide = false
        }
      }
    }

    const fun_general_query = () => {}

    const fun_advanced_query = () => {
      contextData.advanced_query_obj.query_field_list = JSON.parse(JSON.stringify(tableList.thead))
      contextData.advanced_query_obj.advanced_query_dialog = true
      contextData.advanced_query_obj_show = true
    }

    const fun_advanced_query_close = () => {
      contextData.advanced_query_obj.advanced_query_dialog = false
      contextData.advanced_query_obj_show = false
    }

    const fun_table_handle = index => {
      console.log(index)
    }

    const fun_checkbox_change = list => {
      tableList.thead.map(item => {
        item.checked = list.indexOf(item.label) != -1 ? true : false
      })
    }

    const fun_create_project = () => {
      context.root.$router.push({ path: '/file-using/use-regist/increase-regist' })
    }

    const fun_db_click = row => {}

    const fun_init_echart = () => {
      let ok = document.querySelector('#collect_statis_echart')
      if (ok) {
        fun_init_all_info()
      } else {
        setTimeout(() => {
          fun_init_echart()
        }, 300)
      }
    }

    const fun_legend_list_btn_class = index => {
      const flag = contextData.legend_list_index === index
      return flag ? 'pie-line-echart-btn--item_active' : ''
    }

    const fun_legend_list = index => {
      contextData.legend_list_index = index
    }

    const fun_toggle_btn_class = index => {
      const flag = contextData.toggle_echart_type === index
      return flag ? 'toggle-btn_active' : ''
    }

    const fun_toggle_btn = index => {
      contextData.toggle_echart_type = index
      fun_collect_statis_echart('rgba(237, 182, 68)', index)
      fun_line_pie_z_index()
      contextData.line_pie_z_index[index] = 2
    }

    const fun_line_pie_z_index = () => {
      Object.keys(contextData.line_pie_z_index).map(item => {
        contextData.line_pie_z_index[item] = 1
      })
    }

    const fun_init_all_info = () => {
      fun_collect_statis_echart('rgba(237, 182, 68)', 'line')
    }

    const fun_collect_statis_echart = (series_color, echart_type) => {
      const date = contextData.year_data
      let data = []
      for (var i = 0; i < 5; i++) {
        data.push(Math.floor(Math.random() * 100 + 100))
      }
      collect_statis_echart(date, data, series_color, echart_type)
    }

    const fun_top_energy_common = () => {
      const current_hour_time = contextData.current_hour_time
      let data = []
      for (var i = 0; i <= current_hour_time; i++) {
        const math_random = Math.floor(Math.random() * 50 + 80)
        data.push(math_random)
      }
      for (var i = 1; i < 24 - current_hour_time; i++) {
        data.push(0)
      }
      return data
    }

    return {
      contextData,
      ...toRefs(contextData),
      tableList,
      ...toRefs(tableList),
      fun_value_change,
      fun_general_query,
      fun_advanced_query,
      fun_advanced_query_close,
      fun_create_project,
      fun_table_handle,
      fun_checkbox_change,
      fun_db_click,
      fun_legend_list_btn_class,
      fun_legend_list,
      fun_toggle_btn_class,
      fun_toggle_btn
    }
  }
}
</script>

<style lang="scss" scoped>
.content-background {
  overflow: hidden;
  width: 100%;
  background-color: $color-bg-4;
  border-radius: 6px;
}
.echart--box {
  height: 286px;
  position: relative;
  .collect_statis_echart-box {
    position: relative;
    width: 100%;
    height: 100%;
  }
  #collect_statis_echart_line,
  #collect_statis_echart_pie {
    background-color: #fff;
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.echart-btn--box {
  position: absolute;
  width: 100%;
  height: auto;
  z-index: 9;
  .line-echart-btn--box {
    position: absolute;
    top: 10px;
    left: 4%;
    width: 90%;
    height: 40px;
    display: flex;
    align-items: center;
  }

  .pie-echart-btn--box {
    position: absolute;
    top: 10px;
    left: 4%;
    width: 40%;
    height: 286px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2%;
  }

  .pie-line-echart-btn--item {
    display: flex;
    align-items: center;
    color: $color-text-sub;
    line-height: 20px;
    height: 20px;
    margin-right: 2%;
    cursor: pointer;
    .pie-line-btn--icon {
      display: flex;
      align-items: center;
    }
  }
  .pie-line-echart-btn--item:hover {
    .pie-line-btn--text {
      color: $color-text-main;
    }
  }
  .pie-line-echart-btn--item_active {
    .pie-line-btn--icon {
      color: $color-primary;
    }
    .pie-line-btn--text {
      color: $color-text-main;
    }
  }

  .line-pie-toggle-btn {
    position: absolute;
    top: 10px;
    right: 5%;
    width: 5%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .toggle-btn {
      cursor: pointer;
      color: $color-text-sub;
    }
    .toggle-btn:first-child {
      margin-right: 20%;
    }
    .toggle-btn:hover {
      color: $color-primary;
    }
    .toggle-btn_active {
      cursor: pointer;
      color: $color-primary;
    }
  }
}
</style>
