<template>
  <div class="page-login--form">
    <el-card shadow="never">
      <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
        <el-form-item prop="login">
          <el-input type="text" v-model="formLogin.login" placeholder="用户名">
            <i slot="prepend" class="fa fa-user-circle-o"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="formLogin.password" placeholder="密码">
            <i slot="prepend" class="fa fa-keyboard-o"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input type="text" v-model="formLogin.code" placeholder="验证码">
            <template slot="append">
              <!-- <img class="login-code" src="./image/login-code.png" /> -->
            </template>
          </el-input>
        </el-form-item>
        <el-button size="default" @click="submit" type="primary" class="button-login">
          登录
        </el-button>
      </el-form>
    </el-card>
    <p class="page-login--options" flex="main:justify cross:center">
      <span><d2-icon name="question-circle" /> 忘记密码</span>
      <span>注册用户</span>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import localeMixin from '@/locales/mixin.js'
export default {
  mixins: [localeMixin],
  data() {
    return {
      // 表单
      formLogin: {
        login: 'admin',
        password: '1',
        code: 'v9am'
      },
      // 表单校验
      rules: {
        login: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions('d2admin/account', ['login']),
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            login: this.formLogin.login,
            password: this.formLogin.password
          }).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || '/')
          })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败，请检查')
        }
      })
    }
  }
}
</script>

<style lang="scss">
// 登录表单
.page-login--form {
  width: 100%;
  // 卡片
  .el-card {
    margin-bottom: 15px;
    background-color: rgba(0, 0, 0, 0);
    border: none;

    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
  // 登陆选项
  .page-login--options {
    margin: 0px;
    font-size: 14px;
    color: $color-primary;
    margin-bottom: 15px;
    font-weight: bold;
    padding: 0 10px;
  }
  .page-login--quick {
    width: 100%;
  }
}
</style>
