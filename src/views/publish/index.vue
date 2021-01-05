<template>
  <div class="publish-container">
    <el-card class="box-card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="#">{{$route.query.id ? '修改文章' : '发布文章'}}</a></el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 表单  -->
    </el-card>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="60px" :rules="rules">
        <el-form-item label="标题" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="sentence">
          <el-tiptap
      v-model="form.sentence"
      :extensions="extensions"
      placeholder="请输入内容~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="form.image">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 我们需要把选择的封面图片的地址放到from.integer数组里面 -->

         <!-- 当你给事件处理函数传递列自定义参数以后，就无法得到原本的那个数据参数列
         如果想要在事件处理函数自定义传参以后还想得到原来那个事件本身的参数，则手动指定$event,他就是代表那个事件本身的参数 -->
         <template v-if="form.image > 0">
        <pic-ture 
         :key="cover"
         v-for="(cover, index) in form.image"
         @update-cover="onUpdateCover(index, $event)"
         v-model="form.image[index]"
         />
         </template>
        </el-form-item>
        <el-form-item label="频道" prop="csentence">
          <el-select placeholder="请选择" v-model="form.csentence">
            <el-option
              :label="n.csentence"
              :value="n.csentence"
              v-for="(n, index) in list"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
          :loading="onpublishload"
           @click="onpublish()">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Apptublish from "@/api/publish";
import PicTure from './components/PicTure'
import {
  // 需要的 extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  TextColor
} from 'element-tiptap'



export default {
  data() {
    return {
      form: {
        id: null,
        name: "",
        sentence: "",
        csentence: "",
        image: ''
      },
      list: [],
       extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image(),
        new TextColor()
      ],
      rules: {
          name:[
               {required: true, message: "标题不能为空", trigger: "blur" },
               { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
          ],
          sentence:[
              {required: true, message: "内容不能为空", trigger: "change" }
          ],
          csentence:[
            //  {required: true, message: "频道不能为空", trigger: "change" }
              {
               validator (rule, value, callback) {
                   if (value === '<p></p>' || '') {
                       //验证失败
                       callback(nwe.Error('请输入文章内容'))
                   } else {
                       //验证通过
                       callback()
                   }
               }
              },
              {required: true, message: '请输入文章内容', trigger: 'blur'}
          ]
      },
      onpublishload: false
    }
  },
  components: {
  
    PicTure
  },
  methods: {
    onpublish() {
        this.onpublishload = true
        this.$refs['form'].validate(valid => {
            //验证失败，停止提交表单
            if(!valid) {
                return 
            }
        Apptublish.addArticle(this.form).then((response) => {
        const resp = response.data;
        if (resp.flag) {
          this.onpublishload = false
         // console.log(resp);
          this.$message({
            message: "恭喜你，发布成功啦~~~~~~~~~~~~~~~~~~~",
            type: "success"
          })
        } else {
          return false;
        }
      })
        })
   
    },
    // 频道数据
    logpublish() {
      Apptublish.getList().then((response) => {
        const resp = response.data
        // console.log(resp);
        this.list = resp.data
      })
    },
    // 修改文章：加载文章内容
    loadArticle(form) {
      Apptublish.getById(this.$route.query.id).then((response) => {
        const resp = response.data
        this.form = resp.data[0]
        // 修改一下期望对象，得到的是数组从后台获取的数据是List类型，需要把它改为Object获取数据的代码为this.form = resp.data[0]
        console.log(this.form)
      })
    },
    onUpdateCover(index, url) {
      this.form.image[index] = url
    }
  },
  created() {
    this.logpublish();
    //由于我们让发布和修改使用同一个组件
    //所以这里要判断
    //如果路由路径参数中右id。则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle();
    }
  },
};
</script>

<style scoped>
.publish-container {
  text-emphasis: none;
}
</style>