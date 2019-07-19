<template>
  <div class="address-page">
    <header class="address-header">
      <i class="iconfont icon-right" @click="handleBack"></i>
      <span>选择地址</span>
    </header>

    <section class="address-list">
      <ul class="deliverable-address">
        <li>111</li>
      </ul>
    </section>

  </div>
</template>

<script>
export default {
  name: "addresspage",
  methods: {
    handleBack() {
      this.$router.back();
    }
  },
};
</script>

<style lang="scss">
@import "./../../assets/scss/utils.scss";
.address-page {
  color: red;
  .address-header {
    width: 100%;
    height: 1.34rem;
    background-color: $elemColor;
    text-align: center;
    z-index: 99;
    i {
      position: absolute;
      left: 0.27rem;
      line-height: 1.34rem;
      font-size: 24px;
      color: #fff;
      transform: rotate(180deg);
    }
    span {
      line-height: 1.34rem;
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 1px;
    }
  }
  .address-list {
    .deliverable-address {
      background-color: #fff;
      li {
        display: flex;
        align-items: center;
        border-bottom: .025rem solid #f5f5f5;
        padding: .5rem;
        line-height: .5rem;
      }
    }
  }
}
</style>


