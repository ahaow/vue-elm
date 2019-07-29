<template>
  <div id="app">
    <router-view />
    <Tabbar v-if="show" />
  </div>
</template>

<script>
import Tabbar from "./components/tabbar/Tabbar";

export default {
  name: "tabbar",
  data() {
    return {
      show: true
    };
  },
  components: {
    Tabbar
  },
  beforeUpdate() {
    if (this.$router.history.current.meta.tabbar) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
};
</script>

<style lang="scss" scope>
// .view-enter-active, .view-leave-active {
//   transition: opacity 2s ease-in;
// }
// .view-enter, .view-leave-to {
//   opacity: 0;
// }
</style>


