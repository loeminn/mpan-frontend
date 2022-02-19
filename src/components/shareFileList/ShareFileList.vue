<template>
  <div class="file-list-table">
    <div class="header">
      <table>
        <colgroup>
          <col style="width: 3%;min-width: 40px">
          <col style="width: 50%">
          <col style="width: 15%">
          <col style="width: 15%">
          <col style="width: 15%">
        </colgroup>
        <thead>
        <tr>
          <th class="is-select">
            <m-checkbox v-model="allChecked" @clickInput="selectAll"/>
          </th>
          <th>
            <span v-if="selectList.length===0">分享文件</span>
            <span v-else>已选中{{ selectList.length }}条分享记录</span>
          </th>
          <th>
            <span>分享时间</span>
          </th>
          <th>
            <span>状态</span>
          </th>
          <th>
            <span>保存次数</span>
          </th>
        </tr>
        </thead>
      </table>
    </div>
    <div class="body" ref="fileBody" @scroll="bottomLoading">
      <table>
        <colgroup>
          <col style="width: 3%;min-width: 40px">
          <col style="width: 50%">
          <col style="width: 15%">
          <col style="width: 15%">
          <col style="width: 15%">
        </colgroup>
        <tbody>
        <share-file-list-item v-for="item in shareList"
                              :share-info="item"
                              v-model:selectList="selectList"
                              @update:selectList="changeSelectList"/>
        </tbody>
      </table>
      <loading-new-data v-if="bottomLoadingStatus"/>
    </div>
  </div>
</template>

<script>
import MCheckbox from "@/components/common/MCheckbox";
import ShareFileListItem from "@/components/shareFileList/ShareFileListItem";
import LoadingNewData from "@/components/fileList/fileListTable/LoadingNewData";

export default {
  name: "ShareFileList",
  components: {LoadingNewData, ShareFileListItem, MCheckbox},
  methods: {
    changeSelectList(value) {
      this.$emit('update:selectList', value)
      this.allChecked = this.shareList.length === this.selectList.length
    },
    selectAll(value) {
      if (value) {
        const allList = this.shareList.map(item => item.id);
        this.$emit('update:selectList', allList)
      } else {
        this.$emit('update:selectList', [])
      }
    },
    bottomLoading() {
      const scrollTop = this.$refs.fileBody.scrollTop
      const clientHeight = this.$refs.fileBody.clientHeight
      const scrollHeight = this.$refs.fileBody.scrollHeight
      if ((scrollTop + clientHeight) > scrollHeight - 200) {
        this.$emit('bottomLoading')
      }
    }
  },
  props: {
    shareList: {
      type: Array
    },
    selectList: Array,
    bottomLoadingStatus: Boolean
  },
  data() {
    return {
      allChecked: false
    }
  }
}
</script>

<style scoped>
</style>