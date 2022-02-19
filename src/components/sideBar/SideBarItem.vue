<template>
  <div class="side-bar-item">
    <div class="main"
         :class="{'active':$route.path===path,'no-sub':subList.length===0}"
         @click="$parent.switchActivePath(path)">
      <span v-if="subList.length!==0"
            class="arrow-down-icon"
            :class="{'sub-hide':subIsHide}"
            @click="toggleSub">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yuanjiaojiantou"></use>
        </svg>
      </span>
      <span class="text"><slot></slot></span>
    </div>
    <div class="sub"
         v-if="subList.length!==0"
         ref="sub"
         :class="{'sub-hide':subIsHide}"
    >
      <div class="sub-item"
           :class="{'active':$route.path===item.path}"
           v-for="item in subList"
           @click="$parent.switchActivePath(item.path)">
        <span class="sub-item-icon">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="'#icon-'+item.iconId"></use>
          </svg>
        </span>
        <span class="text">
          {{ item.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBarItem",
  props: {
    subList: {
      type: Array,
      default: []
    },
    path: String
  },
  data() {
    return {
      subIsHide: false,
      determineHeight: false
    }
  },
  methods: {
    toggleSub() {
      this.subIsHide = !this.subIsHide
    }
  },
  mounted() {
    if (this.subList.length !== 0) {
      this.$refs.sub.style.height = this.$refs.sub.offsetHeight + 'px'
    }
  }
}
</script>

<style scoped>
.main.no-sub {
  padding-left: 42px;
}

.arrow-down-icon.sub-hide svg {
  transform: rotate(0deg);
}

.main .text {
  margin-left: 10px;
}

.side-bar-item .sub {
  overflow: hidden;
  transition: all .4s;
}

.side-bar-item .sub.sub-hide {
  height: 0 !important;
}

.sub-item .text {
  margin-left: 12px;
}

.arrow-down-icon {
  padding: 0 5px;
}

.arrow-down-icon svg {
  margin: 2px auto;
  font-size: 8px;
  transform: rotate(90deg);
  transition: all .3s;
}

.sub-item-icon svg {
  margin: 1px auto;
  font-size: 12px;
}

.sub-item {
  padding-left: 53px;
  color: #636d7e;
  font-size: 12px;
  font-weight: 400;
  line-height: 40px;
  border-radius: 12px;
  cursor: pointer;
}

.sub-item:hover {
  background-color: #fafafc !important;
}

.sub-item.active {
  color: #06a7ff;
  background-color: #eef9fe;
}

.main {
  font-size: 14px;
  color: #636d7e;
  font-weight: 700;
  border-radius: 10px;
  line-height: 40px;
  padding-left: 24px;
  padding-right: 18px;
  width: 177px;
  cursor: pointer;
}

.main:hover {
  background-color: #fafafc !important;
}

.main.active {
  color: #06a7ff;
  background-color: #eef9fe;
}
</style>