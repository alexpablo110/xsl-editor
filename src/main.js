// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

/* load prism somewhere */
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
/* vue-prism-editor dependency */
import "vue-prism-editor/dist/VuePrismEditor.css";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
