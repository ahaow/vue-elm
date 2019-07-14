<template>
  <section class="business-ratings" ref="BusinessRatings">
    <div class="business-box">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{random}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家100%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div class="star">
              <Star :score="scoreObj.service_score" />
            </div>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <div class="star">
              <Star :score="scoreObj.food_score" />
            </div>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达事件</span>
            <span class="delivery">{{scoreObj.deliver_time}}分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratings-wrapper">
        <ul>
          <li v-for="item in restaurants" :key="item._id" class="rating-item">
            <div class="avatar">
              <img
                src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                width="100%"
                height="100%"
                alt="111"
              />
            </div>
            <div class="content">
              <div class="name">{{item.username}}</div>
              <div class="star-wrapper">
                <Star :score="item.rating_star"></Star>
                <span class="delivery">{{item.rated_at}}</span>
              </div>
              <div class="text">{{item.time_spent_desc}}</div>
              <div class="recommend">
                <i class="iconfont icon-dianzan"></i>

                <span
                  v-for="val in item.item_ratings"
                  :key="val.food_id"
                  class="item"
                >{{val.food_name}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Star from "./../../components/star/Star";
import { business_api } from "./../../api/index";
import BScroll from "better-scroll";

export default {
  name: "BusinessRatings",
  components: {
    Star
  },
  data() {
    return {
      scoreObj: {},
      restaurants: []
    };
  },
  computed: {
    random() {
      return Math.abs(this.scoreObj.overall_score).toFixed(2);
    }
  },
  methods: {
    // 获取评价分数
    getRatingsScores(id) {
      this.axios
        .get(`${business_api.ratings_scores}${id}/ratings/scores`)
        .then(res => {
          console.log(res);
          this.scoreObj = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRestaurants(id) {
      this.axios
        .get(`${business_api.restaurants}${id}/ratings`)
        .then(res => {
          this.restaurants = res.data;
          this.$nextTick(() => {});
        })
        .catch(err => {
          console.log(err);
        });
    },
    _initScroll() {
      this.BusinessRatings = new BScroll(this.$refs.BusinessRatings, {
        click: true
      });
    }
  },

  created() {
    console.log(this.$route);
    let id = this.$route.params.id;

    this.getRatingsScores(id);
    this.getRestaurants(id);

    this.$nextTick(() => {
      this._initScroll();
    });
  }
};
</script>

<style lang="scss">
.business-ratings {
    position: absolute;
    top: 5.2rem;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  .business-box {
    .overview {
      display: flex;
      padding: 0.48rem 0;
      background-color: #fff;
      .overview-left {
        flex: 0 0 3.65rem;
        width: 3.65rem;
        padding: 0.16rem 0;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        .score {
          margin-bottom: 0.21rem;
          line-height: 0.75rem;
          font-size: 24px;
          color: #f90;
        }
        .title {
          margin-bottom: 0.21rem;
          line-height: 0.32rem;
          font-size: 12px;
          font-weight: 700;
          color: #07111b;
        }
        .rank {
          font-size: 10px;
          color: #93999f;
          line-height: 0.26rem;
        }
      }
      .overview-right {
        flex: 1;
        padding: 0.16rem 0 0.16rem 0.64rem;
        .score-wrapper {
          line-height: 0.48rem;
          font-size: 0;
          .title {
            font-size: 12px;
          }
          .star {
            margin-left: 0.13rem;
            margin-top: 0.07rem;
          }
        }
        .delivery-wrapper {
          margin-top: 0.13rem;
          .delivery {
            font-size: 12px;
            color: #93999f;
            padding-left: 0.26rem;
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
    .ratings-wrapper {
      padding: 0 0.48rem;
      background-color: #fff;
      ul {
        .rating-item {
          display: flex;
          padding: 0.48rem 0;
          border-bottom: rgba(7, 17, 27, 0.1);
          .avatar {
            flex: 0 0 0.75rem;
            width: 0.75rem;
            height: 0.75rem;
            margin-right: 0.32rem;
            img {
              border-radius: 50%;
            }
          }
          .content {
            position: relative;
            flex: 1;
            .name {
              line-height: 0.32rem;
              font-size: 10px;
              color: #07111b;
            }
            .star-wrapper {
              margin-top: 0.13rem;
              .delivery {
                font-size: 10px;
                margin-left: 0.27rem;
                color: #93999f;
              }
            }
            .text {
              margin: 0.21rem 0;
            }
            .recommend {
              i {
                font-size: 10px;
                color: #00a0dc;
                margin-right: 0.13rem;
              }
              .item {
                display: inline-block;
                margin: 0 8px 4px 0;
                font-size: 9px;
                padding: 0 0.16rem;
                border: 1px solid rgba(7, 17, 27, 0.1);
                border-radius: 1px;
                color: #93999f;
                background: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>

