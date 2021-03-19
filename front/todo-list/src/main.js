import Vue from "vue"
import App from "./App.vue"
import router from '@/router/index'
import '@/assets/plugins/index'
import '@/assets/layouts/layout.css'
import '@/assets/icons/icons'
import store from './store/index'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h =>
   h(App)
}).$mount("#app");
