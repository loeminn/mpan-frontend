<template>
  <div class="tool-bar">
    <span v-show="selectList.length===0" class="btn-tool">
      <upload-button class="update-btn"/>
      <m-button-group class="btn-group">
        <m-button v-if="!isCategory" icon="xinjianwenjianjia" type="secondary" @click="createDirClick">新建文件夹</m-button>
      </m-button-group>
    </span>
    <span v-show="selectList.length!==0" class="btn-tool file-opera">
      <m-button-group class="btn-group">
        <m-button icon="fenxiang2" type="secondary" @click="openShareModal">分享</m-button>
        <m-button icon="download" type="secondary" @click="downloadClick">下载</m-button>
        <m-button icon="shanchu1" type="secondary" @click="$refs.delModal.open()">删除</m-button>
        <m-button icon="zhongmingming1" type="secondary" @click="renamedClick"
                  v-show="selectList.length===1">重命名</m-button>
        <m-button icon="fuzhi" type="secondary" @click="$refs.copyModal.open()">复制</m-button>
        <m-button icon="yidong" type="secondary" @click="$refs.moveModal.open()">移动</m-button>
        <m-button icon="qita" type="secondary" class="more">
          <span>更多</span>
          <div class="more-tool">
            <button-list class="tool-list">
              <button-list-item icon="fenxiang2" @click="openShareModal">分享</button-list-item>
              <button-list-item icon="download" @click="downloadClick">下载</button-list-item>
              <button-list-item icon="shanchu1" @click="$refs.delModal.open()">删除</button-list-item>
              <button-list-item v-show="selectList.length===1" icon="zhongmingming1"
                                @click="renamedClick">重命名</button-list-item>
              <button-list-item icon="fuzhi" @click="$refs.copyModal.open()">复制</button-list-item>
              <button-list-item icon="yidong" @click="$refs.moveModal.open()">移动</button-list-item>
            </button-list>
          </div>
        </m-button>
      </m-button-group>
    </span>
    <a ref="download_event" download="" style="display: none"/>
    <search-input class="search-inp"/>
    <modal title="确认删除" icon="info" ref="delModal">
      <template #body>
        <p class="del-tip">确定删除所选的文件吗？</p>
        <p>删除的文件可在 10天 内通过回收站还原</p>
      </template>
      <template #footer>
        <m-button type="secondary" @click="$refs.delModal.close()">取消</m-button>
        <m-button @click="delClick">删除</m-button>
      </template>
    </modal>
    <modal title="复制到" ref="copyModal">
      <template #body>
        <dir-list ref="copyDirList" empty-text="复制到此文件夹"/>
      </template>
      <template #footer>
        <m-button type="secondary" @click="$refs.copyModal.close()">取消</m-button>
        <m-button @click="copy">复制到此</m-button>
      </template>
    </modal>
    <modal title="移动到" ref="moveModal">
      <template #body>
        <dir-list ref="moveDirList" empty-text="移动到此文件夹"/>
      </template>
      <template #footer>
        <m-button type="secondary" @click="$refs.moveModal.close()">取消</m-button>
        <m-button @click="move">移动到此</m-button>
      </template>
    </modal>
    <modal title="分享文件" ref="shareModal">
      <template #body>
        <share-modal-body
            ref="shareBody"
            @closeShareModal="closeShareModal"
            @createShare="createShareClick"
        />
      </template>
      <template #footer>
        <div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import MButton from "@/components/common/MButton";
import MButtonGroup from "@/components/common/MButtonGroup";
import SearchInput from "@/components/fileList/SearchInput";
import UploadButton from "@/components/fileList/fileListToolbar/button/UploadButton";
import {copyFile, delFile, downloadFile, moveFile} from "@/api/file";
import ButtonList from "@/components/common/ButtonList";
import ButtonListItem from "@/components/common/ButtonListItem";
import Modal from "@/components/modal/Modal";
import DirList from "@/components/fileList/fileListToolbar/DirList";
import ShareModalBody from "@/views/share/childComps/ShareModalBody";
import {createShare} from "@/api/share";

export default {
  name: "FileListToolBar",
  components: {
    ShareModalBody,
    DirList, Modal, ButtonListItem, ButtonList, UploadButton, SearchInput, MButton, MButtonGroup
  },
  props: {
    selectList: {
      type: Array,
      default: []
    },
    fileList: {
      type: Array,
      default: []
    },
    isCategory: {
      type: String
    }
  },
  methods: {
    createShareClick() {
      this.$refs.shareBody.$refs.shareFrom.validate(valid => {
        if (valid) {
          this.$refs.shareBody.createShareBtnLoading = true
          let shareInfo = this.$refs.shareBody.shareInfo;
          shareInfo.ufIdList = this.selectList
          createShare(shareInfo)
              .then(res => {
                this.$refs.shareBody.success(res.data);
              })
              .catch()
              .finally(() => {
                this.$refs.shareBody.createShareBtnLoading = false
              })
        }
      })
    },
    copy() {
      const path = this.$refs.copyDirList.path
      this.$refs.copyModal.close()
      this.$emit('loading', true)
      copyFile(path, this.selectList).then(() => {
        this.$message.success('文件复制成功', 1500)
        this.$bus.emit('refreshQuota')
        this.$bus.emit('loadFileList')
      }).catch(res => {
        this.$emit('loading', false)
        this.$message.error(res.msg, 1500)
      })
    },
    move() {
      const path = this.$refs.moveDirList.path
      const toPath = this.$route.query.path || '/'
      this.$refs.moveModal.close()
      if (path === toPath && !this.$route.params.categoryCode) {
        return
      }
      this.$emit('loading', true)
      moveFile(path, this.selectList).then(() => {
        this.$message.success('文件移动成功', 1500)
        this.$bus.emit('loadFileList')
      }).catch(res => {
        this.$emit('loading', false)
        this.$message.error(res.msg, 1500)
      })
    },
    closeShareModal() {
      this.$refs.shareModal.close()
    },
    openShareModal() {
      this.$refs.shareModal.open()
      let shareName = this.fileList.find(item => item.id === this.selectList[0]).fileName
      if (shareName.length > 27) {
        shareName = shareName.substring(0, 26) + '…'
      }
      if (this.selectList.length > 1) {
        shareName += '等多个文件'
      }
      this.$refs.shareBody.shareInfo.name = shareName
    },

    delClick() {
      this.$refs.delModal.close()
      this.$message.loading('文件删除中', 'del')
      this.$emit('loading', true)
      delFile(this.selectList)
          .then(() => {
            this.$message.success('删除文件成功', 1500, 'del')
            this.$bus.emit('refreshQuota')
            this.$bus.emit('loadFileList')
          })
          .catch(res => {
            this.$emit('loading', false)
            this.$message.error(res.msg, 3000, 'del')
          })
    },
    createDirClick() {
      this.$bus.emit('toggleCreateDirItem', true)
    },
    downloadClick() {
      if (this.selectList.length > 10) {
        this.$message.warning('一次下载请求最多包含10个文件')
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
      downloadFile(this.selectList)
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
    renamedClick() {
      this.$bus.emit('openRenamed', this.selectList[0])
    }
  }
}
</script>

<style>
@media (max-width: 640px) {
  .tool-bar .file-opera .btn-group .more:after {
    height: 0;
    width: 0;
  }

  .tool-bar .file-opera .btn-group .more {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
}

@media (min-width: 641px) {
  .tool-bar .file-opera .btn-group .m-button:not(.more):nth-child(-n+1) {
    display: inline-block;
  }

  .tool-bar .file-opera .tool-list .btn-list-item:nth-child(-n+1) {
    display: none;
  }
}

@media (min-width: 740px) {
  .tool-bar .file-opera .btn-group .m-button:not(.more):nth-child(-n+2) {
    display: inline-block;
  }

  .tool-bar .file-opera .tool-list .btn-list-item:nth-child(-n+2) {
    display: none;
  }
}

@media (min-width: 820px) {
  .tool-bar .file-opera .btn-group .m-button:not(.more):nth-child(-n+3) {
    display: inline-block;
  }

  .tool-bar .file-opera .tool-list .btn-list-item:nth-child(-n+3) {
    display: none;
  }
}

@media (min-width: 920px) {
  .tool-bar .file-opera .btn-group .m-button:not(.more):nth-child(-n+4) {
    display: inline-block;
  }

  .tool-bar .file-opera .tool-list .btn-list-item:nth-child(-n+4) {
    display: none;
  }
}

@media (min-width: 1020px) {
  .tool-bar .file-opera .btn-group .m-button:not(.more):nth-child(-n+6) {
    display: inline-block;
  }

  .tool-bar .file-opera .tool-list .btn-list-item:nth-child(-n+6) {
    display: none;
  }
}

@media (max-width: 1019px) {
  .tool-bar .file-opera .btn-group .more {
    display: inline-block !important;
  }
}

.tool-bar .file-opera .btn-group .m-button:nth-last-child(2) {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

</style>

<style scoped>
.del-tip {
  margin-bottom: 2px;
}

.tool-bar .file-opera .btn-group .more {
  position: relative;
}

.tool-bar .file-opera .btn-group .more .more-tool {
  display: none;
  position: absolute;
  left: -14px;
  right: -14px;
  top: 36px;
  z-index: 100;
  padding-top: 4px;
}

.tool-bar .file-opera .btn-group .more .tool-list {
  width: 100%;
}

.tool-bar .file-opera .btn-group .more:hover .more-tool {
  display: block;
}

.file-opera .btn-group .m-button {
  display: none;
}

.btn-tool {
  display: flex;
}

.update-btn {
  margin-right: 8px;
}

.tool-bar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.btn-group {
  margin-right: 8px;
}

.search-inp {
  margin-left: auto;
}
</style>