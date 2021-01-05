import request from '@/utils/request'

export default {
    getList() {
        return request({
            url: '/artcle/list',
            method: 'get'
        })
    },
    // 响应给前端的数据
    search(page, size, searchMap) {
        return request({
            url: `/article/list/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        })
    },

       // 删除
       deleteById(id) {
        return request({
            url: `/article/${id}`,
            method: 'delete',
        })
    },


    //响应给频道的数据
    searchdata() {
        return request({
            url: '/article/list',
            method: 'get',
        })
    },

    getById(id) {
        return request({
            url: `/artcle/${id}`,
            method: 'get'
        })
    },


 
}