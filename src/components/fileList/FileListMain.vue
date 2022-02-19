<template>
  <div class="file-list-main">
    <div class="nav-left">
      <span v-if="isSearch" class="file-nav">
        <span class="back" @click="backHome">全部文件</span>
        <span v-if="isSearch" class="to-path">搜索：{{ $route.query.search }}</span>
      </span>
      <span v-else-if="path.length===0">{{ title }}</span>
      <span v-else class="file-nav">
        <span class="back" @click="backPreviousLevel">返回上一级</span>
        <span class="home" @click="backHome">{{ title }}</span>
        <span v-for="(item,index) in path" @click="toPath(index)" class="to-path">{{ item }}</span>
      </span>
    </div>
    <div class="nav-right">
      <span class="file-count" v-if="fileLength!==0">
        <span v-if="fileLength===total">已全部加载，共{{ total }}个</span>
        <span v-else>已加载{{ fileLength }}个</span>
      </span>
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
  name: "FileListMain",
  props: {
    fileLength: Number,
    title: String,
    rootPath: {
      type: String,
      default: '/'
    },
    total: Number,
    isSearch: Boolean
  },
  data() {
    return {
      path: []
    }
  },
  methods: {
    backPreviousLevel() {
      let path = ''
      for (let i = 0; i < this.path.length - 1; i++) {
        path += '/'
        path += this.path[i]
      }
      if (path === '') {
        this.$router.push(this.rootPath)
      } else {
        this.$router.push({path: this.rootPath, query: {path}})
      }
    },
    toPath(index) {
      let path = ''
      for (let i = 0; i <= index; i++) {
        path += '/'
        path += this.path[i]
      }
      this.$router.push({path: this.rootPath, query: {path}})
    },
    pathNav(path) {
      if (path && path !== '/') {
        this.path = path.substr(1).split('/');
      } else {
        this.path = []
      }
    },
    backHome() {
      this.$router.push(this.rootPath)
    }
  },
  watch: {
    '$route': {
      handler(newVal) {
        const path = newVal.query.path
        this.pathNav(path)
      }
    }
  },
  created() {
    const path = this.$route.query.path
    this.pathNav(path)
  }
}
</script>

<style scoped>
.file-nav .to-path:last-child {
  pointer-events: none;
  color: #afb3bf;
}

.file-nav .to-path:before {
  content: ">";
  position: absolute;
  left: -11px;
  top: -13px;
  color: #c4d8f4;
  pointer-events: none;
}

.file-nav .to-path {
  margin-left: 16px;
  position: relative;
  cursor: pointer;
}

.file-nav .home:before {
  content: "|";
  position: absolute;
  left: -6px;
  top: -14px;
  color: #c4d8f4;
  pointer-events: none;
}

.file-nav .home {
  margin-left: 10px;
  position: relative;
  cursor: pointer;
}

.file-nav .back {
  cursor: pointer;
}

.file-nav {
  color: #06a7ff;
  font-weight: 400;
}

.file-list-main {
  height: 40px;
  line-height: 40px;
  padding: 6px 14px 0 12px;
  display: flex;
  justify-content: space-between;
}

.file-list-main .nav-left {
  font-size: 12px;
  color: #03081a;
  font-weight: 700;
  white-space: nowrap;
}

.file-list-main .nav-right {
  color: #afb3bf;
  font-size: 12px;
}

.file-list-main .nav-right .file-count {
  margin-right: 10px;
}

.file-list-main .nav-right svg {
  font-size: 14px;
}
</style>