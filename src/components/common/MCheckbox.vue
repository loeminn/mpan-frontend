<template>
  <label class="m-checkbox" :class="{disabled:disabled}" @click.stop @dblclick.stop>
      <span class="checkbox-item">
        <input class="m-checkbox-input" type="checkbox" v-model="modelValue" @click="click"
               @change="changeModelValue"
               :value="value"
               :disabled="disabled">
        <span class="m-checkbox-span"></span>
      </span>
    <span v-if="label" class="label">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: "MCheckbox",
  props: {
    label: String,
    modelValue: [Array, Boolean],
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeModelValue() {
      this.$emit('update:modelValue', this.modelValue)
    },
    click(e) {
      this.$emit('clickInput', e.currentTarget.checked)
    }
  }
}
</script>

<style scoped>
.m-checkbox.disabled .m-checkbox-span {
  border: #ddd solid 1px !important;
  background-color: #edf2fc;
}

.m-checkbox.disabled {
  cursor: not-allowed !important;
}

.m-checkbox {
  display: inline-block;
  cursor: pointer;
}

.checkbox-item {
  display: inline-block;
  width: 16px;
  position: relative;
}

.m-checkbox-input {
  position: absolute;
  width: 0;
  height: 0;
  z-index: -1;
}

.m-checkbox-span {
  transform: translateY(2px);
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: #ffffff;
  border: #ddd solid 1px;
  border-radius: 4px;
  position: relative;
  transition: all .3s;
}

.m-checkbox-input:checked + .m-checkbox-span {
  background-color: #46a7ff;
  border: #46a7ff solid 1px;
}

.m-checkbox-input:hover + .m-checkbox-span {
  border: #46a7ff solid 1px;
}

.m-checkbox-input:checked + .m-checkbox-span:before {
  display: block;
  content: "";
  height: 8px;
  width: 4px;
  border-bottom: white solid 1px;
  border-right: white solid 1px;
  position: absolute;
  top: 1px;
  left: 4px;
  transform: rotate(45deg);
}

.label {
  font-size: 14px;
  color: #606266;
  padding-left: 8px;
}
</style>