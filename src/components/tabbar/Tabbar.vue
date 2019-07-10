<template>
  <div class="tabbar">
    <div v-for="(item,index) in tabbarArr" :key="index" class="tabbar-item">
      <router-link :to="item.link">
        <i :class="'iconfont ' + item.icon"></i>
        <span>{{item.title}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {
      tabbarArr: [
        {
          link: "/home",
          icon: "icon-home",
          title: "首页"
        },
        {
          link: "/search",
          icon: "icon-search",
          title: "搜索"
        },
        {
          link: "/order",
          icon: "icon-orderedlist",
          title: "订单"
        },
        {
          link: "/user",
          icon: "icon-user",
          title: "我的"
        }
      ]
    };
  },
};
</script>

<style lang="scss">
.tabbar {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, 0.1);
  .tabbar-item {
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
      &.active i {
          color: #00ACFD;
      }
      &.active span {
          color: #00ACFD;   
      }
      i {
        display: block;
        margin-top: 0.085333rem;
        font-size: 24px;
        color: #999;
      }
      span {
        display: block;
        margin-top: 0.085333rem;
        color: #999;
        font-size: 10px;
      }
    }
  }
}
</style>
