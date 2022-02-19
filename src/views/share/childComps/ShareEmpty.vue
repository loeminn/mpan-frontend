<template>
  <div class="share-empty">
    <img :src="emptyIcon">
    <span class="title">你的分享记录为空噢～</span>
    <span class="desc">
      分享过期超过 1月 以上的链接记录将被自动清理
    </span>
  </div>
</template>

<script>
import {iconType} from "@/utils/FileIcon";

export default {
  name: "ShareEmpty",
  computed:{
    emptyIcon(){
      return iconType.dirEmpty
    }
  }
}
</script>

<style scoped>
.share-empty .desc {
  margin-top: 12px;
  font-size: 14px;
  color: #636d7e;
  line-height: 18px;
}

.share-empty .title {
  margin-top: 32px;
  font-size: 16px;
  font-weight: 700;
  color: #03081a;
  line-height: 18px;
}

.share-empty img {
  width: 70px;
}

.share-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 78px);
  width: 100%;
}
</style>