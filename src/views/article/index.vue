<template>
  <div class="article-container">
      <el-card class="box-card filter-card">
        <div slot="header" class="clearfix">
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/article'}">内容管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="text item">
            <!-- 表单 -->
          <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="状态">
                  <el-radio-group v-model="status">
                  <el-radio :label="null">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
                  <el-radio :label="4">已删除</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="频道">
                  <el-select v-model="channelsId" placeholder="请选择频道">
                    <el-option
                    label="全部"
                    :value="null"
                    ></el-option>
                    <el-option
                    v-for="{channels, index} in channels"
                    :key="index"
                    :label="channels.name"
                    :value="channels.id"
                    ></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="日期">
                  <el-date-picker
                  v-model="form.date1"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
              </el-form-item>
              <el-form-item>
                <!--
                  button 按钮的 clinck 事件有个默认参数
                  当你没有指定参数的时候，它还会传递一个没有用的数据
                 -->
                  <el-button type="primary" @click="loadArticles(1)">查询</el-button>
              </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          根据筛选条件，共查询到 {{ totalCount }} 条结果：
        </div>
      <div class="text item">
        <!-- 表格数据 -->
        <el-table
            :data="articles"
            class="list-table"
            style="width: 100%"
            v-loading="loading"
            >
          <el-table-column
              prop="cover"
              label="封面">
              <div>this is a cover</div>
          </el-table-column>
          <el-table-column
              prop="name"
              label="标题">
          </el-table-column>
          <el-table-column
              label="状态">
              <!-- 自定义列模板之后 prop 就没有用了 -->
              <!-- 如果需要在自定义列模板中获取当前遍历项数据就需要在 template 上声明 slot-scope="scope" -->
              <template slot-scope="scope">
                <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
                <!-- <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
                <el-tag v-else-if="scope.row.status === 1" type="">待审核</el-tag>
                <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
                <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
                <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag> -->
              </template>
              <!-- <el-tag>标签一</el-tag>
              <el-tag type="success">审核通过</el-tag>
              <el-tag type="info">待审核</el-tag>
              <el-tag type="warning">审核失败</el-tag>
              <el-tag type="danger">已删除</el-tag> -->
          </el-table-column>
          <el-table-column
              prop="date"
              label="日期">
          </el-table-column>
          <el-table-column
              label="操作"
              >
              <template slot-scope="scope">
                <el-button
                type="primary"
                icon="el-icon-edit"
                circle></el-button>
                <el-button
                type="danger"
                icon="el-icon-delete"
                @click="onDeleteArticles(scope)"
                circle
                ></el-button>
                <!-- <el-button
                type="danger"
                icon="el-icon-delete"
                @click="onDeleteArticles(scope.row.data.id)"
                circle
                ></el-button> -->
              </template>
          </el-table-column>
        </el-table>
        <!-- 列表分页 -->
        <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        @current-change="onCurrentChange"
        :disabled="loading"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getArticle,
  getArticleChannels,
  deleteArticle
} from '@/api/article'

export default ({
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: null,
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [
        // 默认放了一些样式文本
        // 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
        { cover: '', name: 'name2', status: 1, date: '0001' },
        { cover: '', name: 'name1', status: 0, date: '0001' },
        { cover: '', name: 'name3', status: 2, date: '0001' },
        { cover: '', name: 'name3', status: 2, date: '0001' },
        { cover: '', name: 'name4', status: 3, date: '0001' },
        { cover: '', name: 'name5', status: 4, date: '0001' },
        { cover: '', name: 'name5', status: 4, date: '0001' },
        { cover: '', name: 'name5', status: 4, date: '0001' },
        { cover: '', name: 'name5', status: 4, date: '0001' },
        { cover: '', name: 'name5', status: 4, date: '0001' },
        { cover: '', name: 'name5', status: 4, date: '0001' },
        { cover: '', name: 'name5', status: 4, date: '0001' },
        { cover: '', name: 'name5', status: 4, date: '0001' },
        { cover: '', name: 'name5', status: 4, date: '0001' },
        { cover: '', name: 'name5', status: 4, date: '0001' },
        { cover: '', name: 'name6', status: 0, date: '0001' }
      ],
      articleStatus: [
        { status: 0, type: 'warning', text: '草稿' },
        { status: 1, type: '', text: '待审核' },
        { status: 2, type: 'success', text: '审核通过' },
        { status: 3, type: 'danger', text: '审核失败' },
        { status: 4, type: 'info', text: '已删除' }
      ],
      totalCount: 16, // 总数居条数
      pageSize: 10, // 每页大小
      status: null, // 查询文章的状态，不传为null，代表全部
      channels: [], // 文章频道列表
      channelsId: null, // 查询文章频道
      loading: false // 默认为 false ，当为 true 时会变成一直加载的状态; 这里我用 loading 同时控制了表单和分页组件，优化了交互，目前注释了
    }
  },
  computed: {},
  watch: {},
  created () {
    // getArticle().then(res => {…}) // 不建议直接在生命周期中直接用这个方法，建议封装到另一个方法中？-->目的：方便复用，这个页面会多次用到这个方法
    this.loadArticles()
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadArticles (page = 1) {
      // 展示加载中
      // this.loading = true
      getArticle({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelsId,
        start_pubdate: this.form.date1 ? this.form.date1[0] : null,
        end_pubdate: this.form.date1 ? this.form.date1[1] : null
      }).then(res => {
        // console.log(res) // 调试使用
        const { results, total_count: totalCount } = res.date.date // 不能使用_去定义解构名，遇到此种情况需要重命名（即冒号后面加上重命名的名字即可）
        this.totalCount = totalCount
        this.articles = results
        this.articles = res.data.data.results
        this.loading = false // 关闭加载提示
      })
    },
    onCurrentChange (page) {
      console.log(page)
      // this.loading = true // 开启加载提示
      this.loadArticles(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticles (articleId) {
      this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除方法
        console.log('删除成功！')
        deleteArticle(articleId.toString()).then(res => { console.log(res) })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        console.log('取消删除！')
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
})
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}
.list-table {
  margin-bottom: 20px;
}
.article-cover {
  width: 100px;
  background-size: cover;
}
</style>
