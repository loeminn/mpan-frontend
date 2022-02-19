<template>
  <disk-nav-bar v-if="$route.path!=='/auth'"/>
  <router-view/>
</template>

<script>

import DiskNavBar from "@/components/navBar/DiskNavBar";
import {getUserInfo} from "@/api/user";

export default {
  name: 'App',
  components: {DiskNavBar},
  mounted() {
    const token = localStorage.getItem("authorization")
    if (token) {
      const tokenBody = JSON.parse(decodeURIComponent(escape(window.atob(token.split('.')[1]))));
      const now = new Date().getTime() / 1000
      if (tokenBody.exp < now) {
        localStorage.removeItem('authorization')
        return
      }
      this.$store.commit('toggleLoginStatus', true)
      getUserInfo()
          .then(res => {
            this.$store.commit('updateUserInfo', res.data)
          })
    }
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
