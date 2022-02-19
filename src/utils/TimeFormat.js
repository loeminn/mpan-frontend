export function formatDate(pattern, date) {
    date = new Date(date)

    function formatNumber(data, format) {
        data = data || 0
        format = format.length
        return format === 1 ? data : String(Math.pow(10, format) + data).slice(-format)
    }

    return pattern.replace(/([YMDhsmw])\1*/g, format => {
        switch (format.charAt()) {
            case 'Y':
                return formatNumber(date.getFullYear(), format)
            case 'M':
                return formatNumber(date.getMonth() + 1, format)
            case 'D':
                return formatNumber(date.getDate(), format)
            case 'h':
                return formatNumber(date.getHours(), format)
            case 'm':
                return formatNumber(date.getMinutes(), format)
            case 's':
                return formatNumber(date.getSeconds(), format)
            case 'w':
                return date.getDay()
        }
    })
}

export function standardTime(fileTime) {
    return formatDate('YYYY-MM-DD hh:mm', fileTime)
}

export function differenceTime(date) {
    const now = new Date().getTime()
    date = new Date(date).getTime()
    let diff = (date - now) / 1000 / 60 / 60
    if (diff <= 0) {
        return null
    }
    if (diff < 24) {
        return diff.toFixed(0) + '小时'
    }
    diff /= 24
    return diff.toFixed(0) + '天'
}