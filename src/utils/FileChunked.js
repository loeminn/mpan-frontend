import SparkMD5 from "spark-md5"

const chunkSize = 1024 * 1024 * 5

export function createChunkedList(option) {
    const fileReader = new FileReader()
    const spark = new SparkMD5.ArrayBuffer()
    const file = option.file
    let currentChunk = 1
    let fileChunkedList = []
    for (let i = 0; i < file.size; i += chunkSize) {
        const tmp = file.slice(i, Math.min((i + chunkSize), file.size))
        if (i === 0) {
            fileReader.readAsArrayBuffer(tmp)
        }
        fileChunkedList.push(tmp)
    }
    fileReader.onload = getFileMd5

    function getFileMd5(e) {
        spark.append(e.target.result)
        if (currentChunk === fileChunkedList.length) {
            const md5 = spark.end();
            fileChunkedList.forEach((item, index) => {
                const formData = new FormData;
                formData.append('file', item, file.name)
                formData.append("partNumber", index + 1)
                option.chunkedList.push(formData)
            })
            option.setMD5(md5)
            option.onValidateMd5()
        } else {
            fileReader.readAsArrayBuffer(fileChunkedList[currentChunk])
            currentChunk++
        }
    }
}


