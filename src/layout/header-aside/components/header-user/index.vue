<template>
  <el-dropdown size="small" class="d2-mr">
    <!-- trigger="click" -->
    <div class="btn-text">
      <div v-if="info.name" class="btn-text-group">
        <img
          src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          alt=""
        />
        {{ info.name }}
      </div>
      <div v-else class="btn-text-group">未登录</div>
    </div>
    <el-dropdown-menu slot="dropdown">
      <template v-for="item in dropdown">
        <el-dropdown-item @click.native="dropdown_handle(item)">
          <d2-icon v-if="item.icon" :name="item.icon" name="power-off" class="d2-mr-5" />
          {{item.name}}
        </el-dropdown-item>
      </template>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      dropdown: [
        { name: '问题反馈', handle: '', icon: '' },
        { name: '系统信息', handle: '', icon: '' },
        { name: '个人信息', handle: '', icon: '' },
        { name: '修改密码', handle: '', icon: '' },
        { name: '安全退出', handle: 'logOff', icon: '' },
      ]
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info'])
  },
  methods: {
    ...mapActions('d2admin/account', ['logout']),
    dropdown_handle(item) {
      if(item.handle == 'logOff') {
        this.logOff()
      }
    },
    /**
     * @description 登出
     */
    logOff() {
      this.logout({
        confirm: true
      })
    }
  }
}
</script>
