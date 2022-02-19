<template>
  <div class="nav-bar">
    <div class="left" @click="$router.push('/')">
      <slot name="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yunpan"></use>
        </svg>
        <span>MPan</span>
      </slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.left {
  display: flex;
  align-items: center;
  margin-left: 22px;
  cursor: pointer;
}

.left .icon {
  font-size: 44px;
  padding-right: 8px;
}

.left span {
  font-size: 24px;
}

.right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
}

.nav-bar {
  display: flex;
  height: 56px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .06);
  position: relative;
}
</style>