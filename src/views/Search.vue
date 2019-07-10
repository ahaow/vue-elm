<template>
  <div class="search">
    <header class="search-header">搜索</header>
    <section class="search-form">
      <form class="search_form">
        <input
          type="search"
          v-model="searchVal"
          name="search"
          placeholder="请输入商家"
          class="search-input"
        />
        <input type="submit" name="submit" class="search-submir" @click.prevent="handleSearch('')" />
      </form>
    </section>

    <section class="search-content" v-if='contentShow'>
        <h5>商家</h5>
        <ul class="search-list">
            <li 
              v-for='item in searchList'
              :key="item.id"
              class="search-item"
            >
                <div class="search-item-avatar">
                  <img :src="'http://elm.cangdu.org/img/'+item.image_path" :alt='item.name' />
                </div>
                <div class="search-item-info">
                    <p>{{item.name}}</p>
                    <p>月售{{item.recent_order_num}}单</p>
                    <p>¥{{item.float_minimum_order_amount}}元起送/{{item.piecewise_agent_fee.tips}}</p>
                </div>
            </li>
        </ul>
    </section>
    <section v-if='searchNone' class="search_none">很抱歉！无搜索结果</section>

  </div>
</template>

<script>
import { search_api } from "./../api/index";

export default {
  name: "search",
  data() {
    return {
      searchVal: "", // 搜索关键字
      searchNone: false, // 控制 `没有搜索结果` 的 box 显示隐藏
      contentShow: false, // 控制 `有搜索结果` 的 box 显示隐藏
      searchList: [], // 搜索列表
    };
  },
  methods: {
    handleSearch() {
      this.getRestaurantsList(this.searchVal);
    },
    getRestaurantsList(searchVal) {
        this.axios.get(`${search_api.restaurants}?geohash=31.22967,121.4762&keyword=${searchVal}`,{}).then(res => {
            console.log(res);

            // 假如没有搜索结果
            if(res.data.length <= 0) {
                this.searchNone = true;
            } else {
                this.contentShow = true;
                this.searchList = res.data;
            }
        }).catch(err => {
            console.log(err);
        })
    }
  },
  updated() {
      console.log(this.searchVal)
      if(this.searchVal === '') {
        this.contentShow = false;
        this.searchNone = false;
      }
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/utils.scss";
.search {
  .search-header {
    width: 100%;
    height: 1.365332rem;
    background-color: $elemColor;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 1.365332rem;
    font-weight: 700;
    letter-spacing: 2px;
  }
  .search-form {
    padding: 0.256rem;
    background-color: #fff;
    .search_form {
      display: flex;
      padding: 0.256rem;
      .search-input {
        flex: 3.8;
        border: 1px solid #e4e4e4;
        padding: 0.256rem;
        background-color: #f2f2f2;
        border-radius: 4px;
        &::-webkit-input-placeholder {
          font-size: 14px;
          columns: #333;
          font-weight: 700;
        }
      }
      .search-submir {
        flex: 1.2;
        margin-left: 0.170667rem;
        border-radius: 4px;
        background-color: $elemColor;
        border-color: transparent;
        color: #fff;
        font-size: 16px;
      }
    }
  }
  .search-content {
    h5 {
        padding: .341333rem;
    }
    .search-list {
        background-color: #fff;
        padding: .170667rem;
        margin-bottom: .853333rem;
        .search-item {
            margin-bottom: .170667rem;
            @include clearfloat;
            padding-bottom: .256rem;
            border-bottom: 1px solid #e0e0e0; 
            .search-item-avatar {
                float: left;
                width: 1.706665rem;
                height: 1.706665rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .search-item-info {
                float: left;
                width: 75%;
                margin-left: .341333rem;
                p {
                    margin-bottom: .341333rem;
                    &:nth-child(3) {
                      margin-bottom: 0;
                    }
                    
                }
            }
        }
    }
  }
  .search_none {
      margin-top: .170667rem;
      width: 100%;
      padding: .341333rem .170667rem;
      background-color: #fff;
      text-align: center;
  }
}
</style>
