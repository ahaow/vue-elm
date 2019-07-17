<template>
  <div class="cartcontrol-wrapper">
    <div class="cartcontrol">
      <div class="cart-decrease">
        <i class="iconfont icon-jianhao"></i>
      </div>
      <div class="cart-count">{{$attrs.name}}</div>
      <div class="cart-add" @click="handleAddFood(item.id,food.item_id,food)">
        <i class="iconfont icon-wuuiconxiangjifangda"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cartcontrol",
  created() {
      console.log(this.$attrs);
  },
  mounted() {
      
  },
};
</script>

<style lang="scss">
.cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
  .cartcontrol {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 0.16rem;
      line-height: 0.64rem;
      color: #00a0dc;
      transition: all 0.4s linear;
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 0.32rem;
      padding-top: 0.16rem;
      line-height: 0.64rem;
      text-align: center;
      font-size: 12px;
      color: #93999f;
    }
    .cart-add {
      display: inline-block;
      padding: 0.16rem;
      line-height: 0.64rem;
      color: #00a0dc;
      -webkit-transition: all 0.4s linear;
      transition: all 0.4s linear;
    }
  }
}
</style>
