<template>
  <div class="wrapper pd23">
    <div class="fixed">
      <div class="detailnav">
        <i @click="returnPage()" class="iconfont icon-fanhui1"></i>
        <p>最新音乐</p>
      </div>
      <select-list
        class="list-item"
        :firstList="firstList"
        :firstId.sync="firstId"
        @updatefirstID="updateFirst"
      ></select-list>
    </div>
    <div class="songs">
      <div class="title titleMt">
        <span>
          <span>
            <i class="iconfont icon-bofang5"></i>
            播放全部
          </span>
          <span class="count">(共{{songs.length}}首)</span>
        </span>
      </div>
        <div class="list-item" v-for="(item,index) in songs" :key="index">
          <div class="img-info">
            <img :src="item.album.picUrl + '?param=200y200'" alt />
          </div>
          <!---->
          <div class="song-info">
            <p class="song-name">{{item.name}}</p>
            <p class="song-art">
              <span>
                <span class="artist">{{item.artists[0].name}}</span>
              </span>
              <span class="album-name">{{item.name}}</span>
            </p>
          </div>
          <div class="icon">
            <i class="iconfont icon-shusandian result diandiandian"></i>
          </div>
      </div>
    </div>
    <div class="load" v-show="loading">
      <pageloading></pageloading>
    </div>
  </div>
</template>

<script>
import selectList from "@/components/select.vue";
import pageloading from "@/components/Loading.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      firstId: "0",
      firstList: [
        {
          text: "全部",
          id: "0"
        },
        {
          text: "华语",
          id: "7"
        },
        {
          text: "欧美",
          id: "96"
        },
        {
          text: "日本",
          id: "8"
        },
        {
          text: "韩国",
          id: "16"
        }
      ],
      loading: true,
      songs: {},
      song_data: "",
    };
  },
  created() {
    this.getNewsongs(this.firstId);
  },
  methods: {
    getNewsongs(firstId) {
      this.axios.get("/top/song?type=" + firstId).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          console.log(res.data);
          this.songs = res.data.data;
        }
      });
    },
    // 更新
    updateFirst(val) {
      this.firstId = val;
      this.changeId()
    },
    changeId() {
      this.loading = true;
      this.getNewsongs(this.firstId);
    },
    returnPage() {
      this.$router.go(-1);
    },
    goplay(index) {
      this.axios.get("/check/music?id=" + this.songs[index].id).then(res => {
        if (res.data.message == "ok") {
          sessionStorage.setItem("ID", this.songs[index].id);
          sessionStorage.setItem("index", index);
          this.submitId(this.songs[index].id);
          this.submitIndex(index);
          this.submitFull(true);
          this.submitIsPlay(true);
        } else {
          Toast({
            message: "亲爱的,暂无版权",
            duration: 2000
          });
        }
      });
    },
    ...mapMutations({
      submitId: "submitId",
      submitIndex: "submitIndex",
      submitSongs: "submitSongs",
      submitFull: "submitFull",
      submitIsPlay: "submitIsPlay"
    })
  },
  components: {
    selectList,
    pageloading
  }
};
</script>

<style lang='less' scoped>
.wrapper {
  .fixed {
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: #fff;
    .detailnav {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      i {
        font-size: 20px;
        margin-right: 5px;
        padding-top: 10px;
      }
      p {
        font-size: 18px;
        vertical-align: 5px;
        width: 420px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-top: 10px;
      }
    }
  }
  .songs {
    margin-top: 90px;
    padding-left: 1px;
    .title {
      font-size: 15.75px;
      height: 42px;
      line-height: 42px;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      background-color: #fff;
    }
    .titleMt {
      margin-top: 10.5px;
      .count {
        color: #999;
        font-size: small;
      }
    }
    .list-item {
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
      height: 52.5px;
      .img-info {
        width: 36.75px;
        height: 0;
        padding-bottom: 36.75px;
        margin-right: 10.5px;
        position: relative;
        img {
          border-radius: 5.25px;
          width: 36.75px;
          height: 36.75px;
          vertical-align: middle;
          border: 0;
        }
      }
      .song-info {
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        .song-name {
          width: 281.25px;
          height: 21px;
          line-height: 21px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .song-art {
          height: 21px;
          line-height: 21px;
          font-size: 12px;
          color: #dacdcd;
          width: 281.25px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .album-name::before {
            content: "-";
          }
        }
      }
    }
  }
}
.pd23 {
  box-sizing: border-box;
  padding: 0 12px;
}
</style>
