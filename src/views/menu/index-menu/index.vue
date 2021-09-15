<template>
  <d2-container type="ghost" better-scroll>
    <div>{{ name }}</div>
    <sz-button title="首页首页首页" icon="iconfont guilian-icon" @click="open1(name)"></sz-button>
  </d2-container>
</template>

<script>
import mixinAsideShowFalse from '@/views/menu/mixins/aside-show-false'
import { onMounted, computed, reactive, watchEffect, toRefs } from '@vue/composition-api'
export default {
  name: 'index-menu',
  mixins: [mixinAsideShowFalse],
  setup(prop, context) {
    let contextData = reactive({
      name: '首页'
    })

    onMounted(async () => {
      // 调用方法, 方法里调用接口
    })

    const open1 = () => {
      context.root.$confirm('', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        title: 'This is the title',
        message: 'Early access features, like Video Editing.',
        center: true, // 是否使用圆角按钮
        showClose: false, // MessageBox 是否显示右上角关闭按钮
        lockScroll: true, // 是否在 MessageBox 出现时将 body 滚动锁定
        showCancelButton: true, // 是否显示取消按钮
        showConfirmButton: true, // 是否显示确定按钮
        cancelButtonText: 'Cancel', // 取消按钮的文本内容
        confirmButtonText: 'I Know', // 确定按钮的文本内容
        showInput: false, // 是否显示输入框
        roundButton: true, // 是否使用圆角按钮
        callback: fun_callback // 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
      })
    }

    const fun_callback = (action, instance) => {
      // console.log(action, instance, done)
      if (action == 'cancel') {
        context.root.$notify({
          title: 'This is the title',
          message: 'Early access features, like Video Editing.',
          iconClass: 'iconfont happy-full',
          position: 'bottom-right',
          // duration: 0
        })
        return
      }
      context.root.$notify({
        title: 'This is the title',
        message: 'Early access features, like Video Editing.',
        iconClass: 'iconfont guilian',
        position: 'bottom-right',
        // duration: 0
      })
    }

    return {
      contextData,
      ...toRefs(contextData),
      open1
    }
  }
}
</script>

<style lang="scss" scoped></style>
