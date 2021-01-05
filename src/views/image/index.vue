<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      </el-card>
     <app-fyoud />
  </div>
</template>

<script>
import AppFyoud from "./components/index"
import Appsearch from "@/api/image";
export default {
  components: {
    AppFyoud
  }
}
</script>

<style scoped>


</style>