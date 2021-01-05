import Vue from "vue";
// 注意引入在 Vue的下面
//  ElementUI 组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import { ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';

// 使用 ElementUI
Vue.use(ElementUI);
Vue.use(ElementTiptapPlugin, { /* 插件配置项 */ 
  lang: "en", // 见 i18n
  spellcheck: true, // 可被 editor 同名 prop 重写
})

// 权限拦截
import './permission'

Vue.config.productionTip = process.env.NODE_ENV === 'production';
console.log(process.env.VUE_APP_SERVICE_URL) // 开发环境 development, 生产环境 production 
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
