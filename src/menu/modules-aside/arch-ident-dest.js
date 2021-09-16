export default {
  path: '/arch-ident-dest',
  title: '档案鉴定销毁',
  icon: 'plug',
  children: [
    {
      path: '/arch-ident-dest/arch-ident-regist',
      title: '档案鉴定登记',
      icon: 'window-restore'
    },
    {
      path: '/arch-ident-dest/arch-ident-audit',
      title: '档案鉴定审核',
      icon: 'window-restore'
    },
    {
      path: '/arch-ident-dest/arch-dest',
      title: '档案销毁',
      icon: 'window-restore'
    },
    {
      path: '/arch-ident-dest/arch-restore',
      title: '档案还原',
      icon: 'window-restore'
    }
  ]
}
