<template>
  <div class="Songsheet">
    <div class="sheet_nav">
      <i @click="back()" class="iconfont icon-fanhui1"></i>
      <p>歌单广场</p>
    </div>
    <div class="sheet_content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">推荐</mt-tab-item>
        <mt-tab-item id="2">官方</mt-tab-item>
        <mt-tab-item id="3">精品</mt-tab-item>
        <mt-tab-item id="4">华语</mt-tab-item>
        <mt-tab-item id="5">流行</mt-tab-item>
        <mt-tab-item id="6">民谣</mt-tab-item>
        <mt-tab-item id="7">电子</mt-tab-item>
        <mt-tab-item id="8">摇滚</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">1</mt-tab-container-item>
        <mt-tab-container-item id="2">1</mt-tab-container-item>
        <mt-tab-container-item id="3">1</mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div
            class="recommend_song"
            @click="huayusId(index)"
            v-for="(item,index) in huayus"
            :key="index"
          >
            <img :src="item.coverImgUrl" alt />
            <p class="recommend_title">{{item.name}}</p>
            <div class="playSong">
              <div
                class="playCount"
              >{{`${item.playCount>100000000?`${(item.playCount/100000000).toFixed(1)}亿`:`${item.playCount>10000?`${parseInt(item.playCount/10000)}万`:item.playCount}`}`}}</div>
              <i class="iconfont icon-bofang1"></i>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="5">
          <div
            class="recommend_song"
            @click="liuxingsId(index)"
            v-for="(item,index) in liuxings"
            :key="index"
          >
            <img :src="item.coverImgUrl" alt />
            <p class="recommend_title">{{item.name}}</p>
            <div class="playSong">
              <div
                class="playCount"
              >{{`${item.playCount>100000000?`${(item.playCount/100000000).toFixed(1)}亿`:`${item.playCount>10000?`${parseInt(item.playCount/10000)}万`:item.playCount}`}`}}</div>
              <i class="iconfont icon-bofang1"></i>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="6">
          <div
            class="recommend_song"
            @click="minyaosId(index)"
            v-for="(item,index) in minyaos"
            :key="index"
          >
            <img :src="item.coverImgUrl" alt />
            <p class="recommend_title">{{item.name}}</p>
            <div class="playSong">
              <div
                class="playCount"
              >{{`${item.playCount>100000000?`${(item.playCount/100000000).toFixed(1)}亿`:`${item.playCount>10000?`${parseInt(item.playCount/10000)}万`:item.playCount}`}`}}</div>
              <i class="iconfont icon-bofang1"></i>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="7">
          <div
            class="recommend_song"
            @click="dianzisId(index)"
            v-for="(item,index) in dianzis"
            :key="index"
          >
            <img :src="item.coverImgUrl" alt />
            <p class="recommend_title">{{item.name}}</p>
            <div class="playSong">
              <div
                class="playCount"
              >{{`${item.playCount>100000000?`${(item.playCount/100000000).toFixed(1)}亿`:`${item.playCount>10000?`${parseInt(item.playCount/10000)}万`:item.playCount}`}`}}</div>
              <i class="iconfont icon-bofang1"></i>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="8">
          <div
            class="recommend_song"
            @click="yaogunsId(index)"
            v-for="(item,index) in yaoguns"
            :key="index"
          >
            <img :src="item.coverImgUrl" alt />
            <p class="recommend_title">{{item.name}}</p>
            <div class="playSong">
              <div
                class="playCount"
              >{{`${item.playCount>100000000?`${(item.playCount/100000000).toFixed(1)}亿`:`${item.playCount>10000?`${parseInt(item.playCount/10000)}万`:item.playCount}`}`}}</div>
              <i class="iconfont icon-bofang1"></i>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      selected: "",
      huayus: {},
      liuxings: {},
      minyaos: {},
      dianzis:{},
      yaoguns:{}
    };
  },
  created() {
    this.selected = "4";
    this.show();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    show() {
      const _this = this;
      this.axios.get("/top/playlist?limit=12&cat=华语").then(function(res) {
        _this.huayus = res.data.playlists;
      });
      this.axios.get("/top/playlist?limit=12&cat=流行").then(function(res) {
        _this.liuxings = res.data.playlists;
      });
      this.axios.get("/top/playlist?limit=12&cat=民谣").then(function(res) {
        _this.minyaos = res.data.playlists;
      });
      this.axios.get("/top/playlist?limit=12&cat=电子").then(function(res) {
        _this.dianzis = res.data.playlists;
      });
      this.axios.get("/top/playlist?limit=12&cat=摇滚").then(function(res) {
        _this.yaoguns = res.data.playlists;
      });
    },
    huayusId(index) {
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: {
          id: this.huayus[index].id
        }
      });
      console.log("this.huayus[index].id" + this.huayus[index].id);
      this.submitSongid(this.huayus[index].id);
      // this.submitIndex(index);
      sessionStorage.setItem("songid", this.huayus[index].id);
    },
    liuxingsId(index) {
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: {
          id: this.liuxings[index].id
        }
      });
      this.submitSongid(this.liuxings[index].id);
      // this.submitIndex(index);
      sessionStorage.setItem("songid", this.liuxings[index].id);
    },
    minyaosId(index) {
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: {
          id: this.minyaos[index].id
        }
      });
      this.submitSongid(this.minyaos[index].id);
      // this.submitIndex(index);
      sessionStorage.setItem("songid", this.minyaos[index].id);
    },
    dianzisId(index) {
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: {
          id: this.dianzisId[index].id
        }
      });
      this.submitSongid(this.dianzisId[index].id);
      // this.submitIndex(index);
      sessionStorage.setItem("songid", this.dianzisId[index].id);
    },
    yaogunsId(index) {
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: {
          id: this.yaoguns[index].id
        }
      });
      this.submitSongid(this.yaoguns[index].id);
      // this.submitIndex(index);
      sessionStorage.setItem("songid", this.yaoguns[index].id);
    },
    ...mapMutations({
      submitSongid: "submitSongid"
    })
  }
};
</script>
<style lang="less">
.Songsheet {
  width: 98%;
  margin: 0 auto;
  .sheet_nav {
    margin-top: 10px;
    i {
      display: inline-block;
      font-size: 18px;
    }
    p {
      display: inline-block;
      font-size: 18px;
      margin-left: 20px;
    }
  }
  .sheet_content {
    width: 100%;
    .mint-navbar {
      width: 100%;
      overflow-x: hidden;
      overflow: auto;
      position: relative;
      .mint-tab-item {
        width: 39px;
        height: 3px;
        flex: none;
        margin-left: 7%;
        display: block;
      }
      .mint-tab-item:first-child {
        margin-left: 0;
        border-right: 0;
      }
      .is-selected {
        border-bottom: 5px solid #f52e2e;
        .mint-tab-item-label {
          color: red;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
    ::-webkit-scrollbar {
      display: none;
    }
    .recommend_song {
      width: 32%;
      height: 50%;
      float: left;
      margin-top: 15px;
      margin-left: 7px;
      background-size: cover;
      img {
        width: 100%;
        height: 115px;
        float: left;
      }
      p {
        display: block;
        width: 100%;
        height: 32px;
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
</style>