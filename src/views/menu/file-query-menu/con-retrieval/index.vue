<template>
  <d2-container type="card" better-scroll :breadcrumb="breadcrumb">
    <template slot="header">
      <div class="query--box global--flex">
        <div class="query-box--search global--ml20">
          <el-input placeholder="请输入内容" v-model="search_input" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="fun_search_click"></el-button>
          </el-input>
        </div>
      </div>
    </template>
    <template>
      <div class="container--page global-column-start--flex">
        <div class="container--content" :style="container_style">
          <div class="container-content-ul">
            <div
              v-for="(item, index) in conent_list"
              :key="item.record_sliceId"
              class="container-content-li"
              :class="fun_acive_class(index)"
              @click="fun_click_li(index)"
            >
              <div class="container-content-title">
                {{ item.record_Wjtm || '无标题' }}
              </div>
              <div class="container-content-case">
                <span>所属案卷：</span>
                <span class="container-content-text">{{ item.file_Ajtm || '无所属案卷' }}</span>
              </div>
              <div class="global--flex container-content-pdftext">
                <div v-for="(pdftext_item, index) in item.pdftext" :key="index">
                  <span v-html="pdftext_item"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container--pagination">
          <el-pagination
            class="pull-right"
            @size-change="fun_size_change"
            @current-change="fun_current_change"
            :current-page="current_index"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total_size"
          >
          </el-pagination>
        </div>
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
export default {
  name: 'con-retrieval',
  mixins: [mixinAsideShowTrue],
  setup(prop, context) {
    let contextData = reactive({
      name: '全文检索',
      breadcrumb: [
        { path: '/file-query', title: '档案查询' },
        { path: '/file-query/con-retrieval', title: '全文检索' }
      ],
      container_style: {
        height: document.body.clientHeight - 295 + 'px',
        overflowY: 'auto'
      },
      search_input: '',
      conent_list: [
        {
          pdftext: [
            "本书的第 <font color='red'>21</font>章中会有更详细的介绍。 \n1.1.3.6其他",
            "第 <font color='red'>21</font>~26章是本书的最后一个部分，在这里我们探讨一些稍微",
            "定势中去。 \n<font color='red'>21</font>.1什么是面向对象 \n早在在第 7 章，"
          ],
          record_Id: '42baa1a8-769b-4232-9a99-5ee23744818e'
        },
        {
          file_Ajtm:
            '方顺商贸有限公司鑫鑫加油（气）合建站（站房、罩棚）第4卷施工文件（35-38、40、42、43、47-50、52、55-60、65-70）',
          pdftext: [
            ". 91 19.5 1. 60\n1. 89 <font color='red'>21</font>. 0 l",
            "94. 0\n1. 89 <font color='red'>21</font>. 2 1 .  56\n1.",
            "91 <font color='red'>21</font>. 2 1. 58\n2-3/A-B标高-0. 2m"
          ],
          record_File: 'a884d6d1-e75b-4f22-ab9d-6ff36b6192c9',
          record_Id: 'cffa39f8-8b0a-440a-a199-f885affbe4fe',
          record_Wjtm: '回填土试验报告（应附图）',
          record_sliceId: '00001'
        }
      ],
      current_active_index: null,
      current_index: 1,
      page_size: 5,
      total_size: 0
    })

    onMounted(async () => {
      // 调用方法, 方法里调用接口
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    const onResize = () => {
      contextData.container_style = {
        height: document.body.clientHeight - 295 + 'px',
        overflowY: 'auto'
      }
    }

    const fun_search_click = () => {}

    const fun_acive_class = index => {
      const flag = contextData.current_active_index === index
      return flag ? 'container-content-li__active' : ''
    }

    // const computed_acive_class = computed(() => {
    //   contextData.current_active_index
    //   return obj
    // })

    const fun_click_li = index => {
      contextData.current_active_index = index
    }

    const fun_size_change = val => {
      contextData.page_size = val
    }

    const fun_current_change = val => {
      contextData.current_index = val
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_search_click,
      fun_acive_class,
      fun_click_li,
      fun_size_change,
      fun_current_change
    }
  }
}
</script>

<style lang="scss" scoped>
.query-box--search {
  width: 300px;
}
.container--page {
  width: 100%;
  height: 100%;
  .container--content {
    width: 100%;
    .container-content-ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .container-content-li {
        padding: 5px 20px;
        border-bottom: 1px dotted $color-border-7;
        background-color: $color-bg-4;
        box-sizing: border-box;
        .container-content-title {
          color: $color-link;
          font-size: 18px;
        }
        .container-content-case {
          color: $color-text-1;
          font-size: 14px;
          padding: 5px 0;
          .container-content-text {
            color: $color-primary;
            font-size: 12px;
          }
        }
        .container-content-pdftext {
          color: $color-text-2;
          font-size: 12px;
        }
      }
      .container-content-li:hover {
        background-color: #ffa29c;
      }
      .container-content-li:active {
        background-color: #00d1dc;
      }
      .container-content-li__active {
        background-color: #00d1dc;
      }
    }
  }
  .container--pagination {
    margin: 10px;
  }
}
</style>
