<template>
  <div class="step"
       :class="{
    'over':steps.count===index,
  'active':steps.active===index,
  'finish':steps.active>index,
  'wait':steps.active<index}">
    <div class="step-icon">
      <span class="success-icon" v-if="steps.active>index">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dui"></use>
        </svg>
      </span>
      <span v-else>{{ index }}</span>
    </div>
    <div class="step-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "Step",
  inject: ['steps'],
  props: {
    title: String
  },
  data() {
    return {
      index: 0
    }
  },
  mounted() {
    this.index = ++this.steps.count
  }
}
</script>

<style scoped>
.step.over {
  flex: none;
  margin-right: 0;
}

.step.over .step-title:after {
  height: 0;
  width: 0;
}

.step-title:after {
  position: absolute;
  top: 10px;
  left: 100%;
  display: block;
  width: 999px;
  height: 2px;
  background: #e5e9ef;
  content: "";
}

.step.over .step-title {
  padding-right: 0;
}

.step-title {
  padding-right: 12px;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  position: relative;
}

.success-icon {
  margin-top: 2px;
  font-size: 14px;
  font-weight: 500;
}

.step {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  overflow: hidden;
  margin-right: 10px;
}

.step.wait .step-title {
  color: #99a2aa;
}

.step.wait .step-icon {
  color: #ccd0d7;
  border-color: #ccd0d7;
}

.step.active .step-title {
  color: #46a7ff;
}

.step.active .step-icon {
  color: #46a7ff;
  border-color: #46a7ff;
}

.step.finish .step-title {
  color: #67c23a;
}

.step.finish .step-icon {
  color: #67c23a;
  border-color: #67c23a;
}

.step-icon {
  border-radius: 50%;
  border: #46a7ff solid 2px;
  color: #46a7ff;
  font-size: 14px;
  font-weight: 600;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
}
</style>