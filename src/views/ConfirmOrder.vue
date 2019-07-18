<template>
  <div class="confirmOrder">
    <header class="confirm-header">
      <i class="iconfont icon-right"></i>
      <span>确认订单</span>
    </header>

    <section class="address">
      <div class="address-content">
        <div class="address-left">
          <i class="iconfont icon-dizhi"></i>
          <div class="address-info">
            <div class="address-info-top">
              <b class="name">ahaow</b>
              <span class="gender">先生</span>
              <span class="phone">13315421347</span>
            </div>
            <div class="address-info-bottom">111 / 222</div>
          </div>
        </div>
        <div class="address-right">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </section>

    <div class="split"></div>

    <section class="delivery_model">
      <div class="deliver_text">送达时间</div>
      <div class="deliver_time">
        <p class="time">尽快送达 | 预计 12：11</p>
        <p class="tips">蜂鸟专送</p>
      </div>
    </section>

    <div class="split"></div>

    <section class="pay_way">
      <div class="pay-fs">
        <span class="fs">支付方式</span>
        <span class="zx">
          在线支付
          <i class="iconfont icon-right"></i>
        </span>
      </div>
      <div class="hongbao">
        <span>红包</span>
        <span>暂时只在饿了么APP中支持</span>
      </div>
    </section>

    <div class="split"></div>

    <section class="food-list">
      <header class="food-title">
        <img src="//elm.cangdu.org/img/16b7261e13946470.jpg" alt="avatar" />
        <span>嗷嗷</span>
      </header>
      <ul class="food-list-ul">
        <li class="food-item">
          <div class="food-name">ds</div>
          <div class="food-num-price">
            <span>X 2</span>
            <span>¥20</span>
          </div>
        </li>

        <li class="food-item">
          <div class="food-name">ds</div>
          <div class="food-num-price">
            <span>X 2</span>
            <span>¥20</span>
          </div>
        </li>

        <li class="food-item">
          <div class="food-name">ds</div>
          <div class="food-num-price">
            <span>X 2</span>
            <span>¥20</span>
          </div>
        </li>
      </ul>

      <div class="food-item-style">
        <span>餐盒</span>
        <span>¥ 4</span>
      </div>

      <div class="food-item-style">
        <span>配送费</span>
        <span class="current">¥ 4</span>
      </div>

      <div class="food-item-style">
        <span>订单</span>
        <span class="current">待支付 ¥33419</span>
      </div>
    </section>

    <div class="split"></div>

    <section class="pay_way current">
      <div class="pay-fs">
        <span class="fs">订单备注</span>
        <span class="zx">
          口味、偏好等
          <i class="iconfont icon-right"></i>
        </span>
      </div>
      <div class="hongbao">
        <span>发票抬头</span>
        <span>商家不支持开发票</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "confirmOrder"
};
</script>

<style lang="scss">
@import "./../assets/scss/utils.scss";
.confirmOrder {
  background-color: #fff;
  .confirm-header {
    position: fixed;
    left: 0;
    top: 0;
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
  .address {
    margin-top: 1.34rem;
    height: 2.5rem;
    padding: 0 0.6rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAGCAYAAACMyr1NAAAAAXNSR0IArs4c6QAAANxJREFUOBFjZICCpoUPWhn+M7rD+OTQjP8ZztQmymfg0/tr95JlDAz/I/GpISTHyMiwj9Ul1hmbOiaQYNfSx6qUegZkDisD01QQjQv837NMD+iYCFzyxIr/Z2asxqWWBSTx49e/LAZGXEqIFP/PcLgiUfYyPtV/GP62/P9PmU3AANnM6hhzApc9TB3zH+sCrbDFpYBYcQ42pmn41P7av8QC6BlffGoIyTEyMv5nYWCuwaeO6TfDv2x8CoiSY/y/syxa9jY+tYx//7fikydGDhggKxhdoi4Ro3bYqAEAknE5DXYMR0IAAAAASUVORK5CYII=)
      0 100% repeat-x;
    background-repeat: repeat-x;
    background-size: auto 0.12rem;
    .address-content {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 95%;
      background-color: #fff;
      justify-content: space-between;
      .address-left {
        position: relative;
        overflow: hidden;
        min-width: 70%;
        i {
          font-size: 24px;
          color: $elemColor;
          font-weight: 700;
          line-height: 2.5rem;
        }
        .address-info {
          position: absolute;
          left: 0.4rem;
          top: 0.67rem;
          display: inline-block;
          margin-left: 0.54rem;
          .address-info-top {
            .name {
              font-size: 18px;
            }
            .gender {
              margin-left: 5px;
            }
            .phone {
              margin-left: 5px;
            }
          }
          .address-info-bottom {
            margin-top: 0.133333rem;
          }
        }
      }
      .address-right {
        line-height: 2.5rem;
        i {
          font-size: 24px;
          color: #999;
        }
      }
    }
  }
  .split {
    width: 100%;
    height: 0.27rem;
    background-color: #f5f5f5;
  }
  .delivery_model {
    width: 100%;
    min-height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-left: 0.15rem solid $elemColor;
    box-sizing: border-box;
    .deliver_text {
      margin-left: 0.55rem;
      font-size: 20px;
      font-weight: 700;
    }
    .deliver_time {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-right: 0.55rem;
      .time {
        font-size: 16px;
        color: #3190e8;
      }
      .tips {
        padding: 0.134rem 0.267rem;
        margin-top: 0.25rem;
        font-size: 0.15rem;
        background-color: #3190e8;
        border-radius: 4px;
        color: #fff;
      }
    }
  }
  .pay_way {
    background-color: #fff;
    padding: 0 0.7rem;
    &.current {
      margin-bottom: 0.54rem;
    }
    .pay-fs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1rem;
      .fs {
        font-size: 16px;
        color: #666;
      }
      .zx {
        color: #aaa;
        font-size: 14px;
        i {
          vertical-align: middle;
        }
      }
    }
    .hongbao {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1rem;
      border-top: 0.025rem solid #f5f5f5;
      span {
        color: #aaa;
        font-size: 14px;
      }
    }
  }
  .food-list {
    background-color: #fff;
    color: #666;
    .food-title {
      padding: 0.7rem;
      border-bottom: 1px solid #f5f5f5;
      img {
        width: 0.8rem;
        height: 0.8rem;
        vertical-align: middle;
      }
      span {
        font-size: 20px;
        vertical-align: middle;
        margin-left: 0.27rem;
      }
    }
    .food-list-ul {
      padding-top: 0.2rem;
      .food-item {
        display: flex;
        justify-content: space-between;
        line-height: 1.2rem;
        padding: 0 0.7rem;
        .food-name {
          font-size: 16px;
        }
        .food-num-price {
          span {
            font-size: 14px;
            margin-left: 0.4rem;
            &:first-of-type {
              color: #f60;
            }
          }
        }
      }
    }
    .food-item-style {
      display: flex;
      justify-content: space-between;
      line-height: 1.2rem;
      padding: 0 0.7rem;
      font-size: 16px;
      span {
        &.current {
          color: #f60;
        }
      }
    }
  }
}
</style>
