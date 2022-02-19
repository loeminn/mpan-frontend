<template>
  <tr>
    <td class="is-select">
      <m-checkbox disabled/>
    </td>
    <td>
      <span class="list-name">
        <img :src="dirIcon"/>
        <span class="edit-item">
          <m-input v-model="dirName"/>
          <span class="edit-action">
            <span @click="checkDirName">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dui"></use>
              </svg>
            </span>
            <span @click="cancelCreateDir">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-quxiao"></use>
              </svg>
            </span>
          </span>
        </span>
      </span>
    </td>
    <td>{{ dateText }}</td>
    <td>-</td>
  </tr>
</template>

<script>
import MCheckbox from "@/components/common/MCheckbox";
import MInput from "@/components/common/MInput";
import {iconType} from "@/utils/FileIcon";
import {createDir} from "@/api/file";

export default {
  name: "NewDirBodyItem",
  components: {MInput, MCheckbox},
  data() {
    return {
      dirName: '',//文件名不能包含以下字符 ? * : " < > \ / |
      dateText: ''
    }
  },
  computed: {
    dirIcon() {
      return iconType.dirIcon
    }
  },
  methods: {
    nowTime() {
      const getTime = () => {
        const now = new Date();
        const y = now.getFullYear();
        const M = now.getMonth() + 1;
        const d = now.getDate();
        const h = now.getHours();
        const m = now.getMinutes();
        this.dateText = y + '-'
            + (M < 10 ? '0' + M : M) + '-'
            + (d < 10 ? '0' + d : d) + ' '
            + (h < 10 ? '0' + h : h) + ':'
            + (m < 10 ? '0' + m : m)
        return getTime
      }
      setInterval(getTime(), 1000)
    },
    cancelCreateDir() {
      this.$bus.emit('toggleCreateDirItem', false)
    },
    saveDir() {
      const path = this.$route.query.path || '/'
      createDir(this.dirName, path)
          .then(res => {
            this.$message.success('创建文件夹成功')
            this.$bus.emit('toggleCreateDirItem', false)
            this.$bus.emit('loadFileList')
          })
          .catch(res => {
            this.$message.error(res.msg)
          })
    },
    checkDirName() {
      if (this.dirName.length === 0) {
        this.$message.error('文件名不能为空')
        return
      }
      const illegalChar = ['?', '*', '<', '>', ':', '"', '\\', '/', '|']
      for (let c of illegalChar) {
        if (this.dirName.indexOf(c) !== -1) {
          this.$message.error('文件名不能包含以下字符 < >丨* ? \\ /')
          return
        }
      }
      this.dirName = this.dirName.trim();
      if (this.dirName.length > 255) {
        this.$message.error('文件名长度不能超过255字节')
        return
      }
      this.saveDir()
    }
  },
  mounted() {
    this.nowTime()
  }
}
</script>

<style>
.edit-item {
  display: flex;
  width: 100%;
}

.edit-item .m-input {
  width: calc(100% - 70px);
  max-width: 200px;
  height: 24px;
}

.edit-item .m-text-input {
  height: 24px;
  line-height: 24px;
  background-color: #fff;
  border: #cacaca solid 1px;
  border-radius: 4px;
  font-size: 12px;
}

.edit-item .edit-action span {
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
</style>