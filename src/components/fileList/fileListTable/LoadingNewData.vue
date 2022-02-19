<template>
  <div class="loading-new">
        <span class="loading-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-btn-loading"></use>
          </svg>
        </span>
    <span>加载新数据中...</span>
  </div>
</template>

<script>
export default {
  name: "LoadingNewData"
}
</script>

<style scoped>
.loading-new {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 66px;
  color: #afb3bf;
  font-size: 14px;
}

.loading-icon {
  margin-right: 8px;
  margin-top: 2px;
}

.loading-icon svg {
  font-size: 16px;
  animation-name: loading;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>