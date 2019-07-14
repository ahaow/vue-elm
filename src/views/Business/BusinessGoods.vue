<template>
  <div class="business-goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" 
            :class='{"current": currentIndex === index}'
            v-for="(item,index) in goods" 
            :key="index"
            @click="selectMenu(index,$event)"    
        >
            
          <span class="text">
            <!-- <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span> -->
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li 
          class="food-list-hook"
          v-for='(item,index) in goods'
          :key="index"  
        >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li 
              class="food-item"
              v-for='(food,index) in item.foods'
              :key='index'
            >
              <div class="icon">
                <img
                  :src="'https://elm.cangdu.org/img/' + food.image_path"
                  width="100%"
                  height="100%"
                />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>{{food.tips}}</span>
                  <!-- <span>好评率28%</span> -->
                </div>
                <div class="price">
                  <span class="now">¥{{item.satisfy_rate}}</span>
                  <!-- <span class="old">1</span> -->
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { business_api } from './../../api/index';

export default {
  name: "BusinessGoods",
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0, 
    };
  },
  computed: {
    currentIndex() {
      for(let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        } 
      }
      return 0;
    }
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
        startY: true,
        click: true,
        probeType: 3      
      });
      this.foodsScroll.on('scroll',(pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      })

    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
      let height = 0;
      this.listHeight.push(height);
      for(let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += (item.clientHeight);
        this.listHeight.push(height);
      }
    },
    selectMenu(index,event) {
      console.log(index,event);
      if(event.__constructed) {
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
      let el = foodList[index];
      console.log(el); 
      this.foodsScroll.scrollToElement(el,300)
    }
  },
  created() {
    console.log(this.$route);
    let id = this.$route.params.id;

    this.axios
      .get(`${business_api.menu}${id}`)
      .then(res => {
        this.goods = res.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {}
};
</script>

<style lang="scss">
.business-goods {
  position: absolute;
  top: 5.1rem;
  bottom: 1.2rem;
  display: flex;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    width: 2.15rem;
    flex: 0 0 2.15rem;
    background-color: #f3f5f7;
    ul {
      .menu-item {
        display: table;
        height: 1.44rem;
        width: 100%;
        line-height: 1.44rem;
        padding: 0px 0.37rem;
        text-align: center;
        border-bottom: 1px solid #e0e0e0;
        &.current {
          position: relative;
          z-index: 10px;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          .text {
            border: none;
          }
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    background-color: #fff;
    .food-list-hook {
      .title {
        padding-left: 0.37rem;
        height: 0.7rem;
        line-height: 0.7rem;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: #93999f;
        background-color: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 0.48rem;
        padding-bottom: 0.28rem;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .icon {
          flex: 0 0 75px;
          height: 75px;
          margin-right: 0.38rem;
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            height: 0.38rem;
            line-height: 0.38rem;
            font-size: 14px;
            color: #000;
            font-weight: 700;
          }
          .desc,
          .extra {
            line-height: 0.3rem;
            font-size: 11px;
            color: rgba(147, 153, 159, 1);
          }
          .desc {
            margin-bottom: 0.21rem;
          }
          .extra {
            .count {
              margin-right: 0.32rem;
            }
          }
          .price {
            font-weight: 700;
            line-height: 0.64rem;
            margin-top: 0.085333rem;
            .now {
              margin-right: 0.21rem;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgba(147, 153, 159, 1);
            }
          }
        }
      }
    }
  }
}
</style>

