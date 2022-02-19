<template>
  <div class="m-form-item" :class="{'error':isError}">
    <slot></slot>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
import Schema from 'async-validator'

Schema.warning = () => {
}
export default {
  name: "MFormItem",
  inject: ['form'],
  data() {
    return {
      message: '',
      isError: false,
      rule: []
    }
  },
  props: {
    prop: String
  },
  mounted() {
    if (this.prop) {
      this.rule = this.form.rules[this.prop]
      this.form.formItemMounted(this)
    }
  },
  methods: {
    validate() {
      const descriptor = {
        [this.prop]: this.rule
      };
      const validator = new Schema(descriptor)
      return validator.validate({
        [this.prop]: this.form.model[this.prop]
      }, errors => {
        if (errors) {
          this.message = errors[0].message
          this.isError = true
        } else {
          this.message = ''
          this.isError = false
        }
      })
    }
  },
  beforeUnmount() {
    this.form.removeFiledItem(this)
  }
}
</script>

<style scoped>
.message {
  height: 20px;
  font-size: 12px;
  color: #f56c6c;
}
</style>
<style>
.m-form-item.error .m-text-input {
  border: #f56c6c solid 1px !important;
}

.m-form-item.error .m-select-input {
  border: #f56c6c solid 1px !important;
}
</style>