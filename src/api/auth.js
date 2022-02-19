import request from "@/api/request";

export function sendRegisterVerifyCode(to) {
    return request({
        url: '/auth/sendRegisterVerifyCode',
        method: 'get',
        params: {to}
    })
}

export function register(data) {
    return request({
        url: '/auth/register',
        method: 'post',
        data: data
    })
}

export function checkEmailExists(email) {
    return request({
        url: '/auth/checkEmailExists',
        method: 'get',
        params: {email}
    })
}

export function login(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: data
    })
}

export function logout() {
    return request({
        url: '/auth/logout',
        method: 'post'
    })
}