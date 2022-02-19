import mitt from "mitt";

export let Mitt
export default {
    install: (Vue) => {
        Mitt = new mitt()
        Vue.config.globalProperties.$bus = Mitt
    }
}