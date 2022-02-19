<template>
  <div class="user-tooltip">
    <img :src="avatar" onerror="this.classList.add('error');"/>
    <p>{{ $store.state.userInfo.nickname }}</p>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-jiantoudown"></use>
    </svg>
    <div class="tooltip-profile">
      <div class="tooltip-arrow"></div>
      <div class="content">
        <div @click="$router.push('/ucenter')">个人主页</div>
        <div @click="logoutClick">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import {logout} from "@/api/auth";
import {getAvatar, iconType} from "@/utils/FileIcon";

export default {
  name: "UserTooltip",
  computed: {
    avatar() {
      const avatar = this.$store.state.userInfo.avatar;
      if (avatar) {
        return getAvatar(avatar) + '!s-avatar'
      } else {
        return iconType.defaultAvatar
      }
    }
  },
  methods: {
    logoutClick() {
      logout().finally(() => {
        localStorage.removeItem('authorization')
        if (this.$route.meta.noAuth) {
          location.reload()
        } else {
          location.href = '/auth'
        }
      })
    }
  }
}
</script>

<style scoped>
.user-tooltip .tooltip-arrow {
  position: absolute;
  top: 3px;
  left: 50%;
  margin-left: -7px;
  border-style: solid;
  border-color: transparent;
  border-width: 0 7px 7px;
  border-bottom-color: hsla(0, 0%, 85.1%, .5);
}

.user-tooltip .tooltip-arrow:after {
  content: "";
  position: absolute;
  top: 1px;
  left: 0;
  margin-left: -7px;
  border-style: solid;
  border-color: transparent;
  border-width: 0 7px 7px;
  border-bottom-color: #fff;
}

.user-tooltip .content {
  background-color: #fff;
  -webkit-box-shadow: 0 0 30px 0 #e1e6ec;
  box-shadow: 0 0 30px 0 #e1e6ec;
  border-radius: 12px;
  text-align: center;
}

.user-tooltip .content div {
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 12px;
  cursor: pointer;
  position: relative;
}

.user-tooltip .content div:hover {
  color: #91969d;
}

.user-tooltip .content div:not(:first-child) {
  border-top: solid 1px #f1f2f4;
}

.user-tooltip .tooltip-profile {
  padding-top: 10px;
  position: absolute;
  top: 56px;
  z-index: 20;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  display: none;
  width: 100px;
}

.user-tooltip:hover .tooltip-profile {
  display: block;
}

.user-tooltip:hover svg {
  transform: rotate(180deg);
}

.user-tooltip svg {
  font-size: 8px;
  transition: all 260ms;
}

.user-tooltip p {
  font-weight: 700;
  margin-left: 10px;
  font-size: 12px;
  max-width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 6px;
}

.user-tooltip img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.user-tooltip {
  display: flex;
  align-items: center;
  margin-left: 20px;
  color: #424e67;
}
</style>