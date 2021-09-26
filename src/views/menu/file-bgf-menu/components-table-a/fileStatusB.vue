<template>
  <div class="content-form-body global-between-center--flex">
    <!-- 三级菜单档案状况 -->
    <div class="content-form-body-wrapper">
      <div class="content-form-body-item-column">
        <div class="ceil-text">案卷序号</div>
        <div class="ceil-value"></div>
      </div>
      <div class="content-form-body-item-column">
        <div class="ceil-text">录音带(盒)</div>
        <div class="ceil-value"></div>
      </div>
    </div>
    <div class="content-form-body-wrapper">
      <div class="content-form-body-item-column">
        <div class="ceil-text">文字(张)</div>
        <div class="ceil-value"></div>
      </div>
      <div class="content-form-body-item-column">
        <div class="ceil-text">录像带(盒)</div>
        <div class="ceil-value"></div>
      </div>
    </div>
    <div class="content-form-body-wrapper">
      <div class="content-form-body-item-column">
        <div class="ceil-text">图纸(张)</div>
        <div class="ceil-value"></div>
      </div>
      <div class="content-form-body-item-column">
        <div class="ceil-text">光盘(盒)</div>
        <div class="ceil-value"></div>
      </div>
    </div>
    <div class="content-form-body-wrapper">
      <div class="content-form-body-item-column">
        <div class="ceil-text">底图（张）</div>
        <div class="ceil-value"></div>
      </div>
      <div class="content-form-body-item-column">
        <div class="ceil-text global-between-center--flex">
          <div class="ceil-text-left global-center-center--flex">计算机</div>
          <div class="ceil-text-right global-column-between--flex">
            <div class="global-center-center--flex">磁带（盘）</div>
            <div class="global-center-center--flex">磁带（盘）</div>
          </div>
        </div>
        <div class="ceil-value"></div>
      </div>
    </div>
    <div class="content-form-body-wrapper">
      <div class="content-form-body-item-column">
        <div class="ceil-text">照片（张）</div>
        <div class="ceil-value"></div>
      </div>
      <div class="content-form-body-item-column">
        <div class="ceil-text global-between-center--flex">
          <div class="ceil-text-left global-center-center--flex">缩微片</div>
          <div class="ceil-text-right global-column-between--flex">
            <div class="global-center-center--flex">盘</div>
            <div class="global-center-center--flex">张</div>
          </div>
        </div>
        <div class="ceil-value"></div>
      </div>
    </div>
    <div class="content-form-body-wrapper">
      <div class="content-form-body-item-column">
        <div class="ceil-text">底片（张）</div>
        <div class="ceil-value"></div>
      </div>
      <div class="content-form-body-item-column">
        <div class="ceil-text">其它</div>
        <div class="ceil-value"></div>
      </div>
    </div>
  </div>
  
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['ishidden'],
  setup(prop, context) {},
}
</script>

<style lang="scss" scoped>
.content-form-body {
  border-left: 1px solid $color-border-1;
  box-sizing: border-box;
  /* margin: 0 30px 27px 30px; */
  font-size: 14px;
  .content-form-body-wrapper {
    border-top: 1px solid $color-border-1;
    box-sizing: border-box;
    width: 16.667%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content-form-body-item-column {
      width: 100%;
      border-bottom: 1px solid $color-border-1;
      border-right: 1px solid $color-border-1;
      box-sizing: border-box;
      height: 54px;
      display: flex;
      justify-content: center;
      align-items: center;
      > div {
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      .ceil-text {
        border-right: 1px solid $color-border-1;
        box-sizing: border-box;
        background-color: $color-bg-2;
        .ceil-text-left {
          width: 30px;
          height: 100%;
          border-right: 1px solid $color-border-1;
          box-sizing: border-box;
          writing-mode: vertical-rl;
          -webkit-writing-mode: vertical-rl;
        }
        .ceil-text-right {
          width: 100%;
          height: 100%;
          flex: 1;
          > div {
            width: 100%;
            height: 100%;
          }
          > div:first-child {
            border-bottom: 1px solid $color-border-1;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
