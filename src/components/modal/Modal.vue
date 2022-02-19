<template>
  <div class="modal-wrapper" :class="{'trans-anima':isOpen}" v-show="isShow" ref="wrapper">
    <div class="modal" ref="modal">
      <div class="md-header">
        <span class="title">{{ realTitle }}</span>
        <span class="md-header-icon" v-if="realEnableCloseIcon" @click="close()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-quxiao"></use>
          </svg>
        </span>
      </div>
      <div class="md-body">
        <div class="md-body-icon" v-if="realIcon">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="'#icon-'+realIcon"></use>
          </svg>
        </div>
        <div class="md-body-content">
          <slot name="body">
            <div class="default-content">
              {{ realContent }}
            </div>
          </slot>
        </div>
      </div>
      <div class="md-footer">
        <div class="md-action">
          <slot name="footer">
            <m-button v-if="cancelText" type="secondary" @click="onCancel">{{ cancelText }}</m-button>
            <m-button v-if="okText" @click="onOk">{{ okText }}</m-button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MButton from "@/components/common/MButton";

export default {
  name: "Modal",
  components: {MButton},
  props: {
   title: {type: String},
   icon: {type: String},
   content: {type: String},
   enableCloseIcon: {type: Boolean, default: true},
   enableLossFocusClose: {type: Boolean, default: true},
  },
  data() {
    return {
      isShow: false,
      isOpen: false,
      realEnableCloseIcon: true,
      realEnableLossFocusClose: true,
      realTitle: '',
      realIcon: '',
      realContent: '',
      okText: '确认',
      cancelText: null,
      confirmOk: null,
      confirmCancel: null,
    }
  },
  methods: {
    onOk() {
      this.confirmOk()
      this.close()
    },
    onCancel() {
      this.confirmCancel()
      this.close()
    },
    open() {
      this.isShow = true
      setTimeout(() => {
        this.isOpen = true
      }, 10)
    },
    close() {
      this.isOpen = false
      setTimeout(() => {
        this.isShow = false
      }, 250)
    },
    lossFocusClose(e) {
      if (this.realEnableLossFocusClose) {
        if (!this.$refs.modal.contains(e.target)) {
          this.close()
        }
      }
    },
    confirm(option) {
      this.realTitle = option.title || '提示'
      this.realIcon = option.icon || ''
      this.realContent = option.content || ''
      this.okText = option.okText || '确认'
      this.cancelText = option.cancelText || null
      this.confirmOk = option.onOk || (() => {
      })
      this.confirmCancel = option.onCancel || (() => {
      })
      this.realEnableCloseIcon = option.closeIcon || false
      this.realEnableLossFocusClose = option.lossFocusClose || false
      this.open()
    }
  },
  mounted() {
    this.$refs.wrapper.addEventListener('click', this.lossFocusClose)
  },
  beforeUnmount() {
    this.$refs.wrapper.removeEventListener('click', this.lossFocusClose)
  },
  watch: {
    '$route': {
      handler() {
        this.close()
      }
    },
    'title': {
      immediate: true,
      handler(newVal) {
        this.realTitle = newVal
      }
    },
    'icon': {
      immediate: true,
      handler(newVal) {
        this.realIcon = newVal
      }
    },
    'content': {
      immediate: true,
      handler(newVal) {
        this.realContent = newVal
      }
    },
    'enableCloseIcon': {
      immediate: true,
      handler(newVal) {
        this.realEnableCloseIcon = newVal
      }
    },
    'enableLossFocusClose': {
      immediate: true,
      handler(newVal) {
        this.realEnableLossFocusClose = newVal
      }
    }
  }
}
</script>

<style>
.modal .md-action .m-button {
  padding-left: 40px;
  padding-right: 40px;
}

.modal .md-action .m-button:not(:first-child) {
  margin-left: 20px;
}
</style>
<style scoped>
.modal-wrapper .default-content {
  width: 442px;
  padding: 0 32px;
}

.modal-wrapper.trans-anima .modal {
  opacity: 1;
  margin-top: 120px;
}

.modal-wrapper.trans-anima {
  background-color: rgba(0, 0, 0, .45);
}

.modal .md-body-content {
  text-align: center;
  width: 100%;
  margin-top: 12px;
  font-size: 14px;
  color: #424e67;
}

.modal .md-body-icon {
  font-size: 50px;
  padding-top: 10px;
}

.modal .md-footer {
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding-top: 24px;
  padding-bottom: 24px;
}

.modal .md-body {
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal .md-header-icon {
  float: right;
  color: #979797;
  cursor: pointer;
}

.modal .md-header {
  font-weight: 700;
  font-size: 14px;
  color: #333;
  padding: 12px 24px;
  box-shadow: 0 1px 0 0 #f5f6fa;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 8999;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transition: all .25s;
}

.modal {
  background-color: #fff;
  min-width: 442px;
  margin-top: 80px;
  border-radius: 12px;
  /*overflow: hidden;*/
  opacity: 0;
  transition: all .25s;
}

@media (max-width: 466px) {
  .modal {
    width: calc(100% - 24px);
  }
}
</style>