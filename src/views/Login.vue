<template>
  <div class="login">
    <header class="login-header">
      <i class="iconfont icon-right" @click="handleBack"></i>
      密码登录
    </header>
    <section class="login-form">
      <div class="form-li">
        <input type="text" v-model="username" name="username" placeholder="账号" />
      </div>
      <div class="form-li">
        <input :type="showPsw ? 'text':'password'" v-model="psw" name="username" placeholder="密码" />
        <div :class="showPsw ? 'button_switch active' : 'button_switch'">
          <span @click="handleViewPsw" :class="showPsw ? 'circle_button active':'circle_button'"></span>
        </div>
      </div>
      <div class="form-li">
        <input type="number" v-model="code" class="input-code" name="code" placeholder="验证码" />
        <div class="code">
          <img
            :src="codeImg"
            alt='验证码'
          />
        </div>
        <div class="change_img">
          <p>看不清</p>
          <p @click='getCode'>换一张</p>
        </div>
      </div>
    </section>

    <p class="login_tips">温馨提示: 未注册过的账号，登录时将自动注册</p>
    <p class="login_tips">注册过的用户可凭账号密码登录</p>
    <div class="login_container" @click="handleLogin">登录</div>

    <Toast
      :imgUrl="imgUrl"
      :toastShow="toastShow"
      :toastText="toastText"
      @handleToast="handleToast"
    />
  </div>
</template>

<script>
import { login_api } from "./../api/index";
import Toast from "./../components/toast/Toast";

export default {
  name: "login",
  components: {
    Toast
  },
  data() {
    return {
      showPsw: false,
      username: "", // 用户名
      psw: "", // 密码
      code: "", // 验证码
      codeImg: "", // 验证码图片
      imgUrl:
        "https://tva2.sinaimg.cn/large/007DFXDhgy1g4vxwg1ivhj303c03cdfl.jpg",
      toastShow: false,
      toastText: ""
    };
  },
  methods: {
    handleBack() {
      console.log(this.$router);
      this.$router.back();
    },
    handleViewPsw() {
      this.showPsw = !this.showPsw;
    },
    handleLogin() {
      console.log(this.username);
      if (this.username === "") {
        this.handleToastInfo("账户不能为空");
        return;
      } else if (this.psw === "") {
        this.handleToastInfo("密码不能为空");
        return;
      } else if (this.code === "") {
        this.handleToastInfo("验证码不能为空");
        return;
      } else {
        console.log("ajax");
        this.axios.post(login_api.login,{
            username: this.username,
            password: this.psw,
            captcha_code: this.code
        }).then(res => {
            console.log(res);
            // 登录成功
            if(res.status === 200) {
                window.localStorage.setItem('id',JSON.stringify(res.data.id));
                this.imgUrl = null;
                this.handleToastInfo("登录成功");
                setTimeout(() => {
                    this.$router.replace('/user');
                }, 1500);
            }
        }).catch(err => {
            console.log(err);
        })


      }
    },
    handleToastInfo(data) {
      this.toastShow = true;
      this.toastText = data;
    },
    handleToast() {
      setTimeout(() => {
        this.toastShow = false;
      }, 1500);
    },
    getCode() {
      // 获取验证码
      this.axios
        .post(login_api.captchas)
        .then(res => {
          console.log(res);
            if(res.data.status === 1) {
                this.codeImg = res.data.code
            }
        })
        .catch(err => {
          conole.log(err);
        });
    }
  },
  created() {
    this.getCode();
  }
};
</script>

<style lang="scss">
@import "./../assets/scss/utils.scss";
.login {
  .login-header {
    position: relative;
    width: 100%;
    height: 1.28rem;
    line-height: 1.28rem;
    background-color: $elemColor;
    font-size: 18px;
    text-align: center;
    color: #fff;

    i {
      position: absolute;
      left: 0.172rem;
      top: 0.034133rem;
      transform: rotate(180deg);
      font-size: 22px;
    }
  }
  .login-form {
    background-color: #fff;
    margin-top: 0.341333rem;
    .form-li {
      position: relative;
      padding: 0.170667rem;
      border-bottom: 1px solid #f1f1f1;
      .code {
        display: inline-block;
        width: 2.730664rem;
        height: 0.938666rem;
        vertical-align: middle;
        margin-left: 0.170667rem;
      }
      .change_img {
        display: inline-block;
        vertical-align: middle;
        p {
          margin: 0.085333rem 0;
          &:nth-child(2) {
            color: $elemColor;
          }
        }
      }
      input {
        width: 75%;
        margin-left: 5%;
        padding: 0.170667rem 0;
        font-size: 16px;
        border-color: transparent;
        &.input-code {
          width: 50%;
          vertical-align: middle;
        }
      }
      .button_switch {
        position: absolute;
        top: 50%;
        right: 0.341333rem;
        margin-top: -0.170667rem;
        width: 1.279999rem;
        height: 0.341333rem;
        background-color: #c0c0c0;
        border-radius: 0.170667rem;
        transition: all 0.2s ease-in;
        &.active {
          background-color: #4cd964;
        }
        .circle_button {
          position: absolute;
          top: -5px;
          left: 0;
          width: 0.682666rem;
          height: 0.682666rem;
          background-color: #f1f1f1;
          border-radius: 50%;
          transition: all 0.2s ease-in;
          &.active {
            left: 25px;
          }
        }
      }
    }
  }
  .login_tips {
    padding: 0.256rem;
    color: red;
  }
  .login_container {
    width: 95%;
    margin: 0.512rem auto 0;
    background-color: #4cd964;
    text-align: center;
    padding: 0.256rem 0;
    font-size: 16px;
    letter-spacing: 1px;
    color: #fff;
    border-radius: 0.170667rem;
  }
}
</style>
