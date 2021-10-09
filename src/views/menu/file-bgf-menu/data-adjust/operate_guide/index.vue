<template>
  <div class="operate-guide">
    <div v-show="operate_guide_toggle" :style="operate_guide_obj.style">
      <div class="operate-guide">
        <div class="operate-guide--header global-between-center--flex">
          <div class="operate-guide--title global--ml20">{{ operate_guide_obj.tree_title }}</div>
          <template v-if="operate_guide_obj.show_icon">
            <div class="operate-guide--icon global-center-center--flex">
              <i
                @click="fun_operate_guide_toggle"
                class="fa fa-iconfont zhankaicaidan operate-guide-icon--color"
              ></i>
            </div>
          </template>
        </div>
        <div class="operate-guide--content" :style="height_style">
          <div class="operate-guide-content--title global--mb10">
            {{ perate_guide_content.title }}
          </div>
          <div class="operate-guide-content--wrapper">
            <div v-for="(item, index) in perate_guide_content.wrapper" :key="index">
              <div class="operate-guide-content--item">
                <div class="operate-guide-content-item--title global--mb10">{{ item.title }}</div>
                <div class="operate-guide-content-item--info">
                  <div class="global--p30 global-column-between-start--flex">
                    <div v-for="(children, index) in item.children" :key="index">
                      <div :class="children.class">
                        <span class="global--mr10"
                          ><i class="fa fa-iconfont" :class="children.icon"></i
                        ></span>
                        <span :class="children.class_color">{{ children.lable }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-if="item.position" class="operate-guide-content-item--position">
                    <div :class="item.children[1].class">
                      <span class="global--mr10"
                        ><i class="fa fa-iconfont" :class="item.children[1].icon"></i
                      ></span>
                      <span :class="item.children[1].class_color">{{
                        item.children[1].lable
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="hidden-operate-guide"
      :style="height_style"
      @click="fun_operate_guide_toggle"
      v-show="!operate_guide_toggle"
    >
      <div class="hidden-operate-guide--icon global-center-center--flex">
        <i class="fa fa-iconfont zhankaicaidan operate-guide-icon--color"></i>
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
  props: ['operate_guide_obj'],
  setup(prop, context) {
    let contextData = reactive({
      operate_guide_toggle: true,
      height_style: {
        height: document.body.clientHeight - 222 - 100 + 'px',
        overflowY: 'auto'
      },
      perate_guide_content: {
        title: '使用该功能，可以对工程、案卷、文件进行排序',
        wrapper: [
          {
            title: '第一步：鼠标选中需要排序的资料',
            children: [
              {
                lable: '施工许可',
                class: 'operate-guide-content-item-info--project',
                icon: 'huabanfuben',
                class_color: 'operate-guide-content-item-info--size16'
              },
              {
                lable: '苏州相城区xxxxxx小区',
                class: 'operate-guide-content-item-info--engine',
                icon: 'wenjianjiaweigongxiang',
                class_color: 'operate-guide-content-item-info--color'
              },
              {
                lable: '1-2018施工许可',
                class: 'operate-guide-content-item-info--engine',
                icon: 'wenjianjiaweigongxiang',
                class_color: 'operate-guide-content-item-info--size14'
              },
              {
                lable: 'xxxxxxx一号楼',
                class: 'operate-guide-content-item-info--project',
                icon: 'huabanfuben',
                class_color: 'operate-guide-content-item-info--size16'
              }
            ]
          },
          {
            title: '第二步：按下鼠标，并且拖动到想要的位置',
            children: [
              {
                lable: '施工许可',
                class: 'operate-guide-content-item-info--project',
                icon: 'huabanfuben',
                class_color: 'operate-guide-content-item-info--size16'
              },
              {
                lable: '苏州相城区xxxxxx小区',
                class: 'operate-guide-content-item-info--engine',
                icon: 'wenjianjiaweigongxiang',
                class_color: 'operate-guide-content-item-info--color'
              },
              {
                lable: '1-2018施工许可',
                class: 'operate-guide-content-item-info--engine',
                icon: 'wenjianjiaweigongxiang',
                class_color: 'operate-guide-content-item-info--size14'
              },
              {
                lable: 'xxxxxxx一号楼',
                class: 'operate-guide-content-item-info--project',
                icon: 'huabanfuben',
                class_color: 'operate-guide-content-item-info--size16'
              }
            ],
            position: true
          },
          {
            title: '第三步：释放鼠标，排序成功',
            children: [
              {
                lable: '施工许可',
                class: 'operate-guide-content-item-info--project',
                icon: 'huabanfuben',
                class_color: 'operate-guide-content-item-info--size16'
              },
              {
                lable: '1-2018施工许可',
                class: 'operate-guide-content-item-info--engine',
                icon: 'wenjianjiaweigongxiang',
                class_color: 'operate-guide-content-item-info--size14'
              },
              {
                lable: '苏州相城区xxxxxx小区',
                class: 'operate-guide-content-item-info--engine',
                icon: 'wenjianjiaweigongxiang',
                class_color: 'operate-guide-content-item-info--color'
              },
              {
                lable: 'xxxxxxx一号楼',
                class: 'operate-guide-content-item-info--project',
                icon: 'huabanfuben',
                class_color: 'operate-guide-content-item-info--size16'
              }
            ]
          }
        ]
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
      contextData.height_style = {
        height: document.body.clientHeight - 222 - 100 + 'px',
        overflowY: 'auto'
      }
    }

    const fun_operate_guide_toggle = () => {
      contextData.operate_guide_toggle = !contextData.operate_guide_toggle
    }

    return {
      contextData,
      ...toRefs(contextData),
      fun_operate_guide_toggle
    }
  }
}
</script>
<style lang="scss" scoped>
.operate-guide {
  .operate-guide {
    overflow-y: 'scroll';
    background: $color-bg-4;
    border-radius: 6px;
    color: $color-text-main;
    font-size: 16px;
    .operate-guide--header {
      height: 59px;
      border-bottom: 1px solid $color-border-1;
      font-weight: 550;
      .operate-guide--title {
        font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      }
      .operate-guide--icon {
        width: 53px;
        height: 100%;
        border-left: 1px solid $color-border-1;
      }
    }
    .operate-guide--content {
      padding: 20px;
      .operate-guide-content--wrapper {
        .operate-guide-content--item {
          margin-bottom: 16px;
          .operate-guide-content-item--title {
            font-size: 14px;
          }
          .operate-guide-content-item--info {
            height: 194px;
            border: 1px solid $color-border-1;
            border-radius: 3px;
            position: relative;
            .operate-guide-content-item--position {
              position: absolute;
              top: 105px;
              left: 100px;
            }
            > div {
              height: 100%;
            }
            .operate-guide-content-item-info--project {
            }
            .operate-guide-content-item-info--engine {
              margin-left: 35px;
            }
            .operate-guide-content-item-info--color {
              color: $color-primary;
              font-size: 14px;
            }
            .operate-guide-content-item-info--size14 {
              font-size: 14px;
            }
            .operate-guide-content-item-info--size16 {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
.operate-guide-icon--color {
  color: $color-primary-hover;
}
.operate-guide-icon--color:hover {
  color: $color-primary;
}
.hidden-operate-guide {
  width: 30px;
  background: $color-bg-3;
  margin-right: 10px;
  border-radius: 6px;
  .hidden-operate-guide--icon {
    height: 30px;
  }
}
</style>
