<template>
  <div class="wrapper">
    <div class="detailnav pd23">
      <i @click="returnPage()" class="iconfont icon-fanhui1"></i>
      <p>歌单</p>
    </div>
    <div class="fixed">
      <select-list
        class="pd23"
        :firstList="firstList"
        :secondList="secondList"
        :firstId.sync="firstId"
        :secondId.sync="secondId"
        @updatefirstID="updateFirst"
        @updatesecondID="updateSecond"
      ></select-list>
    </div>
    <h1 class="title pd23" ref="title">热门歌手</h1>
    <Loading v-show="loading"></Loading>
    <div class="list-item pd23" v-for="(item,index) in allArtistList" :key="index">
      <div class="img-info circle">
        <img :src="item.img1v1Url+ `?param=100y100`" />
      </div>
      <div class="info-content">
        <div class="play-name">{{item.name}}</div>
      </div>
      <span class="artist-is-in" v-if="item.accountId">
        <i class="iconfont icon-yonghufangkeshu"></i> 已入驻
      </span>
    </div>
  </div>
</template>

<script>
import selectList from "@/components/select.vue";
import Loading from "@/components/Loading.vue";
export default {
  name: "",
  components: {
    selectList,
    Loading
  },
  data() {
    return {
      loading: true,
      allArtistList: [],
      firstId: "10",
      secondId: "01",
      firstList: [
        {
          text: "华语",
          id: "10"
        },
        {
          text: "欧美",
          id: "20"
        },
        {
          text: "日本",
          id: "60"
        },
        {
          text: "韩国",
          id: "70"
        },
        {
          text: "其他",
          id: "40"
        }
      ],
      secondList: [
        {
          text: "男",
          id: "01"
        },
        {
          text: "女",
          id: "02"
        },
        {
          text: "乐队/组合",
          id: "03"
        }
      ]
    };
  },
  created() {
    this.getSingerInfo(this.firstId, this.secondId);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    // 获取歌手分类
    getSingerInfo(firstId, secondId) {
      const cat = firstId + "" + secondId;
      this.axios.get("/artist/list?cat=" + cat).then(res => {
        if (res.data.code === 200) {
          this.loading = false;
          this.allArtistList = res.data.artists;
        }
      });
    },
    // 更新
    updateFirst(val) {
      this.firstId = val;
      this.changeId();
    },
    updateSecond(val) {
      this.secondId = val;
      this.changeId();
    },
    // 切换显示分类信息
    changeId() {
      this.loading = true;
      this.getSingerInfo(this.firstId, this.secondId);
    },
    returnPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang='less' scoped>
.wrapper {
  .pd23 {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 12px;
  }
  .detailnav {
    width: 95%;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    position: relative;
    z-index: 2;
    i {
      display: inline-block;
      font-size: 20px;
      color: black;
    }
    p {
      display: inline-block;
      font-size: 20px;
      margin-left: 15px;
      color: black;
      margin-top: -3px;
    }
  }
  .fixed {
    top: 0;
    z-index: 1;
    box-sizing: border-box;
    background-color: #fff;
  }
  .title {
    background-color: #ddd;
    line-height: 1.8;
  }
  h1 {
    font-weight: normal;
    font-family: tahoma, arial, "Hiragino Sans GB", "\5FAE\8F6F\96C5\9ED1",
      simsun, sans-serif;
    font-size: 100%;
  }
  .list-item {
    margin-top: 13.65px;
    width: 100%;
    height: 84px;
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    overflow: hidden;
    .circle {
      width: 68.25px;
      height: 68.25px;
      border-radius: 50%;
      overflow: hidden;
      img {
        overflow: hidden;
        border-radius: 5.25px;
        width: 100%;
        vertical-align: middle;
      }
    }
    .info-content {
      margin-left: 13.65px;
      .play-name {
        line-height: 21px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
      }
    }
    .artist-is-in {
      margin-left: auto;
      .iconfont {
        color: #dd001b;
      }
    }
  }
}
</style>
