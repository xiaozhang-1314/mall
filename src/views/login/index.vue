<template>
  <div class="login-container">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="100px"
      class="login-form"
    >
      <h2 class="login-title">今日头条系统管理</h2>
      <el-form-item label="手机号码" prop="number">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="Code">
        <el-input v-model="form.Code" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="checked">
        <el-checkbox v-model="form.checked" class="bspan"
          ><span>我已阅读并同意用户协议和隐私条款</span></el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('form')"
          :loading="loginLoading"
          class="but"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";

export default {
  data() {
    return {
      form: {
        number: "",
        Code: "",
        checked: false,
      },
      rules: {
        number: [
          { required: true, message: "手机号码不能为空", trigger: "change" },
          //下面必须是正则表达式  pattern:
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的手机号码格式",
            trigger: "blur",
          },
        ],
        Code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "请输入正确的验证码格式",
            trigger: "blur",
          },
        ],
        checked: [
          {
            //自定义校验规则
            validator: (rule, value, callback) => {
              if (value) {
                callback();
              } else {
                callback(new Error("请同意用户协议"));
              }
            },
            // message: "请勾选用户协议",
            trigger: "change",
          },
        ],
      },
      loginLoading: false,
    };
  },
  methods: {
    submitForm(formName) {
      //   开启登录中。。。。
      this.loginLoading = true;
      this.$refs[formName].validate((valid) => {
        // console.log(valid)
        if (valid) {
          // 提交表单给后台进行验证是否正确
          login(this.form.username, this.form.password).then((response) => {
            const resp = response.data;
            console.log(resp, resp.flag, resp.data.token, resp.message);
            if (resp.flag) {
              // 验证成功, 通过token去获取用户信息
              getUserInfo(resp.data.token).then((response) => {
                const respUser = response.data;
                if (respUser.flag) {
                  // 获取到了用户的数据
                  console.log("userInfo", respUser.data);
                  // 1. 保存 token ，用户信息
                  localStorage.setItem(
                    "zhongxueshen",
                    JSON.stringify(respUser.data)
                  );
                  localStorage.setItem("xiaoxueshen", resp.data.token);
                  this.$message({
                    message: "恭喜你，你已进入系统管理",
                    type: "success",
                  });
                  // 前往首页
                  this.$router.push("/");
                  this.loginLoading = false;
                } else {
                  this.$message({
                    message: respUser.message,
                    type: "warning",
                  });
                }
              });
            } else {
              // 未通过，弹出警告
              // alert(resp.message)
              this.$message({
                message: resp.message,
                type: "warning",
              });
              this.loginLoading = false;
            }
          });
        } else {
          this.$alert("验证失败，请正确输入手机号码和验证码", {
            confirmButtonText: "确定",
          });
          return (this.loginLoading = false);
        }
      });
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 350px;
  /* 上下间隙 160px, 左右自动居中 */
  margin: 110px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login.png") top left;
  background-size: 100%;
}
.login-title {
  color: #303133;
  text-align: center;
}
</style>