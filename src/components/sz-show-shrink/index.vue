<template>
  <div class="global-between-center--flex">
    <div class="global-between-center--flex">
      <div class="content--line"></div>
      <div class="content--title">{{ title }}</div>
    </div>
    <div class="content--btn">
      <div v-if="show_shrink" class="content-btn--item">展开</div>
      <div v-else class="content-btn--item">收缩</div>
    </div>
  </div>
</template>
<script>
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  props: ['title', 'show_shrink'],
  setup() {}
}
</script>
<style lang="scss" scoped>
.content--line {
  width: 3px;
  height: 18px;
  background: #1c9399;
  margin-right: 9px;
}
.content--btn {
  color: $color-primary;
}
</style>
