export function setCookie(key, value, expireMinutes) {
    const date = new Date();
    date.setTime(date.getTime() + (1000 * 60 * expireMinutes))
    document.cookie = key + '=' + value + ";expires=" + date.toUTCString()
}

export function getCookie(key) {
    let value = null
    const arrCookie = document.cookie.split("; ")
    arrCookie.forEach(item => {
        const cookie = item.split('=')
        if (key === cookie[0]) {
            value = cookie[1]
            return null
        }
    })
    return value
}