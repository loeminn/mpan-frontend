import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Message from "@/plugins/Message"
import Mitt from "@/plugins/Mitt"
import Modal from "@/plugins/Modal";

const app = createApp(App)
app
    .use(store)
    .use(router)
    .use(Mitt)
    .use(Message)
    .use(Modal)
    .mount('#app')