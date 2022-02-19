<template>
  <button class="btn-list-item" @click.stop>
    <span v-if="icon" class="btn-icon">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="'#icon-'+icon"></use>
      </svg>
    </span>
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: "ButtonListItem",
  props: {
    icon: {
      type: String,
    }
  }
}
</script>

<style scoped>
.btn-list-item .btn-icon {
  margin-right: 8px;
}

.btn-list-item {
  width: 100%;
  display: flex;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  line-height: 30px;
  padding-left: 16px;
  cursor: pointer;
}

.btn-list-item:hover {
  background-color: #f5f6fa;
}
</style>