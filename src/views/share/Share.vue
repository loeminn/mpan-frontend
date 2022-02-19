<template>
  <div class="file-list">
    <share-main v-if="shareList.length!==0" :select-list="selectList" :share-list="shareList" @loading="loadingStatus"
                @loadFileList="loadFileList"/>
    <file-list-main v-if="shareList.length!==0" title="分享记录" :file-length="shareList.length" :total="total"/>
    <share-file-list ref="fileList" v-if="shareList.length!==0&&!isLoading" :share-list="shareList"
                     v-model:selectList="selectList" :bottom-loading-status="bottomLoadingStatus"
                     @bottomLoading="bottomLoading"/>
    <loading-mask v-if="isLoading"/>
    <share-empty v-if="shareList.length===0&&!isLoading"/>
  </div>
</template>

<script>
import ShareMain from "@/views/share/childComps/ShareMain";
import FileListMain from "@/components/fileList/FileListMain";
import ShareFileList from "@/components/shareFileList/ShareFileList";
import LoadingMask from "@/components/loadingMask/LoadingMask";
import {getShareList} from "@/api/share";
import ShareEmpty from "@/views/share/childComps/ShareEmpty";
import {getRecycleFileList} from "@/api/recycle";

export default {
  name: "Share",
  components: {ShareEmpty, LoadingMask, ShareFileList, FileListMain, ShareMain},
  data() {
    return {
      shareList: [],
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
      this.shareList = []
      this.selectList = []
      getShareList(1)
          .then(res => {
            this.pageNum = res.data.current
            this.shareList = res.data.records
            this.total = res.data.total
            this.isLoading = false
          })
    },
    bottomLoading() {
      if (this.shareList.length < this.total)
        if (!this.bottomLoadingStatus) {
          this.bottomLoadingStatus = true
          getRecycleFileList(++this.pageNum)
              .then(res => {
                this.pageNum = res.data.current
                this.shareList.push(...res.data.records)
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