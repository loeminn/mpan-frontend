<template>
  <div class="share-content-header">
    <div class="share-info">
      <div class="main">
        <div class="name-info">
          <img :src="shareIcon">
          <div class="name-text">{{ shareInfo.name }}</div>
        </div>
        <div class="action">
          <m-button icon="wenjian_zhuancun" type="secondary" @click="saveClick">保存到网盘</m-button>
          <m-button icon="download" type="secondary" @click="downloadClick">下载</m-button>
        </div>
      </div>
      <div class="other-info">
        <div class="item">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shizhong"></use>
            </svg>
          </span>
          {{ createTime }}
        </div>
        <div class="item">
          <span>过期时间：</span>
          <span v-if="!shareInfo.expiryTime">永久有效</span>
          <span v-else-if="expiryTime">{{ expiryTime }}后</span>
          <span class="expiring-soon" v-else>即将失效</span>
        </div>
        <div class="user-info item">
          <img :src="userAvatar">
          <div class="info-text">{{ shareInfo.userName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getAvatar, iconType} from "@/utils/FileIcon";
import MButton from "@/components/common/MButton";
import {differenceTime, standardTime} from "@/utils/TimeFormat";

export default {
  name: "ShareContentHeader",
  components: {MButton},
  props: {
    shareInfo: Object
  },
  methods: {
    saveClick() {
      this.$emit('save')
    },
    downloadClick() {
      this.$emit('download')
    }
  },
  computed: {
    shareIcon() {
      return iconType.shareIcon
    },
    userAvatar() {
      if (this.shareInfo.userAvatar) {
        return getAvatar(this.shareInfo.userAvatar)
      } else {
        return iconType.defaultAvatar;
      }
    },
    createTime() {
      return standardTime(this.shareInfo.createTime)
    },
    expiryTime() {
      return differenceTime(this.shareInfo.expiryTime)
    }
  }
}
</script>

<style scoped>
.action .m-button {
  margin-left: 14px;
}

.action {
  margin-left: auto;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info img {
  border-radius: 50%;
  height: 22px;
  width: 22px;
  margin-right: 4px;
}

.name-text {
  font-size: 14px;
  color: #333;
  font-weight: 700;
  margin-left: 8px;
}

.name-info img {
  height: 40px;
  width: 40px;
}

.name-info {
  display: flex;
  align-items: center;
}

.other-info .item {
  margin-right: 18px;
}

.other-info {
  display: flex;
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  color: #666;
  margin-left: 12px;
  margin-top: 6px;
}

.main {
  display: flex;
  align-items: center;
}

.share-info {
  width: 100%;
}

.share-content-header {
  display: flex;
  padding-bottom: 8px;
  align-items: center;
  position: relative;
}

.share-content-header:after {
  content: " ";
  position: absolute;
  right: 0;
  left: 0;
  height: 1px;
  bottom: -6px;
  background-color: #f9f9f9;
}
</style>