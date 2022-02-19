<template>
  <div>
    <m-button ref="uploadBtn" icon="shangchuan2" @click="selectFile">上传</m-button>
    <input ref="fileUpload" style="display: none" type="file" multiple="multiple" @change="fileInputChange">
  </div>
</template>

<script>
import MButton from "@/components/common/MButton";

export default {
  name: "UploadButton",
  components: {MButton},
  methods: {
    selectFile() {
      this.$refs.fileUpload.click()
    },
    fileInputChange(e) {
      let fileList = e.target.files
      if (fileList.length !== 0) {
        this.$store.commit('pushUploadList', fileList)
      }
      e.target.value = null
    }
  },
  mounted() {
    this.$bus.on('uploadBtnClick', () => {
      this.$refs.uploadBtn.click()
    })
  },
  beforeUnmount() {
    this.$bus.all.delete('uploadBtnClick')
  }
}
</script>

<style scoped>

</style>