<template>
  <div class="recycle-main">
    <div class="body">
      <m-button-group>
        <m-button @click="restoreClick" v-show="selectList.length>0" icon="hunayuan" type="secondary">还原</m-button>
        <m-button @click="delClick" v-show="selectList.length>0" icon="shanchu1" type="secondary">删除</m-button>
      </m-button-group>
      <span class="text" v-show="selectList.length===0">提示：回收站不占用网盘空间，文件保存 10天 后将被自动清除。</span>
    </div>
    <div class="action">
      <m-button @click="delAllClick" icon="shanchu1">清空回收站</m-button>
    </div>
  </div>
</template>

<script>
import MButton from "@/components/common/MButton";
import {delAllRecycleFile, delRecycleFile, restore} from "@/api/recycle";
import MButtonGroup from "@/components/common/MButtonGroup";

export default {
  name: "RecycleMain",
  components: {MButtonGroup, MButton},
  props: {
    selectList: Array
  },
  methods: {
    restoreClick() {
      this.$modal.confirm({
        title: '确认还原',
        content: '确认还原选中的文件？',
        icon: 'info',
        cancelText: '取消',
        closeIcon: true,
        lossFocusClose: true,
        onOk: this.restoreFile
      })
    },
    restoreFile() {
      this.$emit('loading', true)
      restore(this.selectList)
          .then(() => {
            this.$emit('loadFileList')
            this.$bus.emit('refreshQuota')
            this.$message.success('还原成功')
          })
          .catch(res => {
            this.$emit('loading', true)
            this.$message.error(res.msg);
          })
    },
    delClick() {
      this.$modal.confirm({
        title: '彻底删除',
        content: '文件删除后将无法恢复，您确认要彻底删除所选文件吗？',
        icon: 'info',
        cancelText: '取消',
        closeIcon: true,
        lossFocusClose: true,
        onOk: this.delFile
      })
    },
    delFile() {
      this.$emit('loading', true)
      delRecycleFile(this.selectList)
          .then(() => {
            this.$emit('loadFileList')
            this.$message.success('删除成功')
          })
          .catch(res => {
            this.$emit('loading', false)
            this.$message.error(res.msg);
          })
    },
    delAllClick() {
      this.$modal.confirm({
        title: '清空回收站',
        content: '确认清空回收站',
        icon: 'info',
        cancelText: '取消',
        closeIcon: true,
        lossFocusClose: true,
        onOk: () => {
          delAllRecycleFile()
              .then(() => {
                this.$emit('loadFileList')
                this.$message.success('清空回收站成功')
              })
              .catch(res => {
                this.$emit('loading', false)
                this.$message.error(res.msg);
              })
        }
      })
    },
  }
}
</script>
<style scoped>
.recycle-main .body .text {
  padding-left: 12px;
}

.recycle-main .action {
  white-space: nowrap;
  padding-left: 10px;
}

.recycle-main .body {
  white-space: nowrap;
  flex: 1;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recycle-main {
  color: #666;
  font-size: 12px;
  display: flex;
  margin-top: -4px;
  margin-bottom: -4px;
  justify-content: space-between;
  align-items: center;
  min-width: 0;
}
</style>