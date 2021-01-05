import request from '@/utils/request'

//登录成功
export function login(username, password) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            username, // username: username
            password
        }
    })
}

// 响应用户信息
export function getUserInfo(token) {
    return request({
        url: `/user/info/${token}`,
        method: 'get'
    })
}

// 退出登录
export function logout(token) {
    return request({
        url: `/user/logout`,
        method: 'post',
        data: {
            token //token: token
        }
    })
}


// 修改用户头像图片
// 注意：data必须传递FormData对象
export function updateUserPhoto(token) {
    return request({
        url: `/user/logout`,
        method: 'PATCH',
        data: {
            token
        }
    })
}

//修改用户的基本信息
export function updateUserProfile(formName) {
    return request({
        url: `/user/profile`,
        method: 'PATCH',
        data: {
            formName
        }
    })
}