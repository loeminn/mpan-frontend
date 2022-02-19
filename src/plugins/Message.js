import MessageVue from "@/components/message/Message";
import {createApp} from "vue";

export let Message;

export default {
    install: (Vue) => {
        const el = document.createElement('div')
        Message = createApp(MessageVue).mount(el)
        document.body.appendChild(Message.$el)
        Vue.config.globalProperties.$message = Message
    }
}