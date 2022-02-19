<template>
  <div class="search-inp">
    <m-input v-model="searchStr" placeholder="搜索我的文件">
      <template v-slot:prefix>
        <svg class="icon" aria-hidden="true" @click="searchClick">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </template>
    </m-input>
  </div>
</template>

<script>
import MInput from "@/components/common/MInput";

export default {
  name: "SearchInput",
  components: {MInput},
  props: {
    modelValue: String,
  },
  data() {
    return {
      searchStr: ''
    }
  },
  methods: {
    searchClick() {
      this.$router.push({path: '/', query: {search: this.searchStr}})
    }
  }
}
</script>

<style>
.search-inp .m-text-input {
  background-color: #fafafc !important;
  border-radius: 18px;
  border-width: 0 !important;
  font-size: 12px;
  padding-left: 34px;
}

.search-inp .m-input {
  width: 200px;
  height: 30px;
}

.search-inp .m-input .prefix svg {
  cursor: pointer;
}
</style>