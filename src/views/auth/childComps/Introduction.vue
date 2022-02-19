<template>
  <div class="info-mod" :class="{'signup-active':isSignUp}">
    <div class="header-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yunpan"></use>
      </svg>
      <span>MPan</span>
    </div>
    <div class="tip register">
      <p class="title">还没有账号？</p>
      <div class="pre-text">
        <span>点击去</span>
        <span class="action" @click="toggleForm">注册</span>
      </div>
    </div>
    <div class="tip login">
      <p class="title">已有账号？</p>
      <div class="pre-text">
        <span>点击去</span>
        <span class="action" @click="toggleForm">登录</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Introduction",
  data() {
    return {
      isSignUp: false
    }
  },
  methods: {
    toggleForm() {
      this.isSignUp = !this.isSignUp
      if (this.$route.query.type) {
        history.replaceState({}, '', '/auth')
      }
    }
  },
  mounted() {
    if (this.$route.query.type) {
      this.isSignUp = this.$route.query.type === 'register'
    }
  }
}
</script>

<style scoped>
.info-mod .header-icon .icon {
  width: 120px;
  height: 128px;
}

.info-mod .header-icon {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  min-width: 194px;
  height: 194px;
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 32px;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.info-mod .action {
  color: rgb(97, 180, 255);
  font-weight: 700;
  cursor: pointer;
  margin-left: 4px;
  transition: all .2s;
}

.info-mod .action:hover {
  color: rgb(91, 171, 243);
}

.info-mod .tip {
  position: absolute;
  bottom: 10px;
  font-size: 14px;
  display: flex;
  transition: all 540ms;
  transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  white-space: nowrap;
}

.info-mod.signup-active .tip.login {
  opacity: 1;
  left: 30px;
  pointer-events: all;
}

.info-mod .tip.login {
  left: 150px;
  opacity: 0;
  pointer-events: none;
}

.info-mod.signup-active .tip.register {
  opacity: 0;
  right: 150px;
  pointer-events: none;
}

.info-mod .tip.register {
  right: 30px;
  opacity: 1;
  pointer-events: all;
}

.info-mod {
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.06)), url("https://lm-icon.oss-cn-shenzhen.aliyuncs.com/mpan/background/163256599974.jpg");
  background-color: #e4edf4;
  width: 50%;
  position: absolute;
  transform: translateX(100%);
  transition: all 540ms;
  transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  padding-left: 50px;
  padding-right: 50px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.info-mod.signup-active {
  transform: translateX(0);
}
</style>