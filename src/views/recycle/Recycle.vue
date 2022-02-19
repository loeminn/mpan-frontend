<template>
  <div class="file-list">
    <recycle-main v-if="fileList.length!==0" :select-list="selectList" @loading="loadingStatus"
                  @loadFileList="loadFileList"/>
    <file-list-main v-if="fileList.length!==0" title="回收站" :file-length="fileList.length" :total="total"/>
    <recycle-file-list v-if="fileList.length!==0&&!isLoading" :file-list="fileList" v-model:selectList="selectList"
                       :bottom-loading-status="bottomLoadingStatus"
                       @bottomLoading="bottomLoading"/>
    <loading-mask v-if="isLoading"/>
    <recycle-empty v-if="fileList.length===0&&!isLoading"/>
  </div>
</template>

<script>
import RecycleMain from "@/views/recycle/childComps/RecycleMain";
import FileListMain from "@/components/fileList/FileListMain";
import RecycleFileList from "@/components/recycleFileList/RecycleFileList";
import LoadingMask from "@/components/loadingMask/LoadingMask";
import {getRecycleFileList} from "@/api/recycle";
import RecycleEmpty from "@/views/recycle/childComps/RecycleEmpty";
import {getCategoryFileList} from "@/api/file";

export default {
  name: "Recycle",
  components: {RecycleEmpty, LoadingMask, RecycleFileList, FileListMain, RecycleMain},
  data() {
    return {
      fileList: [],
      selectList: [],
      isLoading: true,
      bottomLoadingStatus: false,
      pageNum: 1,
      total: 0
    }
  },
  methods: {
    loadingStatus(flag) {
      this.isLoading = flag
    },
    loadFileList() {
      this.isLoading = true
      this.fileList = []
      this.selectList = []
      getRecycleFileList(1)
          .then(res => {
            this.pageNum = res.data.current
            this.fileList = res.data.records
            this.total = res.data.total
            this.isLoading = false
          })
    },
    bottomLoading() {
      if (this.fileList.length < this.total)
        if (!this.bottomLoadingStatus) {
          this.bottomLoadingStatus = true
          getRecycleFileList(++this.pageNum)
              .then(res => {
                this.pageNum = res.data.current
                this.fileList.push(...res.data.records)
                this.total = res.data.total
                this.bottomLoadingStatus = false
              })
        }
    }
  },
  mounted() {
    this.loadFileList()
  }
}
</script>

<style scoped>
</style>