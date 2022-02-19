<template>
  <div class="share-content-home">
    <div class="main">
      <share-content-header :shareInfo="shareInfo" @save="openSaveModal" @download="getDownloadUrl"/>
      <file-list-main :root-path="$route.path" title="全部文件" :file-length="fileList.length"/>
      <loading-mask v-if="isLoading"/>
      <file-list-empty :has-upload="false" v-else-if="fileList.length===0"/>
      <file-list-table v-else :file-list="fileList" v-model:selectList="selectList"/>
      <modal title="保存到" ref="saveModal">
        <template #body>
          <dir-list ref="saveDirList" empty-text="保存到此文件夹"/>
        </template>
        <template #footer>
          <m-button type="secondary" @click="$refs.saveModal.close()">取消</m-button>
          <m-button @click="save">保存到此</m-button>
        </template>
      </modal>
    </div>
  </div>
</template>

<script>
import ShareContentHeader from "@/views/shareContent/childComps/ShareContentHeader";
import FileListMain from "@/components/fileList/FileListMain";
import FileListTable from "@/components/fileList/fileListTable/FileListTable";
import {getShareFileDownloadUrl, getShareFileList, saveShareFile} from "@/api/share";
import LoadingMask from "@/components/loadingMask/LoadingMask";
import Modal from "@/components/modal/Modal";
import DirList from "@/components/fileList/fileListToolbar/DirList";
import MButton from "@/components/common/MButton";
import FileListEmpty from "@/components/fileList/FileListEmpty";

export default {
  name: "ShareContentHome",
  components: {FileListEmpty, MButton, DirList, Modal, LoadingMask, FileListTable, FileListMain, ShareContentHeader},
  props: {
    shareInfo: Object
  },
  data() {
    return {
      fileList: [],
      selectList: [],
      isLoading: true
    }
  },
  methods: {
    loadFileList() {
      this.isLoading = true
      this.fileList = []
      this.selectList = []
      getShareFileList(this.$route.query.path || '/').then(res => {
        this.fileList = res.data
        this.isLoading = false
      })
    },
    save() {
      this.$refs.saveModal.close()
      this.$message.loading('文件保存中', 'save')
      saveShareFile(this.selectList, this.$refs.saveDirList.path)
          .then(() => {
            this.$message.success('文件保存成功', 1500, 'save')
          })
          .catch(res => {
            this.$message.error(res.msg, 1500, 'save')
          })
    },
    openSaveModal() {
      if (this.selectList.length === 0) {
        this.$message.info('请先选择文件')
        return
      }
      const token = localStorage.getItem('authorization')
      if (!token) {
        this.$modal.confirm({
          title: '提示',
          content: '未登录，请先登录',
          icon: 'info',
          okText: '去登陆',
          closeIcon: true,
          lossFocusClose: true,
          onOk() {
            location.href = '/auth'
          }
        })
        return
      }
      this.$refs.saveModal.open()
    },
    getDownloadUrl() {
      if (this.selectList.length === 0) {
        this.$message.info('请先选择文件')
        return
      }
      for (let s of this.selectList) {
        const item = this.fileList.find(f => {
          return f.id === s
        })
        if (item.isDir === 1) {
          this.$message.warning('暂不支持文件夹下载')
          return
        }
      }
      if (this.selectList.length > 10) {
        this.$message.info('一次下载请求最多包含10个文件')
        return
      }
      getShareFileDownloadUrl(this.selectList)
          .then(res => {
            res.data.forEach(item => {
              this.download(item)
            })
          })
          .catch(res => {
            this.$message.error(res.msg)
          })
    },
    download(url) {
      const frame = document.createElement('iframe')
      frame.setAttribute('style', 'display: none')
      frame.setAttribute('src', url)
      document.body.appendChild(frame)
      setTimeout(() => {
        frame.remove()
      }, 1000)
    },
  },
  watch: {
    '$route': {
      handler() {
        if (!this.$route.path.startsWith('/s/')) {
          return
        }
        this.loadFileList()
      }
    }
  },
  mounted() {
    this.loadFileList()
  }
}
</script>

<style scoped>
.share-content-home .main {
  width: calc(100% - 20px);
  height: calc(100% - 34px);
  margin: 10px 30px;
  background-color: #fff;
  border-radius: 6px;
}

.share-content-home {
  background-color: #f7f7f7;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 18px;
  position: relative;
  overflow: hidden;
}

.file-list-table {
  margin-left: -4px;
  margin-right: -14px;
  height: calc(100% - 116px);
}
</style>