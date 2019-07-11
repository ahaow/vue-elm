import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/scss/index.scss';
import './assets/js/index';

import axios from 'axios';
import VueAxios from 'vue-axios';

import VueLazyload from 'vue-lazyload';
axios.defaults.withCredentials = true;
Vue.use(VueAxios,axios);
Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading: 'https://tva4.sinaimg.cn/large/007DFXDhgy1g4vyylplwrj305k05kmx2.jpg',
  attempt: 1
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
