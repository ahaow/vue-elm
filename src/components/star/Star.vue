<template>
  <div class="star">
    <span 
        v-for='(itemclass,index) in itemClasses'
        :key="index"
        class="star-item"
        :class="itemclass"
    >
    </span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  name: "star",
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      // 取整数
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      let hasDecimal = score % 1 !== 0; // 是否 有 half;
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss">
.star {
  display: inline-block;
  font-size: 0;
  .star-item {
    display: inline-block;
    background-color: no-repeat;
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;
    &:last-child {
      margin-right: 0;
    }
    &.on {
      background-image: url("./star24_on@2x.png");
      background-repeat: no-repeat;
    }
    &.half {
      background-image: url("./star24_half@2x.png");
      background-repeat: no-repeat;
    }
    &.off {
      background-image: url("./star24_off@2x.png");
      background-repeat: no-repeat;
    }
  }
}
</style>