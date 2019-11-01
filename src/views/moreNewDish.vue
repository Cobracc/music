<template>
  <div class="wrapper pd23">
    <div class="detailnav">
      <i @click="returnPage()" class="iconfont icon-fanhui1"></i>
      <p>新碟上架</p>
    </div>
    <div class="nowWeekNewDish" >
      <h1 class="title">本周新碟</h1>
      <div class="img-card-wrapper" v-show="!loading">
        <img-card
          v-for="(item, index) in nowWeekNewDish"
          :key="index"
          width="126px"
          :imgUrl="item.picUrl"
          :dec="item.name"
          :dishId="item.id"
          :artists="item.artists"
          lines="one"
        ></img-card>
      </div>
    </div>
    <div class="nowWeekNewDish" v-show="nowMonth" >
      <h1>
        <span class="month">{{month}}月</span>
        <span class="year">/{{year}}</span>
      </h1>
      <div class="img-card-wrapper" v-show="!loading">
        <img-card
          v-for="(item, index) in nowMonth"
          :key="index"
          width="126px"
          :imgUrl="item.picUrl"
          :dec="item.name"
          :dishId="item.id"
          :artists="item.artists"
          lines="one"
        ></img-card>
      </div>
    </div>
    <div class="nowWeekNewDish" v-show="lastMonth.length">
      <h1>
        <span class="month">{{prevMonth}}月</span>
        <span class="year">/{{prevYear}}</span>
      </h1>
      <div class="img-card-wrapper" v-show="!loading">
        <img-card
          v-for="(item, index) in lastMonth"
          :key="index"
          width="126px"
          :imgUrl="item.picUrl"
          :dec="item.name"
          :dishId="item.id"
          :artists="item.artists"
          lines="one"
        ></img-card>
      </div>
    </div>
    <div class="load" v-show="loading">
      <pageloading></pageloading>
    </div>
  </div>
</template>

<script>
import imgCard from "@/components/imgCard.vue";
import pageloading from "@/components/Loading.vue";
export default {
  name: "",
  data() {
    return {
      // 本周新碟
      nowWeekNewDish: [],
      // 当前月
      nowMonth: [],
      // 上一个月
      lastMonth: [],
      offset: 0,
      albums: [],
      loading: true
    };
  },
  created() {
    this._getAllInfo(this.offset);
  },
  computed: {
    year: function() {
      return new Date().getFullYear();
    },
    month: function() {
      return new Date().getMonth() + 1;
    },
    prevYear: function() {
      if (this.prevMonth === 12) {
        return this.year - 1;
      }
      return this.year;
    },
    prevMonth: function() {
      let prev = this.month - 1;
      if (prev === 0) {
        prev = 12;
      }
      return prev;
    }
  },
  methods: {
    returnPage() {
      this.$router.go(-1);
    },
    _getAllInfo(offset) {
      this.axios.get("/top/album?offset=" + offset + "&limit=80").then(res => {
        if (res.data.code === 200) {
          this.loading = false;
          if (this.albums.length === 0) {
            this.albums = res.data.albums;
            this.nowWeekNewDish = this.albums.splice(0, 4);
          } else {
            this.albums.push(...res.data.albums);
          }
          this.filterTime(this.albums);
        }
      });
    },
    // 对数据进行时间上的筛选
    filterTime(arr) {
      const months = {};
      const nowMonth = new Date().getMonth() + 1;
      const lastMonth = new Date().getMonth();
      // 将当前月和上一个月初始化为空数组
      months[nowMonth] = [];
      months[lastMonth] = [];
      // 遍历数据，筛选出当前月和上一个月的数据信息
      arr.forEach(element => {
        if (new Date(element.publishTime).getMonth() + 1 === nowMonth) {
          months[nowMonth].push(element);
        }
        if (new Date(element.publishTime).getMonth() + 1 === lastMonth) {
          months[lastMonth].push(element);
        }
      });
      this.nowMonth = months[nowMonth];
      this.lastMonth = months[lastMonth];
    }
  },
  components: {
    imgCard,
    pageloading
  }
};
</script>

<style lang='less' scoped>
.wrapper {
  .detailnav {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    position: relative;
    z-index: 2;
    i {
      display: inline-block;
      font-size: 18px;
      color: black;
    }
    p {
      display: inline-block;
      font-size: 18px;
      margin-left: 15px;
      color: black;
      margin-top: -3px;
      font-weight: 600;
    }
  }
  .month {
    font-size: 20px;
    font-weight: 700;
  }
  .year {
    font-size: 13px;
  }
  .nowWeekNewDish {
    margin-top: 10.5px;
    .title {
      font-size: 16px;
      font-weight: 700;
    }
    .img-card-wrapper {
      flex-wrap: wrap;
      display: flex;
      justify-content: space-around;
    }
  }
}
.pd23 {
  box-sizing: border-box;
  padding: 0 12px;
}
</style>
