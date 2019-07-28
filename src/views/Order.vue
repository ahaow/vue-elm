<template>
  <div class="order">
    <header class="order-header">
      订单详情
    </header>
    <div ref="orderList" class="order-box">
      <ul class="order-list">
        <router-link class="order-item" 
            v-for="item in order_list"
            :key="item.id"
            tag='li'
            to='/order/orderDetail'
        >
          <img :src="'http://elm.cangdu.org/img/'+ item.restaurant_image_url" alt='logo' />
          <section class="order-item-right">
            <div class="order-item-info">
              <div class="order-item-info-header">
                <p class="order-info-header">
                  <span>{{item.restaurant_name}}</span>
                  <span>支付超时</span>
                </p>
                <p class="order-info-time">{{item.formatted_created_at}}</p>
              </div>
            </div>
            <div class="order-basket">
              <span class="order-basket-name">ds 等2件商品</span>
              <span class="order-basket-price">¥{{item.total_amount}}</span>
            </div>
            <div class="order-again">
              <span>再来一单</span>
            </div>
          </section>
        </router-link>
      </ul>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "order",
  data() {
      return {
          order_list: [], // 订单列表
      }
  },
  methods: {
      getOrderList(id) {
        this.$api.OrderAjax.getOrderList(id).then(res => {
            console.log(res);
            this.order_list = res.data;
            this.$nextTick(() => {
                this._initScroll();
            })

        }).catch(err => {
            console.log(err);
        })
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.orderList, {
            click: true
        });
      }
  },
  created() {
    let id = JSON.parse(window.localStorage.getItem('id'));
    this.getOrderList(id);
  },
 
};
</script>

<style lang="scss">
@import "./../assets/scss/utils.scss";
.order {
  .order-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.33rem;
    line-height: 1.33rem;
    background-color: $elemColor;
    text-align: center;
    font-size: 18px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 1px;
    i {
      position: absolute;
      font-size: 24px;
      left: 0.26rem;
      transform: rotate(180deg);
    }
  }
  .order-box {
    position: absolute;
    top: 1.33rem;
    right: 0;
    left: 0;
    bottom: 1.33rem;
    width: 100%;
    overflow: hidden;
    .order-list {
      .order-item {
        display: flex;
        margin-bottom: 0.27rem;
        padding: 0.27rem;
        background-color: #fff;
        border-bottom: 1px solid #e4e4e4;
        img {
          width: 2rem;
          height: 2rem;
        }
        .order-item-right {
          width: 95%;
          margin-left: 0.27rem;
          .order-item-info {
            .order-item-info-header {
              .order-info-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                font-size: 15px;
                color: #000;
                margin-bottom: 0.13rem;
              }
              .order-info-time {
                padding-bottom: 0.13rem;
                color: #999;
                border-bottom: 1px solid #e4e4e4;
              }
            }
          }
          .order-basket {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            line-height: 1.5rem;
            font-size: 14px;
            border-bottom: 1px solid #e4e4e4;
            .order-basket-name {
              color: #000;
            }
            .order-basket-price {
              color: #f60;
              font-weight: 700;
            }
          }
          .order-again {
            line-height: 1.2rem;
            text-align: right;
            span {
              color: #3190e8;
              border: 1px solid #3190e8;
              padding: 0.08rem 0.13rem;
              border-radius: 0.11rem;
            }
          }
        }
      }
    }
  }
}
</style>
