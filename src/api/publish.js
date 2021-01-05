import request from '@/utils/request'



export default {
    //频道数据
    getList () {
        return request({
            url: '/publish/list',
            method: 'get'
        })
    },
    //发布给后台的数据
    addArticle (form) {// draft = false
        return request({
            url: '/publish/list',
            method: 'POST',
            // params: {
            // draft // 是否存为草稿（true 为草稿）
            // },
            data: form
        })
    },

//   获取内容页的数据
getById(form) {
    return request({
        url: `/publish/list/${form.id}`,
        method: 'get'
    })
},

   

}