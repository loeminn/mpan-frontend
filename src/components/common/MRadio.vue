<template>
  <label class="m-radio">
    <span class="radio-item">
      <input class="m-radio-input" type="radio" v-model="modelValue" :value="value" @change="changeModelValue">
      <span class="m-radio-span">
        <span class="m-radio-span-inner"></span>
      </span>
    </span>
    <span v-if="label" class="label">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: "MRadio",
  props: {
    label: String,
    modelValue: null,
    value: null
  },
  methods: {
    changeModelValue() {
      this.$emit('update:modelValue', this.modelValue)
    }
  }
}
</script>

<style scoped>
.m-radio {
  display: inline-block;
  cursor: pointer;
}

.radio-item {
  position: relative;
  width: 16px;
  display: inline-block;
}

.m-radio-input {
  position: absolute;
  width: 0;
  height: 0;
  z-index: -1;
}

.m-radio-input:checked + .m-radio-span {
  border: #46a7ff solid 1px;
  background-color: #46a7ff;
}

.m-radio-input:hover + .m-radio-span {
  border: #46a7ff solid 1px;
}

.m-radio-input:checked + .m-radio-span:after {
  transform: scale(1);
}

.m-radio-span:after {
  content: '';
  top: 3px;
  left: 3px;
  display: table;
  height: 6px;
  width: 6px;
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  transform: scale(0);
  transition: all .3s;
}

.m-radio-span {
  transform: translateY(2px);
  width: 14px;
  height: 14px;
  line-height: 14px;
  border-radius: 50%;
  border: 1px solid #dcdfe6;
  display: inline-block;
  background-color: #fff;
  position: relative;
  transition: all .2s;
}

.label {
  font-size: 14px;
  color: #606266;
  padding-left: 8px;
}
</style>