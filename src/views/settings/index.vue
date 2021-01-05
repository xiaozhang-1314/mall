<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="#">个人设置</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 左侧表单 -->
      <el-row>
        <el-col :span="15">
          <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="编号：" prop="id">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="手机：" prop="phone">
              {{ user.phone }}
            </el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="cparagraph">
              <el-input type="textarea" v-model="user.cparagraph"></el-input>
            </el-form-item>
            <el-form-item label="邮编" prop="email">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
              @click="onUpdataUser('user')"
              :loading="updatePhotoLoading"
              >
              立即创建
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 右侧图片 offset偏移的距离-->
        <el-col :span="4" :offset="2">
          <!-- <p @click="$refs.file.click()"></p> -->
          <label for="file">
            <el-avatar
              shape="circle"
              :size="300"
              fit="cover"
              :src="user.image.image"
            >
            </el-avatar>
            <p>点击换图片</p>
          </label>
          <input
            type="file"
            hidden
            ref="file"
            id="file"
            @change="onFileChange"
          />
        </el-col>
      </el-row>
    </el-card>
    <!-- 弹出修改图片页面 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <img :src="previewImage" width="100%" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="updatePhotoLoading"
          @click="onUpdataPhoto()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo, updateUserPhoto, updateUserProfile } from "@/api/login";
import globalBus from '@/utils/globalBus' //全局调用通信

export default {
  data() {
    return {
      user: {
        email: "",
        id: null,
        phone: '',
        cparagraph: "",
        name: "",
        image: "",
      },
      dialogVisible: false, //弹出窗口
      previewImage: "", //预览图片
      updatePhotoLoading: false, //更新用户头像loading状态和提交信息loading状态
    };
  },
  methods: {
    onUpdataUser(formName) {
      this.updatePhotoLoading = true
      updateUserProfile(this.user).then(response => {
        const resp = response.data
        // console.log(this.user);
        if (resp.flag) {
           this.$message({
            message: "恭喜你，修改个人信息成功",
            type: "success",
          })
          // 关闭loading 状态
          this.updatePhotoLoading = false

          // 发布通知，用户信息已修改
          globalBus.$emit('update-user', this.user)
        }else {
          return false
        }
      })
    },
    loaduser() {
      getUserInfo().then((response) => {
        const resp = response.data;
        // console.log(resp);
        this.user = resp.data;
      });
    },
    onFileChange() {
      const file = this.$refs.file;
      const blobDate = window.URL.createObjectURL(file.files[0]);
      // console.log(blobDate)          //获取选择图片的地址
      this.previewImage = blobDate
      // 弹出层，预览用户的图片
      this.dialogVisible = true
      //解决选择相同文件不触发 change事件问题
      this.$refs.file.value = ""
      // console.log('file change')
    },
    onUpdataPhoto() {
      this.updatePhotoLoading = true;
      // 获取图片对象
      // 请求更新用户头像
      // 关闭对话框
      // 更新视图展示
      updateUserPhoto(this.previewImage).then((response) => {
        const resp = response.data;
        // console.log(resp);
        if (resp.flag) {
          this.dialogVisible = false
          this.user.image.image = this.previewImage
          this.updatePhotoLoading = false
          this.$message({
            message: "恭喜你，修改用户头像成功",
            type: "success",
          })
          // 发布通知。图片已更新
           globalBus.$emit('update-user', this.user)
        } else {
          this.$message.error("错了哦，修改用户头像失败");
        }
      });
    },
  },
  created() {
    this.loaduser();
  },
};
</script>

<style scoped>
</style>