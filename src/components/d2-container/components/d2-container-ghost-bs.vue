<template>
  <div class="d2-container-ghost-bs">
    <div v-if="$slots.header" class="d2-container-ghost-bs__header" ref="header">
      <slot name="header" />
    </div>
    <div class="d2-container-ghost-bs__body" ref="wrapper">
      <!-- https://github.com/d2-projects/d2-admin/issues/181 -->
      <div v-show="breadcrumb.length!=0" class="d2-container-ghost-bs__breadcrumb">
        <div>当前位置：</div>
        <div v-for="(item, index) in breadcrumb" :key="index">
          <router-link :to="item.path" tag="a">{{ item.title }} </router-link>
          <span v-show="breadcrumb.length - 1 > index">>></span>
        </div>
      </div>
      <div>
        <slot />
      </div>
    </div>
    <div v-if="$slots.footer" class="d2-container-ghost-bs__footer" ref="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import bs from './mixins/bs'
export default {
  name: 'd2-container-card-bs',
  mixins: [bs]
}
</script>
