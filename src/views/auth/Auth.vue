<template>
  <div class="main">
    <div class="auth-container">
      <Login class="sign-mod"/>
      <Register class="sign-mod"/>
      <Introduction/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navBar/NavBar";
import Login from "@/views/auth/childComps/Login";
import Register from "@/views/auth/childComps/Register";
import Introduction from "@/views/auth/childComps/Introduction";

export default {
  name: "Auth",
  components: {Introduction, Register, Login, NavBar},
  mounted() {
    history.replaceState(null, null, document.URL);
  }
}
</script>
<style>
.auth-container .m-text-input {
  background-color: #f9f9fc;
  border: #f9f9fc solid 1px;
}
</style>
<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fbff;
  background-repeat: no-repeat;
  background-size: cover;
}

.auth-container {
  display: flex;
  width: 78%;
  height: 76%;
  box-shadow: 20px 20px 60px #d9d9d9,
  -20px -20px 60px #ffffff;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.sign-mod {
  width: 50%;
  background-color: #ffffff;
  padding-left: 50px;
  padding-right: 50px;
}
</style>