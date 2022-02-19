<template>
  <div class="btn-list" @click.stop>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ButtonList"
}
</script>

<style scoped>
.btn-list {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  background-color: #fff;
  color: #03081a;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  border-radius: 6px;
  padding: 6px 0;
  cursor: default;
}
</style>