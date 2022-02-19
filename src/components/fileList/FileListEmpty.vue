<template>
  <div class="file-list-empty">
    <img :src="dirEmptyIcon">
    <span class="title">空空如也</span>
    <span class="desc" v-if="hasUpload">
      点击“<span class="up-btn" @click="upload">上传</span>”按钮
    </span>
  </div>
</template>

<script>
import {iconType} from "@/utils/FileIcon";

export default {
  name: "FileListEmpty",
  props: {
    hasUpload: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    dirEmptyIcon() {
      return iconType.dirEmpty
    }
  },
  methods: {
    upload() {
      this.$bus.emit('uploadBtnClick')
    }
  }
}
</script>

<style scoped>
.file-list-empty .desc .up-btn {
  color: #06a7ff;
  cursor: pointer;
}

.file-list-empty img {
  width: 110px;
  padding: 20px;
}

.file-list-empty .desc {
  margin-top: 12px;
  font-size: 14px;
  color: #afb3bf;
  line-height: 18px;
}

.file-list-empty .title {
  margin-top: 12px;
  font-size: 16px;
  color: #03081a;
  line-height: 18px;
}

.file-list-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 108px;
  height: calc(100% - 78px);
  width: 100%;
}
</style>