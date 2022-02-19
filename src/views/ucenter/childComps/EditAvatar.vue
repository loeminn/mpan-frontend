<template>
  <div class="edit-avatar">
    <div class="workspace">
      <div class="workspace-left">
        <div class="loading-mask" v-show="isLoading">加载中...</div>
        <div class="workspace-util-wrapper" v-show="!isLoading"
             @mouseleave="mouseInUtil=false"
             @mouseenter="mouseInUtil=true"
             :style="{backgroundImage:'url('+img.src+')',
             width: utilWrapperWidth+'px',
             height: utilWrapperHeight+'px'}">
          <div class="util-container">
            <div class="corpped-container"
                 :style="{
                         width:utilSize+'px',
                       height:utilSize+'px',
                       left: utilX+'px',
                       top: utilY+'px'}"
            >
              <img class="corpped-img" :src="img.src"
                   :style="{width:utilWrapperWidth+'px',
                   height:utilWrapperHeight+'px',
                   left:-utilX+'px',
                   top:-utilY+'px'}">
            </div>
            <div class="workspace-util"
                 ref="workspaceUtil"
                 :style="{width:utilSize+'px',
             height:utilSize+'px',
             left:utilX+'px',
             top:utilY+'px'}"
                 @mousedown="utilOnDrag"
            >
              <div class="left-top dot"
                   @mousedown.stop="dotOnDrag('lt',$event)"></div>
              <div class="left-bottom dot"
                   @mousedown.stop="dotOnDrag('lb',$event)"></div>
              <div class="right-top dot"
                   @mousedown.stop="dotOnDrag('rt',$event)"></div>
              <div class="right-bottom dot"
                   @mousedown.stop="dotOnDrag('rb',$event)"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="workspace-right">
        <div class="clip-img">
          <img v-show="!isLoading" :src="img.src"
               :style="{left:-(utilX/utilWrapperWidth)*clipImgWidth+'px',
             top:-(utilY/utilWrapperHeight)*clipImgHeight+'px',
             width:clipImgWidth+'px',
             height:clipImgHeight+'px'}"
          />
        </div>
        <div class="hint">预览头像</div>
      </div>
    </div>
    <div class="hint">仅支持JPG、PNG，且文件小于5M。</div>
    <input ref="file" style="display: none" type="file" accept="image/jpeg,image/png" @change="fileInputChange">
    <canvas style="display: none" ref="corppedCanvas" width="280" height="280"/>
  </div>
</template>

<script>
export default {
  name: "EditAvatar",
  data() {
    return {
      utilWrapperWidth: 280,
      utilWrapperHeight: 280,
      utilSize: 0,
      utilX: 0,
      utilY: 0,
      dotDragType: '',
      isLoading: true,
      mouseInUtil: false,
      canvas: null,
      img: new Image()
    }
  },
  computed: {
    clipImgWidth() {
      return (this.utilWrapperWidth / this.utilSize) * 100
    },
    clipImgHeight() {
      return (this.utilWrapperHeight / this.utilSize) * 100;
    }
  },
  methods: {
    dotOnDrag(type, e) {
      let sTmpX = e.clientX;
      document.onmousemove = (e) => {
        let size = e.clientX - sTmpX;
        sTmpX = e.clientX
        let y = 0
        let x = 0
        switch (type) {
          case 'lt':
            y = size
            x = size
            size = -size
            break
          case 'lb':
            x = size
            size = -size
            break
          case 'rt':
            y = -size
            break
          case 'rb':
            break
        }
        y = this.utilY + y
        x = this.utilX + x
        if (!this.mouseInUtil && size < 0) {
          return
        }
        if (size < 0 && this.utilSize <= 20) {
          return
        }
        size = this.utilSize + size
        if (y < 0) {
          size = this.utilSize
          y = this.utilY
          x = this.utilX
        } else if ((y + size) > this.utilWrapperHeight) {
          size = this.utilSize
          y = this.utilY
          x = this.utilX
        }
        if (x < 0) {
          size = this.utilSize
          x = this.utilX
          y = this.utilY
        } else if ((x + size) > this.utilWrapperWidth) {
          size = this.utilSize
          x = this.utilX
          y = this.utilY
        }
        this.utilX = x
        this.utilY = y
        this.utilSize = size
        document.onmouseup = (e) => {
          document.onmousemove = null
          e.preventDefault()
        }
      }
    },
    utilOnDrag(e) {
      let sTmpX = e.clientX;
      let sTmpY = e.clientY;
      document.onmousemove = (e) => {
        let x = this.utilX + (e.clientX - sTmpX)
        let y = this.utilY + (e.clientY - sTmpY)
        sTmpX = e.clientX
        sTmpY = e.clientY
        if (!this.mouseInUtil) {
          return
        }
        if (y < 0) {
          y = 0
        } else if ((y + this.utilSize) > this.utilWrapperHeight) {
          y = this.utilWrapperHeight - this.utilSize
        }
        if (x < 0) {
          x = 0
        } else if ((x + this.utilSize) > this.utilWrapperWidth) {
          x = this.utilWrapperWidth - this.utilSize
        }
        this.utilY = y
        this.utilX = x
        document.onmouseup = (e) => {
          document.onmousemove = null
          e.preventDefault()
        }
      }

    },
    checkFile(fileList) {
      if (fileList.length !== 0) {
        const file = fileList[0]
        const typeArr = ['image/jpeg', 'image/png']
        if (typeArr.indexOf(file.type) === -1) {
          this.$message.info('请选择jpg或png格式的图片')
          return
        }
        file.type
        if ((file.size / 1024) > 5120) {
          this.$message.info('图片大于5MB')
          return
        }
        return true;
      }
    },
    fileInputChange(e) {
      const fileList = e.target.files
      const file = fileList[0];
      if (this.checkFile(fileList)) {
        if (!this.$parent.isShow) {
          this.$parent.open()
          setTimeout(() => {
            this.onloadFile(file)
          }, 200)
        } else {
          this.onloadFile(file)
        }
      }
      e.target.value = null
    },
    onloadFile(file) {
      this.isLoading = true
      this.img.src = window.URL.createObjectURL(file)
      this.img.onload = () => {
        console.log(this.img.src)
        const width = this.img.width;
        const height = this.img.height;
        const flag = height > width;
        this.utilSize = 280 * (flag ? width / height : height / width)
        const xy = (280 - this.utilSize) / 2
        if (flag) {
          this.utilWrapperHeight = 280
          this.utilWrapperWidth = this.utilSize
          this.utilY = xy
          this.utilX = 0
        } else {
          this.utilWrapperHeight = this.utilSize
          this.utilWrapperWidth = 280
          this.utilY = 0
          this.utilX = xy
        }
        this.isLoading = false
      }
    },
    corppedImg(cb) {
      this.canvas.clearRect(0, 0, 280, 280)
      const drawImgSize = (this.utilSize / this.utilWrapperWidth) * this.img.width
      const drawImgX = (this.utilX / this.utilWrapperWidth) * this.img.width
      const drawImgY = (this.utilY / this.utilWrapperHeight) * this.img.height
      this.canvas.drawImage(this.img, drawImgX, drawImgY, drawImgSize, drawImgSize, 0, 0, 280, 280)
      this.$refs.corppedCanvas.toBlob(cb, "image/webp")
    }
  },
  watch: {
    '$parent.isShow': {
      handler(newVal) {
        if (!newVal) {
          this.img.src = ''
          this.isLoading = true
          this.canvas.clearRect(0, 0, 280, 280)
        }
      }
    }
  },
  mounted() {
    this.canvas = this.$refs.corppedCanvas.getContext('2d')
  }
}
</script>

<style scoped>
.edit-avatar .workspace-util .dot.left-top {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}

.edit-avatar .workspace-util .dot.left-bottom {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
}

.edit-avatar .workspace-util .dot.right-top {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}

.edit-avatar .workspace-util .dot.right-bottom {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}

.edit-avatar .workspace-util .dot {
  background-color: #46a7ff;
  border: 2px solid #fff;
  border-radius: 50%;
  height: 6px;
  width: 6px;
  position: absolute;
  box-sizing: content-box;
}

.edit-avatar .corpped-img {
  position: absolute;
}

.edit-avatar .corpped-container {
  overflow: hidden;
  position: absolute;
}

.edit-avatar .workspace-util {
  position: absolute;
  border: #7ec0ff solid 1px;
  cursor: move;
}

.edit-avatar .hint {
  color: #999;
  font-size: 14px;
  line-height: 20px;
  margin-top: 20px;
}

.edit-avatar .workspace-right .hint {
  font-size: 14px;
  color: #333;
  margin-top: 6px;
}

.edit-avatar .workspace-right .clip-img img {
  position: relative;
}

.edit-avatar .workspace-right .clip-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #bfbfbf;
  overflow: hidden;
}

.edit-avatar .loading-mask {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bfbfbf;
  font-size: 14px;
  color: #333;
  border-radius: 4px;
}

.edit-avatar .util-container {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .3);
}

.edit-avatar .workspace-util-wrapper {
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
}

.edit-avatar .workspace-left {
  overflow: hidden;
  width: 280px;
  height: 280px;
  border-radius: 4px;
  background-color: #bfbfbf;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-avatar .workspace {
  display: flex;
  width: 400px;
  justify-content: space-between;
}

.edit-avatar {
  padding: 0 30px 8px 30px;
}

</style>