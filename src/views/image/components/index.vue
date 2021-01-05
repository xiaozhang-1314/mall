<template>
<div>
 <div class="action-head">
        <el-radio-group v-model="radio1">
          <el-radio-button
            @click.native="loadImages(false)"
            label="全部"
          ></el-radio-button>
          <el-radio-button
            @click.native="loadImages(true)"
            label="收藏"
          ></el-radio-button>
        </el-radio-group>
        <el-button 
        v-if="isShowAdd"
        type="success" 
        @click="dialogTableVisible = true"
          >上传图片</el-button
        >
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
          :xs="12"
          :sm="8"
          :md="8"
          :lg="6"
          v-for="(n, index) in lick"
          :key="index"
          class="image-item"
          @click.native="selected = index"
        >
          <el-image 
          style="height: 100px"
          fit="cover" 
          :src="n.img"
          > </el-image>
          <div class="selected"
          v-if="selected === index"
          ></div>
          <div class="image-action" v-if="isShowAction">
            <el-button
              icon="el-icon-star-off"
              circle
              size="small"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete-solid"
              circle
            ></el-button>
          </div>
        </el-col>
      </el-row>
  
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currenPage"
        :page-sizes="[10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    <!-- 弹出框 -->
    <el-dialog
      title="选择上传图片"
      :visible.sync="dialogTableVisible"
      style="width: 800px"
    >
      <!-- upload  组件本身就支持请求提交上传操作，说白了使用它不用自己去发请求，
       请求方法：默认就是post
       请求路径action,必须写完整路径
       请求头：headers -->
      <el-upload
        class="upload-demo"
        drag
        action="http://mengxuegu.com:7300/mock/5fd4666c6abe342cf5308cbe/image/list/search/%7Bpage%7D/%7Bsize%7D#!method=POST&queryParameters=%5B%5D&body=&headers=%5B%5D"
        multiple
        :headers="uploadHeaders"
        name="img"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
</div>
</template>

<script>
import Appsearch from "@/api/image";
export default {
  name: "FenEdi",
  props: {//公共数据定制
   isShowAdd: {
     type: Boolean, //布尔值
     default: true //默认值
   },
   isShowAction: {
     type: Boolean,
     default: true
   }
  },
  data() {
    const user = JSON.parse(localStorage.getItem("zhongxueshen"));
    return {
      radio1: "全部",
      lick: [],
      total: 0, //总记录数
      currenPage: 1, //当前页，默认第一页
      pageSize: 12, //每页显示12条数据
      dialogTableVisible: false,
      selected: null,//选中的索引
      uploadHeaders: {
        //用户的token
        Authorization: `Bearer ${user.token}`,
      },
    };
  },
  methods: {
    loadImages(collect) {
      Appsearch.search(this.page, this.size, (this.collect = false)).then(
        (response) => {
          const resp = response.data;
          this.lick = resp.data.rows;
          this.total = resp.data.total;
          // console.log(resp);
        }
      );
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currenPage = val;
      this.loadImages();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageSize = val;
      this.loadImages();
    },
    onUploadSuccess () {
      //关闭对话框
      this.dialogTableVisible = false
      //更新素材列表
      this.$message('上传成功')
      this.loadImages()
    }
    //   onCollect(img) {
    //       //已收藏。取消收藏
    //       //没有收藏，添加收藏
    //       Appsearch.update(this.img.id).then(response => {
    //           const resp = response.data
    //           console.log(resp);
    //       })
    //   }
    //删除数据
    // onCollect(id) {
    //   Appsearch.deleteById(id).then(response => {
    //     const resp = response.data;
    //     //console.log(resp);
    //     this.loadImages()
    //   })
    // }
  },
  created() {
    this.loadImages(false);
  },

}
</script>

<style scoped>
.el-image {
  width: 100%;
}
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.image-item {
  position: relative;
}
.image-action {
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  height: 40px;
  background-color: rgba(204, 204, 204, 0.5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}
.selected {
  background: url(./check.png) no-repeat;
  background-size: cover;
  position:absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>