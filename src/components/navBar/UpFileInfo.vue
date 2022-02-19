<template>
  <div class="info">
    <div class="file-icon"><img :src="fileIcon"/></div>
    <div class="file-progress">
      <div class="name" :title="fileInfo.name">{{ fileInfo.name }}</div>
      <div v-show="status===2||status===3" class="progress">
        <div class="now" :style="{width:progress+'%'}">
          <div v-show="status===2" class="animation"></div>
        </div>
      </div>
      <div class="status">
        <span class="size">{{ fileSize(fileInfo.size) }}</span>
        <span v-show="status===0" class="tip">文件校验中</span>
        <span v-show="status===2" class="tip">{{ fileSize(speed) }}/s</span>
        <span v-show="status===6" class="tip">服务器校验中</span>
        <span v-show="status===5" class="tip error">{{ errMsg }}</span>
      </div>
    </div>
    <div class="action">
      <span v-show="status===1" title="排队中">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shizhong"></use>
        </svg>
      </span>
      <span v-show="status===2" title="暂停" @click="onPause">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zantingtingzhi"></use>
        </svg>
      </span>
      <span v-show="status===3||status===5" title="继续" @click="tryUpload">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangjiantou1"></use>
        </svg>
      </span>
      <span v-show="status===0||status===1||status===2||status===3||status===5" title="取消" @click="cancel">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-quxiao"></use>
        </svg>
      </span>
      <span v-show="status===4" title="重试" @click="retry">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhongshi"></use>
        </svg>
      </span>
      <span v-show="status===7" title="打开所在文件夹" @click="$router.push({path:'/',query:{path}})">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wenjianjia"></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
import {getIconUrl, getUploadFileIcon} from "@/utils/FileIcon";
import {createChunkedList} from "@/utils/FileChunked";
import {validateMd5, chunkedUpload, merge, abortChunkedUpload} from "@/api/file";
import {convertFileSize} from "@/utils/FileSize";

export default {
  name: "UpFileInfo",
  computed: {
    fileIcon() {
      return getUploadFileIcon(this.fileInfo.name)
    }
  },
  methods: {
    onSuccess() {
      this.status = 7
      this.$store.commit('uploadedFileIncr')
      this.$bus.emit('refreshFileList', this.path)
      this.$bus.emit('updateUsedCapacity', this.fileInfo.size)
    },
    onError(msg) {
      this.stopRequest()
      this.status = 5
      this.errMsg = msg
    },
    onUpload() {
      this.status = 2
      this.start().then(res => {
        if (this.uploadedChunked.length === this.chunkedList.length && this.status === 2) {
          this.status = 6
          this.mergeChunked()
        }
      })
    },
    onPause() {
      this.status = 3
      this.stopRequest()
    },
    onValidateMd5() {
      if (this.status === 4) {
        return
      }
      validateMd5({
        md5: this.md5,
        fileName: this.fileInfo.name,
        path: this.path,
        fileSize: this.fileInfo.size
      }).then(res => {
        if (this.status === 4) {
          return
        }
        if (res.data.isExists) {
          this.status = 2
          setTimeout(() => {
            this.progress = 100
          }, 300)
          setTimeout(() => {
            this.onSuccess()
          }, 900)
        } else {
          this.uploadId = res.data.uploadId
          this.tryUpload()
        }
      }).catch(res => {
        this.onError(res.msg)
      })
    },
    stopRequest() {
      setTimeout(() => {
        this.requestList.forEach(cancel => {
          cancel()
        })
        this.requestList = []
        if ((this.chunkedList.length - this.uploadedChunked.length) >= this.limit) {
          this.$store.commit('startUpload')
        }
      }, 800)
    },
    cancel() {
      this.status = 4
      this.stopRequest()
      this.progress = 0
      this.percentage = []
      this.sTime = null
      this.sLoaded = 0
      this.speed = 0
      setTimeout(() => {
        abortChunkedUpload({uploadId: this.uploadId})
      }, 2800)
    },
    updatePercentage(e) {
      clearTimeout(this.speedTimer)
      let loadedBytes = 0
      this.percentage.forEach(item => {
        loadedBytes += item
      })
      this.progress = (Math.min(loadedBytes, this.fileInfo.size) / this.fileInfo.size * 100).toFixed(1)
      const endTime = new Date().getTime()
      const dTime = (endTime - this.sTime) / 1000.0
      if (dTime < 1.5) {
        return
      }
      this.sTime = endTime
      const dLoaded = loadedBytes - this.sLoaded
      this.sLoaded = loadedBytes
      this.speed = dLoaded / dTime
      this.speedTimer = setTimeout(() => {
        this.speed = 0
      }, 1000)
    },
    mergeChunked() {
      merge({
        uploadId: this.uploadId,
        fileName: this.fileInfo.name,
        md5: this.md5,
        path: this.path,
        size: this.fileInfo.size
      }).then(res => {
        this.onSuccess()
        this.requestList = []
      }).catch(res => {
        this.onError(res.msg)
      })
    },
    chunkedUpload(item) {
      item.set("uploadId", this.uploadId)
      return chunkedUpload(item, this.percentage, this.updatePercentage, this.requestList)
          .then(res => {
            this.uploadedChunked.push(item.get('partNumber'))
            return Promise.resolve()
          })
          .catch(res => {
            this.onError(res.msg)
          })
    },
    async start() {
      this.sTime = new Date().getTime()
      const ret = []// 存储本文件所有的异步任务
      for (let item of this.chunkedList) {
        if (this.status !== 2) {
          break
        }
        if (this.uploadedChunked.indexOf(item.get('partNumber')) !== -1) {
          continue
        }
        const p = this.chunkedUpload(item);
        ret.push(p)
        const e = p.then(() => this.$store.commit('DeleteItem4Executing', e))
        this.$store.commit('pushExecuting', e)// 保存正在执行的异步任务
        if (this.$store.state.executing.length >= this.limit) {
          await Promise.race(this.$store.state.executing)
        }
        if (parseInt(item.get('partNumber')) === this.chunkedList.length) {
          this.$store.commit('startUpload')
        }
      }
      return Promise.all(ret)
    },
    tryUpload() {
      this.status = 1
      this.$store.commit('pushUploadQueue', {
        onUpload: this.onUpload,
        index: this.index
      })
      if (this.$store.state.executing.length < this.limit) {
        this.$store.commit('startUpload')
      }
    },
    retry() {
      this.uploadedChunked = []
      this.status = 0
      this.onValidateMd5()
    },
    setMD5(md5) {
      this.md5 = md5
    },
    fileSize(size) {
      return convertFileSize(size)
    },
  },
  props: {
    fileInfo: Object,
    index: Number
  },
  data() {
    return {
      progress: 0,
      uploadedChunked: [],
      chunkedList: [],
      md5: null,
      status: 0,//0：md5校验，1：排队中，2：传输中，3：暂停，4：取消，5：错误，6：服务端校验，7：完成
      path: '/',
      percentage: [],
      requestList: [],
      limit: 6,
      uploadId: null,
      errMsg: '',
      sTime: null,
      sLoaded: 0,
      speed: 0,
      speedTimer: null
    }
  },
  created() {
    this.path = this.$route.query.path || '/'
    createChunkedList({
      file: this.fileInfo,
      chunkedList: this.chunkedList,
      setMD5: this.setMD5,
      onValidateMd5: this.onValidateMd5
    })
  }
}
</script>

<style scoped>
.progress .now .animation {
  height: 100%;
  width: 10px;
  transform: translateX(-10px);
  background-image: linear-gradient(100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, .7), rgba(255, 255, 255, 0));
  animation-name: uploading;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes uploading {
  0% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(410px);
  }
}

.progress .now {
  overflow: hidden;
  height: 3px;
  border-radius: 10px;
  background-image: linear-gradient(90deg, #22d4ff 6%, #009dff 95%);
  transition: all .3s;
}

.status .tip {
  color: #06a7ff;
  float: right;
  margin-right: 8px;
}

.status .tip.error {
  color: #f56c6c;
}

.status .size {
  color: #878c9c;
}

.status {
  padding-top: 2px;
  padding-bottom: 10px;
  font-size: 12px;
  display: inline-block;
  width: 100%;
}

.action {
  align-items: center;
  display: flex;
  width: 130px;
}

.action svg {
  margin-top: 8px;
}

.action span {
  background: #f0faff;
  border-radius: 50%;
  display: inline-block;
  width: 28px;
  height: 28px;
  position: relative;
  color: #06a7ff;
  margin-left: 12px;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
}

.file-progress {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info .progress {
  margin: 8px 0;
  width: 100%;
  background-color: #f5f6fa;
  height: 3px;
  border-radius: 10px;
}

.info .name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 340px;
  font-size: 14px;
  color: #03081a;
  padding-top: 10px;
}

.info {
  display: flex;
}

.file-icon {
  padding: 14px 10px;
}

.file-icon img {
  margin-top: 4px;
  width: 40px;
  height: 40px;
}

.info {
  border-bottom: 1px solid #f2f6fd;
}
</style>