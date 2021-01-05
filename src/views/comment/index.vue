<template>
<div>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="#">评论管理</a></el-breadcrumb-item>
</el-breadcrumb>
  </div>
   <el-table
    :data="lick"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="标题"
      >
    </el-table-column>
    <el-table-column
      prop="payType"
      label="总评论数"
     >
    </el-table-column>
    <el-table-column
      prop="payType"
      label="粉丝评论数"
     >
     <!-- 自定义表格列来渲染false/true -->
    </el-table-column>
     <el-table-column
      prop="boolean"
      label="评论状态">
      <template slot-scope="scope">
       {{ scope.row.boolean ? '正常' : '关闭'}}
      </template>
    </el-table-column>
     <el-table-column
      prop="boolean"
      label="操作">
      <template slot-scope="scope">
          <el-switch 
         v-model="scope.row.boolean"
         active-color="#13ce66"
         inactive-color="#ff4949"
         @change="onStatusChange(scope.row)"
         >
        </el-switch>
      </template>
    </el-table-column>
  </el-table>
</el-card>

<!-- 分页 -->
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currenPage"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
      >
    </el-pagination>
</div>
</template>

<script>
import Apparticle from '@/api/article'
export default {
    data() {
      return {
      lick:[],
      total: 0,// 总条数
      currenPage: 1, // 当前页，默认第一页
      pageSize: 10, // 每页显示10条数据
      }
    },
    methods:{
     loadArticles () {
     Apparticle.search({boolean: 'Comment'},this.page, this.size).then(response => {
        const resp = response.data
        this.lick = resp.data.rows
        this.total = resp.data.total
     })
     },
     onStatusChange(boolean){
     
     },
     handleSizeChange(val) {
      this.pageSize = val 
      this.loadArticles ()
      },
      handleCurrentChange(val) {
      this.currenPage = val
      this.loadArticles ()
      }
    },
    created() {
      this.loadArticles()
    }
}
</script>

<style scoped>

</style>