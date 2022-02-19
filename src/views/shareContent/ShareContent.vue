<template>
  <div class="share-content">
    <loading-mask v-if="isLoading"/>
    <share-no-exists v-else-if="noExists"/>
    <share-validation v-else-if="shareInfo.isPublic===0&&!isVerify"
                      :share-info="shareInfo"
                      @changeVerifyStatus="changeVerifyStatus"/>
    <share-content-home :share-info="shareInfo" v-else/>
  </div>
</template>

<script>
import ShareValidation from "@/views/shareContent/childComps/ShareValidation";
import {checkShareToken, getShareInfo, verifyAccessCode} from "@/api/share";
import LoadingMask from "@/components/loadingMask/LoadingMask";
import ShareNoExists from "@/views/shareContent/childComps/ShareNoExists";
import {getCookie, setCookie} from "@/utils/CookieUtil";
import ShareContentHome from "@/views/shareContent/childComps/ShareContentHome";

export default {
  name: "ShareContent",
  components: {ShareContentHome, ShareNoExists, LoadingMask, ShareValidation},
  data() {
    return {
      shareInfo: {},
      isLoading: true,
      noExists: false,
      isVerify: false
    }
  },
  methods: {
    changeVerifyStatus(flag) {
      this.isVerify = flag
    },
    isPublicGetToken() {
      return verifyAccessCode(this.shareInfo.id, null)
          .then(res => {
            setCookie(this.shareInfo.id, res.data.shareToken, 120)
            sessionStorage.setItem('shareToken', res.data.shareToken)
          }).catch(() => {
            Promise.reject()
          })
    },
    checkExistingToken() {
      return checkShareToken(this.shareInfo.id)
          .then(() => {
            this.isVerify = true
            this.isLoading = false
            Promise.resolve(true)
          })
          .catch(() => {
            setCookie(this.shareInfo.id, '', new Date(1))
            sessionStorage.removeItem('shareToken')
            Promise.resolve(false)
          })
    },
    async shareInitialization() {
      await getShareInfo(this.$route.params.shortLink)
          .then(async res => {
            this.shareInfo = res.data
            const shareToken = getCookie(res.data.id)
            if (shareToken) {
              sessionStorage.setItem('shareToken', shareToken)
              const tokenCheckFlag = await this.checkExistingToken()
              if (tokenCheckFlag) return
            }
            if (this.shareInfo.isPublic === 1) {
              await this.isPublicGetToken()
            }
          })
          .catch(res => {
            if (res.code === -401) {
              this.noExists = true
            } else {
              this.$message.error(res.msg)
            }
          })
      this.isLoading = false
    }
  },
  mounted() {
    this.shareInitialization()
  }
}
</script>
<style scoped>
.share-content {
  height: calc(100vh - 56px);
}
</style>