<template>
  <div class="d2-container-card-bs">
    <div v-show="breadcrumb.length != 0" class="d2-container-card-bs__breadcrumb">
      <div>当前位置：</div>
      <div v-for="(item, index) in breadcrumb" :key="index">
        <router-link
          :class="index >= breadcrumb.length - 1 ? 'router-link-active-current' : ''"
          :to="item.path"
          tag="a"
          >{{ item.title }}
        </router-link>
        <span class="d2-container-card-bs__line" v-show="breadcrumb.length - 1 > index">/</span>
      </div>
    </div>
    <div v-if="$slots.header" class="d2-container-card-bs__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="d2-container-card-bs__body" ref="wrapper">
      <div class="d2-container-card-bs__body-wrapper-inner">
        <div class="d2-container-card-bs__body-card">
          <slot/>
        </div>
      </div>
    </div>
    <div v-if="$slots.footer" class="d2-container-card-bs__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import bs from './mixins/bs_card'
export default {
  name: 'd2-container-card-bs',
  mixins: [
    bs
  ]
}
</script>
