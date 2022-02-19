import request from "@/api/request";

export function updateAvatar(data) {
    return request({
        url: '/user/updateAvatar',
        method: 'post',
        data: data,
        timeout: 120000,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export function getUserInfo() {
    return request({
        url: '/user/getUserInfo',
        method: 'get',
    })
}

export function updateNickname(nickname) {
    return request({
        url: '/user/updateNickname',
        method: 'post',
        data: {nickname}
    })
}

export function sendUpdatePwdVerifyCode() {
    return request({
        url: '/user/sendUpdatePwdVerifyCode',
        method: 'get',
    })
}

export function checkUpdatePwdEmailCode(code) {
    return request({
        url: '/user/checkUpdatePwdEmailCode',
        method: 'post',
        data: {code}
    })
}

export function updatePwd(pwd, checkPwd, code) {
    return request({
        url: '/user/updatePwd',
        method: 'post',
        data: {pwd, checkPwd, code}
    })
}

export function sendUpdateEmailVerifyCode() {
    return request({
        url: '/user/sendUpdateEmailVerifyCode',
        method: 'get',
    })
}

export function checkUpdateEmailCode(code) {
    return request({
        url: '/user/checkUpdateEmailCode',
        method: 'post',
        data: {code}
    })
}

export function sendNewEmailVerifyCode(to) {
    return request({
        url: '/user/sendNewEmailVerifyCode',
        method: 'get',
        params: {to}
    })
}

export function bindNewEmail(newEmail, newEmailCode, emailCode) {
    return request({
        url: '/user/bindNewEmail',
        method: 'post',
        data: {
            newEmail, newEmailCode, emailCode
        }
    })
}