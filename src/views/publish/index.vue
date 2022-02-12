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
            <el-select v-model="article.channel_id" placeholder="请选择频道">
                    <el-option
                    label="全部(需要删除此项)"
                    :value="null"
                    ></el-option>
                    <el-option
                    v-for="{channels, index} in article.channels"
                    :key="index"
                    :label="channels.name"
                    :value="channels.id"
                    ></el-option>
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
            <el-button type="primary" @click="onPublish(false)">发布</el-button>
            <el-button @click="onPublish(true)">保存草稿</el-button>
          </el-form-item>
        </el-form>
        <!-- /表单 -->
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle } from '@/api/article.js'
export default ({
  name: 'Publish',
  components: {},
  props: {},
  data () {
    return {
      article: {
        title: '', // 标题
        channels: [], // 频道列表
        channel_id: null, // 选中的频道
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
  created () {
    this.loadChannles()
  },
  mounted () {},
  methods: {
    loadChannles () {
      getArticleChannels().then(res => {
        // console.log(res)
        this.article.channels = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      console.log('submit!')
      addArticle(this.article, draft).then(res => {
        // 提交成功就有res了，就可以直接处理了
        // console.log(res)
        this.$message({
          message: '发布成功',
          type: 'success'
        })
      })
    }
  }
})
</script>

<style scoped lang="less"></style>
