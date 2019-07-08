<template>
  <div class="home">
    <div class="nav">
      <div class="nav-address">星巴克阿德哈斯的哈视频的哈死的。。。。</div>
      <div class="nav-search">
        <span>搜索饿了么商家、商家名称</span>
      </div>
    </div>

    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper" >
        <!-- slides -->
        <swiper-slide v-for="(item,index) in entryList" :key="index">
          <div class="item" v-for="(val) in item" :title="item.description" :key="val.id" @click="handleEntry(val.link)">
            <img :src="'https://fuss10.elemecdn.com/'+ val.image_url" :alt="item.description">
            <p>{{val.title}}</p>
          </div>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
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
          <li class="business-item">
            <div class="avatar">
              <img src="https://fuss10.elemecdn.com//0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg" alt="">
            </div>
            <div class="content">
              <div class="name">
                <div class="name-left">
                  <span class="label">品牌</span>
                  <span class="title">效果演示</span>
                </div>
                <ul class="name-right">
                  <li class="name-item">保</li>
                  <li class="name-item">准</li>
                  <li class="name-item">票</li>
                </ul>
              </div>

              <h5 class="rating_order_num">
                <section class="rating_order_num_left">
                  <section class="rating_section">
                    <ul class="star-list">
                      <li class="star">☆</li>
                      <li class="star">☆</li>
                      <li class="star">☆</li>
                      <li class="star">☆</li>
                      <li class="star">☆</li>
                    </ul>
                  </section>
                  <span class="order-detail">月增106单</span>
                </section>
                <section class="rating_order_num_right">
                  <span class="service">蜂鸟专送</span>
                  <span class="on-time">准时达</span>
                </section>
              </h5>

              <h5 class="fee_distance">
                <section class="fee">¥20起送/配送费约¥5</section>
                <section class="distance">
                  <span class="distance-text">1427.3公里/</span>
                  <span class="distance-time">19小时8分钟</span>

                </section>


              </h5>

            </div>


          </li>

          <li class="business-item">
            <div class="avatar">
              <img src="https://fuss10.elemecdn.com//0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg" alt="">
            </div>
            <div class="content">
              <div class="name">
                <div class="name-left">
                  <span class="label">品牌</span>
                  <span class="title">效果演示</span>
                </div>
                <ul class="name-right">
                  <li class="name-item">保</li>
                  <li class="name-item">准</li>
                  <li class="name-item">票</li>
                </ul>
              </div>

              <h5 class="rating_order_num">
                <section class="rating_order_num_left">
                  <section class="rating_section">
                    <ul class="star-list">
                      <li class="star">☆</li>
                      <li class="star">☆</li>
                      <li class="star">☆</li>
                      <li class="star">☆</li>
                      <li class="star">☆</li>
                    </ul>
                  </section>
                  <span class="order-detail">月增106单</span>
                </section>
                <section class="rating_order_num_right">
                  <span class="service">蜂鸟专送</span>
                  <span class="on-time">准时达</span>
                </section>
              </h5>

              <h5 class="fee_distance">
                <section class="fee">¥20起送/配送费约¥5</section>
                <section class="distance">
                  <span class="distance-text">1427.3公里/</span>
                  <span class="distance-time">19小时8分钟</span>
                </section>
              </h5>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { home_api } from './../api/index';

export default {
  name: 'home',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      entryList: [],
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    getEntryList() {
      this.axios.get(home_api.index_entry,{}).then(res => {
        this.entryList = this.arrTrans(8,res.data);

      }).catch(err => {
        console.log(err);
      })
    },

    arrTrans(num,arr) {
      const iconsArr = []; //声明数组
      arr.forEach((item,index) => {
        const page = Math.floor(index / num);  // 计算该元素为第几个素组内
        if(!iconsArr[page]) {
          iconsArr[page] = []
        }
        iconsArr[page].push(item);
      });
      return iconsArr;
    },


    handleEntry(link) {
      console.log(link);
    }
  },
  created() {
    this.getEntryList();
  },
  mounted() {
    // this.swiper.slideTo(0, 1000, false)  
  }
}
</script>

<style lang="scss">
  @import './../assets/scss/utils.scss';
  .home {
    .nav {
      width: 100%;
      padding: .27rem;
      background-color: #00ACFD;
      .nav-address {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
      }
      .nav-search {
        margin-top: .27rem;
        width: 100%;
        height: .96rem;
        background-color: #fff;
        color: #999;
        text-align: center;
        line-height: .96rem;
        font-size: 13px;
      }
    }
    .swiper {
      margin-top: .13rem;
      height: 200px;
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
      padding: .27rem;
      color: #c5c5c5;
      .title {
        i {
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
          margin-left: .27rem;
        }
      }
      .business-list {
        margin-top: .27rem;
        ul {
          .business-item {
            display: flex;
            width: 100%;
            padding: .4rem 0;
            border-bottom: 1px solid #f0f0f0;
            @include clearfloat;
            .avatar {
              float: left;
              width: 1.6rem;
              height: 1.6rem;
              background-color: red;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .content {
              flex: auto;
              float: left;
              margin-left: .27rem;
              .name {
                display: flex;
                justify-content: space-between;
                .name-left {
                  .label {
                    display: inline-block;  
                    padding: .07rem;
                    background-color: #FFD440;
                    color: #000;
                    vertical-align: middle;
                  }
                  .title {
                    margin-left: .27rem;
                    color: #000;
                    font-weight: 600;
                    font-size: 16px;
                    vertical-align: middle;
                  }
                }
                .name-right {
                  transform: scale(.8);
                  .name-item {
                    display: inline-block;
                    margin: 0 .07rem;
                    color: #999;
                    border: 1px solid #f1f1f1;
                    padding: .07rem;
                    border-radius: .08rem;
                    margin-left: .05rem;
                    font-size: 10px;
                  }
                }
              }
              .rating_order_num {
                margin-top: .15rem;
                display: flex;
                justify-content: space-between;
                .rating_order_num_left {
                  .rating_section {
                    display: inline-block;
                    vertical-align: middle;
                    .star-list {
                      .star {
                        float: left;
                        margin-left: .07rem;
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
                    margin-left: .13rem;
                  }
                }
                .rating_order_num_right {
                  .service {
                    display: inline-block;
                    background-color: #1493E5;
                    font-size: 10px;
                    padding: .04rem .13rem;
                    color: #fff;
                    border-radius: 2px;
                    margin-right: .13rem;
                  }
                  .on-time {
                    display: inline-block;
                    box-sizing: border-box;
                    font-size: 10px;
                    padding: .04rem .13rem;
                    background-color: #fff;
                    color: #1493E5;
                    border: 1px solid #1493E5;
                    border-radius: 4px;
                    transform: scale(.9);
                  }
                }
              }
              .fee_distance {
                margin-top: .2rem;
                display: flex;
                justify-content: space-between;
                .fee {
                  color: #666;
                }
                .distance {
                  .distance-text {
                    margin-right: .13rem;
                  }
                  .distance-time {
                    color: #1493E5;
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
