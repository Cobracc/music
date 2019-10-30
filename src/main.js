import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(MintUI);
import "./assets/css/mint.less";
import VueTouch from "vue-touch";
Vue.use(VueTouch, { name: "v-touch" });
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
// axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.baseURL = "http://140.143.128.100:3000";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
