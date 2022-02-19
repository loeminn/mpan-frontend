<template>
  <div class="share-main">
    <div class="action">
      <m-button icon="lianjie" v-show="selectList.length===1" @click="copyLink">复制链接</m-button>
      <m-button icon="ai55" v-show="selectList.length!==0" @click="cancelClick">取消分享</m-button>
    </div>
    <span class="text" v-show="selectList.length===0">
      链接分享(分享过期超过1月以上的链接记录将被自动清理)
    </span>
    <div class=" link-temp" ref="linkTemp">
    </div>
  </div>
</template>

<script>
import MButton from "@/components/common/MButton";
import {cancelShare} from "@/api/share";

export default {
  name: "ShareMain",
  components: {MButton},
  props: {
    selectList: Array,
    shareList: Array
  },
  methods: {
    cancelClick() {
      this.$modal.confirm({
        title: '确认取消分享',
        content: '取消分享后，该条分享记录将被删除，好友将无法再访问此分享链接。 您确认要取消分享吗？',
        icon: 'info',
        cancelText: '取消',
        closeIcon: true,
        lossFocusClose: true,
        onOk: this.cancel
      })
    },
    cancel() {
      this.$emit('loading', true)
      cancelShare(this.selectList)
          .then(() => {
            this.$emit('loadFileList')
            this.$message.success('取消分享成功');
          })
          .catch(res => {
            this.$emit('loading', false)
            this.$message.error(res.msg);
          })
    },
    copyLink() {
      const item = this.shareList.find(item => item.id === this.selectList[0])
      let linkStr = '链接: '
      linkStr += location.protocol + '//' + location.host + '/s/' + item.shortLink
      if (item.accessCode) linkStr += ' 提取码: ' + item.accessCode
      this.$refs.linkTemp.innerText = linkStr
      const range = document.createRange()
      range.selectNode(this.$refs.linkTemp)
      const selection = window.getSelection()
      if (selection.rangeCount > 0) selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      this.$message.info('已复制到剪贴板')
    }
  }
}
</script>
<style>
.share-main .action .m-button {
  margin-right: 10px;
}
</style>
<style scoped>
.link-temp {
  height: 0;
  width: 0;
  opacity: 0;
  user-select: all
}

.share-main .text {
  color: #666;
  font-size: 12px;
  padding-left: 12px;
  display: inline-block;
}

.share-main {
  margin-top: -4px;
  margin-bottom: -4px;
  height: 38px;
  display: flex;
  align-items: center;
}
</style>