<template>
  <div class="set-name">
    <header class="header">
      <i class="iconfont icon-right" @click="handleGoBack"></i>
      修改用户名
    </header>

    <section class="input-section">
        <input type="text" placeholder="输入用户名" v-model="inputVal">
        <div class="tips">用户名只能修改一次（5-24字符之间）</div>
    </section>

    <div class="change-btn" @click="handleChangeName">确认修改</div>

  </div>
</template>

<script>
export default {
  name: "setName",
  data() {
      return {
          inputVal: ''
      }
  },
  methods: {
      handleGoBack() {
          this.$router.back();
      },
      handleChangeName() {
          if(this.inputVal === '') {
              alert('用户名不能填写为空');
              return
          }
          alert('没有修改用户名接口,啊哈哈哈,没法做！233')
      }
  }
};
</script>

<style lang="scss" scope>
@import "./../../assets/scss/utils.scss";
.set-name {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 1000;
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
  .input-section {
      padding: .4rem;
      input {
          width: 100%;
          padding: .27rem .13rem;
          border: 1px solid #ddd;
      }
      .tips {
          margin-top: .267rem;
          color: #666;
      }
  }
  .change-btn {
      margin: .53rem auto 0;
      width: 92%;
      height: 1rem;
      line-height: 1rem;
      background-color: #3199e8;
      font-size: 15px;
      text-align: center;
      color: #fff;

  }
}
</style>

