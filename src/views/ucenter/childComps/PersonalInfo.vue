<template>
  <div>
    <div class="ucenter-container-title">个人资料</div>
    <div class="ucenter-container-body">
      <div class="item avt">
        <div class="label">头像:</div>
        <div class="avatar">
          <img :src="avatar">
          <div class="edit-avatar" title="修改头像" @click="openEditAvatar">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhongmingming1"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="label">邮箱地址:</div>
        <div class="descript">{{ $store.state.userInfo.email }}</div>
      </div>
      <div class="item">
        <div class="label">昵称:</div>
        <div class="descript edit-nickname-action" v-if="isEditNickname">
          <m-input v-model="nicknameInp"/>
          <span @click="checkNickname">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dui"></use>
              </svg>
            </span>
          <span @click="isEditNickname=false">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-quxiao"></use>
              </svg>
            </span>
        </div>
        <div class="descript" v-else>{{ $store.state.userInfo.nickname }}
          <span class="edit-action" @click="enterEdit">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhongmingming1"></use>
              </svg>
            </span>
        </div>
      </div>
      <div class="item">
        <div class="label">账号注册时间:</div>
        <div class="descript">{{ registerTime }}</div>
      </div>
    </div>
    <modal title="修改头像" ref="editAvatarModal">
      <template #body>
        <edit-avatar ref="editAvatar"/>
      </template>
      <template #footer>
        <m-button type="secondary" @click="openEditAvatar">重新选择</m-button>
        <m-button @click="editAvatar">确认修改</m-button>
      </template>
    </modal>
  </div>
</template>

<script>
import MInput from "@/components/common/MInput";
import Modal from "@/components/modal/Modal";
import EditAvatar from "@/views/ucenter/childComps/EditAvatar";
import MButton from "@/components/common/MButton";
import {getUserInfo, updateAvatar, updateNickname} from "@/api/user";
import {getAvatar, iconType} from "@/utils/FileIcon";
import {formatDate} from "@/utils/TimeFormat";

export default {
  name: "PersonalInfo",
  components: {MButton, EditAvatar, Modal, MInput},
  data() {
    return {
      isEditNickname: false,
      nicknameInp: ''
    }
  },
  computed: {
    avatar() {
      const avatar = this.$store.state.userInfo.avatar;
      if (avatar) {
        return getAvatar(avatar)
      } else {
        return iconType.defaultAvatar
      }
    },
    registerTime() {
      return formatDate('YYYY年MM月DD日 hh时mm分', this.$store.state.userInfo.createTime)
    }
  },
  methods: {
    openEditAvatar() {
      this.$refs.editAvatar.$refs.file.click()
    },
    editAvatar() {
      this.$refs.editAvatar.corppedImg((blob) => {
        const formData = new FormData;
        formData.append("avatar", blob)
        this.$refs.editAvatarModal.close()
        this.$message.loading('头像修改中', 'avatar')
        updateAvatar(formData)
            .then(res => {
              this.$store.commit('updateUserInfo', {avatar: res.msg})
              this.$message.success('头像修改成功', 1500, 'avatar')
            })
            .catch(res => {
              this.$message.error(res.msg, 1500, 'avatar')
            })
      })
    },
    enterEdit() {
      this.isEditNickname = true
      this.nicknameInp = this.$store.state.userInfo.nickname
    },
    checkNickname() {
      const name = this.nicknameInp
      if (name.length === 0) {
        this.$message.error('昵称不能为空')
        return
      }
      if (name.length > 16) {
        this.$message.error('昵称长度不能超过16个字符')
        return
      }
      if (name === this.$store.state.userInfo.nickname) {
        this.isEditNickname = false
        return
      }
      this.$message.loading('昵称修改中', 'nickname')
      updateNickname(name)
          .then(() => {
            this.$store.commit('updateUserInfo', {nickname: name})
            this.isEditNickname = false
            this.$message.success('昵称修改成功', 1500, 'nickname')
          })
          .catch(res => {
            this.$message.error(res.msg, 1500, 'nickname')
          })
    }
  }
}
</script>

<style scoped>
.edit-nickname-action span {
  display: inline-block;
  background-color: #06a7ff;
  height: 24px;
  width: 24px;
  border-radius: 4px;
  margin-left: 6px;
  color: #fff;
  cursor: pointer;
  padding-top: 4px;
  text-align: center;
  font-size: 14px;
}

.ucenter-container-body .m-input {
  height: 32px;
  width: 188px;
}

.edit-action {
  cursor: pointer;
  margin-left: 6px;
}

.edit-action:hover {
  color: #919191;
}
</style>