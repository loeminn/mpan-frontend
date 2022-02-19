<template>
  <button ref="btn" type="button" class="m-button"
          :class="btnClass"
          @click="clickAnimating"
          :disabled="disabled">
    <span v-if="loading" class="loading-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-btn-loading"></use>
      </svg>
    </span>
    <span v-if="icon" class="btn-icon">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#icon-'+icon"></use>
      </svg>
    </span>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "MButton",
  data() {
    return {
      isClick: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: String
  },
  computed: {
    btnClass() {
      return {
        'click-animating': this.isClick,
        'is-loading': this.loading,
        [this.type]: true
      }
    }
  },
  methods: {
    clickAnimating() {
      clearTimeout(this.timeoutID)
      this.isClick = false
      setTimeout(() => {
        this.isClick = true
        this.timeoutID = setTimeout(() => {
          this.isClick = false
        }, 600)
      }, 100)
    },
    click() {
      this.$refs.btn.click()
    }
  }
}
</script>

<style scoped>
.m-button.secondary:hover {
  color: #0598ea;
  background-color: rgba(240, 250, 255, .6);
}

.m-button.secondary {
  color: #06a7ff;
  background-color: #f0fbff;
}

.m-button.is-loading {
  pointer-events: none;
}

.m-button.primary.is-loading {
  background-color: #97caff !important;
}

.loading-icon {
  margin-right: 8px;
}

.btn-icon {
  font-size: 16px;
  margin-right: 6px;
}

.m-button.is-loading .loading-icon svg {
  font-size: 16px;
  animation-name: loading;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.m-button span:last-child {
  padding: 10px 0;
  display: inline-block;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.m-button:disabled {
  cursor: not-allowed;
}

.m-button.primary:disabled {
  background-color: #a0cfff !important;
}

.m-button {
  padding: 0 20px;
  border-radius: 20px;
  transition: background-color .2s;
  font-weight: 700;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.m-button.primary {
  background-color: #46a7ff;
  color: white;
}

.m-button.ghost {
  /*background-color: rgba(157, 156, 156, 0.56);*/
  background-color: rgba(204, 204, 204, .5);
  border: rgba(157, 156, 156, 0.56) solid 1px;
  color: rgba(255, 255, 255, 0.90);
}

.m-button.ghost:hover {
  background-color: rgba(204, 204, 204, .8);
}

.m-button.ghost:active {
  background-color: rgba(255, 255, 255, 0.31);
}

.m-button.primary:hover {
  background-color: #63b8ff;
}

.m-button.primary:active {
  background-color: #2a92e8;
}

.m-button.click-animating {
  animation-duration: .6s;
  animation-timing-function: linear;
}

.m-button.primary.click-animating {
  animation-name: primaryClick;
}

@keyframes primaryClick {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 184, 255, 0.35);
  }
  10% {
    box-shadow: 0 0 0 2px rgba(99, 184, 255, 0.35);
  }
  20% {
    box-shadow: 0 0 0 4px rgba(99, 184, 255, 0.20);
  }
  100% {
    box-shadow: 0 0 0 3px rgba(99, 184, 255, 0);
  }
}
</style>