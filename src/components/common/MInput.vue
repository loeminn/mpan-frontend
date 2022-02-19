<template>
  <div class="m-input" :class="{'readonly':readonly}">
    <span class="prefix">
      <slot name="prefix"></slot>
    </span>
    <input
        class="m-text-input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        @input="onInput"
        @blur="onBlur">
    <slot name="suffix"></slot>
  </div>
</template>

<script>

export default {
  name: "MInput",
  props: {
    modelValue: String,
    placeholder: String,
    pwd: Boolean,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    type() {
      return this.pwd ? 'password' : 'text'
    }
  },
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    onBlur() {
      this.validate()
    },
    validate() {
      if (this.$parent.$options.name === 'MFormItem') {
        if (this.$parent.prop) {
          this.$parent.validate()
        }
      }
    }
  }
}
</script>

<style scoped>
.m-input {
  width: 100%;
  height: 40px;
  position: relative;
}

.m-input.readonly .m-text-input {
  border: #dcdfe6 solid 1px;
}

.m-text-input {
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  width: 100%;
  border: #dcdfe6 solid 1px;
  border-radius: 8px;
  background-color: #fff;
  transition: all .2s;
}

.m-text-input::placeholder {
  color: #afb3bf;
}

.m-text-input:hover {
  border: #46a7ff solid 1px;
}

.m-text-input:focus {
  border: #46a7ff solid 1px;
  background-color: white;
}

.m-input .prefix {
  position: absolute;
  top: 0;
  left: 14px;
  height: 100%;
  text-align: center;
  transition: all .3s;
  color: #c0c4cc;
  vertical-align: middle;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
}
</style>