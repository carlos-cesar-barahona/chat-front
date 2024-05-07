import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import router from '@/router/router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@/assets/styles/main.scss';

Vue.use(VueSweetalert2);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
