<template>
  <form class="m-form" @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "MForm",
  provide() {
    return {
      form: this
    }
  },
  props: {
    model: Object,
    rules: Object,
  },
  data() {
    return {
      fields: []
    }
  },
  methods: {
    formItemMounted(item) {
      this.fields.push(item)
    },
    removeFiledItem(item) {
      this.fields.splice(this.fields.indexOf(item), 1)
    },
    validate(callback) {
      const tasks = this.fields.map(item => {
        return item.validate()
      })
      Promise.all(tasks).then(() => {
        callback(true)
      }).catch(() => {
        callback(false)
      })
    },
    validateField(prop, callback) {
      if (!callback) {
        callback = () => {
        }
      }
      const task = this.fields.find(item => {
        return item.prop === prop
      })
      task.validate().then(() => {
        callback(true)
      }).catch(() => {
        callback(false)
      })
    },
    clearErrorStatus() {
      this.fields.forEach(item => {
        item.isError = false
        item.message = ''
      })
    }
  }
}
</script>

<style scoped>

</style>