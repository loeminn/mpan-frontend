<template>
  <side-bar>
    <side-bar-item path="/ucenter/personalInfo">个人资料</side-bar-item>
    <side-bar-item path="/ucenter/setPassword">修改密码</side-bar-item>
    <side-bar-item path="/ucenter/bindEmail">更换邮箱</side-bar-item>
  </side-bar>
</template>

<script>
import SideBar from "@/components/sideBar/SideBar";
import SideBarItem from "@/components/sideBar/SideBarItem";

export default {
  name: "UserCenterSideBar",
  components: {SideBarItem, SideBar}
}
</script>

<style scoped>
.side-bar {
  border-right: #f1f2f4 solid 1px;
}
</style>