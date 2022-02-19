<template>
  <div class="main">
    <user-center-side-bar class="side-bar"/>
    <div class="ucenter-body">
      <router-view/>
    </div>
  </div>
</template>

<script>
import UserCenterSideBar from "@/views/ucenter/childComps/UserCenterSideBar";

export default {
  name: "UserCenter",
  components: {UserCenterSideBar}
}
</script>
<style>
.ucenter-container-body .descript {
  color: #6e6e6e;
  display: flex;
  align-items: center;
}

.ucenter-container-body .edit-avatar {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(101, 101, 101, 0.38);
  display: flex;
  opacity: 0;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  transition: all .2s;
}

.ucenter-container-body .avatar:hover .edit-avatar {
  opacity: 1;
}

.ucenter-container-body .avatar {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  border: #f3f3f3 solid 2px;
}

.ucenter-container-body .avatar img {
  width: 100%;
}

.ucenter-container-body .label {
  width: 160px;
  display: flex;
  align-items: center;
  padding-right: 20px;
}

.ucenter-container-body .item {
  display: flex;
  margin-bottom: 30px;
  height: 30px;
}

.ucenter-container-body .item.avt {
  height: 80px;
}

.ucenter-container-title {
  font-size: 24px;
  color: #333;
  font-weight: 700;
  margin-bottom: 40px;
}

.ucenter-container-body {
  font-size: 16px;
  font-weight: 500;
}
</style>
<style scoped>
.main {
  height: calc(100vh - 56px);
  display: flex;
  min-height: 480px;
}

.ucenter-body {
  flex: 1;
  padding: 24px 24px 0 36px;
  height: 100%;
}
</style>