import ModalVue from "@/components/modal/Modal";
import {createApp} from "vue";

export let Modal;

export default {
    install: (Vue) => {
        const el = document.createElement('div')
        Modal = createApp(ModalVue).mount(el)
        document.body.appendChild(Modal.$el)
        Vue.config.globalProperties.$modal = Modal
    }
}