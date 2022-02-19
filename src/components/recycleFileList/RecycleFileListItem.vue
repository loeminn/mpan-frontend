<template>
  <tr @click="selectThis()"
      class="recycle-item"
      :class="{selected:selectList.indexOf(fileInfo.id)!==-1}">
    <td class="is-select">
      <m-checkbox :value="fileInfo.id" v-model="selectList" @update:modelValue="changeSelectList"/>
    </td>
    <td>
      <span class="list-name">
        <img :src="fileIcon"/>
        <span class="text" :title="fileInfo.fileName">
          {{ fileInfo.fileName }}
        </span>
      </span>
    </td>
    <td>
      <span v-if="fileInfo.isDir===1">-</span>
      <span v-else>{{ fileSize(fileInfo.size) }}</span>
    </td>
    <td>{{ deleteTime }}</td>
    <td>
      <span v-if="expiryTime">{{ expiryTime }}</span>
      <span class="expiring-soon" v-else>即将过期</span>
    </td>
  </tr>
</template>

<script>
import MCheckbox from "@/components/common/MCheckbox";
import {convertFileSize} from "@/utils/FileSize";
import {getIconUrl} from "@/utils/FileIcon";
import {differenceTime, standardTime} from "@/utils/TimeFormat";

export default {
  name: "RecycleFileListItem",
  components: {MCheckbox},
  props: {
    fileInfo: Object,
    selectList: Array
  },
  computed: {
    fileIcon() {
      return getIconUrl(this.fileInfo)
    },
    deleteTime() {
      return standardTime(this.fileInfo.deleteTime)
    },
    expiryTime() {
      return differenceTime(this.fileInfo.expiryTime)
    }
  },
  methods: {
    selectThis() {
      const sl = this.selectList
      if (sl.includes(this.fileInfo.id)) {
        sl.splice(sl.indexOf(this.fileInfo.id), 1)
      } else {
        sl.push(this.fileInfo.id)
      }
      this.$emit('update:selectList', sl)
    },
    fileSize(size) {
      return convertFileSize(size)
    },
    changeSelectList(value) {
      this.$emit('update:selectList', value)
    }
  }
}
</script>

<style scoped>
.recycle-item .list-name .text {
  cursor: default;
  color: #05082c;
}
</style>