<template>
  <tr @click="selectThis()"
      class="share-item"
      :class="{selected:selectList.indexOf(shareInfo.id)!==-1}">
    <td class="is-select">
      <m-checkbox :value="shareInfo.id" v-model="selectList" @update:modelValue="changeSelectList"/>
    </td>
    <td>
      <span class="list-name">
        <img :src="fileIcon"/>
        <span class="text" :title="shareInfo.name">
          {{ shareInfo.name }}
        </span>
      </span>
    </td>
    <td>
      <span class="share-create-time">{{ createTime }}</span>
      <span class="share-code">
        <span v-if="shareInfo.isPublic===0">提取码: {{ shareInfo.accessCode }}</span>
        <span v-else>公开分享</span>
      </span>
    </td>
    <td>
      <span v-if="!shareInfo.expiryTime">永久有效</span>
      <span v-else-if="expiryTime">{{ expiryTime }}后失效</span>
      <span v-else-if="isExpire" class="expiring-soon">已失效</span>
      <span class="expiring-soon" v-else>即将失效</span>
    </td>
    <td>{{ shareInfo.saveCount }}次</td>
  </tr>
</template>

<script>
import {differenceTime, standardTime} from "@/utils/TimeFormat";
import {convertFileSize} from "@/utils/FileSize";
import MCheckbox from "@/components/common/MCheckbox";
import {iconType} from "@/utils/FileIcon";

export default {
  name: "ShareFileListItem",
  components: {MCheckbox},
  props: {
    shareInfo: Object,
    selectList: Array
  },
  computed: {
    fileIcon() {
      return iconType.shareIcon
    },
    createTime() {
      return standardTime(this.shareInfo.createTime)
    },
    expiryTime() {
      return differenceTime(this.shareInfo.expiryTime)
    },
    isExpire() {
      return new Date().getTime() > new Date(this.shareInfo.expiryTime).getTime()
    }
  },
  methods: {
    selectThis() {
      const sl = this.selectList
      if (sl.includes(this.shareInfo.id)) {
        sl.splice(sl.indexOf(this.shareInfo.id), 1)
      } else {
        sl.push(this.shareInfo.id)
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
.share-item .list-name .text {
  cursor: default;
  color: #05082c;
}

.share-code {
  display: none;
  color: #46a7ff;
  user-select: text;
}

.share-item:hover .share-code {
  display: inline;
}

.share-item:hover .share-create-time {
  display: none;
}
</style>