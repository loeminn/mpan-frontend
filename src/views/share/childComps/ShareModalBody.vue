<template>
  <div class="share-modal-body">
    <m-form ref="shareFrom" :model="shareInfo" :rules="shareInfoRules" v-if="!isSuccess">
      <div class="share-item">
        <span class="share-label">分享名称</span>
        <m-form-item prop="name">
          <m-input class="share-inp name" v-model="shareInfo.name"/>
        </m-form-item>
      </div>
      <div class="share-item">
        <span class="share-label">有效期</span>
        <m-form-item prop="expired">
          <m-select class="expired-select" v-model="shareInfo.expired">
            <m-option value="1">1天</m-option>
            <m-option value="2">7天</m-option>
            <m-option value="3">30天</m-option>
            <m-option value="0">永久有效</m-option>
          </m-select>
        </m-form-item>
      </div>
      <div class="share-item">
        <span class="share-label share-type">分享类型</span>
        <m-radio v-model="shareInfo.isPublic" label="公开分享" :value="1"/>
        <m-radio v-model="shareInfo.isPublic" label="私密分享" :value="0"/>
      </div>
      <div class="access-code-box" :class="{'is-random-access-code':!shareInfo.isCustomAccessCode}"
           v-if="shareInfo.isPublic!==1">
        <div class="access-radio">
          <m-radio v-model="shareInfo.isCustomAccessCode" label="随机提取码" :value="false"/>
          <m-radio v-model="shareInfo.isCustomAccessCode" label="自定义提取码" :value="true"/>
        </div>
        <div>
          <m-form-item v-if="shareInfo.isCustomAccessCode" prop="accessCode">
            <m-input class="share-inp access-code" v-model="shareInfo.accessCode"/>
          </m-form-item>
        </div>
      </div>
      <div class="share-btn">
        <m-button type="secondary" @click="closeShareModal">取消</m-button>
        <m-button @click="createShareClick" :loading="createShareBtnLoading">创建链接</m-button>
      </div>
    </m-form>
    <div v-else>
      <div class="info-title">
        <span class="share-success-icon">
          <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-blue-success"></use>
        </svg>
        </span>
        <span>成功创建</span>
        <span v-if="successInfo.accessCode">私密链接</span>
        <span v-else>公共链接</span>
      </div>
      <div>
        <m-input class="share-inp short-link" readonly v-model="fullShortLink"/>
      </div>
      <div class="share-item mg-top-16" v-if="successInfo.accessCode">
        <span class="share-label no-mg-bottom">提取码</span>
        <m-input class="share-inp access-code" readonly v-model="successInfo.accessCode"/>
      </div>
      <div class="success-tip mg-top-16">
        <span v-if="successInfo.expiryTime">
          <span>链接</span>
          <span class="primary-text">{{ expiryDifferenceTime }}</span>
          <span>后失效</span>
        </span>
        <span v-else>
          <span>链接</span>
          <span class="primary-text">永久有效</span>
        </span>
      </div>
      <div ref="lacBox" class="lacBox">{{ linkAndCode }}</div>
      <div class="share-btn">
        <m-button @click="copyLinkAndCode">复制链接及提取码</m-button>
      </div>
    </div>
  </div>
</template>

<script>
import MSelect from "@/components/common/MSelect";
import MOption from "@/components/common/MOption";
import MInput from "@/components/common/MInput";
import MForm from "@/components/common/MForm";
import MFormItem from "@/components/common/MFormItem";
import MRadio from "@/components/common/MRadio";
import MButton from "@/components/common/MButton";
import {differenceTime} from "@/utils/TimeFormat";

export default {
  name: "ShareModalBody",
  components: {MButton, MRadio, MFormItem, MForm, MInput, MOption, MSelect},
  computed: {
    fullShortLink() {
      return location.protocol + '//' + location.host + '/s/' + this.successInfo.shortLink
    },
    expiryDifferenceTime() {
      return differenceTime(this.successInfo.expiryTime)
    },
    linkAndCode() {
      let linkAndCodeStr = ''
      linkAndCodeStr += '链接: ' + this.fullShortLink
      if (this.successInfo.accessCode) {
        linkAndCodeStr += ' 提取码: ' + this.successInfo.accessCode
      }
      return linkAndCodeStr
    }
  },
  data() {
    return {
      shareInfo: {
        name: '',
        expired: '',
        isPublic: 1,
        isCustomAccessCode: false,
        accessCode: ''
      },
      shareInfoRules: {
        name: [
          {required: true, message: '分享名称不能为空'},
          {max: 32, message: '分享名称最多32个字符'}
        ],
        expired: [{required: true, message: '请选择有效期'}],
        accessCode: [
          {required: true, message: '提取码不能为空'},
          {min: 4, max: 8, message: '提取码为4-8个任意字符'}]
      },
      isSuccess: false,
      createShareBtnLoading: false,
      successInfo: {
        shortLink: '',
        accessCode: null,
        expiryTime: null
      }
    }
  },
  methods: {
    success(option) {
      this.successInfo.shortLink = option.shortLink
      this.successInfo.accessCode = option.accessCode
      this.successInfo.expiryTime = option.expiryTime
      this.isSuccess = true
    },
    closeShareModal() {
      this.$emit('closeShareModal')
    },
    createShareClick() {
      this.$emit('createShare')
    },
    copyLinkAndCode() {
      const range = document.createRange()
      range.selectNode(this.$refs.lacBox)
      const selection = window.getSelection()
      if (selection.rangeCount > 0) selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      this.$message.info('已复制到剪贴板')
    }
  },
  watch: {
    '$parent.isShow': {
      handler(newVal) {
        if (!newVal) {
          this.shareInfo.name = ''
          this.shareInfo.expired = ''
          this.shareInfo.isPublic = 1
          this.shareInfo.isCustomAccessCode = false
          this.shareInfo.accessCode = ''
          if (!this.isSuccess) {
            this.$refs.shareFrom.clearErrorStatus()
          }
          this.isSuccess = false
        }
      }
    }
  }
}
</script>
<style>
.m-radio .label {
  font-size: 12px;
}

</style>
<style scoped>
.lacBox {
  height: 0;
  width: 0;
  opacity: 0;
  user-select: all
}

.primary-text {
  color: #06a7ff;
}

.share-btn {
  display: flex;
  justify-content: center;
  margin-bottom: -26px;
  margin-top: 30px;
}

.share-btn .m-button {
  padding-left: 24px;
  padding-right: 24px;
}

.share-btn .m-button:not(:first-child) {
  margin-left: 20px;
}

.success-tip {
  font-size: 12px;
  color: #4f526c;
}

.mg-top-16 {
  margin-top: 16px;
}

.share-label.no-mg-bottom {
  margin-bottom: 0;
  width: 48px;
}

.share-inp.short-link {
  margin-top: 19px;
  width: 294px;
}

.share-success-icon {
  padding-right: 4px;
}

.info-title {
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  color: #06a7ff;
}

.access-code-box .m-form-item {
  padding-left: 24px;
}

.access-radio .m-radio {
  margin-bottom: 10px;
  width: max-content;
}

.access-radio {
  display: flex;
  flex-direction: column;
}

.access-code-box.is-random-access-code {
  padding-bottom: 10px;
}

.access-code-box {
  background-color: #fafafa;
  border-radius: 8px;
  width: 320px;
  margin-left: 68px;
  padding-top: 16px;
  padding-left: 20px;
}

.share-label.share-type {
  margin-bottom: 10px;
}

.m-radio {
  margin-right: 20px;
  margin-bottom: 10px;
}

.share-inp.access-code {
  width: 120px;
}

.share-inp.name {
  width: 260px;
}

.share-inp {
  height: 32px;
}

.share-item {
  display: flex;
  align-items: center;
}

.share-label {
  font-size: 12px;
  color: #333333;
  width: 68px;
  margin-bottom: 20px;
}

.expired-select {
  width: 120px;
}

.share-modal-body {
  width: 568px;
  text-align: start;
  padding: 0 24px;
}
</style>