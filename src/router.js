import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/business/:id',
      name: 'business',
      component: () => import(/* webpackChunkName: "about" */ './views/Business/Business.vue'),
      redirect: {name: 'businessGoods'},
      children: [
        {
          path: 'businessGoods',
          name: 'businessGoods',
          component: () => import('./views/Business/BusinessGoods.vue'),
          meta: {
            tabbar: true
          }
        }, {
          path: 'businessRatings',
          name: 'businessRatings',
          component: () => import('./views/Business/BusinessRatings.vue'),
          meta: {
            tabbar: true
          }
        }, {
          path: 'businessSeller',
          name: 'businessSeller',
          component: () => import('./views/Business/BusinessSeller.vue'),
          meta: {
            tabbar: true
          }
        }],
      meta: {
        tabbar: true
      }
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: () => import('./views/ConfirmOrder.vue'),
      meta: {
        tabbar: true
      }
    },
    {
      path: '/addresspage',
      name: 'addresspage',
      component: () => import('./views/AddressPage/AddressPage.vue'),
      meta: {
        tabbar: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./views/Order.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        tabbar: true
      }
    },
  ]
})
