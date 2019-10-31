<template>
  <div class="detail1">
    <div class="detail" v-if="show">
      <div class="container-top">
        <div
          v-show="!listFixed"
          class="plhead_bg"
          :style="{'background': 'url('+song_data.coverImgUrl+'?param=300y300)'}"
        ></div>
        <div
          class="phone-nav fixed pd23"
          :style="{'background':listFixed? 'url('+song_data.coverImgUrl+'?param=300y300)' : 'none'}"
        >
          <i class="iconfont icon-fanhui1 phone iconzuojiantou" @click="back"></i>
          <span class="text">歌单</span>
        </div>

        <div class="album-info pd23">
          <div class="info-top">
            <div class="img-info" @click="show = false">
              <img :src="song_data.coverImgUrl" lazy="loaded" />
              <span class="play-count">
                <i
                  class="iconfont icon-bofang1 u-earp lsthd_num"
                >{{`${song_data.playCount>100000000?`${(song_data.playCount/100000000).toFixed(1)}亿`:`${song_data.playCount>10000?`${parseInt(song_data.playCount/10000)}万`:song_data.playCount}`}`}}</i>
              </span>
            </div>
            <div class="info-con">
              <p class="album-title">{{song_data.name}}</p>
              <div class="creator">
                <div class="img-info">
                  <img :src="song_jianjie.avatarUrl" lazy="loaded" />
                </div>
                <span>
                  {{song_jianjie.nickname}}
                  <i class="iconfont icon-qianjin2"></i>
                </span>
              </div>
              <div class="desc-wrapper" @click="show = false">
                <span class="desc" v-html="descriptions"></span>
                <i class="iconfont icon-qianjin2"></i>
              </div>
            </div>
          </div>
          <div class="icons">
            <div class="comments" @click="goReview">
              <i class="iconfont icon-pinglun date-song pinglun"></i>
              <span>{{commentCount}}</span>
            </div>
            <div class="comments">
              <i class="iconfont icon-fenxiang1 date-song fenxiang"></i>
              <span>{{song_data.shareCount}}</span>
            </div>
            <div class="comments">
              <i class="iconfont icon-xiazai3 date-song xiazai"></i>
              <span>下载</span>
            </div>
            <div class="comments">
              <i class="iconfont icon-check date-song duoxuankuang"></i>
              <span>多选</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-lists-info" v-show="!loading">
        <div class="list-title" :class="{listFixed}">
          <div class="play" @click="goplay(0)">
            <i class="iconfont icon-bofang5"></i>
            <span class="label">播放全部</span>
            <span class="count">(共{{song_data.trackCount}}首)</span>
          </div>
          <div class="collect">
            <span>+ 收藏({{song_data.subscribedCount>100000?`${(song_data.subscribedCount/10000).toFixed(1)}万`:song_data.subscribedCount}})</span>
          </div>
        </div>
        <div class="list-content">
          <div class="music-list" v-for="(item,index) in songs" :key="index" @click="goplay(index)">
            <div class="music-index">
              <span class="index">{{index+1}}</span>
            </div>
            <div class="music-info">
              <div class="music-detail">
                <div class="name">{{item.name}}</div>
                <div class="singer">{{item.ar[0].name}}-{{item.al.name}}</div>
              </div>
              <div class="music-conf">
                <div class="mv icon-menu iconfont icon-bofang9"></div>
                <div class="set icon-menu iconfont icon-shusandian"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="load" v-show="loading">
        <pageloading></pageloading>
      </div>
    </div>
    <div class="sheet-avatar" v-else>
      <div class="blur" :style="{'background': 'url('+song_data.coverImgUrl+')'}"></div>
      <div class="fix-content">
        <i class="iconfont icon-cha5" @click="show = true"></i>
        <div class="avatar-content">
          <img :src="imgurl" />
          <div class="detail-content">
            <div class="title">{{song_data.name}}</div>
            <div class="tips">
              <label>标签</label>
              <span v-for="(item,index) in song_data.tags" :key="index">{{item}}</span>
            </div>
            <div class="disc" v-html="descriptions"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { format } from "path";
import pageloading from "@/components/Loading.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      song_data: "",
      song_jianjie: "",
      descriptions: "",
      songs: {},
      show: true,
      imgurl: "",
      loading: true,
      commentCount: "",
      listFixed: false,
      scrollTop: ""
    };
  },
  components: {
    pageloading
  },
  computed: {
    ...mapGetters(["songid"])
  },
  watch: {
    songid(val, olval) {
      this.getDetail();
    }
  },
  created() {
    this.getDetail();
  },
  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.handleScroll, true);
  },

  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 240) {
        this.listFixed = true;
        this.scrollTop = scrollTop;
      } else {
        this.listFixed = false;
        this.scrollTop = scrollTop;
      }
    },
    getDetail() {
      var id = sessionStorage.getItem("songid");
      if (this.songid == "" && id == "") {
        this.$router.go(-1);
      } else if (
        (this.songid == "" && id != "") ||
        (this.songid != "" && id != "")
      ) {
        if (id >= 0 && id <= 33) {
          this.axios.get("/top/list?idx=" + id).then(res => {
            if (res.data.code == 200) {
              this.loading = false;
              this.song_data = res.data.playlist;
              this.commentCount = this.song_data.commentCount;
              this.imgurl = res.data.playlist.coverImgUrl;
              this.song_jianjie = this.song_data.creator;
              this.songs = res.data.playlist.tracks;
              this.song = res.data.playlist.trackIds;
              let reg = new RegExp("\n", "g");
              let str = res.data.playlist.description.replace(reg, "<br>");
              this.descriptions = str;
            }
          });
        } else {
          this.axios.get("/playlist/detail?id=" + id).then(res => {
            if (res.data.code == 200) {
              this.loading = false;
              this.song_data = res.data.playlist;
              this.commentCount = this.song_data.commentCount;
              this.imgurl = res.data.playlist.coverImgUrl + "?param=300y300";
              this.song_jianjie = this.song_data.creator;
              this.songs = res.data.playlist.tracks;
              this.song = res.data.playlist.trackIds;
              let reg = new RegExp("\n", "g");
              let str = res.data.playlist.description.replace(reg, "<br>");
              this.descriptions = str;
            }
          });
        }
      } else if (this.songid != "" && id == "") {
        if (this.songid >= 0 && this.songid <= 33) {
          this.axios
            .get("http://localhost:3000/top/list?idx=" + this.songid)
            .then(res => {
              if (res.data.code == 200) {
                this.loading = false;
                this.song_data = res.data.playlist;
                this.commentCount = this.song_data.commentCount;
                this.imgurl = res.data.playlist.coverImgUrl + "?param=300y300";
                this.song_jianjie = this.song_data.creator;
                this.songs = res.data.playlist.tracks;
                this.song = res.data.playlist.trackIds;
                let reg = new RegExp("\n", "g");
                let str = res.data.playlist.description.replace(reg, "<br>");
                this.descriptions = str;
              }
            });
        } else {
          this.axios.get("/playlist/detail?id=" + this.songid).then(res => {
            if (res.data.code == 200) {
              this.loading = false;
              this.song_data = res.data.playlist;
              this.commentCount = this.song_data.commentCount;
              this.imgurl = res.data.playlist.coverImgUrl + "?param=300y300";
              this.song_jianjie = this.song_data.creator;
              this.songs = res.data.playlist.tracks;
              this.song = res.data.playlist.trackIds;
              let reg = new RegExp("\n", "g");
              let str = res.data.playlist.description.replace(reg, "<br>");
              this.descriptions = str;
            }
          });
        }
      }
    },
    back() {
      this.$router.go(-1);
    },
    goplay(index) {
      this.axios.get("/check/music?id=33894312").then(res => {
        if (res.data.message == "ok") {
          sessionStorage.setItem("ID", this.songs[index].id);
          sessionStorage.setItem("songs", JSON.stringify(this.songs));
          sessionStorage.setItem("index", index);
          this.submitId(this.songs[index].id);
          this.submitIndex(index);
          this.submitSongs(this.songs);
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
    goReview() {
      this.$router.push({
        path: "/review",
        name: "review",
        params: {
          total: this.commentCount,
          imgurl: this.imgurl,
          nickname: this.song_jianjie.nickname,
          name: this.song_data.name
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
  }
};
</script>
<style lang="less" scoped>
.detail {
  height: 100%;
  overflow-y: scroll;
  .container-top {
    height: 290px;
    width: 100%;
    color: #fff;
    .fixed {
      position: fixed;
      width: 100%;
      height: 42px;
      z-index: 9;
      top: 0;
    }
    .pd23 {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0 12px;
      z-index: 9;
    }

    .phone-nav {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      z-index: 9;
      .phone {
        font-size: 20px;
        margin-right: 15px;
      }
      .text {
        font-size: 20px;
        vertical-align: 5px;
        width: 309px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .plhead_bg {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      filter: blur(20px);
      transform: scale(1.5);
      z-index: -1;
    }
    .plhead_bg,
    .plhead_bg:after {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .plhead_bg:after {
      content: " ";
      background-color: rgba(0, 0, 0, 0.25);
    }
    .album-info {
      padding-top: 50px;
      z-index: 9;
      .info-top {
        height: 157.5px;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        overflow: hidden;
        .img-info {
          width: 136.5px;
          height: 0;
          position: relative;
          padding-bottom: 136.5px;
          border-radius: 5.77px;
          overflow: hidden;
          img {
            width: 136.5px;
            height: 136.5px;
            vertical-align: middle;
          }
          .play-count {
            position: absolute;
            top: 5.25px;
            right: 5.25px;
            i {
              font-size: 12.6px;
            }
          }
        }
        .info-con {
          width: 189px;
          height: 136.5px;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          flex-direction: column;
          overflow: hidden;
          .album-title {
            font-size: 18px;
            line-height: 1.4;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            overflow: hidden;
            -webkit-box-orient: vertical;
            font-weight: 700;
          }
          .creator {
            height: 52.5px;
            color: hsla(0, 0%, 100%, 0.7);
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            .img-info {
              width: 31.5px;
              height: 0;
              padding-bottom: 31.5px;
              margin-right: 8px;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 31.5px;
                height: 31.5px;
                vertical-align: middle;
                border: 0;
              }
            }
          }
          .desc-wrapper {
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            color: #fefefe;
            .desc {
              width: 157.5px;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              overflow: hidden;
              -webkit-box-orient: vertical;
              font-size: 14px;
            }
          }
        }
      }
      .icons {
        margin-top: 8px;
        display: flex;
        justify-content: space-around;
        width: 100%;
        .comments {
          display: flex;
          -webkit-box-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          flex-direction: column;
          .i {
            font-size: 21px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
  .detail_tag {
    display: flex;
    position: relative;
    z-index: 2;
    padding-top: 10px;
    margin-top: 10px;
    margin-bottom: -10px;
    i {
      flex: 1;
      color: #fff;
      font-size: 19px;
      display: inline-block;
      text-align: center;
      p {
        font-size: 13px;
        color: hsla(0, 0%, 100%, 0.7);
        margin-top: 3px;
      }
    }
  }
  .content-lists-info {
    width: 100%;
    border-radius: 14px 14px 0 0;
    background: #fff;
    margin-top: -10px;
    overflow: hidden;
    position: relative;
    z-index: 3;
    .list-title {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      .play {
        display: flex;
        -webkit-box-flex: 1;
        flex: 1 1 auto;
        -webkit-box-align: center;
        align-items: center;
        height: 44px;
        -webkit-box-pack: start;
        justify-content: flex-start;
        padding: 0 8px;
        i {
          color: black;
          font-size: 15px;
          margin-right: 10px;
          margin-left: 10px;
        }
        .label {
          color: black;
          font-size: 14px;
          margin-right: 10px;
        }
        .count {
          color: #bcbcbc;
          font-size: 13px;
        }
      }
      .collect {
        height: 40px;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 110px;
        flex: 0 0 110px;
        background: linear-gradient(110deg, #f85947, #fc6052);
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        padding: 0 8px;
        font-size: 14px;
        color: #fff;
        border-radius: 30px;
        margin-right: 5px;
      }
    }
    .listFixed {
      position: fixed;
      width: 100%;
      z-index: 9;
      top: 42px;
      background: #fff;
    }
    .list-content {
      .music-list {
        width: 100%;
        height: auto;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        padding: 5.5px 0;
        position: relative;
        .music-index {
          -webkit-box-flex: 0;
          flex: 0 0 50px;
          margin-right: 5.5px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          span {
            font-size: 14px;
            color: #aaa;
          }
        }
        .music-info {
          -webkit-box-flex: 1;
          flex: 1 1 auto;
          overflow: hidden;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          .music-detail {
            -webkit-box-flex: 1;
            flex: 1 1 auto;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: start;
            align-items: flex-start;
            overflow: hidden;
            .name {
              font-size: 15.5px;
              color: #2c3e50;
              overflow: hidden;
              text-overflow: ellipsis;
              word-wrap: break-word;
              white-space: nowrap;
              width: 100%;
              text-align: left;
            }
            .singer {
              width: 100%;
              text-align: left;
              font-size: 12px;
              color: #aaa;
              overflow: hidden;
              text-overflow: ellipsis;
              word-wrap: break-word;
              white-space: nowrap;
            }
          }
          .music-conf {
            -webkit-box-flex: 0;
            flex: 0 0 72px;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            color: #bcbcbc;
            font-size: 14px;
            height: 33px;
            i {
              color: #8f8e8e;
            }
            .mv,
            .set {
              -webkit-box-flex: 0;
              flex: 0 0 33px;
              display: flex;
              -webkit-box-align: center;
              align-items: center;
              -webkit-box-pack: center;
              justify-content: center;
            }
            .set {
              margin-left: 5.5px;
            }
          }
        }
      }
    }
  }
}
.sheet-avatar {
  z-index: 1;
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  .blur {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(20px);
    transform: scale(1.5);
    overflow: hidden;
    bottom: 0;
  }
  .blur::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
  }
  .fix-content {
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    i {
      position: fixed;
      top: 11px;
      right: 11px;
      font-size: 25px;
      color: #fff;
      z-index: 999;
    }
    i::after {
      position: absolute;
      content: "";
      top: -11px;
      left: -11px;
      right: -11px;
      bottom: -11px;
      z-index: 999;
    }
    .avatar-content {
      position: relative;
      padding: 66px 8px;
      img {
        width: 188px;
        height: 188px;
        border-radius: 4.5px;
        margin-left: 26%;
      }
      .detail-content {
        position: relative;
        .title {
          margin-top: 17px;
          font-size: 19px;
          color: #fff;
          position: relative;
          opacity: 0.95;
          padding: 12.5px 8px;
          text-align: center;
        }
        .tips {
          margin-top: 16.5px;
          color: #fff;
          opacity: 0.95;
          text-align: left;
          padding: 12.5px 33px;
          label {
            font-size: 15.5px;
          }
          span {
            margin-left: 8px;
            border: 1px solid #f4f4f4;
            font-size: 15.5px;
            line-height: 22px;
            padding: 0 8px;
            border-radius: 11px;
          }
        }
        .disc {
          margin-top: 16.5px;
          padding: 4px 33px;
          font-size: 13px;
          color: #fff;
          opacity: 0.95;
          text-align: left;
          line-height: 1.6;
        }
      }
    }
  }
}
.p23 {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 12px;
}
</style>