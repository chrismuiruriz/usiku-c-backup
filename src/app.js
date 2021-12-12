import Vue from "vue";

import { defineCustomElements as defineIonPhaser } from "@ion-phaser/core";

import App from "./App.vue";

import router from "./router";

import "./scss/style.scss";

Vue.config.productionTip = false;

Vue.config.ignoredElements = [/ion-\w*/];

defineIonPhaser(window);

new Vue({
  name: "Root",
  router,
  render: (h) => h(App),
}).$mount("#app");
