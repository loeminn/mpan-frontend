<template>
  <div>
    <div class="text">
      <p class="title">登录</p>
      <p class="sub-title">欢迎回来，请登录您的账号</p>
    </div>
    <m-form ref="signInForm" :model="signIn" :rules="signInRules" class="sign-form">
      <m-form-item prop="email">
        <m-input v-model="signIn.email" placeholder="邮箱地址"/>
      </m-form-item>
      <m-form-item prop="pwd">
        <m-input v-model="signIn.pwd" placeholder="密码" pwd/>
      </m-form-item>
      <m-form-item>
        <m-checkbox label="记住我" v-model="signIn.rememberMe"></m-checkbox>
      </m-form-item>
      <m-button class="sign-btn" :loading="btnLoading" @click="signInSubmit('signInForm')">登录</m-button>
    </m-form>
  </div>
</template>

<script>
import MFormItem from "@/components/common/MFormItem";
import MForm from "@/components/common/MForm";
import MCheckbox from "@/components/common/MCheckbox";
import MButton from "@/components/common/MButton";
import MInput from "@/components/common/MInput";

import {login} from "@/api/auth";

export default {
  name: "Login",
  components: {MFormItem, MForm, MCheckbox, MButton, MInput},
  data() {
    return {
      signIn: {
        email: '',
        pwd: '',
        rememberMe: false
      },
      signInRules: {
        email: [
          {required: true, message: '请输入邮箱地址'},
          {pattern: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$', message: '邮箱地址格式不正确'}
        ],
        pwd: [
          {required: true, message: '请输入密码'}
        ]
      },
      btnLoading: false
    }
  },
  methods: {
    signInSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true
          login(this.signIn).then(res => {
            const token = res.data.token
            localStorage.setItem('authorization', token)
            this.$store.commit('toggleLoginStatus', true)
            this.$store.commit('updateUserInfo', res.data.userInfo)
            this.$router.push('/')
          }).catch(res => {
            this.$message.error(res.msg)
          }).finally(() => {
            this.btnLoading = false
          })
        }
      })
    },
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
</style>