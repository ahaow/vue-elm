<template>
  <div class="business-seller" ref="businessSeller">
    <div class="warpper">
      <div class="overview">
        <h3 class="title">{{shopObj.name}}</h3>
        <div class="desc">
          <Star :score="shopObj.rating" />
          <span class="text">({{shopObj.recent_order_num}})</span>
          <span class="text">月售{{shopObj.rating_count}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h3>起送价</h3>
            <div class="content">
              <span class="stress">{{shopObj.float_minimum_order_amount}}</span>元
            </div>
          </li>
          <li class="block">
            <h3>商家配送</h3>
            <div class="content">
              <span class="stress">{{shopObj.float_delivery_fee}}</span>元
            </div>
          </li>
          <li class="block">
            <h3>平均配送时间</h3>
            <div class="content">
              <span class="stress">38</span>分钟
            </div>
          </li>
        </ul>
      </div>
      <div class="split"></div>
      <div class="bulletin">
        <h2 class="title">公告与活动</h2>
        <div class="content-wrapper">{{shopObj.description}}</div>
        <ul class="supports">
          <li v-for="val in shopObj.supports" :key="val.id">{{val.description}}</li>
        </ul>
      </div>
      <div class="split"></div>
      <div class="info">
        <h3 class="title">商家信息</h3>
        <p>{{shopObj.address}}</p>
        <p>{{shopObj.category}}</p>
        <p>{{shopObj.phone}}</p>
        <p v-if="shopObj.opening_hours">{{shopObj.opening_hours[0]}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "./../../components/star/Star";
import BScroll from "better-scroll";

export default {
  name: "BusinessSeller",
  components: {
    Star
  },
  props: {
    shopObj: {
      type: Object
    }
  },
  methods: {
    _initScroll() {
      this.businessSeller = new BScroll(this.$refs.businessSeller, {
        click: true
      });
    }
  },
  created() {
    this.$nextTick(() => {
      this._initScroll();
    });
  }
};
</script>

<style lang="scss">
.business-seller {
  position: absolute;
  top: 5.2rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .warpper {
    .overview {
      position: relative;
      padding: 0.3072rem;
      background-color: #fff;
      .title {
        margin-bottom: 0.21rem;
        line-height: 0.37rem;
        color: #333;
        font-size: 14px;
      }
      .desc {
        padding-bottom: 0.48rem;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 0;
        .text {
          font-size: 10px;
          margin-left: 0.256rem;
          color: #4d555d;
        }
      }
      .remark {
        display: flex;
        padding-top: 0.48rem;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:nth-child(3) {
            border: none;
          }
          h3 {
            margin-bottom: 0.1rem;
            line-height: 0.27rem;
            font-size: 10px;
            color: #999;
          }
          .content {
            margin-top: 0.341333rem;
            .stress {
              font-size: 24px;
              font-weight: 500;
            }
          }
        }
      }
    }
    .split {
      width: 100%;
      height: 0.42rem;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      background-color: #f3f5f7;
    }
    .bulletin {
      padding: 0.48rem 0.48rem 0;
      background-color: #fff;
      .title {
        margin-bottom: 0.21rem;
        line-height: 0.37rem;
        color: #07111b;
      }
      .content-wrapper {
        padding: 0 0.32rem 0.42rem;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: red;
      }
      .supports {
        li {
          padding: 0.42rem 0.36rem;
        }
      }
    }
    .info {
      padding: 0.48rem 0.48rem 0;
      color: #07111b;
      background-color: #fff;
      .title {
        font-size: 14px;
        color: #333;
        margin-bottom: 0.341333rem;
      }
      p {
        padding: 0.341333rem 0;
        border-top: 1px solid #e0e0e0;
      }
    }
  }
}
</style>

