<template>
  <div>
  <div class="header">
    <i class="iconfont iconGamePublishing"></i>
    <span>今日头条、一统江湖、 永垂不朽</span>
    </div>
    <el-dropdown @command="handleCommand">
       <div class="dropdown">
         <img class="avarar" :src="user.image.image" alt="">
     <span class="el-dropdown-link">
        {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span> 
     </div>
      <el-dropdown-menu slot="dropdown" style="width:100px">
        <el-dropdown-item command="a" icon="el-icon-s-check">修改</el-dropdown-item>
        <el-dropdown-item command="b" icon="el-icon-s-tools">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import {logout} from '@/api/login.js'
import globalBus from '@/utils/globalBus'


export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('zhongxueshen')),
    }
  },
  methods:{
    tingchuxitong() {
      this.$confirm('此操作将退休头条管理系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        logout(localStorage.getItem("xiaoxueshen")).then(response => {
       const resp = response.data
       console.log(resp);
       if(resp.flag){
          //  清除本地数据
          localStorage.removeItem("xiaoxueshen")
          //清除k值
          localStorage.removeItem("zhongxueshen")
          //回到登录页面
          this.$router.push("/login")
           this.$message({
             type: 'warning',
            message: '退出系统成功!'
          });
       }else{
           this.$message({
             type: 'warning',
            message: '退出系统错误!'
          });
       }
     })
       
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
     
    },
    handleCommand(command) {
             switch (command) {
              case 'a':
                this.$message('修改');
                break;
              case 'b':
               this.tingchuxitong()
                break;
                default:
                  break
             }
    }
  },
  created () {
    // 注册自定义事件
// 当这个事件发布以后，这个注册函数就会调用到,为了不然相互影响，data里的数据单个赋值
  globalBus.$on('update-user', (data) => {
 // console.log('update-user', data);
  this.user.name  = data.name
  this.user.image.image = data.image.image
})
  }
}
</script>

<style scoped>
.el-icon-s-fold {
  margin-right: 15px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 150px;
}
.dropdown {
  margin-right: 22px;
 font-size: 16px;
 display: flex;
 align-items: center;
} 
/* 随机图片 */
 .avarar {   
  margin-right: 10px;
   width: 40px;
   height: 40px;
   border-radius: 50%
 }  
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
 .el-icon-arrow-down {
    font-size: 12px;
  }
  .header {
    display:flex;
    height: 50px;
  justify-content: space-between; 
    align-items: center;
  }
</style>