<template>
  <div>
    <div class="info">
      <header class="header">
        <i class="iconfont icon-right" @click="handleGoBack"></i>
        账户信息
      </header>
      <section class="profile-info">
        <span class="profile-info-name">头像</span>
        <div class="profile-info-avatar">
          <img src="https://elm.cangdu.org/img/default.jpg" height="48" width="48" alt="avatar" />
          <i class="iconfont icon-right"></i>
        </div>
      </section>
      <router-link tag="section" to='/info/setname' class="info-section">
        <span>用户名</span>
        <i class="iconfont icon-right"></i>
      </router-link>
      <router-link tag="section" to='/chooseAddress' class="info-section">
        <span>收货地址</span>
        <i class="iconfont icon-right"></i>
      </router-link>

      <div class="info-box">账号绑定</div>
      <section class="info-section">
        <span>手机</span>
        <i class="iconfont icon-right"></i>
      </section>
      <div class="info-box">安全设置</div>
      <router-link tag="section" to='/info/setpsw' class="info-section">
        <span>登录密码</span>
        <i class="iconfont icon-right"></i>
      </router-link>

      <div class="login-out">退出登录</div>
    </div>
    <div>
      <transition name="infoFade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "info",
  methods: {
    handleGoBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scope>
@import "./../../assets/scss/utils.scss";
.infoFade-enter {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
.infoFade-enter-active {
  transition: all 0.3s ease;
}
.infoFade-enter-to {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.infoFade-leave {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.infoFade-leave-active {
  transition: all 0.3s ease;
}
.infoFade-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}

.info {
  .header {
    position: relative;
    width: 100%;
    height: 1.33rem;
    line-height: 1.33rem;
    color: #fff;
    background-color: $elemColor;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    i {
      position: absolute;
      left: 0.267rem;
      font-size: 24px;
      transform: rotate(180deg);
    }
  }
  .profile-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.267rem;
    padding: 0.4rem 0.267rem;
    background-color: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .profile-info-name {
      font-size: 14px;
      letter-spacing: 1px;
    }
    .profile-info-avatar {
      img {
        margin-right: 0.267rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      i {
        font-size: 18px;
        vertical-align: middle;
        color: #ddd;
      }
    }
  }
  .info-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 0.267rem;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    i {
      font-size: 18px;
      color: #ddd;
    }
  }
  .info-box {
    padding: 0.267rem;
    border-bottom: 1px solid #ddd;
  }
  .login-out {
    margin: 0.8rem auto 0;
    width: 90%;
    height: 0.933rem;
    line-height: 0.933rem;
    background-color: #d8584a;
    text-align: center;
    border-radius: 0.106667rem;
    color: #fff;
  }
}
</style>
