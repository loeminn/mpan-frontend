const BASE_URL = 'https://lm-icon.oss-cn-shenzhen.aliyuncs.com/mpan/'
const AVATAR_BASE_URL = BASE_URL + 'avatar/'
const FILE_ICON_BASE_URL = BASE_URL + 'file-icon/'

const iconType = {
    dirIcon: FILE_ICON_BASE_URL + 'dir.png',
    otherIcon: FILE_ICON_BASE_URL + 'other.png',
    moveIcon: FILE_ICON_BASE_URL + 'move.png',
    dirEmpty: FILE_ICON_BASE_URL + 'empty-dir.png',
    picEmpty: FILE_ICON_BASE_URL + 'empty-pic.png',
    shareIcon: FILE_ICON_BASE_URL + 'share.png',
    defaultAvatar: AVATAR_BASE_URL + 'default.png',
    image: FILE_ICON_BASE_URL + 'image.png',
    video: FILE_ICON_BASE_URL + 'video.png',
    audio: FILE_ICON_BASE_URL + 'audio.png',
    compressed: FILE_ICON_BASE_URL + 'compressed.png',
    txt: FILE_ICON_BASE_URL + 'txt.png',
    word: FILE_ICON_BASE_URL + 'word.png',
    excel: FILE_ICON_BASE_URL + 'excel.png',
    ppt: FILE_ICON_BASE_URL + 'ppt.png',
    pdf: FILE_ICON_BASE_URL + 'pdf.png'
}

const fileType = {
    1: iconType.image,
    2: iconType.video,
    4: iconType.audio,
    5: iconType.compressed,
}
const docIcon = {
    txt: iconType.txt,
    doc: iconType.word,
    docx: iconType.word,
    xls: iconType.excel,
    xlsx: iconType.excel,
    ppt: iconType.ppt,
    pptx: iconType.ppt,
    pdf: iconType.pdf,
    md: iconType.otherIcon
}

function getIconUrl(file) {
    if (file.isDir === 1) {
        return iconType.dirIcon
    }
    if (file.category === 3) {
        const split = file.fileName.split(".")
        const suffix = split[split.length - 1]
        return docIcon[suffix]
    }
    const icon = fileType[file.category];
    if (icon) {
        return icon
    } else {
        return iconType.otherIcon
    }
}

const imgList = ['png', 'jpg', 'jpeg', 'gif', 'bmp']
const videoList = ['mp4', 'flv', 'mkv', 'rmvb', 'avi', 'wmv']
const docList = ['txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'md']
const audioList = ['mp3', 'wav', 'flac', 'acc', 'ape', 'wma']
const compressedList = ['zip', 'rar', '7z', 'gz']

function getUploadFileIcon(fileName) {
    const split = fileName.split(".")
    const suffix = split[split.length - 1]
    if (split.length === 0) {
        return iconType.otherIcon
    }
    if (imgList.indexOf(suffix) !== -1) {
        return iconType.image
    }
    if (videoList.indexOf(suffix) !== -1) {
        return iconType.video
    }
    if (audioList.indexOf(suffix) !== -1) {
        return iconType.audio
    }
    if (compressedList.indexOf(suffix) !== -1) {
        return iconType.compressed
    }
    if (docList.indexOf(suffix) !== -1) {
        return docIcon[suffix]
    }
    return iconType.otherIcon
}

function getAvatar(avatarId) {
    return AVATAR_BASE_URL + avatarId + ".webp"
}

export {iconType, getIconUrl, getAvatar, getUploadFileIcon}
