import axios from "axios";
import qs from "qs";
import {Message} from "@/plugins/Message";
import {Modal} from "@/plugins/Modal";
import router from "@/router";
import store from "@/store"

const instance = axios.create({
    baseURL: 'http://120.25.166.84:8080',
    // baseURL: 'http://127.0.0.1:8080',
    timeout: 10000,
})
instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('authorization')
    if (token) {
        config.headers.authorization = token
    }
    if (config.url.startsWith('/share')) {
        const shareToken = sessionStorage.getItem('shareToken');
        if (shareToken) {
            config.headers.shareToken = shareToken
        }
    }
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded' && config.method === "post") {
        config.data = qs.stringify(config.data, {indices: false})
    } else if (config.isArr) {
        config.paramsSerializer = params => {
            return qs.stringify(params, {indices: false})
        }
    }
    return config
}, err => {
    return Promise.reject(err);
})
instance.interceptors.response.use(res => {
    const code = res.data.code;
    if (code >= 0) {
        return res.data
    } else {
        if (code === -207 || code === -208) {
            localStorage.removeItem('authorization')
            store.commit('toggleLoginStatus', false)
            let closeIcon = false
            let lossFocusClose = false
            if (router.currentRoute.value.path.startsWith('/s/')) {
                closeIcon = true
                lossFocusClose = true
            }
            Modal.confirm({
                title: '提示',
                content: res.data.msg,
                icon: 'info',
                okText: '去登陆',
                closeIcon,
                lossFocusClose,
                onOk() {
                    location.href = '/auth'
                }
            })
        }
        return Promise.reject(res.data)
    }
}, err => {
    if (!err.__CANCEL__) {
        Message.error('请求超时', 2000, 'requestTimeout')
        return Promise.reject('请求超时')
    }
})
export default function request(option) {
    return instance(option)
}