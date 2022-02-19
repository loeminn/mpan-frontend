<template>
  <div class="no-login">
    <div class="action" @click="login">登录</div>
    <div class="action" @click="register">注册</div>
  </div>
</template>

<script>
export default {
  name: "NoLogin",
  methods: {
    login() {
      this.$router.replace("/auth")
    },
    register() {
      this.$router.replace({path: "/auth", query: {type: 'register'}})
    }
  }
}
</script>

<style scoped>
.no-login {
  display: flex;
  align-items: center;
}

.no-login .action {
  margin-left: 20px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s;
}

.no-login .action:hover {
  color: #6cb4ff;
}
</style>