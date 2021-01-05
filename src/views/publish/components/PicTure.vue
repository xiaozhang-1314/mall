<template>
  <div>
    <div class="cover-wrap" @click="showCoverSect">
      <img
        class="cover-image"
        ref="cover-image"
      />
    </div>

    <!-- 弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <!-- Tabs 标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="素材库" name="first">
          <!-- ref 有两个作用
          1. 作用到普通HTML 标签上可以获取 DOM
          2. 作用到组件上可以获取组件 -->
          <app-fyoud 
          :is-show-add="false"
          :is-show-action="false"
          ref="image-list"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
        <input 
        type="file" 
        ref="file"
        @change="onFilechange" />
          <img 
          width="100"
          ref="preview-image"
          />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoveronficm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AppFyoud from '@/views/image/components'
import ApppicTure from '@/api/image'
export default {
  name: "PicTure",
  components: {
    AppFyoud
  },
  data() {
    return {
      dialogVisible: false,
      activeName: "",
    };
  },
  methods: {
    showCoverSect() {
      this.dialogVisible = true;
    },
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    onFilechange() {
        // 获取文件对象
        const file = this.$refs.file.files[0]
        // 预览
        const blob = window.URL.createObjectURL(file)
        this.$refs['preview-image'].src = blob
        //防止用户选择同一个文件不触发change事件
       // this.$refs.file.value = ''
    },
    onCoveronficm () {
        //如果tab 是上传图片，并且input-file有选择的文件，才执行上传图片的操作
         if(this.activeName === 'second') {
           const file = this.$refs.file.files[0]
         if(!file) {
               this.$message('请选择文件')
                return
            }
            //执行上传文件的操作
            const fd = new FormData()
            fd.append('img', file)
            ApppicTure.search(fd).then(response => {
                const resp = response.data
               // console.log(resp);
                this.dialogVisible = false
                //展示上传的图片
              this.$refs['cover-image'].src = this.$refs['preview-image'].src 
             // this.$refs['cover-image'].src = resp.data.img
             //   console.log(this.$refs['cover-image'].src);
             // 将图片地址发送给父组件
              const file = this.$refs.file.files[0]
            // 预览
            const blob = window.URL.createObjectURL(file)
            this.$refs['preview-image'].src = blob.url
             this.$emit('update-cover', this.$refs['preview-image'].src)     
            })
     }else if (this.activeName === 'first') {
         //还有一种组件通信方式：父组件可以直接访问子组件中的数据
         const imageList = this.$refs['image-list']
         const selected = imageList.selected
         if(selected = null) {
           this.$message('请选择封面图片')
           return
         }
         //关闭对话框
         this.dialogVisible = false
         // 修改父组件
         this.$emit('input', this.imageList.images.url)
     }
    }
  },
}
</script>

<style scoped>
.cover-wrap {
  width: 150px;
  height: 140px;
  border: 1px solid #000;
}
.cover-image {
  height: 140px;
  width: 150px;
}
</style>