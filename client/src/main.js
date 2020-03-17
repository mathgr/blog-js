import Vue from "vue";
import App from "./App.vue";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;

Vue.prototype.$api_url = 'http://localhost:3000';

new Vue({
  render: h => h(App)
}).$mount("#app");
