<template>
  <div class="confirmOrder">
    <header class="confirm-header">
      <i class="iconfont icon-right" @click="handleBack"></i>
      <span>确认订单</span>
    </header>

    <section class="address">
      <div class="address-content">
        <div class="address-left">
          <i class="iconfont icon-dizhi"></i>
          <div v-if='addressList.length > 0' class="address-info">
            <div class="address-info-top">
              <b class="name">{{addressList[0].name}}</b>
              <span class="gender">{{addressList[0].sex == 1 ? '先生' : '女士'}}</span>
              <span class="phone">{{addressList[0].phone}}</span>
            </div>
            <div class="address-info-bottom">{{addressList[0].tag}} / {{addressList[0].address}} / {{addressList[0].address_detail}}</div>
          </div>
          <div v-if='addressList.length <= 0' class="address-info current">
            请添加一个收货地址
          </div>
        </div>
        <div class="address-right" @click="handleGoAddress">
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </section>

    <div class="split"></div>

    <section class="delivery_model">
      <div class="deliver_text">送达时间</div>
      <div class="deliver_time">
        <p class="time">尽快送达 | 预计 12：11</p>
        <p class="tips">蜂鸟专送</p>
      </div>
    </section>

    <div class="split"></div>

    <section class="pay_way" @click="handleChangeCoverShow">
      <div class="pay-fs">
        <span class="fs">支付方式</span>
        <span class="zx">
          在线支付
          <i class="iconfont icon-right"></i>
        </span>
      </div>
      <div class="hongbao">
        <span>红包</span>
        <span>暂时只在饿了么APP中支持</span>
      </div>
    </section>

    <div class="split"></div>

    <section class="food-list">
      <header class="food-title">
        <img src="//elm.cangdu.org/img/16b7261e13946470.jpg" alt="avatar" />
        <span>嗷嗷</span>
      </header>
      <ul class="food-list-ul">
        <li v-for="item in businessList" :key="item.item_id" class="food-item">
          <div class="food-name">{{item.name}}</div>
          <div class="food-num-price">
            <span>X {{item.num}}</span>
            <span>¥{{item.satisfy_rate}}</span>
          </div>
        </li>
      </ul>

      <div class="food-item-style">
        <span>餐盒</span>
        <span>¥ {{ch}}</span>
      </div>

      <div class="food-item-style">
        <span>配送费</span>
        <span class="current">¥ {{psf}}</span>
      </div>

      <div class="food-item-style">
        <span>订单</span>
        <span class="current">待支付 ¥{{totalPrice}}</span>
      </div>
    </section>

    <div class="split"></div>

    <section class="pay_way current" >
      <div class="pay-fs" @click="handleChangeRatingPageShow">
        <span class="fs">订单备注</span>
        <span class="zx">
          {{AllText === "" ? `口味、偏好等` : AllText}}
          <i class="iconfont icon-right"></i>
        </span>
      </div>
      <div class="hongbao">
        <span>发票抬头</span>
        <span>商家不支持开发票</span>
      </div>
    </section>

    <div class="confrim-order">
      <p>待支付 ¥{{totalPrice}}</p>
      <p>确认下单</p>
    </div>

    <transition name="">
      <div class="cover-mask" @click="handleChangeCoverHide" v-if="coverShow"></div>
    </transition>

    <transition name="slide">
      <div class="cover-content" v-if="coverShow">
        <p class="header">支付方式</p>
        <ul class="cover-list">
          <li class="current">
            <span>货到付款(商家不支持货到付款)</span>
            <i class="iconfont icon-xuanzhong"></i>
          </li>
          <li>
            <span>在线支付</span>
            <i class="iconfont icon-xuanzhong current"></i>
          </li>
        </ul>
      </div>
    </transition>

    <transition name="slidex">
      <div class="rating-page" v-if="ratingPageShow">
        <header class="rating-page-header">
          <i class="iconfont icon-right" @click="handleChangeRatingPageHide"></i>
          <span>订单备注</span>
        </header>

        <section class="rating-page-bz">
          <h3 class="title">快速备注</h3>
          <ul class="remark-arr-list">
            <li
              v-for="(item,index) in pepperArr"
              :key="index"
              @click="handleChangePepper(index,item)"
              :class="pepperIndex == index ? 'current' : ''"
            >{{item}}</li>
          </ul>

          <ul class="remark-arr-list-current">
            <li
              :class="iceIndex == index ? 'current' : ''"
              v-for="(item,index) in iceArr"
              :key="index"
              @click="handleChangeIce(index,item)"
            >{{item}}</li>
          </ul>

          <div class="remark-other">
            <span 
              :class="xc ? 'current' : ''"
              @click='handleChangeXc'
            >不要香菜</span>
            <span 
              :class="yc ? 'current' : ''"
              @click='handleChangeYc'
            >不要洋葱</span>

            <span 
              :class="sc ? 'current' : ''"
              @click='handleChangeSc'
            >多点醋</span>

            <span 
              :class="dc ? 'current' : ''"
              @click='handleChangeDc'
            >多点葱</span>
          </div>
        </section>

        <section class="input-remark">
          <h3 class="title">其他备注</h3>
          <textarea class="input-text" v-model="areatText" placeholder="请输入备注内容(可不填)"></textarea>
          <div class="determine reset" @click='handleReset'>重置</div>
          <div class="determine" @click='handleDetermine'>确定</div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "confirmOrder",
  data() {
    return {
      addressList: [], // 地址列表
      ch: 4, // 餐盒
      psf: null, // 配送费
      coverShow: false,
      ratingPageShow: false,
      pepperArr: ["不要辣", "少点辣", "多点辣"], // 辣椒味数组
      pepperText: "",
      pepperIndex: null,
      iceArr: ["去冰", "少冰"], // 要不要冰
      iceText: "",
      iceIndex: null,
      xc: false, // 选择香菜
      xcText: '',
      yc: false, // 选择洋葱
      ycText: '',
      sc: false, // 选择酸醋
      scText: '',
      dc: false, // 选择大葱
      dcText: '',
      areatText: '',
      AllText: '', // 所有信息
    };
  },
  computed: {
    businessList() {
      return this.$store.state.businessList;
    },
    totalPrice() {
      let total = 0;
      this.$store.state.businessList.forEach(item => {
        total += item.num * item.satisfy_rate;
      });
      return Number(total) + Number(this.ch) + Number(this.psf);
    },
   
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    handleChangeCoverShow() {
      this.coverShow = true;
    },
    handleChangeCoverHide() {
      this.coverShow = false;
    },
    handleChangeRatingPageShow() {
      this.ratingPageShow = true;
    },
    handleChangeRatingPageHide() {
      this.ratingPageShow = false;
    },

    // 选择口味
    handleChangePepper(index, item) {
      this.pepperText = item;
      this.pepperIndex = index;
    },
    // 选择要不要加冰
    handleChangeIce(index, item) {
      console.log(index);
      this.iceText = item;
      this.iceIndex = index;
    },
    // 选择香菜
    handleChangeXc() {
      this.xc = true;
      this.xcText = '不要香菜'
    },
    // 选择洋葱
    handleChangeYc() {
      this.yc = true;
      this.ycText = '不要洋葱'
    },
    // 多点醋
    handleChangeSc() {
      this.sc = true;
      this.scText = '多点醋'
    },
    // 多点大葱
    handleChangeDc() {
      this.dc = true;
      this.dcText = '多点大葱'
    },
    // 重置
    handleReset() {
      this.pepperText = ''; this.pepperIndex = null;
      this.iceText = ""; this.iceIndex = null;
      this.xc = false; this.xcText = '';
      this.yc = false; this.ycText = '';
      this.sc = false; this.scText = '';
      this.dc = false; this.dcText = '';
      this.areatText = '';
      this.AllText = '';
    },
    // 确定
    handleDetermine() {
      let { pepperText , iceText , xcText , ycText , scText , dcText , areatText } = this;
      this.AllText = `${pepperText} ${iceText} ${xcText} ${ycText} ${scText} ${dcText} ${areatText}`;
      let s = this.AllText.replace(/\s+/g,"");
      this.AllText = s;
      if(this.AllText === '') {
        alert('请选择填写备注')
      } else {
        this.ratingPageShow = false;
      }
    },

    // 前往地址选择页面
    handleGoAddress() {
      this.$router.push('/chooseAddress');
    }
    
  },
  created() {
    this.psf = this.$router.history.current.query.psf;
    let user_id = JSON.parse(window.localStorage.getItem('id'));

    this.$api.AddressAjax.getAddress(user_id).then(res => {
      console.log(res.data);
      this.addressList = res.data;
    }).catch(err => {
      console.log(err);
    })


  }
};
</script>

<style lang="scss">
@import "./../assets/scss/utils.scss";
.confirmOrder {
  background-color: #fff;
  .confirm-header {
    position: fixed;
    left: 0;
    top: 0;
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
  .address {
    margin-top: 1.34rem;
    height: 2.5rem;
    padding: 0 0.6rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAGCAYAAACMyr1NAAAAAXNSR0IArs4c6QAAANxJREFUOBFjZICCpoUPWhn+M7rD+OTQjP8ZztQmymfg0/tr95JlDAz/I/GpISTHyMiwj9Ul1hmbOiaQYNfSx6qUegZkDisD01QQjQv837NMD+iYCFzyxIr/Z2asxqWWBSTx49e/LAZGXEqIFP/PcLgiUfYyPtV/GP62/P9PmU3AANnM6hhzApc9TB3zH+sCrbDFpYBYcQ42pmn41P7av8QC6BlffGoIyTEyMv5nYWCuwaeO6TfDv2x8CoiSY/y/syxa9jY+tYx//7fikydGDhggKxhdoi4Ro3bYqAEAknE5DXYMR0IAAAAASUVORK5CYII=)
      0 100% repeat-x;
    background-repeat: repeat-x;
    background-size: auto 0.12rem;
    .address-content {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 95%;
      background-color: #fff;
      justify-content: space-between;
      .address-left {
        position: relative;
        overflow: hidden;
        min-width: 70%;
        i {
          font-size: 24px;
          color: $elemColor;
          font-weight: 700;
          line-height: 2.5rem;
        }
        .address-info {
          position: absolute;
          left: 0.4rem;
          top: 0.67rem;
          display: inline-block;
          margin-left: 0.54rem;
          &.current {
            top: 1.05rem;
          }
          .address-info-top {
            .name {
              font-size: 18px;
            }
            .gender {
              margin-left: 5px;
            }
            .phone {
              margin-left: 5px;
            }
          }
          .address-info-bottom {
            margin-top: 0.133333rem;
          }
        }
      }
      .address-right {
        line-height: 2.5rem;
        i {
          font-size: 24px;
          color: #999;
        }
      }
    }
  }
  .split {
    width: 100%;
    height: 0.27rem;
    background-color: #f5f5f5;
  }
  .delivery_model {
    width: 100%;
    min-height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-left: 0.15rem solid $elemColor;
    box-sizing: border-box;
    .deliver_text {
      margin-left: 0.55rem;
      font-size: 20px;
      font-weight: 700;
    }
    .deliver_time {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-right: 0.55rem;
      .time {
        font-size: 16px;
        color: #3190e8;
      }
      .tips {
        padding: 0.134rem 0.267rem;
        margin-top: 0.25rem;
        font-size: 0.15rem;
        background-color: #3190e8;
        border-radius: 4px;
        color: #fff;
      }
    }
  }
  .pay_way {
    background-color: #fff;
    padding: 0 0.7rem;
    &.current {
      margin-bottom: 1.5rem;
    }
    .pay-fs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1rem;
      .fs {
        font-size: 16px;
        color: #666;
      }
      .zx {
        color: #aaa;
        font-size: 14px;
        i {
          vertical-align: middle;
        }
      }
    }
    .hongbao {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1rem;
      border-top: 0.025rem solid #f5f5f5;
      span {
        color: #aaa;
        font-size: 14px;
      }
    }
  }
  .food-list {
    background-color: #fff;
    color: #666;
    .food-title {
      padding: 0.7rem;
      border-bottom: 1px solid #f5f5f5;
      img {
        width: 0.8rem;
        height: 0.8rem;
        vertical-align: middle;
      }
      span {
        font-size: 20px;
        vertical-align: middle;
        margin-left: 0.27rem;
      }
    }
    .food-list-ul {
      padding-top: 0.2rem;
      .food-item {
        display: flex;
        justify-content: space-between;
        line-height: 1.2rem;
        padding: 0 0.7rem;
        .food-name {
          font-size: 16px;
        }
        .food-num-price {
          span {
            font-size: 14px;
            margin-left: 0.4rem;
            &:first-of-type {
              color: #f60;
            }
          }
        }
      }
    }
    .food-item-style {
      display: flex;
      justify-content: space-between;
      line-height: 1.2rem;
      padding: 0 0.7rem;
      font-size: 16px;
      span {
        &.current {
          color: #f60;
        }
      }
    }
  }
  .confrim-order {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.2rem;
    background-color: red;
    p {
      line-height: 1.2rem;
      font-size: 17px;
      color: #fff;
      &:nth-child(1) {
        flex: 5;
        padding-left: 0.7rem;
        background-color: #3c3c3c;
      }
      &:nth-child(2) {
        flex: 2;
        background-color: #56d176;
        text-align: center;
      }
    }
  }
  .cover-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.3;
  }
  .cover-content {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5.34rem;
    background-color: #fff;
    .header {
      line-height: 1.2rem;
      background-color: #fafafa;
      text-align: center;
      font-size: 16px;
    }
    .cover-list {
      li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 0.5rem;
        line-height: 1.5rem;
        font-size: 16px;
        &.current {
          color: #ccc;
        }
        i {
          font-size: 22px;
          &.current {
            color: #4cd964;
          }
        }
      }
    }
  }
  .rating-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 110;
    .rating-page-header {
      position: relative;
      width: 100%;
      height: 1.34rem;
      background-color: $elemColor;
      text-align: center;
      i {
        position: absolute;
        left: 0.267rem;
        top: 50%;
        transform: translateY(-50%) rotate(180deg);
        color: #fff;
        font-size: 24px;
      }
      span {
        line-height: 1.34rem;
        font-size: 18px;
        color: #fff;
        font-weight: 600;
      }
    }
    .rating-page-bz {
      margin-top: 0.27rem;
      padding: 0.27rem 0.27rem 0.54rem;
      background-color: #fff;
      .title {
        font-size: 15px;
        letter-spacing: 1px;
      }
      .remark-arr-list {
        margin-top: 0.267rem;
        zoom: 1;
        &::after {
          content: "";
          display: block;
          visibility: hidden;
          height: 0;
          clear: both;
        }
        li {
          float: left;
          padding: 0.2rem 0.3rem;
          border: 1px solid #3190e8;
          font-size: 14px;
          &.current {
            background-color: #3190e8;
            color: #fff;
          }
          &:nth-child(1) {
            border-right: none;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
          &:nth-child(2) {
            border-right: none;
          }
          &:nth-child(3) {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
        }
      }
      .remark-arr-list-current {
        margin-top: 0.267rem;
        zoom: 1;
        &::after {
          content: "";
          display: block;
          visibility: hidden;
          height: 0;
          clear: both;
        }
        li {
          float: left;
          padding: 0.2rem 0.3rem;
          border: 1px solid #3190e8;
          font-size: 14px;
          &.current {
            background-color: #3190e8;
            color: #fff;
          }
          &:nth-child(1) {
            border-right: none;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
          &:nth-child(2) {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
        }
      }
      .remark-other {
        margin-top: 0.267rem;
        span {
          display: inline-block;
          padding: 0.2rem 0.3rem;
          border: 1px solid #3190e8;
          border-radius: 4px;
          font-size: 14px;
          margin-right: 0.267rem;
          &.current {
            background-color: #3190e8;
            color: #fff;
          }
        }
      }
    }
    .input-remark {
      margin-top: 0.267rem;
      padding: 0.54rem 0.267rem;
      background-color: #fff;
      .title {
        font-size: 15px;
        letter-spacing: 1px;
      }
      .input-text {
        margin-top: 0.267rem;
        width: 100%;
        background-color: #f9f9f9;
        border: 1px solid #eee;
        resize: none;
        min-height: 4.5rem;
        border-radius: 0.2rem;
        font-size: 15px;
        color: #666;
        padding: 0.5rem;
      }
      .determine {
        margin-top: 0.267rem;
        width: 100%;
        height: 1rem;
        background-color: #4cd964;
        text-align: center;
        line-height: 1rem;
        color: #fff;
        border-radius: 4px;
        &.reset {
          background-color: #c9c9c9;
        }
      }
    }
  }
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s ease-in;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: all 0.3s ease-in;
}
.fade-leave-to {
  opacity: 0;
}

.slide-enter {
  transform: translate3d(0, 100%, 0);
}
.slide-enter-active {
  transition: all 0.3s ease-in;
}
.slide-enter-to {
  transform: translate3d(0, 0, 0);
}
.slide-leave {
  transform: translate3d(0, 0, 0);
}
.slide-leave-active {
  transition: all 0.3s ease-in;
}
.slide-leave-to {
  transform: translate3d(0, 100%, 0);
}

.slidex-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slidex-enter-active {
  transition: all 0.3s ease-in;
}
.slidex-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.slidex-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.slidex-leave-active {
  transition: all 0.3s ease-in;
}
.slidex-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
