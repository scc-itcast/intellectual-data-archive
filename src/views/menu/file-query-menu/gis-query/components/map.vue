<template>
  <div class="map-box">
    <div id="map_container"></div>
  </div>
</template>
<script>
export default {
  props: {
    bim_list_prop: {
      type: Array,
      default: () => {}
    },
    tree_item_prop: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      map: {},
      bim_list: [
        {
          access_token: [
            { acc: 'e2f1b74e-ea01-4cb0-80e0-8812c1394d41' },
            { acc: 'adac0ea4-8c59-4363-9269-f33760e76998' },
            { acc: 'd0788fec-f0f2-4f1f-bece-e223b5418517' },
            { acc: '73b11f8e-a368-4820-8029-311b62cf5f60' },
            { acc: '9539e693-3fc8-4ebe-93df-b4563087bf84' },
            { acc: 'eed7c02b-b43b-4670-957d-1a8f26a4b8f2' },
            { acc: 'bdd71b7e-ee96-4fac-a4ca-2fd63e674e62' }
          ],
          file_in_path_gltf: [],
          name: 'News',
          lat: false,
          lng: false,
          id: 1,
          contract_amount: '0.0万',
          zmj: '0.0万m²',
          project_state: '前期准备',
          review_the_status: '审核退回'
        },
        {
          access_token: [
            { acc: 'd30632e4-b87b-439e-a7ff-e308a1eb44d1' },
            { acc: '3f48111b-82a6-468e-9f79-6f5e6034be29' },
            { acc: '52873b91-6942-4b05-a6f7-d8dc9a9db553' },
            { acc: '2fffe714-0622-4829-86aa-0fa457ef6c94' },
            { acc: 'd95a1483-3a35-43c6-88b5-24b90e74adc7' },
            { acc: '5436255f-95c3-47f7-a8af-5a83436b7a03' },
            { acc: '18707394-d54e-4b63-bd11-5d70f9a5237a' }
          ],
          file_in_path_gltf: [],
          name: 'News',
          lat: '31.395849792747452',
          lng: '120.65187338750756',
          id: 2,
          contract_amount: '0.0万',
          zmj: '0.0万m²',
          project_state: '前期准备',
          review_the_status: '审核通过'
        },
        {
          access_token: [
            { acc: '6a567306-0969-4448-a78e-3b90fc744c90' },
            { acc: 'f3563a71-e321-433a-b7bc-7e58e27e95be' },
            { acc: 'eeee9704-4a0e-423e-a6f8-ab8452104cb5' },
            { acc: 'ebe42d24-c439-4f98-a08d-a00523b078d3' },
            { acc: 'a8a19844-af23-4279-8a02-14f6826cfa69' },
            { acc: '31a1ca18-0227-43e9-8560-f2ab2a71735c' },
            { acc: '7592df38-e637-459f-92c4-55423a29a6cc' }
          ],
          file_in_path_gltf: [],
          name: '2452542',
          lat: false,
          lng: false,
          id: 3,
          contract_amount: '500.0万',
          zmj: '400.0万m²',
          project_state: '建设中',
          review_the_status: '待审核'
        },
        {
          access_token: [
            { acc: '71ea4e0b-5f48-47bd-b8a1-d29e67b7c446' },
            { acc: '4161f635-3741-4079-9421-0f9f8c7a1617' },
            { acc: 'ca32b3e7-deae-47be-98d2-9bf2a733f2c6' },
            { acc: '0f3d8096-fdd8-4aac-8112-e60b9b687478' },
            { acc: '6dae97a7-743d-4199-bcb4-d865b9cbd1e0' },
            { acc: 'a8f7cb17-2747-4393-860e-881a2189354b' },
            { acc: '093b9be8-cf2d-4535-84a5-5470049d3f01' }
          ],
          file_in_path_gltf: [],
          name: 'fwef',
          lat: false,
          lng: false,
          id: 5,
          contract_amount: '400.0万',
          zmj: '100.0万m²',
          project_state: '停工',
          review_the_status: '审核通过'
        },
        {
          access_token: [
            { acc: '50b99f6e-354e-43ea-bdf2-ce8a357cb68a' },
            { acc: 'b888a026-8711-48e2-850d-d09685b051c9' },
            { acc: '292e7ac5-92d8-4fad-a0e5-15a3eae78def' },
            { acc: '3553e9ae-8566-46b9-a8c3-a808ba385733' },
            { acc: '0a1cf9bb-6098-41c0-8608-5bc62746b238' },
            { acc: '4a67d7a5-422f-4be8-9ca2-0fc557df38a4' },
            { acc: '890291e3-be10-4527-b598-1132898c426f' }
          ],
          file_in_path_gltf: [],
          name: 'wegwjhe呃呃呃111',
          lat: false,
          lng: false,
          id: 24,
          contract_amount: '11.0万',
          zmj: '111.0万m²',
          project_state: '建设中',
          review_the_status: '审核通过'
        },
        {
          access_token: [
            { acc: '54f8074f-691b-4c6c-912f-fde2fd0a0c0e' },
            { acc: '33df00ba-3860-43f4-ba03-d07431b2eb83' },
            { acc: 'e24c34f1-a01c-401a-8d7f-0ecc3c109f7f' },
            { acc: 'e45747fb-9fc3-4205-8f9b-7850328375b6' },
            { acc: '3443a6e2-5703-4581-8cc9-fff405923a45' },
            { acc: 'c8a3d8b7-8276-4493-a63d-24b78c4a28ef' },
            { acc: 'b256194c-3a61-41f5-a9e1-b83cfcb55b81' }
          ],
          file_in_path_gltf: [],
          name: '1009企业测试二次修改1',
          lat: false,
          lng: false,
          id: 25,
          contract_amount: '500.0万',
          zmj: '500.0万m²',
          project_state: '前期准备',
          review_the_status: '审核通过'
        },
        {
          access_token: [
            { acc: 'd65c2907-db65-42ff-9699-88b15739dc37' },
            { acc: 'f695e4a7-6e37-4cba-9c79-198fb51dc716' },
            { acc: 'a34170cb-775b-444b-a004-6ad10f5165f6' },
            { acc: '078a31a7-ecd6-431b-bec4-074c13e6e2d7' },
            { acc: 'e189fa21-0eec-4b18-b7f7-42de6ffc9e44' },
            { acc: 'e75f33a0-9b37-409c-a0b9-16069762f2b9' },
            { acc: '869a9610-87fb-4ceb-ae1f-4e7c5b1bb824' }
          ],
          file_in_path_gltf: [],
          name: '1009企业测试1',
          lat: false,
          lng: false,
          id: 26,
          contract_amount: '500.0万',
          zmj: '500.0万m²',
          project_state: '前期准备',
          review_the_status: '暂存'
        },
        {
          access_token: [
            { acc: 'd1ae15ad-99ba-478d-ac0b-6b294476fee0' },
            { acc: '0e25ead6-cb6d-431f-836a-dc973b1bd9d0' },
            { acc: 'f69b483f-3eb0-4563-b2ed-3982fe2de7dd' },
            { acc: 'b7d79e77-2c5b-43bc-a3b7-0bbf5a88e2c8' },
            { acc: '6c2be4be-da23-43fb-ba8f-43756492b89c' },
            { acc: '06d6a9c4-e38d-4a14-b233-a4b83aee4d38' },
            { acc: '97610fe5-6618-4780-8ef6-36fa2618f354' }
          ],
          file_in_path_gltf: [],
          name: '1009企业测试2',
          lat: '39.63066079909864',
          lng: '118.20639924927531',
          id: 27,
          contract_amount: '500.0万',
          zmj: '500.0万m²',
          project_state: '前期准备',
          review_the_status: '暂存'
        },
        {
          access_token: [
            { acc: '8f2c3a2f-a546-4634-840b-24b14b67e865' },
            { acc: 'c79ade77-16e0-47e6-8512-26f21c9f48cc' },
            { acc: '39aeb10e-907c-4cd9-859b-09a49ef7843c' },
            { acc: '3cb99d45-1c3d-4e9a-a076-4894cecff71f' },
            { acc: '995824bb-1750-40b5-a786-15cf746e5bbf' },
            { acc: 'b9e3c0b1-7081-40a0-8208-e17e691c8233' },
            { acc: 'fa44aaec-9f6e-4bf2-80b6-c4de428c0435' }
          ],
          file_in_path_gltf: [],
          name: '测试1',
          lat: '39.93482727239599',
          lng: '116.4224009776628',
          id: 28,
          contract_amount: '1.0万',
          zmj: '1.0万m²',
          project_state: '前期准备',
          review_the_status: '待审核'
        },
        {
          access_token: [
            { acc: '8317b86b-9399-4f1a-8434-4b5b4dd9b841' },
            { acc: '0d7fbcfd-9b35-455d-97ba-cd85e53bee48' },
            { acc: 'b51dbb85-e001-4798-a5eb-d107d1120583' },
            { acc: 'd54cb8e1-b640-4dbf-8bff-c0c351b85a07' },
            { acc: '070f8d56-180a-4a27-9204-a228d05dff4d' },
            { acc: 'fa524546-bba8-490c-b101-4f03456103f1' },
            { acc: '562f5870-9566-40f3-95dc-fae10cb30eae' }
          ],
          file_in_path_gltf: [],
          name: '1009政府添加项目',
          lat: '39.91812360584148',
          lng: '116.37251358116619',
          id: 29,
          contract_amount: '500.0万',
          zmj: '300.0万m²',
          project_state: '缓建',
          review_the_status: '审核通过'
        },
        {
          access_token: [
            { acc: 'b9bd162e-098b-4310-bc5f-2079a986a8b0' },
            { acc: 'f05a347d-55aa-44d1-b938-72decbb15c69' },
            { acc: '376ef2ad-900a-49de-802a-97c4eace9b3e' },
            { acc: 'e1d676b1-c3c8-47c3-94c8-c54e9cf2b6f0' },
            { acc: '626c5336-7e21-4411-a66d-62678c463f7a' },
            { acc: '8c19ad26-f08e-45ea-af79-92e0acf1c279' },
            { acc: 'd61fa456-3064-490b-8505-b0347bc646a5' }
          ],
          file_in_path_gltf: [],
          name: 'News',
          lat: '39.91812360584148',
          lng: '116.37251358116619',
          id: 30,
          contract_amount: '0.0万',
          zmj: '0.0万m²',
          project_state: '前期准备',
          review_the_status: '暂存'
        },
        {
          access_token: [
            { acc: '82be6439-053c-43ff-943f-0297dbf9bfa9' },
            { acc: '1275d4ba-f072-415d-9de5-d98fd11150e3' },
            { acc: 'f5bec866-7048-4a99-9a42-bd09365158e0' },
            { acc: '0aaf1b9b-26df-4d28-bfd2-744662c63c3e' },
            { acc: '79a6282f-922a-4d50-8c7b-4d6aafcf2abf' },
            { acc: '821be95d-911d-4807-927b-e3231b8d79e7' },
            { acc: 'a50a8eba-9a66-48b9-93ca-d8b2e7f12adb' }
          ],
          file_in_path_gltf: [],
          name: 'plu',
          lat: false,
          lng: false,
          id: 31,
          contract_amount: '11.0万',
          zmj: '200.0万m²',
          project_state: '前期准备',
          review_the_status: '暂存'
        },
        {
          access_token: [
            { acc: '93e81426-47c5-477a-b1ec-25d0ddaad49a' },
            { acc: '54224398-f5a1-4de3-8bc7-a864417591c5' },
            { acc: '33bbe84d-2f19-4ab5-9f3e-be836edf322b' },
            { acc: 'bd3d66f9-c834-46ea-bd10-d0a06280ced8' },
            { acc: 'f1a21d12-89b8-4287-a0d9-78354677bd9a' },
            { acc: '838d328d-2db9-40b5-acc9-512da1e66f43' },
            { acc: 'd74c093c-5f70-4117-ad86-2e53a7b094f9' }
          ],
          file_in_path_gltf: [],
          name: 'plus',
          lat: '39.93482727239599',
          lng: '116.4224009776628',
          id: 32,
          contract_amount: '122.0万',
          zmj: '1.0万m²',
          project_state: '建设中',
          review_the_status: '暂存'
        }
      ]
    }
  },
  async mounted() {
    await this.fun_map_init()
    // this.fun_map_plugin()
    if (this.bim_list_prop.length) {
      this.getLable()
    }
  },
  watch: {
    bim_list_prop(newValue, oldValue) {
      if (newValue.length) {
        this.getLable()
      }
    },
    tree_item_prop(newValue, oldValue) {
      this.onChangeid(newValue)
    }
  },
  methods: {
    fun_map_init() {
      this.map = new AMap.Map('map_container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        rotateEnable: true,
        pitchEnable: true,
        zoom: 9, //初始化地图层级
        pitch: 55,
        rotation: -15,
        // viewMode: '3D',
        // 开启3D视图,默认为关闭
        // buildingAnimation: false,
        // 楼块出现是否带动画
        expandZoomRange: true,
        zooms: [3, 20],
        center: [120.618956, 31.396684], //初始化地图中心点
        // mapStyle: 'amap://styles/darkblue', //地图样式
        features: ['bg', 'road', 'building']
      })
      // 同时引入工具条插件，比例尺插件和鹰眼插件
    },
    fun_map_plugin() {
      AMap.plugin(
        ['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView', 'AMap.MapType', 'AMap.Geolocation'],
        function() {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          this.map.addControl(new AMap.ToolBar())

          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          this.map.addControl(new AMap.Scale())

          // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          this.map.addControl(new AMap.OverView({ isOpen: true }))

          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          this.map.addControl(new AMap.MapType())

          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          this.map.addControl(new AMap.Geolocation())
        }
      )
    },
    // 获取搜索框下拉id
    onChangeid(value) {
      this.bim_list.forEach((item, index) => {
        if (value === item.id) {
          this.lat = item.lat
          this.lng = item.lng
          this.id = item.id
        }
      })
      this.getLocation()
    },
    // 定位显示框
    getLable() {
      const bimList = this.bim_list
      var that = this
      // 循环添加marker1点
      bimList.forEach(function(item, index) {
        that.labelLat = item.lat
        that.labelLng = item.lng
        if (that.labelLat == '') {
          that.labelLat = 0
          that.labelLng = 0
        }
        // console.log(item.id);、
        // 循环打印出项目的属性 然后在marker上自定义属性
        that.labelName = item.name
        that.labelAmount = item.contract_amount
        that.labelId = item.id
        that.labelArea = item.zmj
        that.labelAccesstoken = item.access_token[0].acc
        // console.log(that.labelAccesstoken)
        //  在高德地图上添加标记点
        that.marker1 = new AMap.Marker({
          icon: require('@/assets/imgs/loca.png'),
          position: [that.labelLng, that.labelLat], // marker所在的位置
          map: that.map // 创建时直接赋予map属性
        })
        that.marker1.markerId = that.labelId
        that.marker1.markerAccesstoken = that.labelAccesstoken
        // console.log(typeof marker1)
        // marker1.setMap(that.map)
        that.marker1.setLabel({
          offset: new AMap.Pixel(-90, -40), // 设置文本标注偏移量
          // content: "<div class='info' ><p>项目名称:" + labelName + '</p><p>项目金额:' + labelAmount + '</p><p>项目面积:' + labelArea + '</p><p>编号:' + labelId + '</p></div>', // 设置文本标注内容
          content: "<div class='info'><p>" + that.labelName + '</p></div>',
          direction: 'right' // 设置文本标注方位
        })
        // marker1的点击事件
        that.marker1.on('click', function(e) {
          const markerToken = e.target.markerAccesstoken
          const markerId = e.target.markerId
          return
          // console.log(e.target)
          that.$router.push('/liatTags/' + markerId + '?projectId=' + markerToken)
        })
      })
      // that.$router.push('/standard/liatTags/' + that.labelId)
    },
    // 定位
    getLocation() {
      this.map.setCenter([this.lng, this.lat])
      // console.log(this.id)
    }
  }
}
</script>
<style lang="scss">
.map-box,
#map_container {
  width: 100%;
  height: 100%;
}
.amap-marker-label {
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  background: rgba(80, 180, 255, 0);
  box-shadow: 0rem 0rem 0.104166rem 0rem #027298;
  border-radius: 0.052083rem;
  line-height: unset;
  border-color: rgba(80, 180, 255, 0);
  .info {
    color: white;
    font-size: 0.08333rem;
    font-size: 20px;
    font-weight: 500;
    width: fit-content;
    font-family: PingFangSC-Medium, PingFang SC;
    background: rgba(80, 180, 255, 0.5);
    box-shadow: 0rem 0rem 0.104166rem 0rem #027298;
    border-radius: 0.052083rem;
  }
}
</style>
