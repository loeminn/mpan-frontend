<template>
  <div class="loading-mask">
    <div class="loading-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jiazai3"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingMask"
}
</script>

<style scoped>
.loading-mask {
  z-index: 10;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
}

.loading-mask .loading-icon {
  color: #63b8ff;
  font-size: 42px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.loading-mask .loading-icon svg {
  animation-name: isLoading;
  animation-duration: 1.2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes isLoading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>