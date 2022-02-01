<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
    >
    <el-menu-item index="/">
    <i class="el-icon-s-home"></i>
    <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
    <i class="el-icon-document"></i>
    <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="3">
    <i class="el-icon-folder"></i>
    <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="4">
    <i class="el-icon-edit-outline"></i>
    <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="5">
    <i class="el-icon-chat-square"></i>
    <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="6">
    <i class="el-icon-s-data"></i>
    <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="7">
    <i class="el-icon-setting"></i>
    <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default ({
  name: '',
  components: {},
  props: ['is-collapse'],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
})
</script>

<style scoped lang="less"></style>
