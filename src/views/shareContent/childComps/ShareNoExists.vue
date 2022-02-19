<template>
  <div class="share-no-exists">
    <div class="img-box">
      <img src="https://lm-icon.oss-cn-shenzhen.aliyuncs.com/mpan/file-icon/link-invalid.png">
    </div>
    <div class="tip">
      <div class="text">
        分享链接不存在或已过期
      </div>
      <div>
        <div class="action" @click="$router.back()">回到上一页</div>
        <div class="action" @click="$router.push('/')">回到首页</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShareNoExists"
}
</script>

<style scoped>
.share-no-exists .action:hover {
  color: #268bc4;
}

.share-no-exists .action {
  font-size: 12px;
  color: #35b3ff;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 4px;
  transition: all .2s;
  width: fit-content;
}

.share-no-exists .tip {
  margin-top: 34px;
}

.share-no-exists .text {
  font-size: 20px;
  font-weight: 700;
  color: #5c5c5c;
  margin-bottom: 24px;
}

.share-no-exists .img-box {
  height: 178px;
  width: 178px;
  margin-right: 26px;
}

.share-no-exists img {
  width: 100%;
}

.share-no-exists {
  display: flex;
  height: 100%;
  justify-content: center;
  padding-top: 160px;
}
</style>