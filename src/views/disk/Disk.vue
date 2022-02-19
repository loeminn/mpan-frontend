<template>
  <div>
    <div class="main">
      <disk-side-bar/>
      <div class="disk-body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import DiskSideBar from "@/views/disk/childComps/DiskSideBar";
import DiskNavBar from "@/components/navBar/DiskNavBar";

export default {
  name: "Disk",
  components: {DiskNavBar, DiskSideBar},
  created() {
  }
}
</script>

<style scoped>
.main {
  height: calc(100vh - 56px);
  display: flex;
  min-height: 480px;
}

.disk-body {
  flex: 1;
  padding: 18px 24px 0 18px;
  height: 100%;
}
</style>