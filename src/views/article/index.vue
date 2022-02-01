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
                  <el-radio-group v-model="form.resource">
                  <el-radio label="全部"></el-radio>
                  <el-radio label="草稿"></el-radio>
                  <el-radio label="待审核"></el-radio>
                  <el-radio label="审核通过"></el-radio>
                  <el-radio label="审核失败"></el-radio>
                  <el-radio label="已删除"></el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="频道">
                  <el-select v-model="form.region" placeholder="请选择频道">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="日期">
                  <el-date-picker
                  v-model="form.date1"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onSubmit">筛选</el-button>
              </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          根据筛选条件，共查询到 2344 条结果：
        </div>
      <div class="text item">
        <!-- 表格数据 -->
        <el-table
            :data="tableData"
            class="list-table"
            style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
        </el-table>
        <!-- 列表分页 -->
        <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default ({
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
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
</style>
