<template>
  <div class="set-psw">
    <header class="header">
      <i class="iconfont icon-right" @click="handleGoBack"></i>
      重置密码
    </header>

    <form class="restForm">
      <section class="input_container">
        <input type="text" placeholder="账号" v-model="phone" name="phone" maxlength="11" />
      </section>
      <section class="input_container">
        <input type="password" placeholder="旧密码" v-model="oldPassWord" name="oldPassWord" />
      </section>
      <section class="input_container">
        <input type="password" placeholder="请输入新密码" v-model="newPassWord" name="newPassWord" />
      </section>
      <section class="input_container">
        <input type="password" placeholder="请确认密码" v-model="confirmPassWord" name="confirmPassWord" />
      </section>
      <section class="input_container current">
        <input type="text" v-model="code" placeholder="验证码" />
        <div class="img-change-img">
          <img :src="codeImg" alt="code" />
          <div class="change-img">
            <p>看不清</p>
            <p @click="handleCheckCode">换一张</p>
          </div>
        </div>
      </section>
    </form>
    <div class="errMsg" v-show='errMsgShow'>{{errMsg}}</div>
    <div class="changeBtn" @click='handleChangeBtn'>确认修改</div>
  </div>
</template>

<script>
export default {
  name: "setPsw",
  data() {
      return {
          phone: '', // 账号
          oldPassWord: '', // 旧密码
          newPassWord: '', // 新密码
          confirmPassWord: '', // 确认密码
          code: '', // 验证码
          codeImg: null, // 验证码图片
          errMsg: '错误提示', // 错误提示
          errMsgShow: false,
      }
  },
  methods: {
    handleGoBack() {
      this.$router.back();
    },
    getCaptchas() {
      // 获取验证码
      this.$api.LoginAjax.getCaptchas()
        .then(res => {
          console.log(res);
          this.codeImg = res.data.code
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCheckCode() {
        // 换一张验证码
        this.getCaptchas();
    },
    errMsgFunc(msg) {
        this.errMsgShow = true;
        this.errMsg = msg;
        setTimeout(() => {
            this.errMsgShow = false;
        }, 1500);
    },
    // 确认修改
    handleChangeBtn() {
        let { phone , oldPassWord , newPassWord , confirmPassWord , code } = this;
        if(phone.trim() === '') {
            this.errMsgFunc('账号不能为空')
        } else if(oldPassWord.trim() === '') {
            this.errMsgFunc('旧密码不能为空')
        } else if(newPassWord.trim() === '') {
            this.errMsgFunc('新密码不能为空')
        } else if(confirmPassWord.trim() === '') {
            this.errMsgFunc('确认密码不能为空')
        } else if(newPassWord !== confirmPassWord) {
            this.errMsgFunc('两次密码不一致')
        } else if(code.trim() === '') {
            this.errMsgFunc('验证码不能为空')
        } else {
            console.log('ajax');
            this.$api.UserAjax.changePsw({
                username: phone,
                oldpassWord: oldPassWord,
                newpassword: newPassWord,
                confirmpassword: confirmPassWord,
                captcha_code: code
            }).then(res => {
                console.log(res);
                if(res.data.status == 1) {
                    this.errMsgFunc(res.data.message)
                    setTimeout(() => {
                        this.$router.back();
                    }, 1500);
                } else {
                    this.errMsgFunc(res.data.message)
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
  },
  created() {
      this.getCaptchas();
  }
};
</script>

<style lang="scss">
@import "./../../assets/scss/utils.scss";
.set-psw {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
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
  .restForm {
    margin-top: 0.267rem;
    background-color: #fff;
    .input_container {
      padding: 0.267rem;
      border-bottom: 1px solid #f1f1f1;
      &.current {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      input {
        width: 60%;
        padding: 0.134rem;
        font-size: 16px;
        border: none;
      }
      .img-change-img {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        img {
          margin-right: 0.4rem;
        }
        .change-img {
          p {
            &:nth-child(2) {
              margin-top: 0.267rem;
              color: #3b95e9;
            }
          }
        }
      }
    }
  }
  .errMsg {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -2.67rem;
      min-width: 5.34rem;
      padding: .267rem .134rem;
      text-align: center;
      background-color: #000;
      color: #fff;
      font-size: 14px;
      border-radius: 4px;
      opacity: .9;
  }
  .changeBtn {
    width: 90%;
    padding: 0.3rem;
    margin: 0.54rem auto 0;
    background-color: #4cd964;
    font-size: 15px;
    color: #fff;
    text-align: center;
    border-radius: 4px;
  }
}
</style>

