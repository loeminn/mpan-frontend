<template>
  <div class="m-option" @click="clickOption" :class="{'selected':isSelected}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MOption",
  props: {
    value: {
      type: [String, Number]
    }
  },
  computed: {
    isSelected() {
      return this.$parent.modelValue === this.value
    },
    label() {
      return this.$el.innerText
    }
  },
  methods: {
    clickOption() {
      this.$parent.changeValue({value: this.value, label: this.label})
    }
  },
  mounted() {
    if (this.$parent.modelValue === this.value) {
      this.clickOption()
    }
  }
}
</script>

<style scoped>
.m-option.selected {
  background-color: #e6f6ff !important;
  color: #06a7ff;
}

.m-option:hover {
  background-color: #fafafc;
}

.m-option {
  padding: 0 20px;
  text-align: start;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
}
</style>