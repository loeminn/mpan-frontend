import request from "@/api/request";

export function createShare(data) {
    return request({
        url: '/share/createShare',
        method: 'post',
        data: data
    })
}

export function getShareList(pageNum) {
    return request({
        url: '/share/getShareList',
        method: 'get',
        params: {pageNum}
    })
}

export function cancelShare(shareIds) {
    return request({
        url: '/share/cancelShare',
        method: 'post',
        data: {
            shareIds
        }
    })
}

export function getShareInfo(shortLink) {
    return request({
        url: '/share/sc/getShareInfo',
        method: 'get',
        params: {
            shortLink
        }
    })
}

export function verifyAccessCode(shareId, accessCode) {
    return request({
        url: '/share/sc/verifyAccessCode',
        method: 'post',
        data: {
            shareId, accessCode
        }
    })
}

export function checkShareToken(shareId) {
    return request({
        url: '/share/sc/checkShareToken',
        method: 'get',
        params: {shareId},
    })
}

export function getShareFileList(path) {
    return request({
        url: '/share/file/getList',
        method: 'get',
        params: {path},
    })
}

export function saveShareFile(ufIdList, toPath) {
    return request({
        url: '/share/file/save',
        method: 'post',
        data: {ufIdList, toPath},
    })
}

export function getShareFileDownloadUrl(ufIdList) {
    return request({
        url: '/share/file/getDownloadUrl',
        method: 'get',
        isArr: true,
        params: {ufIdList}
    })
}