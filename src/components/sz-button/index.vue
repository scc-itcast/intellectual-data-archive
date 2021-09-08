<template>
  <div>
    <div v-if="link">
      <el-button size="mini" @click="$open(link)">
        <d2-icon v-if="icon" :name="icon" />
        {{ link }}
      </el-button>
    </div>
    <div v-else>
      <el-button size="mini">
        <d2-icon v-if="icon" :name="icon" />
        {{ title }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'd2-link-btn',
  props: {
    title: {
      type: String,
      required: false,
      default: '默认按钮'
    },
    icon: {
      type: String,
      required: false,
      default: 'link'
    },
    link: {
      type: String,
      required: false,
      default: 'https://github.com/d2-projects'
    }
  }
}
</script>
