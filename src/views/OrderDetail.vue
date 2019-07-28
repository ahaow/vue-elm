<template>
  <div class="order-detail-page">
    <header class="order-detail-header">
      <i class="iconfont icon-right" @click='handleGoBack'></i>
      订单详情
    </header>
    <div class="scroll-section">
      <section class="order-title">
        <div class="img-box">
          <img src="http://elm.cangdu.org/img/16b7261e13946470.jpg" alt />
        </div>
        <h3 class="title">支付超时</h3>
        <span class="order-align">再来一单</span>
      </section>
      <section class="food-list">
        <div class="food-list-header">
          <div class="shop-name">
            <img src="http://elm.cangdu.org/img/16b7261e13946470.jpg" width="28" height="28" alt />
            <span>嗷嗷</span>
          </div>
          <i class="iconfont icon-right"></i>
        </div>
        <ul class="food-list-ul">
          <li>
            <div class="food-name">ds</div>
            <div class="quantity-price">
              <span>X2</span>
              <span>¥20</span>
            </div>
          </li>
          <li>
            <div class="food-name">ds</div>
            <div class="quantity-price">
              <span>X2</span>
              <span>¥20</span>
            </div>
          </li>
        </ul>
        <div class="deliver-fee">
          <span>配送费</span>
          <span>4</span>
        </div>
        <div class="pay-ment">实付341592.00</div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderDetail",
  data() {
      return {
          show: false,
      }
  },
  methods: {
      handleGoBack() {
          this.$router.back();
      }
  },
  
};
</script>


<style lang="scss" >
@import "./../assets/scss/utils.scss";
.order-detail-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: red;
  z-index: 999;
  .order-detail-header {
    position: relative;
    width: 100%;
    height: 1.33rem;
    line-height: 1.33rem;
    background-color: $elemColor;
    font-size: 18px;
    text-align: center;
    color: #fff;
    font-weight: 700;
    i {
      position: absolute;
      left: 0.27rem;
      font-size: 22px;
      transform: rotate(180deg);
    }
  }
  .scroll-section {
    .order-title {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0.27rem;
      background-color: #fff;
      box-sizing: border-box;

      .img-box {
        width: 2rem;
        height: 2rem;
        background-color: red;
        margin: 0.27rem auto 0;
        border-radius: 50%;
        border: 1px solid $elemColor;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .title {
        margin-top: 0.4rem;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
      }
      .order-align {
        margin: 0.4rem auto 0.27rem;
        width: 2.13rem;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 14px;
        text-align: center;
        color: $elemColor;
        border: 1px solid $elemColor;
        box-sizing: border-box;
      }
    }
    .food-list {
      margin-top: 0.4rem;
      background-color: #fff;
      .food-list-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.27rem 0.21rem;
        .shop-name {
          img {
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
            margin-left: 0.27rem;
            font-size: 16px;
            font-weight: 700;
          }
        }
      }
      .food-list-ul {
        border-bottom: 1px solid #f5f5f5;
        li {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0.27rem 0.21rem;
          font-size: 14px;
          line-height: 0.8rem;
          .food-name {
          }
          .quantity-price {
            span {
              margin-left: 0.8rem;
              &:nth-child(1) {
                color: #999;
              }
            }
          }
        }
      }
      .deliver-fee {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.27rem 0.21rem;
        font-size: 14px;
        line-height: 0.8rem;
        border-bottom: 1px solid #f5f5f5;

      }
      .pay-ment {
          padding: 0.27rem 0.21rem;
          line-height: 0.8rem;
        font-size: 14px;
        text-align: right;
        font-weight: 700;
        color: #fb6b23;
      }
    }
  }
}
</style>
