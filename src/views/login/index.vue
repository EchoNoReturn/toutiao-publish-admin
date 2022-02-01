<template>
  <div class="login-container">
    <div class="login-logo-div">
      <h3>黑马头条管理系统</h3>
    </div>
    <el-form class="login-form" ref="form" :model="user" :rules="rules">
      <el-form-item prop="mobile">
        <el-input
         v-model="user.mobile"
         placeholder="请输入手机号"
         name="mobile"
         ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
         v-model="user.code"
         placeholder="请输入验证码"
         name="code"
         ></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onlogin()"
        :loading="loginLoading" :disabled="disabled()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false
      },
      checked: false,
      disabled: () => {
        if (this.agree === true) {
          return true
        } else {
          return false
        }
      },
      loginLoading: false,
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ],
        agree: [
          {
            // 自定义验证规则
            // 验证通过：callback()
            // 验证失败： callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              console.log(value)
              if (!value) {
                callback(new Error('请勾选同意用户协议'))
              } else {
                callback()
              }
            },
            // required: true,
            // message: '请勾选同意用户协议',
            trigger: 'change'
          }
        ]
      },
      login: () => {
      // 验证通过，提交登录
        this.loginLoading = true // 开始验证，打开 loading ，防止用户多次点击
        login(this.user).then(responce => {
          console.log(responce)
          this.$message({
            message: '登录成功',
            type: 'success'
          })

          // 把用户的登录信息存储到本地
          // 注意,本地只能存储字符串
          // 我们需要把对象,数组存储为JSON
          window.localStorage.setItem('user', JSON.stringify(responce.data.data))
          // 关闭 loading
          this.loginLoading = false
          // 登录成功
          this.$router.push({
            name: 'home'
          })
        }).catch(error => {
          console.log('登录失败', error)
          this.$message.error('手机号或验证码错误')
          // 登录失败

          // 关闭 loading
          this.loginLoading = false
        })
        // 处理后端响应结果
        //    成功：xxx
        //    失败：xxx
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onlogin () {
      // 获取表单数据
      // const user = this.user
      // 表单验证
      this.$refs.form.validate((validate, error) => {
        if (validate) {
          this.login()
        } else {
          console.log(error)
          return alert('b' + error.code.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  position: fixed;
  left: 0;
  top: 0%;
  right: 0%;
  bottom: 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: cadetblue;// 原本这里应该是用一张图片作为背景应该使用的是 background: url('./login_bg.jpg') no-repeat;
  // 自己的图片总是应用不上去，稍后再找找原因
  background: url('./login_background.png') no-repeat;// 已经解决上诉问题
  background-size: cover;
}
.login-form{
  background-color: #ffff;
  padding:0px 50px 30px 50px;
  min-width: 300px;
  .login-btn{
    width: 100%;
  }
}
.login-logo-div{
  background-color: #ffff;
  min-width: 300px;
  padding: 0 50px;
  h3{
    text-align: center;
  }
}
</style>>
