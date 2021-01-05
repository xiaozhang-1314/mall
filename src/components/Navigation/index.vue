<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <img src="../../assets/logo.png" class="navimg" />
      <el-menu-item index="/">
        <i class="iconfont iconsetting"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="iconfont icon-article"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="iconfont iconDOCUMENT"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont iconSettings02"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="iconfont iconcomment1"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="iconfont iconfans"></i>
        <span slot="title">粉饰管理</span>
      </el-menu-item>
      <el-menu-item index="/settings">
        <i class="iconfont iconcomment"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    }
  },
  methods: {},
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
.navimg {
  width: 100%;
  height: 50px;
}
.iconfont {
    margin-right: 15px;
}
</style>