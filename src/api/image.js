import request from '@/utils/request'

export default {
    // 响应给前端的数据
    search(page, size, img) {
        return request({
            url: `/image/list/search/${page}/${size}`,
            method: 'post',
            data: img
        })
    },
    //  收藏
    update(img) {        
        return request({            
        url: `/update/${img.id}`, // 反单引号 ``            
        method: 'put', // put 方式提交            
        data: img    
        })   
        },

    //  删除数据
     deleteById(id) {
    return request({
        url:`/image/${id}`,
        method:'delete'
    })
    }
}