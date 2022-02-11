<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章发布</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑 -->
      </div>
      <div>
        <!-- 表单 -->
        <el-form ref="form" :model="article" label-width="60px">
          <el-form-item label="标题">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="article.channels" placeholder="请选择频道">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="article.content"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="2">两图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onPublish">发布</el-button>
            <el-button>保存草稿</el-button>
          </el-form-item>
        </el-form>
        <!-- /表单 -->
      </div>
    </el-card>
  </div>
</template>

<script>
export default ({
  name: 'Publish',
  components: {},
  props: {},
  data () {
    return {
      article: {
        title: '', // 标题
        channels: null, // 频道信息
        content: '', // 内容信息
        cover: {
          img: [], // 封面的图片
          type: 0 // 封面类型 -1 自动，0 无图，1 单图，2 双图，3 三图
        }
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onPublish () {
      console.log('submit!')
    }
  }
})
</script>

<style scoped lang="less"></style>
