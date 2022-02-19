<template>
  <div class="message">
    <message-notice v-for="item in messageList" :type="item.type" :message="item.message"
                    :duration="item.duration" :item="item" :key="item.key||item" @removeItem="removeItem"/>
  </div>
</template>

<script>
import MessageNotice from "@/components/message/MessageNotice";

export default {
  name: "Message",
  components: {MessageNotice},
  data() {
    return {
      messageList: []
    }
  },
  methods: {
    loading(message, key) {
      const mn = {type: 'loading', message: message, duration: 0, key: key}
      this.createItem(mn)
      return () => {
        const i = this.messageList.indexOf(mn)
        this.messageList[i].duration = 1
      }
    },
    success(message, duration, key) {
      this.createMessageNotice('success', message, duration, key)
    },
    error(message, duration, key) {
      this.createMessageNotice('error', message, duration, key)
    },
    warning(message, duration, key) {
      this.createMessageNotice('warning', message, duration, key)
    },
    info(message, duration, key) {
      this.createMessageNotice('info', message, duration, key)
    },
    createMessageNotice(type, message, duration = 3000, key) {
      const mn = {type, message, duration, key}
      this.createItem(mn)
    },
    removeItem(item) {
      this.messageList.splice(this.messageList.indexOf(item), 1)
    },
    createItem(item) {
      if (item.key) {
        const i = this.messageList.findIndex(f => f.key === item.key);
        if (i !== -1) {
          this.messageList[i].type = item.type
          this.messageList[i].message = item.message
          this.messageList[i].duration = item.duration
          return
        }
      }
      this.messageList.push(item)
    }
  },
}
</script>

<style scoped>
.message {
  position: fixed;
  top: 54px;
  z-index: 9999;
  left: 0;
  width: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>