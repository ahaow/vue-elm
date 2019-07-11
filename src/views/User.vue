<template>
  <div class="user">
    <header class="user-title">我的</header>
    <section class="login">
      <router-link :to='is_login ? "/info" : "/login"' >
        <div class="avatar">
          <img v-if='is_login' :src="'https://elm.cangdu.org/img/' + userinfo.avatar" :alt="userinfo.username">

        </div>
        <div class="info">
          <p class='login-text' v-if='!is_login'>登录/注册</p>
          <p class='login-text' v-if='is_login'>{{userinfo.username}}</p>
          <p class="login-tips">
            <i class="iconfont icon-phone-fill"></i>
            <span>暂无绑定手机号</span>
          </p>
        </div>
        <div class="right">
          <i class="iconfont icon-right"></i>
        </div>
      </router-link>
    </section>

    <section class="info-data">
      <ul>
        <li class="info-data-link">
          <span class="info-data-price">
            <b>0.00</b>元
          </span>
          <span class="info-data-text">我的余额</span>
        </li>
        <li class="info-data-link">
          <span class="info-data-price">
            <b class="two">0</b>个
          </span>
          <span class="info-data-text">我的优惠</span>
        </li>
        <li class="info-data-link">
          <span class="info-data-price">
            <b class="three">0</b>分
          </span>
          <span class="info-data-text">我的积分</span>
        </li>
      </ul>
    </section>

    <section class="profile-1reTe">
      <router-link to='/home'>
        <aside class="label">
          <i class="iconfont icon-home"></i>
        </aside>
        <div class="myorder-div">
          <span>我的订单</span>
          <i class="iconfont icon-right"></i>
        </div>
      </router-link>

      <router-link to='/home'>
        <aside class="label">
          <i class="iconfont icon-shopping-fill active"></i>
        </aside>
        <div class="myorder-div">
          <span>积分商城</span>
          <i class="iconfont icon-right"></i>
        </div>
      </router-link>

      <router-link to='/home'>
        <aside class="label">
          <i class="iconfont icon-creditcard current"></i>
        </aside>
        <div class="myorder-div">
          <span>饿了么会员卡</span>
          <i class="iconfont icon-right"></i>
        </div>
      </router-link>

    </section>


  </div>
</template>

<script>
import { user_api } from './../api/index';

export default {
  name: "user",
  data() {
    return {
      is_login: false,
      userinfo: '', // 用户信息
    }
  },
  methods: {
    handleGetUserInfo() {
      this.axios.get(user_api.getUser).then(res => {
        console.log(res);
        this.userinfo = res.data;
      }).catch(err => {
      })
    }
  },
  beforeCreate() {
  },
  created() {
    let id = JSON.parse(window.localStorage.getItem('id'));
    // 如果 id 存在 就表示用户已经登录了
    if(id) {
      // 用户登录了
      this.is_login = true;
      // 获取用户信息
      this.handleGetUserInfo();



    } else {
      this.is_login = false;
    }
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/utils.scss";
.user {
  color: #fff;
  .user-title {
    width: 100%;
    height: 1.33rem;
    background-color: $elemColor;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 1.33rem;
    font-weight: 700;
    letter-spacing: 2px;
    border-bottom: 1px solid #f5f5f5;
  }
  .login {
    position: relative;
    background-color: $elemColor;
    padding: 0.4rem;
    @include clearfloat;
    a {
      display: inline-block;
      color: #fff;
      width: 100%;
      height: 100%;
    }
    .avatar {
      float: left;
      width: 1.6rem;
      height: 1.6rem;
      background-color: #f4f4f4;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .info {
      float: left;
      margin-left: .341333rem;
      color: #fff;
      .login-text {
        margin-top: .170667rem;
        font-size: 18px;
        font-weight: 700;
      }
      .login-tips {
        margin-top: .256rem;
        i {
          vertical-align: middle;
          display: inline-block;
          transform: rotate(90deg)
        }
        span {
          margin-left: .170667rem;
          vertical-align: middle;
        }
      }
    }
    .right {
      position: absolute;
      right: .341333rem;
      top: 50%;
      margin-top: -0.256rem;
      i {
        font-size: 25px;
      }
    }
    
  }
  .info-data {
    width: 100%;
    ul {
      @include clearfloat;
      .info-data-link {
        float: left;
        width: 33.3%;
        background: #fff;
        color: #999;
        padding: .341333rem;
        text-align: center;
        border-right: 1px solid #f5f5f5;
        &:nth-child(3) {
          border: none;
        }
        .info-data-price {
          font-size: 14px;
          color: #000;
          display: block;
          b {
            font-size: 24px;
            font-weight: 700;
            color: #f90;
            &.two {
              color: #ff5f3e;
            }
            &.three {
              color: #6ac20b;
            }
          }
        }
        .info-data-text {
          display: block;
          margin-top: .256rem;
        }
      }
    }

  }
  .profile-1reTe {
    background-color: #fff;
    margin-top: .341333rem;
    color: #000;
    a {
      display: flex;
      padding-left: .494933rem;
      align-items: center;
      .label {
        color: #999;
        i {
          font-size: 22px;
          &.active {
            color: #ff5f3e;
          }
          &.current {
            color: #f90;
          }
        }
      }
      .myorder-div {
        width: 100%;
        padding: .341333rem;
        // @include clearfloat;
        border-bottom: 1px solid #f1f1f1;
        color: #999;
        span {
          float: left;
          visibility: middle;
          font-size: 15px;
        }
        i {
          float: right;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
