<template>
  <div class="user">
    <header class="user-title">我的</header>
    <section class="login">
      <div class="avatar"></div>
      <div class="info">

      </div>

      <div class="right"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: "user"
};
</script>

<style lang="scss">
@import "./../assets/scss/utils.scss";
.user {
  color: salmon;
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
  }
  .login {
    background-color: $elemColor;
    padding: 0.4rem;
    @include clearfloat;
    .avatar {
      float: left;
      width: 1.6rem;
      height: 1.6rem;
      background-color: red;
      border-radius: 50%;
    }
    .info {
      float: left;
    }
  }
}
</style>
