<template>
  <div id="sz-button">
    <div v-if="link">
      <el-button :size="size" :type="type" :plain="plain" :disabled="disabled" @click="$open(link)">
        <d2-icon v-if="icon" :name="icon" />
        {{ link }}
      </el-button>
    </div>
    <div v-else>
      <el-button :size="size" :type="type" :plain="plain" :disabled="disabled" @click="click">
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
      default: ''
    },
    size: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    plain: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    link: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss">
#sz-button {
  @extend %unable-select;
  .el-button {
    border: 1px solid $color-border-1;
    border-radius: 3px;
  }
  .el-button {
    background: $color-default-btn;
    border: 1px solid $color-border-1;
    color: $color-text-2;
  }
  .el-button:hover {
    background: $color-default-btn;
    border: 1px solid $color-primary;
    color: $color-primary;
  }
  .el-button:active {
    background: $color-default-btn;
    border: 1px solid $color-primary;
    color: $color-primary;
  }
  .el-button.is-disabled {
    background: $color-default-btn;
    border: 1px solid $color-border-5;
    color: $color-text-7;
  }
  .el-button--text {
    border: none;
    color: $color-info;
  }
  .el-button--text:hover {
    border: none;
    color: $color-info;
  }
  .el-button--primary {
    background: $color-primary;
    border: 1px solid $color-primary;
    color: $color-text-5;
  }
  .el-button--primary:hover {
    background: $color-primary-hover;
    border: 1px solid $color-primary-hover;
    color: $color-text-5;
  }
  .el-button--primary:active {
    background: $color-primary-click;
    border: 1px solid $color-primary-click;
    color: $color-text-5;
  }
  .el-button--primary.is-disabled {
    background: $color-primary-disabled;
    border: 1px solid $color-primary-disabled;
    color: $color-text-6;
  }
  .el-button--warning {
    background: $color-warning-btn;
    border: 1px solid $color-warning-btn;
    color: $color-text-5;
  }
  .el-button--warning:hover {
    background: $color-warning-hover;
    border: 1px solid $color-warning-hover;
    color: $color-text-5;
  }
  .el-button--warning:active {
    background: $color-warning-click;
    border: 1px solid $color-warning-click;
    color: $color-text-5;
  }
  .el-button--warning.is-disabled {
    background: $color-warning-disabled;
    border: 1px solid $color-warning-disabled;
    color: $color-text-6;
  }
}
</style>
