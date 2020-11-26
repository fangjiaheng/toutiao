<template>
  <div>
    <!-- navbar -->
    <van-nav-bar
      class="nav"
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- form -->
    <van-form @submit="onSubmit" @failed='submitFailed' ref="loginRef" :show-error='false' :show-error-message='false'>
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules='rules.mobileRules'
      />
      <van-field
        v-model="user.code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :rules='rules.codeRules'
      >
        <template #button>
          <van-button native-type="button" size="small" type="primary" @click="getCode" :disabled='btnDisabled'>{{msg}}</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button class="loginBtn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { sendCode, login } from '@/api/user.js'
export default {
  name: 'login',
  data () {
    return {
      // 提交表单的信息
      user: {
        // 手机号
        mobile: '13911111111',
        // 验证码
        code: '246810'
      },
      // 手机号和短信的校验规则
      rules: {
        mobileRules: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误' }
        ],
        codeRules: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误！' }
        ]
      },
      btnDisabled: false,
      msg: '获取验证码'
    }
  },
  methods: {
    // 表单提交失败
    submitFailed (err) {
      // console.log(err.errors[0].message)
      this.$toast.fail({ message: err.errors[0].message, position: 'top' })
    },
    // 表单提交
    async onSubmit () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // 发送登录的请求
        const { data: res } = await login(this.user)
        console.log(res)
        // 将获取到的登录信息存到vuex中
        this.$store.commit('getUserInfo', res.data)
        this.$toast.success('登陆成功')
        this.$router.push('/mine')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
      }
    },
    // 获取验证码
    async getCode () {
      // 验证有没有正确输入手机号
      try {
        await this.$refs.loginRef.validate('mobile')
        // 发送验证码请求,按钮禁用,60s后可用
        const { data: res } = await sendCode(this.user.mobile)
        console.log(res)
        this.$toast.success({ message: '发送成功', position: 'top' })
        this.btnDisabled = true
        // 设置定时器
        let time = 5
        const timer = window.setInterval(() => {
          time--
          this.msg = time + 's后重新获取'
          if (time < 1) {
            this.btnDisabled = false
            this.msg = '获取验证码'
            window.clearInterval(timer)
          }
        }, 1000)
      } catch (err) {
        console.log(err)
        this.$toast.fail({ message: err.message, position: 'top' })
      }
    }
  }
}
</script>

<style lang='less'>
.nav{
  background-color: rgb(41,146,255);
  .van-nav-bar__text{
    color: white;
  }
  .van-icon-arrow-left::before{
    color: white;
  }
  .van-nav-bar__title{
    color: white;
  }
}
.loginBtn{
  border-radius: 5px !important
}
</style>
