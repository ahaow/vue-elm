import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './assets/scss/index.scss';
import './assets/js/index';
import api from './api/index';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading: 'https://tva4.sinaimg.cn/large/007DFXDhgy1g4vyylplwrj305k05kmx2.jpg',
  attempt: 1
})
Vue.prototype.$api = api;
Vue.config.productionTip = false

// 路由导航守卫
router.beforeEach(function (to, from, next) {
  /**
   * 当用户跳转到 order , search , user 这三个页面的时候 , 验证是否登录过，如果没有登录 就跳转到 login 页面 让他登录
   */
  const nextRoute = [ 'order', 'search', 'user'];  
  if (nextRoute.indexOf(to.name) >= 0) {
      //未登录
      if(!window.localStorage.getItem('id')) {
        router.push({name: 'login'})
      }
  }
  next();
});



new Vue({
  router,
  store,
  render: h => h(App),
  beforeMount() {
    // 当用户刷新时，将localStorage中的buyCart 存储在 vuex里面
    if(JSON.stringify(this.$store.state.cartList) === "{}") {
      this.$store.commit('REFRESH_CART');
    }
  },
}).$mount('#app')
