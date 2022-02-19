import request from "@/api/request";

export function getRecycleFileList(pageNum) {
    return request({
        url: '/recycle/getRecycleFileList',
        method: 'get',
        params: {pageNum}
    })
}

export function restore(rfIdList) {
    return request({
        url: '/recycle/restore',
        method: 'post',
        data: {rfIdList}
    })
}

export function delRecycleFile(rfIdList) {
    return request({
        url: '/recycle/delRecycleFile',
        method: 'post',
        data: {rfIdList}
    })
}

export function delAllRecycleFile() {
    return request({
        url: '/recycle/delAllRecycleFile',
        method: 'post'
    })
}