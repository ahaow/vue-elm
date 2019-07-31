<template>
  <div id="app">
    <keep-alive v-if='!$route.meta.noKeepAlive'>
      <router-view />
    </keep-alive>
    <router-view v-if='$route.meta.noKeepAlive' />
    <Tabbar v-if="show" />
  </div>
</template>

<script>
import Tabbar from "./components/tabbar/Tabbar";

export default {
  name: "tabbar",
  data() {
    return {
      show: true,
      include: []
    };
  },
  watch: {
    $route(to,from) {
      console.log(to);
      console.log(from);
    }
  },
  components: {
    Tabbar
  },
  beforeUpdate() {
    if (this.$route.meta.tabbar) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
};
</script>


