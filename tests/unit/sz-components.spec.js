context.root.$notify({
  title: 'This is the title',
  message: 'Early access features, like Video Editing.',
  iconClass: 'iconfont guilian', // 自定义图标的类名。若设置了 type，则 iconClass 会被覆盖
  position: 'bottom-right', // 自定义弹出位置
  duration: 0 // 显示时间, 毫秒。设为 0 则不会自动关闭
})

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
  confirmButtonText: 'Delete', // 确定按钮的文本内容
  confirmButtonClass: 'I-Know', // 确定按钮的自定义类名
  showInput: false, // 是否显示输入框
  roundButton: true, // 是否使用圆角按钮
  callback: fun_callback // 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
})

context.root.$confirm('', '', {
  title: 'This is the title',
  message: 'Early access features, like Video Editing.',
  center: true, // 是否使用圆角按钮
  showClose: true, // MessageBox 是否显示右上角关闭按钮
  lockScroll: true, // 是否在 MessageBox 出现时将 body 滚动锁定
  showCancelButton: false, // 是否显示取消按钮
  showConfirmButton: false, // 是否显示确定按钮
  callback: fun_callback // 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
})

context.root.$confirm('', '', {
  confirmButtonText: 'I Know', // 确定按钮的文本内容
  title: 'This is the title',
  message: 'Early access features, like Video Editing.',
  center: true, // 是否使用圆角按钮
  showClose: false, // MessageBox 是否显示右上角关闭按钮
  lockScroll: true, // 是否在 MessageBox 出现时将 body 滚动锁定
  showCancelButton: false, // 是否显示取消按钮
  confirmButtonClass: 'I-Know', // 确定按钮的自定义类名
  roundButton: true, // 是否使用圆角按钮
  callback: fun_callback // 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
})

context.root.$confirm('', '', {
  confirmButtonText: 'I Know', // 确定按钮的文本内容
  cancelButtonText: 'Cancel', // 取消按钮的文本内容
  title: 'This is the title',
  message: 'Early access features, like Video Editing.',
  center: true, // 是否使用圆角按钮
  showClose: false, // MessageBox 是否显示右上角关闭按钮
  lockScroll: true, // 是否在 MessageBox 出现时将 body 滚动锁定
  showCancelButton: true, // 是否显示取消按钮
  showConfirmButton: true, // 是否显示确定按钮
  roundButton: true, // 是否使用圆角按钮
  callback: fun_callback // 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
})

const open1 = () => {
  context.root.$confirm('', '', {})
}

const fun_callback = (action, instance) => {
  // console.log(action, instance, done)
  if (action == 'cancel') {
    context.root.$notify({})
    return
  }
  context.root.$notify({})
}
