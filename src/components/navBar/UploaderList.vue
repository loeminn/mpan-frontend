<template>
  <div class="uplist">
    <div class="uplist-icon" @click.stop="toggleShow">
      <div class="red-dot" v-show="$store.getters.noUpload!==0">{{ $store.getters.noUpload }}</div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-chuanshu1"></use>
      </svg>
    </div>
    <div ref="uplistBody" v-show="isShow" class="uplist-body">
      <div class="uplist-arrow"></div>
      <div class="content">
        <div class="header">上传完成（{{ $store.state.uploadedFile }}/{{ $store.state.uploadList.length }}）</div>
        <div class="body">
          <up-file-info v-for="(item,index) in $store.state.uploadList" :index="index" :file-info="item"/>
          <span class="tip">- 仅展示本次上传任务 -</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpFileInfo from "@/components/navBar/UpFileInfo";

export default {
  name: "UploaderList",
  components: {UpFileInfo},
  methods: {
    toggleShow(e) {
      this.isShow = !this.isShow
    },
    lossFocusClose(e) {
      this.isShow = this.$refs.uplistBody.contains(e.target)
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    document.addEventListener('click', this.lossFocusClose)
    this.$bus.on('openUpList', () => {
      this.isShow = true
    })
  },
  beforeUnmount() {
    this.$bus.all.delete('openUpList')
    document.removeEventListener('click', this.lossFocusClose)
  },
}
</script>

<style scoped>
.uplist .tip {
  text-align: center;
  width: 100%;
  display: inline-block;
  color: #afb3bf;
  font-size: 12px;
  padding-top: 20px;
  padding-bottom: 4px;
}

.uplist .content .header {
  font-size: 14px;
  font-weight: 600;
  border-bottom: solid 1px #f4f4f4;
  height: 40px;
  line-height: 24px;
  padding: 8px 16px;
  color: #454d5a;
}

.uplist .uplist-arrow {
  position: absolute;
  top: 3px;
  right: 15px;
  margin-left: -7px;
  border-style: solid;
  border-color: transparent;
  border-width: 0 7px 7px;
  border-bottom-color: hsla(0, 0%, 85.1%, .5);
}

.uplist .uplist-arrow:after {
  content: "";
  position: absolute;
  top: 1px;
  left: 0;
  margin-left: -7px;
  border-style: solid;
  border-color: transparent;
  border-width: 0 7px 7px;
  border-bottom-color: #fff;
}

.uplist {
  display: flex;
  align-items: center;
  margin-left: 20px;
  position: relative;
}

.uplist-icon:hover svg {
  color: #91969d;
}

.uplist-icon:hover .red-dot {
  background-color: #ff6988;
}

.uplist-icon svg {
  font-size: 14px;
  color: #454d5a;
}

.uplist-icon {
  cursor: pointer;
}

.uplist-icon .red-dot {
  background: #ff436a;
  border-radius: 7px;
  color: #fff;
  font-weight: 500;
  position: absolute;
  padding: 0 4px;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  left: 9px;
  top: 9px;
}

.uplist .uplist-body {
  position: absolute;
  width: 560px;
  height: 400px;
  top: 56px;
  right: -15px;
  padding-top: 10px;
  z-index: 15;
}

.uplist .content {
  background-color: #fff;
  -webkit-box-shadow: 0 0 30px 0 #e1e6ec;
  box-shadow: 0 0 30px 0 #e1e6ec;
  border-radius: 12px;
  width: 100%;
  padding-bottom: 10px;
}

.uplist .body {
  height: 350px;
  overflow: hidden;
  overflow-y: auto;
}
</style>