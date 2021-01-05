<template>
  <div class="article-container">
    <!-- 卡片里面的面包屑  -->
    <el-card class="filter-card1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">活动管理</a></el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <!-- 卡片里面的from表单 -->
    <el-card class="filter-card2">
      <el-form
        ref="form"
        :model="form"
        label-width="40px"
        class="el-form"
        size="mini"
      >
        <el-form-item label="状态">
          <el-radio-group v-model="searchMap">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select placeholder="请选择" v-model="searchMap">
            <el-option
              :label="n.csentence"
              :value="n.csentence"
              v-for="(n, index) in nu"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="logtableData(1)"
            >查找</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-breadcrumb class="spand">
        根据筛选条件共查询到 {{ total }} 条结果：
      </el-breadcrumb>

      <!-- 数据列表 -->
      <el-table
        :data="list"
        border
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.img" class="article-cover" lazy>
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="sentence" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="payTypeOptions[scope.row.payType].type">{{
              payTypeOptions[scope.row.payType].text
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="datetime" label="发布时间"> </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="$router.push('/publish?id=' + scope.row.id.toString())"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="onDeleteArticle(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currenPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="loading"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Apparticle from "@/api/article";
export default {
  data() {
    return {
      form: {
        delivery: false,
        region: "",
        nu: "",
      },
      value2: "",
      list: [],
      payTypeOptions: [
        { payType: 0, text: "草稿", type: "info" },
        { payType: 1, text: "待审核", type: "" },
        { payType: 2, text: "审核通过", type: "success" },
        { payType: 3, text: "审核失败", type: "danger" },
        { payType: 4, text: "已删除", type: "danger" },
      ],
      total: 0, //总记录数
      currenPage: 1, //当前页，默认第一页
      pageSize: 10, //每页显示10条数据
      searchMap: null, //搜索查询绑定的条件值
      nu: null, // 文章频道列表
      pickerOptions: "",
      loading: false,
    };
  },
  methods: {
    // logtableData() {
    //   Apparticle.getList().then((response) => {
    //     const resp = response.data;
    //     console.log(resp);
    //     this.list = resp.data;
    //   });
    // },
    logtableData() {
      this.loading = true;
      Apparticle.search(this.page, this.size, this.searchMap).then(
        (response) => {
          const resp = response.data;
          this.list = resp.data.rows;
          this.total = resp.data.total;
          this.loading = false;
          // console.log(resp);
        }
      );
    },
    Appsearchdata() {
      Apparticle.search().then((response) => {
        const resp = response.data;
       // console.log(resp);
        this.nu = resp.data.rows;
      //  console.log(this.nu);
        this.logtableData();
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currenPage = val;
      this.logtableData();
    },
    handleCurrentChange(val) {
      //  console.log(`当前页: ${val}`);
      this.pageSize = val;
      this.logtableData();
    },
    
    //删除id
    onDeleteArticle(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          Apparticle.deleteById(id).then((response) => {
            const resp = response.data;
        //    console.log(resp);
            if (resp.flag) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.logtableData();
            } else {
              return false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.logtableData();
    this.Appsearchdata();
  },
  //查询
};
</script>

<style scoped>
.box-card {
  width: 100%;
}
.spand {
  padding-bottom: 18px;
}
.filter-card2 {
  margin-bottom: 10px;
}
.fenl {
  margin-top: 15px;
}
.article-cover {
  width: 200px;
  height: 100px;
  background-size: contain;
}
</style>