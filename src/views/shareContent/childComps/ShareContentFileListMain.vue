<template>
  <div class="file-list-main">
    <div class="nav-left">
      <span v-if="path.length===0">{{ title }}</span>
      <span v-else class="file-nav">
        <span class="back" @click="backPreviousLevel">返回上一级</span>
        <span class="home" @click="backHome">{{ title }}</span>
        <span v-for="(item,index) in path" @click="toPath(index)" class="to-path">{{ item }}</span>
      </span>
    </div>
    <div class="nav-right">
      <span class="file-count" v-if="fileLength!==0">已加载{{ fileLength }}个</span>
      <span>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zititubiao-"></use>
          </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShareContentFileListMain"
}
</script>

<style scoped>

</style>