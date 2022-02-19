<template>
  <div class="side-bar-quota">
    <div class="quota-progress">
      <div class="rate" :style="{width:rate+'%',backgroundColor:rateColor}"></div>
    </div>
    <div class="quota-body">
      <span class="text">{{ fileSize(usedCapacity) }}/{{ fileSize(totalCapacity) }}</span>
      <span class="action">扩容</span>
    </div>
  </div>
</template>

<script>
import {getFileStatistics} from "@/api/file";
import {convertFileSize} from "@/utils/FileSize";

export default {
  name: "SideBarQuota",
  data() {
    return {
      totalCapacity: 100,
      usedCapacity: 0,
      rateColor: ''
    }
  },
  computed: {
    rate() {
      const rate = (this.usedCapacity / this.totalCapacity * 100).toFixed(2);
      if (rate < 75) {
        this.rateColor = '#24b1ff'
      } else if (rate < 90) {
        this.rateColor = '#ffd821'
      } else {
        this.rateColor = '#ff4d4f'
      }
      return rate
    }
  },
  methods: {
    fileSize(size) {
      return convertFileSize(size)
    },
    refreshQuota() {
      getFileStatistics().then(res => {
        this.totalCapacity = res.data.totalCapacity
        this.usedCapacity = res.data.usedCapacity
        this.$store.commit('updateRemainingSpace', this.totalCapacity - this.usedCapacity);
      })
    }
  },
  mounted() {
    this.refreshQuota()
    this.$bus.on('updateUsedCapacity', fileSize => {
      this.usedCapacity += fileSize
    })
    this.$bus.on('refreshQuota', () => {
      this.refreshQuota()
    })
  },
  beforeUnmount() {
    this.$bus.all.delete('updateUsedCapacity')
    this.$bus.all.delete('refreshQuota')
  },
  watch: {
    'usedCapacity': {
      handler(newVal) {
        this.$store.commit('updateRemainingSpace', this.totalCapacity - this.usedCapacity)
      }
    }
  }
}
</script>

<style scoped>
.side-bar-quota {
  padding-left: 18px;
  padding-right: 18px;
}

.quota-progress {
  height: 6px;
  border-radius: 4px;
  background-color: #eeeff4;
  position: relative;
  overflow: hidden;
}

.quota-progress .rate {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 4px;
  max-width: 100%;
  transition: all .3s;
}

.quota-body {
  margin-top: 8px;
  font-size: 12px;
  line-height: 14px;
}

.quota-body .action {
  color: #06a7ff;
  float: right;
  font-weight: 700;
  cursor: pointer;
}

.quota-body .text {
  color: #afb3bf;
}
</style>