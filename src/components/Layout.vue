<template>
  <div>
    <!-- <div>顶部导航栏</div>
     <div>侧边导航栏</div>
   <router-view /> -->

      <app-header class="header"></app-header>
      <app-navigat class="Navigation"></app-navigat>
      <app-mian class="main"></app-mian>

  </div>
</template>
<script>
import AppHeader from './Appheader'
import AppNavigat from './Navigation'
import AppMian from './Appmian'

// 会导入 ./AppHeader 下面的 index.vue组件
export default {
  data() {
           return{

           }
  },
   components:{
      AppNavigat, //左侧
      AppMian,//主视图
      AppHeader//头部
    }
  
}
</script>
<style scoped >
.header {
/* 绝对定位 */
position: absolute;
/* 行高     上  左  右*/
line-height: 50px;
top: 0px;
left: 200px;
right: 0px;
background-color:rgb(89, 0, 255)
}
.Navigation{
    /* 绝对定位 */
position: absolute;
width: 200px;
top:0px;
left: 0px;
bottom: 0px;
/* 超出显示滚动条 */
overflow-y: auto;
background-color: #545;
}

.main {
        /* 绝对定位 */
position: absolute;
top:50px;
left: 200px;
right: 0px;
bottom: 0px;
/* 内边距 */
padding: 0px;
margin: 0px;
overflow-y: auto;
}

</style>