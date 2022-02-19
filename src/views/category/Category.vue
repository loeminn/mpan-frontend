<template>
  <div class="file-list">
    <file-list-tool-bar is-category="true" :select-list="selectList" :file-list="fileList" @loading="loadingStatus"/>
    <file-list-main :title="'全部'+mainTitle" :file-length="fileList.length" :total="total"/>
    <file-list-table ref="fileList" v-show="fileList.length!==0" :file-list="fileList"
                     v-model:selectList="selectList" :bottom-loading-status="bottomLoadingStatus"
                     @bottomLoading="bottomLoading"/>
    <file-list-empty v-show="fileList.length===0&&!isLoading"/>
    <loading-mask v-show="isLoading"/>
  </div>
</template>

<script>
import FileListMain from "@/components/fileList/FileListMain";
import FileListToolBar from "@/components/fileList/fileListToolbar/FileListToolBar";
import FileListTable from "@/components/fileList/fileListTable/FileListTable";
import FileListEmpty from "@/components/fileList/FileListEmpty";
import LoadingMask from "@/components/loadingMask/LoadingMask";
import {getCategoryFileList} from "@/api/file";

export default {
  name: "Category",
  components: {LoadingMask, FileListEmpty, FileListTable, FileListToolBar, FileListMain},
  data() {
    return {
      fileList: [],
      selectList: [],
      isLoading: true,
      refresh: null,
      bottomLoadingStatus: false,
      pageNum: 1,
      total: 0
    }
  },
  computed: {
    mainTitle() {
      const categoryCode = this.$route.params.categoryCode;
      switch (categoryCode) {
        case '1':
          return '图片'
        case '2':
          return '视频'
        case '3':
          return '文档'
        case '4':
          return '音频'
        case '5':
          return '压缩包'
        case '0':
          return '其他'
        default:
          return ''
      }
    }
  },
  methods: {
    loadFileList() {
      this.newDir = false
      this.isLoading = true
      this.fileList = []
      this.selectList = []
      this.$bus.emit('toggleCreateDirItem', false)
      getCategoryFileList(this.$route.params.categoryCode, 1)
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
          getCategoryFileList(this.$route.params.categoryCode, ++this.pageNum)
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
        if (!this.$route.params.categoryCode) {
          return
        }
        this.$refs.fileList.allChecked = false
        this.$refs.fileList.$refs.fileBody.scrollTo(0, 0)
        this.loadFileList()

      }
    }
  },
  mounted() {
    this.loadFileList()
    this.$bus.on('loadFileList', () => {
      this.loadFileList()
    })
    this.$bus.on('refreshFileList', () => {
      clearTimeout(this.refresh)
      this.refresh = setTimeout(() => {
        this.loadFileList()
      }, 2000)
    })
  },
  beforeUnmount() {
    this.$bus.all.delete('loadFileList')
    this.$bus.all.delete('refreshFileList')
  }
}
</script>

<style scoped>

</style>