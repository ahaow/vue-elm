<template>
  <div>
    <div class="address-page" ref="address">
      <header class="address-header">
        <i class="iconfont icon-right" @click="handleBack"></i>
        <span>选择地址</span>
      </header>
      <section class="address-list">
        <ul class="deliverable-address">
          <li v-for="item in addressList" :key="item.id">
            <i class="iconfont icon-xuanzhong"></i>
            <div class="content">
              <header class="header">
                <span class="name">{{item.name}}</span>
                <span class="nick-name">{{item.sex == 1 ? '先生' : '女士'}}</span>
                <span class="phone">{{item.phone}}</span>
              </header>
              <div class="bottom">
                <span class="label">{{item.tag}}</span>
                <span class="address">{{item.address}} , {{item.address_detail}}</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <div class="newAddress" @click="handleGoAddaddress">
        <i class="iconfont icon-wuuiconxiangjifangda"></i>
        <span>新增地址</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "addresspage",
  data() {
    return {
      addressList: []
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    handleGoAddaddress() {
      this.$router.push('/chooseAddress/addAddress')
    }
  },
  created() {
    let user_id = JSON.parse(window.localStorage.getItem("id"));
    if (user_id) {
      this.$api.AddressAjax.getAddress(user_id)
        .then(res => {
          console.log(res.data);
          this.addressList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      return;
    }
  },
  mounted() {
    this.$refs.address.style.height = window.screen.height + "px";
  }
};
</script>

<style lang="scss">
@import "./../../assets/scss/utils.scss";
.address-page {
  background-color: #fff;
  .address-header {
    width: 100%;
    height: 1.34rem;
    background-color: $elemColor;
    text-align: center;
    z-index: 99;
    i {
      position: absolute;
      left: 0.27rem;
      line-height: 1.34rem;
      font-size: 24px;
      color: #fff;
      transform: rotate(180deg);
    }
    span {
      line-height: 1.34rem;
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 1px;
    }
  }
  .address-list {
    margin-bottom: 1.6rem;
    .deliverable-address {
      background-color: #fff;
      li {
        display: flex;
        align-items: center;
        border-bottom: 0.025rem solid #f5f5f5;
        padding: 0.5rem;
        line-height: 0.5rem;
        i {
          font-size: 22px;
          color: #c0c0c0;
          &.active {
            color: #4cd964;
          }
        }
        .content {
          margin-left: 0.267rem;
          .header {
            font-size: 15px;
            color: #333;
            .name {
              font-size: 18px;
              font-weight: 700;
            }
            .nick-name {
              margin-left: 0.13rem;
            }
            .phone {
              margin-left: 0.267rem;
            }
          }
          .bottom {
            font-size: 10px;
            color: #fff;
            margin-top: 0.213rem;
            .label {
              display: inline-block;
              padding: 0 0.08rem;
              background-color: #ff5722;
            }
            .address {
              color: #333;
              margin-left: 0.267rem;
            }
          }
        }
      }
    }
  }
  .newAddress {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.6rem;
    background-color: #fff;
    text-align: center;
    line-height: 1.6rem;
    color: $elemColor;
    i {
      font-size: 24px;
      vertical-align: middle;
    }
    span {
      margin-left: 0.266667rem;
      font-size: 16px;
      vertical-align: middle;
    }
  }
}
</style>


