export function convertFileSize(size) {
    if (size < 1024) {
        return size + 'B'
    }
    size /= 1024
    if (size < 1024) {
        return Math.round(size * 10) / 10 + 'KB'
    }
    size /= 1024
    if (size < 1024) {
        return Math.round(size * 10) / 10 + 'MB'
    }
    size /= 1024
    if (size < 1024) {
        return Math.round(size * 10) / 10 + 'GB'
    }
    size /= 1024
    return Math.round(size * 10) / 10 + 'TB'
}