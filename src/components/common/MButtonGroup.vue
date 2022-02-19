<template>
  <div class="btn-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MButtonGroup"
}
</script>

<style>
.btn-group {
  display: inline-block;
  white-space: nowrap;
}

.btn-group .m-button {
  border-radius: 0;
  position: relative;
}

.btn-group .m-button:first-child {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.btn-group .m-button:last-child {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.btn-group .m-button:not(:first-child):after {
  height: 12px;
  width: 1px;
  position: absolute;
  background-color: rgba(6, 167, 255, .23);
  content: " ";
  left: 0;
  top: 50%;
  margin-top: -6px;
}
</style>