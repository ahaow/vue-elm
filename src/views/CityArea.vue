<template>
  <div class="cityarea">
    <header class="header">
      <i class="iconfont icon-right" @click="handleBack"></i>
      <span class="tag">{{this.cities.name}}</span>
      <span class="change-city">切换城市</span>
    </header>

    <section class="city-form">
      <div class="city-input">
        <input
          type="search"
          @input="handleInput"
          required="required"
          name="search"
          placeholder="输入学校、商务楼、地址"
        />
      </div>

      <div class="city-submit" @click="handleSubmit">提交</div>
    </section>

    <section class="history-content" v-if="historySearch.length > 0 && is_history">
      <h4 class="history-content-title">搜索历史</h4>
      <ul class="history-list">
        <li
          v-for="(item,index) in historySearch"
          :key="index"
          class="history-list-li"
          @click="handleGoHome(item)"
        >
          <h4 class="history-list-li-title">{{item.name}}</h4>
          <p class="history-list-li-info">{{item.address}}</p>
        </li>
      </ul>
      <footer class="clear-all-history" @click="handleEmptyHistorySearch">清空所有</footer>
    </section>

    <section class="search-content" v-if="inputSearch.length > 0">
      <ul class="search-list">
        <li
          class="search-list-li"
          v-for="(item,index) in inputSearch"
          :key="index"
          @click="handleSaveSearch(item)"
        >
          <h4 class="search-list-li-title">{{item.name}}</h4>
          <p class="search-list-li-info">{{item.address}}</p>
        </li>
      </ul>
    </section>

    <section class="search-none-place" v-if="inputSearch.length <= 0 && is_search">很抱歉！无搜索结果</section>
  </div>
</template>

<script>
export default {
  name: "cityarea",
  data() {
    return {
      cities: {}, // 所选择的城市信息
      inputVal: "", // 输入框值
      is_history: false, // 搜索框历史
      historySearch: [], // 搜索框历史
      is_search: false,
      inputSearch: [] // 搜索结果
    };
  },
  methods: {
    getCities(id) {
      this.$api.CityAjax.getCities(id).then(res => {
        this.cities = res.data;
      });
    },
    handleBack() {
      this.$router.back();
    },
    handleInput(e) {
      this.inputVal = e.target.value;
    },
    handleSubmit() {
      this.is_history = false;
      if (this.inputVal !== "") {
        this.$api.CityAjax.getSearchAddress(this.cities.id, this.inputVal)
          .then(res => {
            console.log(res);
            if (res.data.length <= 0) {
              this.is_search = true;
            } else {
              this.is_search = false;
            }
            this.inputSearch = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 点击保存到storage,并跳转到home;

    handleSaveSearch(item) {
      console.log(item);
      if (window.sessionStorage.getItem("history_city")) {
        let history_city = JSON.parse(
          window.sessionStorage.getItem("history_city")
        );
        history_city.push(item);
        window.sessionStorage.setItem(
          "history_city",
          JSON.stringify(history_city)
        );
        this.$router.push({
          path: "home",
          query: {
            latitude: item.latitude,
            longitude: item.longitude
          }
        });
      } else {
        let arr = [];
        arr.push(item);
        window.sessionStorage.setItem("history_city", JSON.stringify(arr));
        this.$router.push("/home");
      }
    },

    //
    handleGoHome(item) {
      console.log(item);
      this.$router.push({
        path: "home",
        query: {
          latitude: item.latitude,
          longitude: item.longitude
        }
      });
    },

    // 点击清除所有搜索历史
    handleEmptyHistorySearch() {
      window.sessionStorage.removeItem('history_city');
      this.historySearch = [];
    }

  },
  created() {
    // 获取路由传递过来的城市id值
    let city_id = this.$route.query.cityId;
    this.getCities(city_id);

    if (window.sessionStorage.getItem("history_city")) {
      this.historySearch = JSON.parse(
        window.sessionStorage.getItem("history_city")
      );
      this.is_history = true;
    } else {
      this.is_history = false;
    }
  },
  destroyed() {
  }
};
</script>


<style lang="scss">
@import "./../assets/scss/utils.scss";
.cityarea {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.2rem;
    padding: 0 0.267rem;
    background-color: $elemColor;
    box-sizing: border-box;
    color: #fff;
    i {
      transform: rotate(180deg);
      font-size: 22px;
    }
    .tag {
      font-size: 18px;
      font-weight: 700;
    }
    .change-city {
      font-size: 14px;
    }
  }
  .city-form {
    margin-top: 1.2rem;
    padding: 0.267rem 0.533rem;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    background-color: #fff;
    .city-input {
      width: 100%;
      input[name="search"] {
        width: 100%;
        padding: 0.213rem;
        border: 1px solid #e4e4e4;
        font-size: 14px;
      }
    }
    .city-submit {
      margin-top: 0.267rem;
      width: 100%;
      height: 0.853rem;
      line-height: 0.853rem;
      text-align: center;
      background-color: $elemColor;
      font-size: 14px;
      color: #fff;
    }
  }
  .history-content {
    .history-content-title {
      padding: 0.12rem 0.32rem;
      border-top: 1px solid #e4e4e4;
      border-bottom: 2px solid #e4e4e4;
    }
    .history-list {
      background-color: #fff;
      .history-list-li {
        padding: 0.53rem;
        border-bottom: 1px solid #e4e4e4;
        .history-list-li-title {
          font-size: 15px;
        }
        .history-list-li-info {
          margin-top: 0.267rem;
          color: #999;
        }
      }
    }
    .clear-all-history {
      line-height: 1.2rem;
      background-color: #fff;
      font-size: 16px;
      text-align: center;
      color: #666;
    }
  }
  .search-content {
    .search-list {
      background-color: #fff;
      .search-list-li {
        padding: 0.53rem;
        border-bottom: 1px solid #e4e4e4;
        &:last-child {
          border-bottom: none;
        }
        .search-list-li-title {
          font-size: 16px;
          letter-spacing: 1px;
        }
        .search-list-li-info {
          margin-top: 0.267rem;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  .search-none-place {
    margin: 0 auto;
    color: #333;
    background-color: #fff;
    text-indent: 0.5rem;
    line-height: 1.12rem;
    font-size: 16px;
  }
}
</style>
