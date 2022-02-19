<template>
  <div class="file-list">
    <file-list-tool-bar :select-list="selectList" :file-list="fileList"
                        @loading="loadingStatus"/>
    <file-list-main title="全部文件" root-path="/" :file-length="fileList.length" :total="total" :is-search="isSearch"/>
    <loading-mask v-if="isLoading"/>
    <file-list-empty v-else-if="fileList.length===0&&!newDir"/>
    <div v-else-if="isSearch" style="height: calc(100% - 78px);">
      <search-file-list :file-list="fileList"
                        v-model:selectList="selectList" @bottomLoading="searchBottomLoading"
                        :bottomLoadingStatus="bottomLoadingStatus"
                        style="height: 100%"/>
    </div>
    <div v-else style="height: calc(100% - 78px);">
      <file-list-table ref="fileList" :file-list="fileList" :create-dir="newDir"
                       v-model:selectList="selectList" @bottomLoading="bottomLoading"
                       :bottomLoadingStatus="bottomLoadingStatus" style="height: 100%"/>
    </div>
  </div>
</template>

<script>
import FileListToolBar from "@/components/fileList/fileListToolbar/FileListToolBar";
import FileListMain from "@/components/fileList/FileListMain";
import FileListTable from "@/components/fileList/fileListTable/FileListTable";
import {getFileList, searchFile} from "@/api/file";
import LoadingMask from "@/components/loadingMask/LoadingMask";
import FileListEmpty from "@/components/fileList/FileListEmpty";
import MButton from "@/components/common/MButton";
import ShareFileList from "@/components/shareFileList/ShareFileList";
import SearchFileList from "@/components/fileList/fileListTable/SearchFileList";

export default {
  name: "AllFile",
  components: {
    SearchFileList,
    ShareFileList, MButton, FileListEmpty, LoadingMask, FileListTable, FileListMain, FileListToolBar
  },
  data() {
    return {
      fileList: [],
      selectList: [],
      isLoading: true,
      refresh: null,
      newDir: false,
      bottomLoadingStatus: false,
      pageNum: 1,
      total: 0,
      isSearch: false
    }
  },
  methods: {
    loadFileList() {
      this.newDir = false
      this.isLoading = true
      this.fileList = []
      this.selectList = []
      this.$bus.emit('toggleCreateDirItem', false)
      getFileList(this.$route.query.path || '/', 1)
          .then(res => {
            this.pageNum = res.data.current
            this.fileList = res.data.records
            this.total = res.data.total
            this.isLoading = false
          })
    },
    loadSearchFile() {
      this.newDir = false
      this.isLoading = true
      this.fileList = []
      this.selectList = []
      this.$bus.emit('toggleCreateDirItem', false)
      searchFile(this.$route.query.search, 1)
          .then(res => {
            this.pageNum = res.data.current
            this.fileList = res.data.records
            this.total = res.data.total
            this.isLoading = false
          })
    },
    loadingStatus(flag) {
      this.isLoading = flag
    },
    bottomLoading() {
      if (this.fileList.length < this.total)
        if (!this.bottomLoadingStatus) {
          this.bottomLoadingStatus = true
          getFileList(this.$route.query.path || '/', ++this.pageNum)
              .then(res => {
                this.pageNum = res.data.current
                this.fileList.push(...res.data.records)
                this.total = res.data.total
                this.bottomLoadingStatus = false
              })
        }
    },
    searchBottomLoading() {
      if (this.fileList.length < this.total)
        if (!this.bottomLoadingStatus) {
          this.bottomLoadingStatus = true
          searchFile(this.$route.query.search, ++this.pageNum)
              .then(res => {
                this.pageNum = res.data.current
                this.fileList.push(...res.data.records)
                this.total = res.data.total
                this.bottomLoadingStatus = false
              })
        }
    }
  },
  watch: {
    '$route': {
      handler() {
        if (this.$route.path !== '/') {
          return
        }
        if (this.$route.query.search) {
          this.isSearch = true
          this.loadSearchFile()
        } else {
          this.isSearch = false
          this.loadFileList()
        }
      }
    }
  },
  created() {
    if (this.$route.query.search) {
      this.isSearch = true
    }
  },
  mounted() {
    if (this.isSearch) {
      this.loadSearchFile()
    } else {
      this.loadFileList()
    }
    if (this.$route.query.search) {
      this.isSearch = true
    } else {
      this.loadFileList()
    }
    this.$bus.on('loadFileList', () => {
      this.loadFileList()
    })
    this.$bus.on('refreshFileList', path => {
      clearTimeout(this.refresh)
      this.refresh = setTimeout(() => {
        if (!this.isSearch && path === (this.$route.query.path || '/')) {
          this.loadFileList()
        }
      }, 1500)
    })
    this.$bus.on('toggleCreateDirItem', flag => {
      this.newDir = flag
      if (flag) {
        setTimeout(() => {
        this.$refs.fileList.$refs.fileBody.scrollTo(0, 0)
        },100)
      }
    })
  },
  beforeUnmount() {
    this.$bus.all.delete('loadFileList')
    this.$bus.all.delete('refreshFileList')
    this.$bus.all.delete('toggleCreateDirItem')
  }
}
</script>

<style>
</style>