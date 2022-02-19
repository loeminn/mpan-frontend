<template>
  <div class="recycle-empty">
    <img :src="emptyIcon">
    <span class="title">你的回收站为空噢～</span>
    <span class="desc">
      回收站为你保存 10天 内删除的文件
    </span>
  </div>
</template>

<script>
import {iconType} from "@/utils/FileIcon";

export default {
  name: "RecycleEmpty",
  computed: {
    emptyIcon() {
      return iconType.picEmpty
    }
  }
}
</script>

<style scoped>
.recycle-empty .desc {
  margin-top: 12px;
  font-size: 14px;
  color: #636d7e;
  line-height: 18px;
}

.recycle-empty .title {
  margin-top: 32px;
  font-size: 16px;
  font-weight: 700;
  color: #03081a;
  line-height: 18px;
}

.recycle-empty img {
  width: 80px;
}

.recycle-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 78px);
  width: 100%;
}
</style>