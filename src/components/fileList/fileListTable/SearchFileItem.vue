<template>
  <tr @click="selectThis()" @dblclick="openFile"
      :class="{selected:selectList.indexOf(fileInfo.id)!==-1}">
    <td class="is-select">
      <m-checkbox :value="fileInfo.id" v-model="selectList" @update:modelValue="changeSelectList"/>
    </td>
    <td>
      <span class="list-name">
        <img :src="fileIcon"/>
        <span v-if="isRenamed" class="edit-item" @click.stop>
          <m-input v-model="fileRenamed"/>
          <span class="edit-action">
            <span @click.stop="checkRenamed" @dblclick.stop>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dui"></use>
              </svg>
            </span>
            <span @click.stop="cancelRenamed" @dblclick.stop>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-quxiao"></use>
              </svg>
            </span>
          </span>
        </span>
        <span class="text" :title="fileInfo.fileName" @click.stop="openFile" v-else>
          {{ fileInfo.fileName }}
        </span>
      </span>
    </td>
    <td>{{ createTime }}</td>
    <td>
      <span v-if="fileInfo.isDir===1">-</span>
      <span v-else>{{ fileSize(fileInfo.size) }}</span>
    </td>
    <td>
      <span :title="fileInfo.path" @click="$router.push({path:'',query:{path:fileInfo.path}})"
            style="text-decoration: underline;color: #05082c;cursor: pointer">
      {{ filePath }}
      </span>
    </td>
  </tr>
</template>

<script>
import {getIconUrl} from "@/utils/FileIcon";
import {standardTime} from "@/utils/TimeFormat";
import {convertFileSize} from "@/utils/FileSize";
import {fileRename} from "@/api/file";
import MCheckbox from "@/components/common/MCheckbox";
import MInput from "@/components/common/MInput";

export default {
  name: "SearchFileItem",
  components: {MInput, MCheckbox},
  props: {
    fileInfo: Object,
    selectList: Array
  },
  data() {
    return {
      timeoutID: null,
      isRenamed: false,
      fileRenamed: null
    }
  },
  computed: {
    fileIcon() {
      return getIconUrl(this.fileInfo)
    },
    createTime() {
      return standardTime(this.fileInfo.createTime)
    },
    filePath() {
      if (this.fileInfo.path === '/') {
        return '全部文件'
      }
      const split = this.fileInfo.path.split('/');
      return split[split.length - 1]
    }
  },
  methods: {
    selectThis() {
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(() => {
        const sl = this.selectList
        if (sl.includes(this.fileInfo.id)) {
          sl.splice(sl.indexOf(this.fileInfo.id), 1)
        } else {
          sl.push(this.fileInfo.id)
        }
        this.$emit('update:selectList', sl)
      }, 200);
    },
    fileSize(size) {
      return convertFileSize(size)
    },
    changeSelectList(value) {
      this.$emit('update:selectList', value)
    },
    openFile() {
      clearTimeout(this.timeoutID);
      if (this.fileInfo.isDir === 1) {
        let path = this.$route.query.path || ''
        path = path + '/' + this.fileInfo.fileName
        this.$router.push({path: '', query: {path: path}})
      } else {
        this.$message.info('暂不支持预览此文件')
      }
    },
    rename() {
      if (this.fileRenamed === this.fileInfo.fileName) {
        this.isRenamed = false
        return
      }
      this.$message.loading('文件名修改中', 'rename')
      fileRename(this.fileRenamed, this.fileInfo.id)
          .then(res => {
            this.$message.success('文件名修改成功', 1500, 'rename')
            this.fileInfo.fileName = this.fileRenamed
            this.isRenamed = false
          })
          .catch(res => {
            this.$message.error(res.msg, 1500, 'rename')
          })
    },
    checkRenamed() {
      if (this.fileRenamed.length === 0) {
        this.$message.error('文件名不能为空')
        return
      }
      const illegalChar = ['?', '*', '<', '>', ':', '"', '\\', '/', '|']
      for (let c of illegalChar) {
        if (this.fileRenamed.indexOf(c) !== -1) {
          this.$message.error('文件名不能包含以下字符 < >丨* ? \\ /')
          return
        }
      }
      this.fileRenamed = this.fileRenamed.trim();
      if (this.fileRenamed.length > 255) {
        this.$message.error('文件名长度不能超过255字节')
        return
      }
      this.rename()
    },
    cancelRenamed() {
      this.isRenamed = false
      this.fileRenamed = this.fileInfo.fileName
    }
  },
  mounted() {
    this.fileRenamed = this.fileInfo.fileName
    this.$bus.on('openRenamed', id => {
      this.isRenamed = this.fileInfo.id === id;
    })
  },
  beforeUnmount() {
    this.$bus.all.delete('openRenamed')
  }

}
</script>

<style scoped>

</style>