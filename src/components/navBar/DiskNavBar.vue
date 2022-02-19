<template>
  <nav-bar>
    <template v-slot:right>
      <div v-if="$store.state.userInfo.isLogin" style="display: flex">
        <user-tooltip class="u-tip"/>
        <uploader-list/>
      </div>
      <no-login v-else/>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/navBar/NavBar";
import UserTooltip from "@/components/navBar/UserTooltip";
import UploaderList from "@/components/navBar/UploaderList";
import NoLogin from "@/components/navBar/NoLogin";

export default {
  name: "DiskNavBar",
  components: {NoLogin, UploaderList, UserTooltip, NavBar},
}
</script>

<style scoped>
.u-tip {
  position: relative;
  margin-right: 20px;
}

.u-tip:before {
  height: 14px;
  width: 2px;
  position: absolute;
  background-color: rgba(66, 78, 103, 0.42);
  content: " ";
  right: -22px;
  top: 50%;
  margin-top: -6px;
  pointer-events: none;
}
</style>