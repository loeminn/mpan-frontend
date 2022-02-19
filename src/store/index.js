import {createStore} from 'vuex'
import {Message} from "@/plugins/Message";
import {Mitt} from "@/plugins/Mitt";
import {plugins} from "../../babel.config";

export default createStore({
    state: {
        userInfo: {
            id: '',
            nickname: '',
            avatar: '',
            email: '',
            createTime: null,
            isLogin: false
        }
        ,
        remainingSpace: 0,
        uploadList: [],
        uploadedFile: 0,
        uploadQueue: [],
        executing: [] // 存储正在执行的异步任务
    },
    getters: {
        noUpload: state => {
            return state.uploadList.length - state.uploadedFile
        }
    },
    mutations: {
        updateUserInfo(state, payload) {
            for (let item in payload) {
                state.userInfo[item] = payload[item]
            }
        },
        updateRemainingSpace(state, remainingSpace) {
            state.remainingSpace = remainingSpace
        },
        toggleLoginStatus(state, flag) {
            state.userInfo.isLogin = flag
        },
        pushUploadList(state, fileList) {
            let fileSizes = 0
            fileList.forEach(item => {
                fileSizes += item.size
            })
            if (fileSizes > state.remainingSpace) {
                Message.error('你的剩余空间已不足')
                return
            }
            Array.prototype.push.apply(state.uploadList, fileList)
            Mitt.emit('openUpList')
        },
        uploadedFileIncr(state) {
            state.uploadedFile++
        },
        pushUploadQueue(state, item) {
            state.uploadQueue.push(item)
            state.uploadQueue.sort((a, b) => {
                return a.index - b.index
            })
        },
        startUpload(state) {
            if (state.uploadQueue.length !== 0) {
                const nextLoad = state.uploadQueue[0].onUpload
                state.uploadQueue.splice(0, 1)
                nextLoad()
            }
        },
        pushExecuting(state, item) {
            state.executing.push(item)
        },
        DeleteItem4Executing(state, item) {
            state.executing.splice(state.executing.indexOf(item), 1)
        }
    },
    actions: {},
    modules: {}
})
