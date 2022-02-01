<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
        <!-- <AppAsider /> 用大写的也可,用小写的也可,用小写的就要注意
        在后面的大写子目前加上短杠-->
        <app-asider class="aside-menu"
        :isCollapse="isCollapse"/>
    </el-aside>
    <el-container>
        <el-header class="header">
          <div class="header-left">
            <i
            :class="{
              'el-icon-s-fold':!isCollapse,
              'el-icon-s-unfold':isCollapse
              }"
            @click="isCollapse = !isCollapse"></i>
            <span>欢迎来到头条管理系统</span>
          </div>
          <div class="header-right-dropdown">
            <!-- <img class="touxiang" :src="user.poto" alt="">  因为缺少接口,现在我只能把这个用户头像写死-->
            <img class="touxiang" src="./user_header_img.png" >
            <el-dropdown>
            <span class="el-dropdown-link">
              {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div>
        </el-header>
        <el-main class="main">
            <router-view />
        </el-main>
    </el-container>
 </el-container>
    <!-- <div class="layout-container">
      <div>这是顶部</div>
      <router-view />
      <div>这是底部</div>
  </div> -->
</template>

<script>
import AppAsider from './components/asider'
import { getUserProfile } from '@/api/user'

export default ({
  name: 'LayoutIndex',
  components: {
    AppAsider
  },
  props: {},
  data () {
    return {
      user: {
        name: '用户昵称',
        poto: './user_header_img.png' // v-bind:src不能绑定这样的的对象,因为poto的值不能这么写,会导致请求失败
      }, // 预留的使用当前页面的对象
      isCollapse: true // 默认false为展开
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好,请求用户资料
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    // 除了登录接口,其他所有接口都需要授权才能请求使用数据
    // 或者说,除了登录接口,其他接口都需要提供你的身份令牌才能获取数据
    loadUserProfile () {
      getUserProfile().then(response => {
        console.log(response)
      })
    }
  }
})
</script>

<style scoped lang="less">
.layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.aside {
    background-color: #d3dce6;
    .aside-menu {
      height: 100%;
    }
}
.header {
  // background-color:#b3c0d1;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  // justify-content: space-evenly;
  align-items: center;
  .header-right-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
  }
}
.main {
  background-color: #e9eef3;
}
.touxiang {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
}
</style>
