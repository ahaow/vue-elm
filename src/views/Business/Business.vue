<template>
  <div class="business">
    <header class="business-header">
      <div class="business-back">
        <i @click="handleBack" class="iconfont icon-right"></i>
      </div>
      <div class="business-header-content">
        <div class="header-avatar">
          <img :src="'https://elm.cangdu.org/img/' + shopObj.image_path" alt="avatar" title="ahaow" />
        </div>
        <div class="header-content">
          <div class="title">
            <div class="brand">品牌</div>
            <div class="name">{{shopObj.name}}</div>
          </div>
          <div
            class="description"
            v-if="shopObj.delivery_mode"
          >{{shopObj.delivery_mode.text}} / 38 分钟送达</div>
          <div class="support">
            起送价{{shopObj.float_minimum_order_amount}}元
            <span class="count">5个 ></span>
          </div>
        </div>
      </div>
      <div class="bulletin-wrapper">
        <span class="bulletin-title">公告</span>
        <span class="bulletin-text">{{shopObj.promotion_info}}</span>
      </div>
      <div class="background">
        <img :src="'https://elm.cangdu.org/img/' + shopObj.image_path" alt="background-image" />
      </div>
    </header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="businessGoods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="businessRatings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="businessSeller">商家</router-link>
      </div>
    </div>
    <div>
        <router-view :shopObj="shopObj"></router-view>
    </div>

    
  </div>
</template>


<script>
export default {
  name: "business",
  data() {
    return {
      shopObj: {} // 商家详情信息
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    getShopDetail(id) {
      this.$api.BusinessAjax.getShopDetal(id)
        .then(res => {
          this.shopObj = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  created() {
    let id = this.$route.params.id;
    this.getShopDetail(id);
  },
  beforeUpdate() {
  }
};
</script>

<style lang="scss">
@import "./../../assets/scss/utils.scss";
.business {
  .business-header {
    position: relative;
    height: 4.095997rem;
    .business-back {
      position: absolute;
      top: 0.170667rem;
      left: 0.170667rem;
      z-index: 99;
      transform: rotate(180deg);
      i {
        font-size: 25px;
        color: #fff;
      }
    }
    .business-header-content {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      padding: 1.24rem 0.512rem 1.023999rem 0.512rem;
      @include clearfloat;
      background: rgba(7, 17, 27, 0.4);
      .header-avatar {
        float: left;
        width: 1.71rem;
        height: 1.71rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .header-content {
        width: 75%;
        float: left;
        margin-left: 0.341333rem;
        .title {
          .brand {
            display: inline-block;
            background-color: red;
            padding: 0.0512rem 0.085333rem;
            font-size: 10px;
            color: #fff;
            font-weight: 600;
            vertical-align: middle;
          }
          .name {
            display: inline-block;
            margin-left: 0.170667rem;
            color: #fff;
            font-size: 15px;
            vertical-align: middle;
          }
        }
        .description {
          margin: 0.27rem 0;
          line-height: 0.32rem;
          font-size: 12px;
          color: #fff;
        }
        .support {
          position: relative;
          margin-top: 0.33rem;
          color: #fff;
          .count {
            position: absolute;
            top: -0.085333rem;
            right: 0.512rem;
            padding: 0.085333rem 0.256rem;
            background: rgba(7, 17, 27, 0.4);
            border-radius: 7px;
          }
        }
      }
    }
    .bulletin-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 0.682666rem;
      width: 100%;
      z-index: 10;
      font-size: 10px;
      background: rgba(7, 17, 27, 0.2);
      .bulletin-title {
        position: absolute;
        top: 0.1024rem;
        left: 0.170667rem;
        display: inline-block;
        padding: 0.0512rem 0.085333rem;
        background-color: #fff;
        transform: scale(0.8);
      }
      .bulletin-text {
        position: absolute;
        top: 0.170667rem;
        left: 1.194666rem;
        width: 75%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
      }
      i {
        position: absolute;
        right: 0;
        top: 50%;
        width: 0.512rem;
        height: 0.512rem;
        margin-top: -0.256rem;
        line-height: 0.512rem;
        font-size: 18px;
        font-style: normal;
        text-align: center;
        color: #fff;
      }
    }
    .background {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      filter: blur(10px);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .tab {
    display: flex;
    width: 100%;
    height: 1rem;
    background-color: #fff;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .tab-item {
      flex: 1;
      line-height: 1rem;
      text-align: center;
      font-size: 14px;
      a {
        color: #000;
        text-decoration: none;
        &.active {
          color: red;
        }
      }
    }
  }
  
}
</style>
