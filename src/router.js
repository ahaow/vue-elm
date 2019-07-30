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
        name: 'city'
      }
    },
    {
      path: '/city',
      name: 'city',
      component: () => import(/* webpackChunkName: "about" */ './views/City.vue'),
      meta: {
        tabbar: true
      }
    },
    {
      path: '/cityarea',
      name: 'cityarea',
      component: () => import(/* webpackChunkName: "about" */ './views/CityArea.vue'),
      meta: {
        tabbar: true
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
      path: '/chooseAddress',
      name: 'chooseAddress',
      component: () => import('./views/ChooseAddress/ChooseAddress.vue'),
      children: [
        {
          path: 'addAddress',
          name: 'addAddress',
          component: () => import('./views/ChooseAddress/Addaddress.vue'),
          meta: {
            tabbar: true
          }
        }
      ],
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
      component: () => import('./views/Order.vue'),
      children: [{
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('./views/OrderDetail.vue'),
        meta: {
          tabbar: true
        }
      }]
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue')
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('./views/Info/Info.vue'),
      meta: {
        tabbar: true
      },
      children: [{
        path: 'setname',
        name: 'setname',
        component: () => import('./views/Info/SetName.vue'),
        meta: {
          tabbar: true
        }
      },{
        path: 'setpsw',
        name: 'setpsw',
        component: () => import('./views/Info/SetPsw.vue'),
        meta: {
          tabbar: true
        }
      }]
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
