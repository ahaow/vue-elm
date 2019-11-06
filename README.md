# 使用Vue全家桶

## 前言

注： 这个是自己完完全全写的，和 [**vue2-elm**](https://github.com/bailicangdu/vue2-elm) 并没有什么关联，但是 ui 是借鉴了作者的ui布局样式结构，连md说明格式都是借鉴的(啊哈哈233)；



## 技术栈

vue2 + vue-router + vuex + axios + better-scroll（移动端滑动） + vue-awesome-swiper（swiper组件） + vue-lazyload（图片懒加载） + scss（css预处理器）



## 项目运行

```md
git clone https://github.com/ahaow/vue-elm.git

cd vue-ele

npm install / yarn add / cnpm install

npm run serve / yarn serve

```



## API接口

1、api接口地址： vue2-ele项目作者提供了api接口：[vue2-ele Api接口](https://github.com/bailicangdu/node-elm/blob/master/API.md)

2、关于管理vue中Axios的封装和API接口的管理，我参考了掘金上面的一篇文章： [vue中Axios的封装和API接口的管理](https://juejin.im/post/5b55c118f265da0f6f1aa354)



## 功能



- [x] 定位功能 -- 完成
- [x] 选择城市 -- 完成
- [x] 搜索地址 -- 完成
- [x] 展示所选地址附近商家列表 -- 完成
- [x] 商家首页 -- 完成
- [x] 商家详情 之 商品列表 、商家评论、商家信息 -- 完成 
- [x] 商家购物车 -- 完成
- [x] 确定订单 -- 完成
- [ ] 确认下单 -- 没法做 - -  提供的api接口 我尝试了下 有点错误。。。
- [x] 地址列表、新增地址、删除地址 -- 完成
- [x] 搜索美食，餐馆 -- 完成
- [x] 订单列表 -- 完成
- [x] 订单详情 -- 完成
- [x] 我的 -- 完成
- [x] 登录 -- 完成



基本上大体的功能都已经完成了，后面陆陆续续将其他页面完善；



## 项目的一些值得我注意的地方



1、vuex 和 localStorage 做 数据可持续存储

```js
// 场景：把商品加入购物车后，没有保存到后台的情况下，前端来存，就可以通过这种方式。

// 使用: 在vue的beforeMount钩子中，将localstorag中的数据保存到vuex

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
```



2、路由导航守卫

```js
// 场景：当用户跳转到 router,search,user这三个页面的时候，验证是否登录过，如果没有登录，跳转到login页面，让他登录

router.beforeEach((to,from,next) => {
    const nextRoute = ['order','search','user']
    if(nextRoute.indexOf(to.name) >= 0) {
        // 未登录
        if(!window.localStorage.getItem('id')) {
            router.push({name: 'login'})
        }
    }
    next();
})

```


