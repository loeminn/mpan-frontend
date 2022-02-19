<template>
  <div class="side-bar">
    <slot></slot>
  </div>
</template>

<script>
import SideBarItem from "@/components/sideBar/SideBarItem";

export default {
  name: "SideBar",
  components: {SideBarItem},
  methods: {
    switchActivePath(value) {
      this.$router.push(value)
    }
  }
}
</script>

<style>
.side-bar {
  height: 100%;
  display: flex;
  padding: 20px 12px;
  flex-direction: column;
}

.side-bar .side-bar-item {
  position: relative;
}

.side-bar .side-bar-item:not(:first-child) {
  margin-top: 1px;
}

.side-bar .side-bar-item:not(:first-child):after {
  content: " ";
  left: 20px;
  right: 20px;
  height: 1px;
  background-color: #f1f2f4;;
  top: -1px;
  position: absolute;
}
</style>