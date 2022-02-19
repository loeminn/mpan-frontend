<template>
  <div class="m-select" :class="{'is-focus':isFocus}" ref="select">
    <div @click="toggleDropdown">
      <input class="m-select-input" type="text" :value="selectLabel" readonly :placeholder="placeholder">
      <span class="m-select-input-suffix">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala"></use>
        </svg>
      </span>
    </div>
    <div class="m-select-dropdown" v-show="isDropdownShow">
      <slot/>
    </div>
  </div>
</template>

<script>

export default {
  name: "MSelect",
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      isFocus: false,
      isDropdownShow: true,
      clickTimeout: null,
      selectLabel: ''
    }
  },
  methods: {
    toggleDropdown() {
      clearTimeout(this.clickTimeout)
      if (this.isFocus) {
        this.close()
      } else {
        this.open()
      }
    },
    changeValue(option) {
      this.$emit('update:modelValue', option.value)
      this.selectLabel = option.label
      this.close()
      this.validate()
    },
    close() {
      this.isFocus = false
      this.clickTimeout = setTimeout(() => {
        this.isDropdownShow = false
      }, 250)
    },
    open() {
      this.isDropdownShow = true
      this.clickTimeout = setTimeout(() => {
        this.isFocus = true
      }, 30)
    },
    lossFocusClose(e) {
      if (!this.$refs.select.contains(e.target)) {
        this.close()
      }
    },
    validate() {
      if (this.$parent.$options.name === 'MFormItem') {
        if (this.$parent.prop) {
          this.$parent.validate()
        }
      }
    }
  },
  watch: {
    'modelValue': {
      handler(newVal) {
        if (newVal === '') {
          this.selectLabel = ''
        }
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.lossFocusClose)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.lossFocusClose)
  },
}
</script>

<style scoped>
.m-select-input::placeholder {
  color: #c0c4cc;
}

.m-select.is-focus .m-select-dropdown {
  transform: scaleY(1);
  opacity: 1;
}

.m-select.is-focus .m-select-input-suffix svg {
  transform: rotate(-180deg);
}

.m-select.is-focus > div .m-select-input {
  border-color: #06a7ff;
}

.m-select-dropdown {
  width: 100%;
  background-color: #fff;
  overflow-y: auto;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .2);
  border-radius: 8px;
  margin-top: 6px;
  padding: 8px 0;
  z-index: 9999;
  opacity: 0;
  transform-origin: top;
  transform: scaleY(0);
  transition: all .25s;
}

.m-select-input-suffix {
  position: absolute;
  color: #c0c4cc;
  right: 6px;
  width: 25px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}

.m-select-input-suffix svg {
  transition: all .2s;
}

.m-select {
  display: inline-block;
  position: relative;
}

.m-select-input {
  border: 1px solid #dcdfe6;
  font-size: 12px;
  height: 32px;
  width: 100%;
  line-height: 32px;
  border-radius: 8px;
  transition: all .2s;
  padding-right: 30px;
  padding-left: 12px;
  cursor: pointer;
}

.m-select:hover .m-select-input {
  border-color: #c0c4cc;
}

.m-select-dropdown {
  position: absolute;
}
</style>