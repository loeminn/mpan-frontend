import request from "@/api/request";
import axios from "axios";

export function getFileList(path, pageNum) {
    return request({
        url: '/file/getFileList',
        method: 'get',
        params: {path, pageNum}
    })
}

export function getCategoryFileList(category, pageNum) {
    return request({
        url: '/file/getCategoryFileList',
        method: 'get',
        params: {category, pageNum}
    })
}

export function validateMd5(data) {
    return request({
        url: '/file/validateMd5',
        method: 'get',
        params: data
    })
}

export function chunkedUpload(data, percentage, updatePercentage, stopRequestList) {
    return request({
        url: '/file/chunkedUpload',
        method: 'post',
        data: data,
        timeout: 240000,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
            percentage[data.get("partNumber") - 1] = e.loaded
            updatePercentage(e)
        },
        cancelToken: new axios.CancelToken((c) => {
            stopRequestList.push(c)
        })
    })
}

export function merge(data) {
    return request({
        url: '/file/merge',
        method: 'post',
        data: data
    })
}

export function abortChunkedUpload(data) {
    return request({
        url: '/file/abortChunkedUpload',
        method: 'post',
        data: data
    })
}

export function createDir(dirName, path) {
    return request({
        url: '/file/createDir',
        method: 'post',
        data: {
            dirName, path
        }
    })
}

export function getFileStatistics() {
    return request({
        url: '/file/getFileStatistics',
        method: 'get',
    })
}

export function downloadFile(ufIdList) {
    return request({
        url: '/file/getDownloadUrl',
        method: 'get',
        isArr: true,
        params: {
            ufIdList: ufIdList
        }
    })
}

export function delFile(ufIdList) {
    return request({
        url: '/file/delFile',
        method: 'post',
        data: {
            ufIdList: ufIdList
        }
    })
}

export function fileRename(fileName, ufId) {
    return request({
        url: '/file/rename',
        method: 'post',
        data: {
            fileName, ufId
        }
    })
}

export function getDirList(path) {
    return request({
        url: '/file/getDirList',
        method: 'get',
        params: {path}
    })
}

export function copyFile(path, ufIdList) {
    return request({
        url: '/file/copyFile',
        method: 'post',
        data: {path, ufIdList}
    })
}

export function moveFile(path, ufIdList) {
    return request({
        url: '/file/moveFile',
        method: 'post',
        data: {path, ufIdList}
    })
}

export function searchFile(key, pageNum) {
    return request({
        url: '/file/searchFile',
        method: 'get',
        params: {key, pageNum}
    })
}