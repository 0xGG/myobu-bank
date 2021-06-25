import Vue from "vue";
import App from "./App.vue";
import "./assets/css/animate.min.css";
// ------------ css ----------
import "./assets/css/bootstrap.min.css";
import "./assets/css/main.css";
import "./assets/css/responsive.css";
import "./assets/css/themify-icons.css";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
