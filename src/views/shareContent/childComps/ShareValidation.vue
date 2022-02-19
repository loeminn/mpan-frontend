<template>
  <div class="share-validation">
    <div class="validation-box">
      <div class="share-info">
        <div class="avatar">
          <img :src="showAvatar"/>
        </div>
        <div>
          <div class="user-name">{{ shareInfo.userName }}</div>
          <div class="share-text">分享的文件</div>
        </div>
      </div>
      <div class="verify-form">
        <div class="verify-form-label">请输入提取码：</div>
        <div class="verify-form-body">
          <m-form ref="verifyForm" :model="form" :rules="formRules">
            <m-form-item prop="accessCode">
              <m-input v-model="form.accessCode"/>
            </m-form-item>
          </m-form>
          <m-button @click="extractFiles('verifyForm')">提取文件</m-button>
        </div>
      </div>
    </div>
    <div class="cloud-bg"></div>
  </div>
</template>

<script>
import {getAvatar, iconType} from "@/utils/FileIcon";
import MInput from "@/components/common/MInput";
import MButton from "@/components/common/MButton";
import MFormItem from "@/components/common/MFormItem";
import MForm from "@/components/common/MForm";
import {getShareInfo, verifyAccessCode} from "@/api/share";
import {setCookie} from "@/utils/CookieUtil";

export default {
  name: "ShareValidation",
  components: {MForm, MFormItem, MButton, MInput},
  props: {
    shareInfo: Object
  },
  data() {
    return {
      form: {
        accessCode: ''
      },
      formRules: {
        accessCode: [
          {required: true, message: '请输入提取码'}
        ]
      }
    }
  },
  computed: {
    showAvatar() {
      if (this.shareInfo.userAvatar) {
        return getAvatar(this.shareInfo.userAvatar)
      } else {
        return iconType.defaultAvatar;
      }
    }
  },
  methods: {
    extractFiles(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const close = this.$message.loading('正在提取', 'extractFiles');
          verifyAccessCode(this.shareInfo.id, this.form.accessCode)
              .then(res => {
                close()
                setCookie(this.shareInfo.id, res.data.shareToken, 120)
                sessionStorage.setItem('shareToken', res.data.shareToken)
                this.$emit('changeVerifyStatus', true)
              })
              .catch(res => {
                this.$message.error(res.msg, 1500, 'extractFiles')
              })
        }
      })
    }
  }
}
</script>
<style>
.verify-form-body .m-form-item .message {
  margin-top: 10px;
}

.verify-form-body .m-text-input {
  border: 1px solid #f2f2f2;;
}
</style>
<style scoped>
.share-text {
  color: #E1F5FF;
  font-size: 10px;
}

.cloud-bg {
  position: absolute;
  height: 400px;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://lm-icon.oss-cn-shenzhen.aliyuncs.com/mpan/background/footer-cloud.png");
  background-repeat: repeat-x;
  background-position: 0 bottom;
}

.verify-form-body .m-form {
  width: 100%;
}

.verify-form-body .m-button {
  margin-left: 14px;
  margin-bottom: 30px;
  background-color: #09AAFF;
}

.verify-form-body {
  display: flex;
}

.verify-form {
  padding: 20px 32px 38px;
}

.verify-form-label {
  font-weight: 700;
  margin: 22px 0 16px;
  color: #666;
  font-size: 14px;
}

.user-name {
  font-size: 16px;
  font-weight: 900;
  color: #fff;
  height: 24px;
  line-height: 24px;
}

.share-info {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 32px;
  background: url("https://lm-icon.oss-cn-shenzhen.aliyuncs.com/mpan/background/share-tit-bg.png") no-repeat;
}

.avatar {
  width: 44px;
  height: 44px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 0 3px #9ADAF2;
  background-color: #fff;
  margin-right: 18px;
}

.avatar img {
  width: 100%;
}

.share-validation {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef2f6;
}

.validation-box {
  width: 460px;
  font-size: 14px;
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(171, 198, 235, .3);
  z-index: 9;
  margin-bottom: 22px;
}
</style>