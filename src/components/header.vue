<template>
  <div class="headers">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">我的</mt-tab-item>
      <mt-tab-item id="2">发现</mt-tab-item>
      <i class="iconfont icon-sousuo" @click="goSearch"></i>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1"></mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-swipe :auto="0" :prevent="true" :stopPropagation="true" style="border-radius:10px; ">
          <mt-swipe-item v-for="(item,index) in imageLists" :key="index">
            <img :src="item.imageUrl" alt />
          </mt-swipe-item>
        </mt-swipe>
        <div class="tag">
          <div class="first" @click="goDaterecommend">
            <div class="second">
              <i class="iconfont icon-meirituijian"></i>
            </div>
            <p>每日推荐</p>
          </div>
          <div class="first" @click="goSongsheet">
            <div class="second">
              <i class="iconfont icon-gedan1"></i>
            </div>
            <p>歌单</p>
          </div>
          <div class="first" @click="goIdx">
            <div class="second">
              <i class="iconfont icon-paixingbang"></i>
            </div>
            <p>排行榜</p>
          </div>
          <div class="first">
            <div class="second">
              <i class="iconfont icon-diantai1"></i>
            </div>
            <p>电台</p>
          </div>
          <div class="first">
            <div class="second">
              <i class="iconfont icon-remaisvg"></i>
            </div>
            <p>直播</p>
          </div>
        </div>
        <div class="recommend">
          <div class="nav_song">
            <p class="song_left">推荐歌单</p>
            <div class="song_right" @click="goSongsheet">歌单广场</div>
          </div>
          <div class="content_song">
            <div
              class="recommend_song"
              @click="goDetail(index)"
              v-for="(item,index) in recommends"
              :key="index"
            >
              <img :src="item.picUrl" alt />
              <p class="recommend_title">{{item.name}}</p>
              <div class="playSong">
                <div
                  class="playCount"
                >{{`${item.playCount>10000?`${parseInt(item.playCount/10000)}万`:item.playCount}`}}</div>
                <i class="iconfont icon-bofang1"></i>
              </div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      selected: "",
      imageLists: {},
      recommends: {},
      playCount: ""
    };
  },
  created() {
    this.selected = "2";
    this.showImage();
  },
  methods: {
    showImage() {
      const _this = this;
      this.axios.get("/banner").then(function(res) {
        _this.imageLists = res.data.banners;
      });
      this.axios.get("personalized?limit=6").then(function(res) {
        _this.recommends = res.data.result;
      });
    },
    goSongsheet() {
      this.$router.push("/songsheet");
    },
    goIdx() {
      this.$router.push("/idx");
    },
    goSearch() {
      this.$router.push("/search");
    },
    goDaterecommend(){
      this.$router.push("/dateRecommend");
    },
    goDetail(index) {
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: {
          id: this.recommends[index].id
        }
      });
      this.submitSongid(this.recommends[index].id);
      // this.submitIndex(index);
      sessionStorage.setItem("songid", this.recommends[index].id);
    },
    ...mapMutations({
      submitSongid: "submitSongid"
    })
  }
};
</script>
<style lang="less" scoped>
.headers {
  width: 100%;
  height: 3rem;
  padding: 0px;
  margin: 0 auto;
  .mint-navbar {
    i {
      height: 3rem;
      line-height: 48px;
      position: absolute;
      right: 0px;
      display: block;
      width: 3rem;
    }
  }
  .mint-swipe-item {
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .tag {
    width: 100%;
    height: 70px;
    display: block;
    margin-top: 15px;
    .first {
      display: inline-block;
      width: 15%;
      height: 100%;
      margin-left: 6%;
      text-align: center;
      .second {
        width: 100%;
        height: 70%;
        background-color: rgb(241, 48, 48);
        border-radius: 50%;
        display: block;
        i {
          position: absolute;
          font-size: 27px;
          color: white;
          margin-top: 8px;
          margin-left: -14px;
        }
      }
      p {
        font-size: 12px;
      }
    }
    .first:first-child {
      margin-left: 0;
    }
  }
  .recommend {
    width: 100%;
    height: 350px;
    margin-top: 20px;
    .nav_song {
      width: 100%;
      height: 10%;
      .song_left {
        display: inline-block;
        color: black;
        font-size: 19px;
        line-height: 1;
        font-weight: 600;
        margin-top: 13px;
      }
      .song_right {
        width: 20%;
        text-align: center;
        right: 0;
        font-size: 13px;
        border: 1px solid grey;
        border-radius: 10px;
        float: right;
        margin-top: 12px;
      }
    }
    .content_song {
      width: 100%;
      height: 85%;
      .recommend_song {
        width: 32%;
        height: 50%;
        float: left;
        margin-top: 15px;
        margin-left: 7px;
        background-size: cover;
        img {
          width: 100%;
          height: 75%;
          float: left;
        }
        p {
          display: block;
          width: 100%;
          height: 23%;
          font-size: 12px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          float: left;
        }
        .playSong {
          color: white;
          margin-top: -145px;
          margin-right: 3%;
          float: right;
          i {
            color: white;
            font-size: 12px;
            float: right;
          }
          .playCount {
            font-size: 12px;
            color: white;
            float: right;
          }
        }
      }
      .recommend_song:first-child {
        margin-left: 0;
      }
      .recommend_song:nth-child(3n + 1) {
        margin-left: 0;
      }
    }
  }
}
</style>