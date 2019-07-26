<template>
  <div class="city">
    <header class="header">ele.me</header>
    <section class="city-nav">
      <div class="city-tip">
        <span>当前定位城市 :</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <div class="guess-city"
        @click='handleGoArea(guessCity.id)'
      >
        <span>{{guessCity.name}}</span>
        <i class="iconfont icon-right"></i>
      </div>
    </section>
    <section class="hot-city">
      <h4 class="title">热门城市</h4>
      <ul class="citylistul">
        <li 
            v-for="item in hotCity" 
            :key="item.id"
            @click='handleGoArea(item.id)'
        >
            {{item.name}}
        </li>
      </ul>
    </section>

    <section class="group-city-container">
      <ul class="letter-classify">
        <li class="letter-classify-li" v-for="(item,index) in groupCity" :key="index">
          <h4 class="letter-classify-title">{{index}}</h4>
          <ul class="groupcity-name-container">
            <li
              v-for="city in item"
              :key="city.id"
              class="groupcity-name-container-li"
              @click='handleGoArea(city.id)'
            >{{city.name}}</li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      guessCity: {}, // 定位城市
      hotCity: [], // 热门城市
      groupCity: [] // 所有城市
    };
  },
  methods: {
    // 获取热门城市
    handleGetHotCity() {
      this.$api.CityAjax.getCity("hot")
        .then(res => {
          console.log(res);
          this.hotCity = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取所有城市
    handleGetGroupCity() {
      this.$api.CityAjax.getCity("group")
        .then(res => {
          console.log(res);
          this.groupCity = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取定位城市
    handleGetGuessCity() {
      this.$api.CityAjax.getCity("guess")
        .then(res => {
          console.log(res);
          this.guessCity = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转到选择区域地址
    handleGoArea(id) {
        this.$router.push({
            path: 'cityarea',
            query: {
                cityId: id
            }
        })
    }

  },
  created() {
    this.handleGetHotCity();
    this.handleGetGroupCity();
    this.handleGetGuessCity();
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/utils.scss";
.city {
  .header {
    width: 100%;
    height: 1.2rem;
    background-color: $elemColor;
    font-size: 18px;
    color: #fff;
    line-height: 1.2rem;
    text-indent: 0.4rem;
  }
  .city-nav {
    padding-top: 0.267rem;
    background-color: #fff;
    border-bottom: 2px solid #e4e4e4;
    .city-tip {
      display: flex;
      justify-content: space-between;
      padding: 0.266667rem;
      border-bottom: 1px solid #f5f5f5;
      font-size: 12px;
      span {
        color: #666;
        &:nth-child(2) {
          font-weight: 900;
          color: #9f9f9f;
        }
      }
    }
    .guess-city {
      display: flex;
      justify-content: space-between;
      padding: 0.266667rem;
      font-size: 12px;
      span {
        font-size: 16px;
        color: $elemColor;
      }
      i {
        color: #999;
      }
    }
  }
  .hot-city {
    margin-top: 0.27rem;
    background-color: #fff;
    border-top: 2px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    .title {
      padding: 0.27rem;
      color: #666;
      font-size: 14px;
      border-bottom: 1px solid #e4e4e4;
    }
    .citylistul {
      width: 100%;
      @include clearfloat;
      li {
        float: left;
        width: 25%;
        height: 1.12rem;
        text-align: center;
        line-height: 1.12rem;
        border-right: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        font-size: 14px;
        letter-spacing: 1px;
        color: $elemColor;
        &:nth-of-type(4n) {
          border-right: none;
        }
      }
    }
  }
  .group-city-container {
    margin-top: 0.27rem;
    .letter-classify {
      background-color: #f9f9f9;
      .letter-classify-li {
        margin-bottom: 0.27rem;
        background-color: #fff;
        border-top: 2px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        .letter-classify-title {
          padding: 0.267rem;
          border-bottom: 1px solid #e4e4e4;
        }
        .groupcity-name-container {
          width: 100%;
          @include clearfloat;
          .groupcity-name-container-li {
            float: left;
            width: 25%;
            height: 1.12rem;
            text-align: center;
            line-height: 1.12rem;
            border-right: 1px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
            font-size: 14px;
            letter-spacing: 1px;
            color: #666;
            @include text-ellipsis;
            &:nth-of-type(4n) {
              border-right: none;
            }
          }
        }
      }
    }
  }
}
</style>
