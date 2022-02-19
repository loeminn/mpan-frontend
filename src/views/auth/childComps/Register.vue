<template>
  <div>
    <div class="text">
      <p class="title">注册</p>
      <p class="sub-title">请注册您的账号</p>
    </div>
    <m-form ref="signUpForm" :model="signUp" :rules="signUpRules" class="sign-form">
      <m-form-item prop="email">
        <m-input v-model="signUp.email" placeholder="邮箱地址"/>
      </m-form-item>
      <div class="verify-code">
        <m-form-item class="verify-code-inp" prop="verifyCode">
          <m-input v-model="signUp.verifyCode" placeholder="验证码"/>
        </m-form-item>
        <m-button class="verify-code-btn" type="secondary"
                  :loading="verifyCodeBtnLoading"
                  :disabled="verifyCodeBtnDisabled"
                  @click="sendVerifyCode">
          <span v-if="verifyCodeBtnDisabled">{{countdown}}s后重试</span>
          <span v-else>获取验证码</span>
        </m-button>
      </div>
      <m-form-item prop="pwd">
        <m-input v-model="signUp.pwd" placeholder="密码" pwd/>
      </m-form-item>
      <m-form-item prop="checkPwd">
        <m-input v-model="signUp.checkPwd" placeholder="确认密码" pwd/>
      </m-form-item>
      <m-button class="sign-btn" :loading="signUpBtnLoading" @click="signUpSubmit('signUpForm')">注册</m-button>
    </m-form>
  </div>
</template>

<script>
import MFormItem from "@/components/common/MFormItem";
import MForm from "@/components/common/MForm";
import MCheckbox from "@/components/common/MCheckbox";
import MButton from "@/components/common/MButton";
import MInput from "@/components/common/MInput";
import {sendRegisterVerifyCode, register, checkEmailExists} from "@/api/auth";

export default {
  name: "Register",
  components: {MFormItem, MForm, MCheckbox, MButton, MInput},
  data() {
    return {
      signUp: {
        email: '',
        pwd: '',
        checkPwd: '',
        verifyCode: ''
      },
      signUpRules: {
        email: [
          {asyncValidator: this.validateEmail}
        ],
        pwd: [
          {validator: this.validatePwd}
        ],
        checkPwd: [
          {validator: this.validateCheckPwd}
        ],
        verifyCode: [
          {required: true, message: '请输入验证码'}
        ]
      },
      verifyCodeBtnDisabled: false,
      verifyCodeBtnLoading: false,
      countdown: 60,
      signUpBtnLoading: false,
    }
  },
  methods: {
    signUpSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.signUpBtnLoading = true
          register(this.signUp).then(res => {
            const token = res.data.token
            localStorage.setItem('authorization', token)
            this.$store.commit('toggleLoginStatus', true)
            this.$store.commit('updateUserInfo', res.data.userInfo)
            this.$router.push('/')
          }).catch(res => {
            this.$message.error(res.msg)
          }).finally(() => {
            this.signUpBtnLoading = false
          })
        }
      })
    },
    sendVerifyCode() {
      this.$refs.signUpForm.validateField('email', valid => {
        if (valid) {
          this.verifyCodeBtnLoading = true
          sendRegisterVerifyCode(this.signUp.email).then(() => {
            this.$message.success('邮件发送成功')
            this.verifyCodeRetryTiming()
          }).catch(res => {
            this.$message.error(res.msg)
          }).finally(() => {
            this.verifyCodeBtnLoading = false
          })
        }
      })
    },
    validateCheckPwd(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.signUp.pwd) {
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
      if (this.signUp.checkPwd !== '') {
        this.$refs.signUpForm.validateField('checkPwd')
      }
    },
    verifyCodeRetryTiming() {
      this.verifyCodeBtnDisabled = true
      const retry = setInterval(() => {
        if (this.countdown === 1) {
          this.countdown = 60
          clearInterval(retry)
          this.verifyCodeBtnDisabled = false
          return
        }
        this.countdown--
      }, 1000);
    },
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
    }
  }
}
</script>

<style scoped>
.sign-btn {
  width: 120px;
}

.sign-form {
  width: 90%;
  height: 70%;
}

.text {
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.text .title {
  font-size: 28px;
  padding-top: 20px;
  padding-bottom: 10px;
}

.text .sub-title {
  color: #919191;
  font-size: 15px;
}

.sign-form .verify-code {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.sign-form .verify-code-inp {
  flex: 1 0 100px;
}

.sign-form .verify-code-btn {
  margin-left: 10px;
  margin-bottom: 22px;
}
</style>