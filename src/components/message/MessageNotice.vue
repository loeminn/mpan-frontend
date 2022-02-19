<template>
  <transition name="message-notice">
    <div class="message-notice" v-if="show">
      <span class="m-icon" :class="{loading:type==='loading'}">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-'+type"></use>
        </svg>
      </span>
      <span class="content">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MessageNotice",
  data() {
    return {
      show: false,
      removeTimer: null
    }
  },
  props: {
    type: {
      type: String
    },
    message: {
      type: String
    },
    duration: {
      type: Number
    },
    item: {
      type: Object
    }
  },
  methods: {
    remove() {
      this.$emit("removeItem", this.item)
    },
    updateDuration() {
      clearTimeout(this.removeTimer)
      if (this.duration) {
        this.removeTimer = setTimeout(() => {
          this.show = false
          this.removeTimer = setTimeout(() => {
            this.remove()
          }, 300)
        }, this.duration);
      }
    }
  },
  computed: {
    changeData() {
      return {
        type: this.type,
        message: this.message,
        duration: this.duration
      }
    }
  },
  watch: {
    changeData: {
      handler() {
        this.updateDuration()
      }
    }
  },
  mounted() {
    this.show = true
    this.updateDuration()
  }
}
</script>

<style scoped>
.message-notice .m-icon.loading svg {
  animation-name: loading;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.message-notice .m-icon {
  font-size: 16px;
  margin-right: 6px;
}

.message-notice {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  background-color: #fff;
  border-radius: 30px;
  margin-top: 16px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 16px 0 rgba(80, 80, 80, 0.14);
  pointer-events: all;
  overflow: hidden;
  transform-origin: top;
}

.message-notice-enter-from, .message-notice-leave-to {
  margin-top: 0;
  height: 0;
  opacity: 0;
  transform: translateY(-100%);
}

.message-notice-enter-active, .message-notice-leave-active {
  transition: all .2s;
}

.message-notice-enter-to, .message-notice-leave-from {
  margin-top: 16px;
  height: 40px;
  opacity: 100;
  transform: translateY(0);
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>