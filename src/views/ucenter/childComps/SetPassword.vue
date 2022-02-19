<template>
  <div>
    <div class="ucenter-container-title">修改密码</div>
    <div class="ucenter-container-body">
      <steps :active="steps">
        <step title="验证身份"/>
        <step title="设置新密码"/>
        <step title="修改成功"/>
      </steps>
      <div v-if="steps===1">
        <div class="item">
          <div class="label">绑定邮箱:</div>
          <div class="descript">
            {{ $store.state.userInfo.email }}
          </div>
        </div>
        <div class="item">
          <div class="label">验证码:</div>
          <div class="descript">
            <m-input class="code-inp" v-model="emailCode" placeholder="请输入验证码"/>
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
        <m-form class="pwd-form" ref="pwdForm" :model="pwdForm" :rules="pwdRules">
          <div class="item">
            <div class="label">新密码:</div>
            <div class="descript">
              <m-form-item prop="pwd">
                <m-input v-model="pwdForm.pwd" placeholder="请输入新密码" pwd/>
              </m-form-item>
            </div>
          </div>
          <div class="item">
            <div class="label">确定密码:</div>
            <div class="descript">
              <m-form-item prop="checkPwd">
                <m-input v-model="pwdForm.checkPwd" placeholder="请确认密码" pwd/>
              </m-form-item>
            </div>
          </div>
        </m-form>
        <div class="next-btn">
          <m-button @click="pwdFormSubmit('pwdForm')">下一步</m-button>
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
            密码修改成功
            </span>
          </div>
          <div class="success-content">即将返回到登录页面</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MInput from "@/components/common/MInput";
import Step from "@/components/steps/Step";
import Steps from "@/components/steps/Steps";
import MButton from "@/components/common/MButton";
import {checkUpdatePwdEmailCode, sendUpdatePwdVerifyCode, updatePwd} from "@/api/user";
import MForm from "@/components/common/MForm";
import MFormItem from "@/components/common/MFormItem";

export default {
  name: "SetPassword",
  components: {MFormItem, MForm, MButton, Steps, Step, MInput},
  data() {
    return {
      steps: 1,
      sendCodeLoading: false,
      sendCodeDisabled: false,
      countdown: 60,
      emailCode: '',
      pwdForm: {
        pwd: '',
        checkPwd: ''
      },
      pwdRules: {
        pwd: [{validator: this.validatePwd}],
        checkPwd: [{validator: this.validateCheckPwd}]
      }
    }
  },
  methods: {
    sendCode() {
      this.sendCodeLoading = true
      sendUpdatePwdVerifyCode()
          .then(() => {
            this.sendCodeDisabled = true
            this.$message.success('邮箱发送成功', 1500)
            const interval = setInterval(() => {
              if (this.countdown === 1) {
                this.sendCodeDisabled = false
                this.countdown = 60
                clearInterval(interval)
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
      if (this.emailCode.length === 0) {
        this.$message.error('验证码不能为空', 1500)
        return
      }
      checkUpdatePwdEmailCode(this.emailCode)
          .then(() => {
            this.steps++
          })
          .catch(res => {
            this.$message.error(res.msg, 1500)
          })
    },
    validateCheckPwd(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.pwd) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
    validatePwd(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('不能包含空格'))
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error('长度为6-16个字符'))
      } else {
        callback()
      }
      if (this.pwdForm.checkPwd !== '') {
        this.$refs.pwdForm.validateField('checkPwd')
      }
    },
    pwdFormSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$message.loading('密码修改中', 'pwd')
          updatePwd(this.pwdForm.pwd, this.pwdForm.checkPwd, this.emailCode)
              .then(() => {
                loading()
                this.steps++
                localStorage.removeItem('authorization')
                setTimeout(() => {
                  location.href = '/auth'
                }, 2000)
              })
              .catch(res => {
                this.$message.error(res.msg, 1500, 'pwd')
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

.pwd-form .label {
  margin-bottom: 20px;
}

.pwd-form .item {
  height: auto;
  margin-bottom: 10px;
}

.ucenter-container-body {
  width: 580px;
}

.ucenter-container-body .m-input.code-inp {
  width: 140px;
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
</style>