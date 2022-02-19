<template>
  <side-bar class="side-bar">
    <side-bar-item :sub-list="subList" path="/">全部文件</side-bar-item>
    <side-bar-item path="/recycle">回收站</side-bar-item>
    <side-bar-item path="/share">分享记录</side-bar-item>
    <side-bar-quota/>
  </side-bar>
</template>

<script>
import SideBar from "@/components/sideBar/SideBar";
import SideBarItem from "@/components/sideBar/SideBarItem";
import SideBarQuota from "@/components/sideBar/SideBarQuota";

export default {
  name: "DiskSideBar",
  components: {SideBarQuota, SideBarItem, SideBar},
  data() {
    return {
      subList: [
        {text: "图片", path: '/category/1', iconId: 'tupian1'},
        {text: "视频", path: '/category/2', iconId: 'shipin'},
        {text: "文档", path: '/category/3', iconId: 'wendang'},
        {text: "音频", path: '/category/4', iconId: 'yinpin1'},
        {text: "压缩包", path: '/category/5', iconId: 'jiaohuanpicixinxi'},
        {text: "其他", path: '/category/0', iconId: 'qita'}
      ]
    }
  }
}
</script>

<style scoped>
.side-bar {
  border-right: #f1f2f4 solid 1px;
}

.side-bar .side-bar-quota {
  margin-top: auto;
}
</style>