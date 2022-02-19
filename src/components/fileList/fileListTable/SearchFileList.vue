<template>
  <div class="file-list-table">
    <div class="header">
      <table>
        <colgroup>
          <col style="width: 6%;min-width: 40px">
          <col style="width: 37%">
          <col style="width: 20%">
          <col style="width: 20%">
          <col style="width: 17%">
        </colgroup>
        <thead>
        <tr>
          <th class="is-select">
            <m-checkbox v-model="allChecked" @clickInput="selectAll"/>
          </th>
          <th>
            <span v-if="selectList.length===0">文件名</span>
            <span v-else>已选中{{ selectList.length }}个文件/文件夹</span>
          </th>
          <th>
            <span>上传时间</span>
          </th>
          <th>
            <span>大小</span>
          </th>
          <th>
            <span>所在目录</span>
          </th>
        </tr>
        </thead>
      </table>
    </div>
    <div class="body" ref="fileBody" @scroll="bottomLoading">
      <table>
        <colgroup>
          <col style="width: 6%;min-width: 40px">
          <col style="width: 37%">
          <col style="width: 20%">
          <col style="width: 20%">
          <col style="width: 17%">
        </colgroup>
        <tbody>
        <search-file-item
            v-for="item in fileList"
            :file-info="item"
            v-model:selectList="selectList"
            @update:selectList="changeSelectList"
        />
        </tbody>
      </table>
      <loading-new-data v-if="bottomLoadingStatus"/>
    </div>
  </div>
</template>

<script>
import LoadingNewData from "@/components/fileList/fileListTable/LoadingNewData";
import FileListBodyItem from "@/components/fileList/fileListTable/FileListBodyItem";
import MCheckbox from "@/components/common/MCheckbox";
import SearchFileItem from "@/components/fileList/fileListTable/SearchFileItem";

export default {
  name: "SearchFileList",
  components: {SearchFileItem, MCheckbox, FileListBodyItem, LoadingNewData},
  methods: {
    changeSelectList(value) {
      this.$emit('update:selectList', value)
      this.allChecked = this.selectList.length === this.fileList.length
    },
    selectAll(value) {
      if (value) {
        const allList = this.fileList.map(item => item.id);
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
    fileList: {
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