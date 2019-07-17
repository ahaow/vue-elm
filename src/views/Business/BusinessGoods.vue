<template>
  <div class="business-goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          class="menu-item"
          :class="{'current': currentIndex === index}"
          v-for="(item,index) in goods"
          :key="index"
          @click="selectMenu(index,$event)"
        >
          <span class="text">
            <!-- <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span> -->
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list-hook" v-for="(item,index) in goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item" v-for="(food,index) in item.foods" :key="index">
              <div class="icon">
                <img
                  :src="'https://elm.cangdu.org/img/' + food.image_path"
                  width="100%"
                  height="100%"
                />
              </div>
              <div class="content" >
                <h2 class="name" v-if="food.name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>{{food.tips}}</span>
                  <!-- <span>好评率28%</span> -->
                </div>
                <div class="price">
                  <span class="now">¥{{food.satisfy_rate}}</span>
                  <!-- <span class="old">1</span> -->
                </div>
              </div>
              <!-- <cartcontrol :food='food' /> -->
              <div class="cartcontrol-wrapper">
                <div class="cartcontrol">
                  <div class="cart-decrease">
                    <i class="iconfont icon-jianhao"></i>
                  </div>
                  <div class="cart-count">{{food.count}}</div>
                  <div class="cart-add" @click="handleAddFood(item.id,food.item_id,food)">
                    <i class="iconfont icon-wuuiconxiangjifangda"></i>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="shopcat">
      <div class="content">
        <div class="content-left" @click="handleCatShow">
          <div class="logo-wrapper">
            <div class="logo">
              <i class="iconfont icon-gouwucheman"></i>
            </div>
          </div>
          <div class="cat-price">¥0</div>
          <div class="desc">另需配送费¥{{shopObj.float_delivery_fee}}元</div>
        </div>
        <div class="content-right">
          <div
            class="pay"
            :class="StartPrice ? 'enough' : 'not-enough'"
          >{{StartPrice ? '去结算' : `¥${shopObj.float_minimum_order_amount}元起送`}}</div>
        </div>
      </div>
      <transition name="fade">
        <div class="shopcart-list" v-if="carShopShow">
          <div class="list-header">
            <h2 class="title">购物车</h2>
            <span class="empty">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li
                v-for='cart in cartArr'
                :key="cart.id" 
                class="food">
                <span class="name">{{cart.name}}</span>
                <span class="price">¥{{cart.price}}</span>
              </li>
            </ul>
          </div>
        </div>
      </transition>

      <div class="shopcart-mask" v-show="carShopShow"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BScroll from "better-scroll";
import {mapState, mapMutations} from 'vuex'
import cartcontrol from './../../components/cartcontrol/cartcontrol';

export default {
  name: "BusinessGoods",
  components: {
    cartcontrol
  },
  props: {
    shopObj: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      StartPrice: false, // 价格 是否 到达起步价
      carShopShow: false, // 购物车 显示 隐藏
      cartArr: [], // 对应商家的点餐商品
      foodA: null,
    };
  },
  computed: {
    ...mapState['cartList'],
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    ...mapMutations(['ADD_CART']),
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        startY: true,
        click: true,
        probeType: 3
      });
      this.foodsScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      console.log(index, event);
      if (event.__constructed) {
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },

    // 添加食物到购物车
    handleAddFood(itemid, foodid, food) {
      console.log(food);
      food.count++;

      let businessId = this.$route.params.id;
      console.log(businessId)
      this.ADD_CART({businessId,itemid,foodid,food});
    },

    // 显示 隐藏 购物车
    handleCatShow() {
      let carShopShow = this.carShopShow;
      this.carShopShow = !carShopShow;
    },
    // 获取到对应商家 选择的 商品
    getBusinessFood(cartList,id) {
      for(let val in cartList) {
      if(val === id) {
        for(let item in cartList[val]) {
          for(let i in cartList[val][item]) {
            this.cartArr.push(cartList[val][item][i]);
          }
        }
      }
    }
    }

  },
  created() {
    let cartList = this.$store.state.cartList;
    let id = this.$route.params.id;
    this.getBusinessFood(cartList,id)

    this.$api.BusinessAjax.getMenu(id)
      .then(res => {
        res.data.forEach(item => {
          item.foods.forEach(val => {
            Vue.set(val,'count',1)
          })
        })
        this.goods = res.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {}
};
</script>

<style lang="scss">
.fade-enter {
  transform: translate3d(0, 100%, 0);
}
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-enter-to {
  transform: translate3d(0, 0, 0);
}
.fade-leave {
  transform: translate3d(0, 0, 0);
}
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-leave-to {
  transform: translate3d(0, 100%, 0);
}

.business-goods {
  position: absolute;
  top: 5.1rem;
  bottom: 1.2rem;
  display: flex;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    width: 2.15rem;
    flex: 0 0 2.15rem;
    background-color: #f3f5f7;
    ul {
      .menu-item {
        display: table;
        height: 1.44rem;
        width: 100%;
        line-height: 1.44rem;
        padding: 0px 0.37rem;
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
        &.current {
          position: relative;
          z-index: 10px;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          .text {
            border: none;
          }
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    background-color: #fff;
    .food-list-hook {
      .title {
        padding-left: 0.37rem;
        height: 0.7rem;
        line-height: 0.7rem;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: #93999f;
        background-color: #f3f5f7;
      }
      .food-item {
        position: relative;
        display: flex;
        margin: 0.48rem;
        padding-bottom: 0.28rem;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .icon {
          flex: 0 0 75px;
          height: 75px;
          margin-right: 0.38rem;
        }
        .content {
          .name {
            margin: 2px 0 8px 0;
            height: 0.38rem;
            line-height: 0.38rem;
            font-size: 14px;
            color: #000;
            font-weight: 700;
          }
          .desc,
          .extra {
            line-height: 0.3rem;
            font-size: 11px;
            color: rgba(147, 153, 159, 1);
          }
          .desc {
            margin-bottom: 0.21rem;
          }
          .extra {
            .count {
              margin-right: 0.32rem;
            }
          }
          .price {
            font-weight: 700;
            line-height: 0.64rem;
            margin-top: 0.085333rem;
            .now {
              margin-right: 0.21rem;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgba(147, 153, 159, 1);
            }
          }
        }
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
      }
    }
  }
  .shopcat {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 1.18rem;
    .content {
      display: flex;
      background: #141d27;
      font-size: 0;
      height: 100%;
      z-index: 99;
      .content-left {
        position: relative;
        flex: 1;
        .logo-wrapper {
          position: absolute;
          bottom: 0.171rem;
          left: 0.512rem;
          width: 1.5rem;
          height: 1.5rem;
          background-color: #142d27;
          border-radius: 50%;
          box-sizing: border-box;
          text-align: center;
          z-index: 99;
          .logo {
            width: 80%;
            height: 80%;
            margin-left: 10%;
            margin-top: 10%;
            border-radius: 50%;
            background: #2b343c;
            text-align: center;
            i {
              font-size: 28px;
              line-height: 1.5;
              color: hsla(0, 0%, 100%, 0.4);
            }
          }
        }
        .cat-price {
          position: absolute;
          left: 2.666667rem;
          top: 0.32rem;
          font-size: 16px;
          font-weight: 700;
          color: hsla(0, 0%, 100%, 0.4);
        }
        .desc {
          position: absolute;
          left: 3.8rem;
          top: 0.426667rem;
          font-size: 12px;
          color: hsla(0, 0%, 100%, 0.4);
        }
      }
      .content-right {
        flex: 0 0 2.8rem;
        background-color: #2b333b;
        .pay {
          height: 1.28rem;
          line-height: 1.28rem;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: hsla(0, 0%, 100%, 0.4);
          background: #2b333b;
        }
      }
    }
    .shopcart-list {
      position: absolute;
      bottom: 1.173rem;
      left: 0;
      width: 100%;
      max-height: 200px;
      z-index: -1;
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: #07111b;
        }
        .empty {
          float: right;
          font-size: 12px;
          color: #00a0dc;
        }
      }
      .list-content {
        padding: 0 18px 18px;
        max-height: 3.2rem;
        overflow: scroll;
        background-color: #fff;
        ul {
          .food {
            position: relative;
            padding: 12px 0;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .price {
              position: absolute;
              right: 2.4rem;
              bottom: 0.16rem;
              line-height: 0.64rem;
              font-size: 14px;
              font-weight: 700;
              color: #f01414;
            }
          }
        }
      }
    }
    .shopcart-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      background-color: rgba(7, 17, 27, 0.5);
    }
  }
}
</style>

