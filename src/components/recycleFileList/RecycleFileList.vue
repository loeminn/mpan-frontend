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
            <span v-if="selectList.length===0">文件名</span>
            <span v-else>已选中{{ selectList.length }}个文件/文件夹</span>
          </th>
          <th>
            <span>大小</span>
          </th>
          <th>
            <span>删除时间</span>
          </th>
          <th>
            <span>有效时间</span>
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
        <recycle-file-list-item v-for="item in fileList"
                                :file-info="item"
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
import RecycleFileListItem from "@/components/recycleFileList/RecycleFileListItem";
import LoadingNewData from "@/components/fileList/fileListTable/LoadingNewData";

export default {
  name: "RecycleFileList",
  components: {LoadingNewData, RecycleFileListItem, MCheckbox},
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

<style>
</style>