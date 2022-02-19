<template>
  <div class="dir-list">
    <div class="dir-list-nav-path">
      <span v-if="pathArr.length===0">全部文件夹</span>
      <span v-else class="dir-nav">
        <span class="back" @click.stop="backPreviousLevel">返回上一级</span>
        <span class="home" @click.stop="backHome">全部文件夹</span>
        <span v-for="(item,index) in pathArr" @click.stop="toDir(index)" class="to-dir">{{ item }}</span>
      </span>
    </div>
    <div class="dir-list-body" v-show="dirList.length!==0">
      <div class="dir-list-item" v-for="item in dirList" @click="openDir(item.fileName)">
        <img :src="icon"/>
        <span class="dir-list-item-name">{{ item.fileName }}</span>
      </div>
    </div>
    <loading-mask v-show="isLoading"/>
    <div class="dir-list-empty" v-show="dirList.length===0&&!isLoading">
      <img :src="moveIcon">
      <span class="title">{{ emptyText }}</span>
    </div>
  </div>
</template>

<script>
import {iconType} from "@/utils/FileIcon";
import {getDirList} from "@/api/file";
import LoadingMask from "@/components/loadingMask/LoadingMask";

export default {
  name: "DirList",
  components: {LoadingMask},
  computed: {
    icon() {
      return iconType.dirIcon
    },
    moveIcon() {
      return iconType.moveIcon
    },
    path() {
      let path = ''
      if (this.pathArr.length !== 0) {
        this.pathArr.forEach(item => {
          path += '/' + item
        })
      } else {
        path = '/'
      }
      return path
    }
  },
  props: {
    emptyText: String
  },
  data() {
    return {
      dirList: [],
      pathArr: [],
      isLoading: false
    }
  },
  methods: {
    openDir(dirName) {
      this.pathArr.push(dirName)
      this.getDirList()
    },
    backPreviousLevel() {
      this.pathArr.splice(this.pathArr.length - 1, 1)
      this.getDirList()
    },
    toDir(index) {
      this.pathArr.splice(index + 1)
      this.getDirList()
    },
    backHome() {
      this.pathArr = []
      this.getDirList()
    },
    getDirList() {
      this.isLoading = true
      getDirList(this.path)
          .then(res => {
            this.dirList = res.data
            this.isLoading = false
          })
    }
  },
  watch: {
    '$parent.isShow': {
      handler(newVal) {
        if (!newVal) {
          this.pathArr = []
          this.dirList = []
        } else {
          this.getDirList()
        }
      }
    }
  }
}
</script>
<style>
.dir-list .loading-mask {
  padding-top: 34px;
}
</style>
<style scoped>
.dir-list-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 44px);
}

.dir-list-empty .title {
  font-size: 14px;
  color: #afb3bf;
  line-height: 18px;
  margin-top: 8px;
}

.dir-list-empty img {
  width: 90px;
}

.dir-nav .to-dir:last-child {
  pointer-events: none;
  color: #afb3bf;
}

.dir-nav .to-dir:before {
  content: ">";
  position: absolute;
  left: -11px;
  top: -13px;
  color: #c4d8f4;
  pointer-events: none;
}

.dir-nav .to-dir {
  margin-left: 16px;
  position: relative;
  cursor: pointer;
}

.dir-nav .home:before {
  content: "|";
  position: absolute;
  left: -6px;
  top: -14px;
  color: #c4d8f4;
  pointer-events: none;
}

.dir-nav .home {
  margin-left: 10px;
  position: relative;
  cursor: pointer;
}

.dir-nav .back {
  cursor: pointer;
}

.dir-list .dir-nav {
  color: #06a7ff;
}

.dir-list-item-name:hover {
  color: #06a7ff;
}

.dir-list-item-name {
  margin-top: 2px;
  padding-left: 5px;
  line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: calc(100% - 64px);
}

.dir-list-item img {
  height: 40px;
  width: 40px;
}

.dir-list-item:hover {
  background-color: #fafafc;
}

.dir-list-item {
  padding-left: 24px;
  border-bottom: 1px solid #f9f9f9;
  color: #03081a;
  font-size: 12px;
  display: flex;
  cursor: pointer;
}

.dir-list-nav-path {
  background-color: #fafafc;
  line-height: 40px;
  color: #afb3bf;
  padding: 0 14px 0 24px;
  font-size: 12px;
}

.dir-list-body {
  overflow: hidden;
  overflow-y: auto;
  height: calc(100% - 28px);
}

.dir-list {
  width: 568px;
  height: 300px;
  text-align: start;
  margin-top: -24px;
  position: relative;
}
</style>