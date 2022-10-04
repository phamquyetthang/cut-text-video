import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import Notifications from "vue-notification";
import App from './App.vue'
import vuetify from './plugins/vuetify'
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

Vue.use(Notifications);
Vue.config.productionTip = false
Vue.use(VueSweetalert2, { heightAuto: false, confirmButtonText: `<span style="padding: 0 10px">OK</span>` });
Vue.component("vue-draggable-resizable", VueDraggableResizable);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
