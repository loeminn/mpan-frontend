<template>
  <div>
    <div class="ucenter-container-title">更换邮箱</div>
    <div class="ucenter-container-body">
      <steps :active="steps">
        <step title="验证身份"/>
        <step title="验证新邮箱"/>
        <step title="修改成功"/>
      </steps>
      <m-form ref="emailForm" :model="emailForm" :rules="emailRules">
        <div v-if="steps===1">
          <div class="item">
            <div class="label">绑定邮箱:</div>
            <div class="descript">
              {{ $store.state.userInfo.email }}
            </div>
          </div>
          <div class="item form">
            <div class="label">验证码:</div>
            <div class="descript">
              <m-form-item prop="emailCode">
                <m-input class="code-inp" v-model="emailForm.emailCode" placeholder="请输入验证码"/>
              </m-form-item>
              <m-button :loading="sendCodeLoading"
                        :disabled="sendCodeDisabled"
                        type="secondary"
                        @click="sendCode">
                <span v-if="sendCodeDisabled">{{ countdown }}s后重试</span>
                <span v-else>获取验证码</span>
              </m-button>
            </div>
          </div>
          <div class="next-btn">
            <m-button @click="verifyIdentity">下一步</m-button>
          </div>
        </div>
        <div v-else-if="steps===2">
          <div class="item form">
            <div class="label">新邮箱:</div>
            <div class="descript">
              <m-form-item prop="newEmail">
                <m-input v-model="emailForm.newEmail" placeholder="请输入新邮箱"/>
              </m-form-item>
            </div>
          </div>
          <div class="item form">
            <div class="label">验证码:</div>
            <div class="descript">
              <m-form-item prop="newEmailCode">
                <m-input class="code-inp" v-model="emailForm.newEmailCode" placeholder="请输入验证码"/>
              </m-form-item>
              <m-button :loading="sendNewEmailCodeLoading"
                        :disabled="sendNewEmailCodeDisabled"
                        type="secondary"
                        @click="sendNewEmailCode"
              >
                <span v-if="sendNewEmailCodeDisabled">{{ newEmailCountdown }}s后重试</span>
                <span v-else>获取验证码</span>
              </m-button>
            </div>
          </div>
          <div class="next-btn">
            <m-button @click="bindEmail">下一步</m-button>
          </div>
        </div>
        <div v-else-if="steps===3" class="success">
          <div>
            <div class="success-title">
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-success"></use>
              </svg>
            </span>
              <span>
            邮箱换绑成功
            </span>
            </div>
            <div class="success-content">即将返回到登录页面</div>
          </div>
        </div>
      </m-form>
    </div>
  </div>
</template>

<script>
import Steps from "@/components/steps/Steps";
import Step from "@/components/steps/Step";
import MInput from "@/components/common/MInput";
import MButton from "@/components/common/MButton";
import MFormItem from "@/components/common/MFormItem";
import MForm from "@/components/common/MForm";
import {bindNewEmail, checkUpdateEmailCode, sendNewEmailVerifyCode, sendUpdateEmailVerifyCode} from "@/api/user";
import {checkEmailExists} from "@/api/auth";

export default {
  name: "BindEmail",
  components: {MForm, MFormItem, MButton, MInput, Step, Steps},
  data() {
    return {
      steps: 1,
      sendCodeLoading: false,
      sendCodeDisabled: false,
      countdown: 60,
      sendNewEmailCodeLoading: false,
      sendNewEmailCodeDisabled: false,
      newEmailCountdown: 60,
      emailForm: {
        emailCode: '',
        newEmail: '',
        newEmailCode: ''
      },
      emailRules: {
        emailCode: [{required: true, message: '验证码不能为空'}],
        newEmail: [{asyncValidator: this.validateEmail}],
        newEmailCode: [{required: true, message: '验证码不能为空'}]
      }
    }
  },
  methods: {
    validateEmail(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入邮箱地址'))
      } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        callback(new Error('邮箱地址格式不正确'))
      } else {
        checkEmailExists(value).then(() => {
          callback()
        }).catch(() => {
          callback(new Error('邮箱已注册'))
        })
      }
    },
    sendCode() {
      this.sendCodeLoading = true
      sendUpdateEmailVerifyCode()
          .then(() => {
            this.sendCodeDisabled = true
            this.$message.success('邮箱发送成功', 1500)
            const interval = setInterval(() => {
              if (this.countdown === 1) {
                clearInterval(interval)
                this.sendCodeDisabled = false
                this.countdown = 60
                return
              }
              this.countdown--
            }, 1000);
          })
          .catch(res => {
            this.$message.error(res.msg, 1500)
          })
          .finally(() => {
            this.sendCodeLoading = false
          })
    },
    verifyIdentity() {
      this.$refs.emailForm.validate(valid => {
        if (valid) {
          checkUpdateEmailCode(this.emailForm.emailCode)
              .then(() => {
                this.steps++
              })
              .catch(res => {
                this.$message.error(res.msg, 1500)
              })
        }
      })
    },
    sendNewEmailCode() {
      this.$refs.emailForm.validateField('newEmail', valid => {
        if (valid) {
          this.sendNewEmailCodeLoading = true
          sendNewEmailVerifyCode(this.emailForm.newEmail)
              .then(() => {
                this.sendNewEmailCodeDisabled = true
                this.$message.success('邮箱发送成功', 1500)
                const interval = setInterval(() => {
                  if (this.newEmailCountdown === 1) {
                    clearInterval(interval)
                    this.sendNewEmailCodeDisabled = false
                    this.newEmailCountdown = 60
                    return
                  }
                  this.newEmailCountdown--
                }, 1000);
              })
              .catch(res => {
                this.$message.error(res.msg, 1500)
              })
              .finally(() => {
                this.sendNewEmailCodeLoading = false
              })
        }
      })
    },
    bindEmail() {
      this.$refs.emailForm.validate(valid => {
        if (valid) {
          bindNewEmail(this.emailForm.newEmail, this.emailForm.newEmailCode, this.emailForm.emailCode)
              .then(() => {
                this.steps++
                localStorage.removeItem('authorization')
                setTimeout(() => {
                  location.href = '/auth'
                }, 2000)
              })
              .catch(res => {
                this.$message.error(res.msg, 1500)
              })
        }
      })
    }
  }
}
</script>

<style scoped>
.success-content {
  padding-top: 10px;
  padding-left: 21px;
  font-size: 16px;
  color: #67c23a;
}

.success-title {
  color: #67c23a;
  font-size: 22px;
}

.success {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
}

.ucenter-container-body .m-input.code-inp {
  width: 140px;
}

.item.form .m-button {
  margin-bottom: 20px;
}

.item.form .label {
  margin-bottom: 20px;
}

.form.item {
  height: auto;
  margin-bottom: 10px;
}

.steps {
  margin-bottom: 40px;
}

.ucenter-container-body .m-input {
  width: 260px;
  height: 36px;
  padding-right: 20px;
}


.next-btn .m-button {
  margin-top: 28px;
  width: 120px;
}

.ucenter-container-body {
  width: 580px;
}
</style>