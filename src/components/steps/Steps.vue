<template>
  <div class="steps">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Steps",
  provide() {
    return {
      steps: this
    }
  },
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count:0
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.steps {
  display: flex;
}
</style>