<template>
  <div class="home">
    <div class="nav">
      <div class="nav-address">{{address.name}}</div>
      <div class="nav-search">
        <span>搜索饿了么商家、商家名称</span>
      </div>
    </div>

    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in entryList" :key="index">
          <div
            class="item"
            v-for="(val) in item"
            :title="item.description"
            :key="val.id"
            @click="handleEntry(val.link)"
          >
            <img v-lazy="'https://fuss10.elemecdn.com/'+ val.image_url" :alt="item.description" />
            <p>{{val.title}}</p>
          </div>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
      </swiper>
    </div>

    <div class="boxsize"></div>

    <div class="nearbyBusiness">
      <div class="title">
        <i class="iconfont icon-shangjia"></i>
        <span>附近商家</span>
      </div>
      <div class="business-list">
        <ul>
          <router-link
            tag="li"
            :to="'/business/' + item.id"
            v-for="(item) in ShopRestaurantsList"
            :key="item.id"
            class="business-item"
          >
            <div class="avatar">
              <img v-lazy="'http://elm.cangdu.org/img/'+item.image_path" :alt="item.name" />
            </div>
            <div class="content">
              <div class="name">
                <div class="name-left">
                  <span class="label">品牌</span>
                  <span class="title">{{item.name}}</span>
                </div>
                <ul class="name-right">
                  <li v-for="val in item.supports" :key="val.id" class="name-item">{{val.icon_name}}</li>
                </ul>
              </div>

              <h5 class="rating_order_num">
                <section class="rating_order_num_left">
                  <section class="rating_section">
                    <Star :score="item.rating"></Star>
                  </section>
                  <span class="order-detail">月增{{item.recent_order_num}}单</span>
                </section>
                <section class="rating_order_num_right">
                  <span class="service">蜂鸟专送</span>
                  <span class="on-time">准时达</span>
                </section>
              </h5>

              <h5 class="fee_distance">
                <section
                  class="fee"
                >¥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}</section>
                <section class="distance">
                  <span class="distance-text">{{item.distance}}</span>
                  <span class="distance-time">{{item.order_lead_time}}</span>
                </section>
              </h5>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Star from "./../components/star/Star";

export default {
  name: "home",
  components: {
    swiper,
    swiperSlide,
    Star
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      entryList: [],
      ShopRestaurantsList: [],
      address: {},
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    // 获取食品分类列表
    getEntryList() {
      this.$api.HomeAjax.foodsList().then(res => {
      console.log(res);
        this.entryList = this.arrTrans(8, res.data);
      }).catch(err => {
        console.log(err);
      })
    },

    // 获取商铺列表
    getShopRestaurants(latitude,longitude) {
      this.$api.HomeAjax.shoppingList(latitude,longitude).then(res => {
        console.log(res)
        this.ShopRestaurantsList = res.data;
      }).catch(err => {
        console.log(err)
      })
    },

    arrTrans(num, arr) {
      const iconsArr = []; //声明数组
      arr.forEach((item, index) => {
        const page = Math.floor(index / num); // 计算该元素为第几个素组内
        if (!iconsArr[page]) {
          iconsArr[page] = [];
        }
        iconsArr[page].push(item);
      });
      return iconsArr;
    },

    handleEntry(link) {
      console.log(link);
    },

    //  根据经纬度详细定位
    geohashAddress(la,lo) {
      this.$api.HomeAjax.geohashAddress(la,lo).then(res => {
        console.log(res);
        this.address = res.data;
      }).catch(err => {
        console.log(err);
      })
    }
  },
  created() {
    this.getEntryList();
    this.getShopRestaurants(this.$route.query.latitude,this.$route.query.longitude);
    this.geohashAddress(this.$route.query.latitude,this.$route.query.longitude)
    let str = `${this.$route.query.latitude},${this.$route.query.longitude}`
    window.localStorage.setItem('geohash',JSON.stringify(str))
  },
  mounted() {
    // this.swiper.slideTo(0, 1000, false)
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/utils.scss";
.home {
  margin-bottom: 0.853333rem;
  .nav {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    padding: 0.27rem;
    background-color: $elemColor;
    z-index: 100;
    .nav-address {
      width: 100%;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      text-align: center;
      @include text-ellipsis;
    }
    .nav-search {
      margin-top: 0.27rem;
      width: 100%;
      height: 0.96rem;
      background-color: #fff;
      color: #999;
      text-align: center;
      line-height: 0.96rem;
      font-size: 13px;
    }
  }
  .swiper {
    margin-top: 2.047998rem;
    height: 200px;
    background-color: #fff;
    .swiper-container {
      height: 100%;
      .item {
        display: inline-block;
        width: 25%;
        height: 50%;
        img {
          margin-top: 10px;
          width: 55%;
          height: 50px;
          margin-left: 22.5%;
        }
        p {
          margin-top: 10px;
          text-align: center;
        }
      }
    }
  }
  .boxsize {
    width: 100%;
    height: 10px;
    background-color: #f5f5f5;
  }
  .nearbyBusiness {
    width: 100%;
    padding: 0.27rem;
    color: #c5c5c5;
    background-color: #fff;
    .title {
      i {
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        margin-left: 0.27rem;
      }
    }
    .business-list {
      margin-top: 0.27rem;
      ul {
        .business-item {
          display: flex;
          width: 100%;
          padding: 0.4rem 0;
          border-bottom: 1px solid #f0f0f0;
          @include clearfloat;
          .avatar {
            float: left;
            width: 1.6rem;
            height: 1.6rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .content {
            flex: auto;
            float: left;
            margin-left: 0.27rem;
            .name {
              display: flex;
              justify-content: space-between;
              .name-left {
                .label {
                  display: inline-block;
                  padding: 0.07rem;
                  background-color: #ffd440;
                  color: #000;
                  vertical-align: middle;
                }
                .title {
                  width: 150px;
                  display: inline-block;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  margin-left: 0.27rem;
                  color: #000;
                  font-weight: 600;
                  font-size: 16px;
                  vertical-align: middle;
                }
              }
              .name-right {
                transform: scale(0.8);
                .name-item {
                  display: inline-block;
                  margin: 0 0.07rem;
                  color: #999;
                  border: 1px solid #f1f1f1;
                  padding: 0.07rem;
                  border-radius: 0.08rem;
                  margin-left: 0.05rem;
                  font-size: 10px;
                }
              }
            }
            .rating_order_num {
              margin-top: 0.15rem;
              display: flex;
              justify-content: space-between;
              .rating_order_num_left {
                .rating_section {
                  display: inline-block;
                  vertical-align: middle;
                  .star-list {
                    .star {
                      float: left;
                      margin-left: 0.07rem;
                      color: yellowgreen;
                      font-size: 14px;
                    }
                  }
                }
                .order-detail {
                  vertical-align: middle;
                  display: inline-block;
                  font-size: 10px;
                  margin-top: 2px;
                  margin-left: 0.13rem;
                }
              }
              .rating_order_num_right {
                .service {
                  display: inline-block;
                  background-color: $elemColor;
                  font-size: 10px;
                  padding: 0.04rem 0.13rem;
                  color: #fff;
                  border-radius: 2px;
                  margin-right: 0.13rem;
                }
                .on-time {
                  display: inline-block;
                  box-sizing: border-box;
                  font-size: 10px;
                  padding: 0.04rem 0.13rem;
                  background-color: #fff;
                  color: $elemColor;
                  border: 1px solid $elemColor;
                  border-radius: 4px;
                  transform: scale(0.9);
                }
              }
            }
            .fee_distance {
              margin-top: 0.2rem;
              display: flex;
              justify-content: space-between;
              .fee {
                color: #666;
              }
              .distance {
                .distance-text {
                  margin-right: 0.13rem;
                }
                .distance-time {
                  color: $elemColor;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
