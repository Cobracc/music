<template>
  <div v-show="songs.length > 0">
    <div class="play model-view isFull" v-show="Full">
      <div class="blur">
        <img :src="imgurl" alt />
      </div>
      <div class="auto-header">
        <div class="left" @click="returnPage">
          <i class="icon-menu iconfont icon-fanhui1"></i>
        </div>
        <div class="title">
          <div class="name">
            {{song_data.name}}
            <p v-show="alia">({{alia}})</p>
          </div>
          <div class="user">
            <span class="user-name">{{singer}}</span>
            <i class="icon-menu"></i>
          </div>
        </div>
        <div class="right">
          <i class="icon-menu iconfont icon-fenxiang1"></i>
        </div>
      </div>
      <div class="content">
        <div
          class="cd"
          v-if="showContent"
          @click="showContent = false,rotates = false,rotates1 = true"
        >
          <div class="cd-area">
            <div id="cdwp" class="cd-image-wp">
              <keep-alive>
                <img
                  id="cd"
                  class="cd-image"
                  :class="{rotate:rotates,rotate1:rotates1}"
                  :src="imgurl"
                />
              </keep-alive>
            </div>
          </div>
          <div class="mc-conf">
            <i class="iconfont icon-shoucang-copy"></i>
            <i class="iconfont icon-xiazai1"></i>
            <i class="iconfont icon-pinglun"></i>
          </div>
        </div>
        <div class="lrc" v-else>
          <div class="vol">
            <div class="touch-bar">
              <div class="left-sider">
                <i
                  class="icon-menu iconfont icon-shengyin4"
                  @click="hideshengyin"
                  v-show="shengyin"
                ></i>
                <i class="icon-menu iconfont icon-shengyin2" v-show="!shengyin"></i>
              </div>
              <div class="bar">
                <div class="progress" ref="barPr" @touchstart.prevent="clickPr">
                  <div class="current" :style="{width:length1}"></div>
                  <div
                    class="range"
                    :style="{left:length1}"
                    @touchstart.prevent="starts"
                    @touchmove.prevent="moves"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="lrc-area" @click="showContent = true,rotates = true,rotates1 = false">
            <div class="full" v-if="noLyric">{{noLyricText}}</div>
            <div class="lrc-info" v-else>
              <div class="lrc-c" ref="lyricLine" v-for="(lines, index) in line" :key="index">
                <div
                  class="lrc-list"
                  ref="lyricLists"
                  :style="{'transform':'translate3d(0px, -'+(currentLineNum<5?0:currentLineNum-5)*33+'px, 0px)'}"
                  :class="{'active':currentLineNum ===index}"
                >{{lines.txt}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="music-conf">
          <div class="bar">
            <span>{{ timeFirst }}</span>
            <div class="bar-bg" ref="barBg" @touchstart.prevent="clickBg">
              <div class="bar-layer" :style="{width:length}"></div>
              <div
                class="point"
                :style="{left:length}"
                @touchstart.prevent="start"
                @touchmove.prevent="move"
                @touchend="end"
              ></div>
            </div>
            <span>{{ timeEnd }}</span>
          </div>
          <div class="music-play-set">
            <div class="play-type icon-menu easy-click" :class="[modeClass]" @click="changeMode()"></div>
            <div class="play-set">
              <div class="play-index icon-menu easy-click iconfont icon-houtui" @click="prev"></div>
              <div
                v-if="isPlay"
                class="play-puase easy-click icon-menu iconfont icon-suspend_icon"
                @click="suspend()"
              ></div>
              <div
                v-else
                class="play-puase easy-click icon-menu iconfont icon-bofang5"
                @click="suspend()"
              ></div>
              <div class="play-index icon-menu easy-click iconfont icon-qianjin1" @click="next"></div>
            </div>
            <div class="play-lists icon-menu easy-click iconfont icon-caidan1"></div>
          </div>
        </div>
      </div>
    </div>
    <smallss
      v-show="!Full"
      :imgUrls="imgurl"
      :name="song_data.name"
      :lyric="playingLyric"
      @play="suspend"
      @returnFull="returnFull"
    ></smallss>
    <audio
      ref="video"
      autoplay
      controls
      id="myAudio"
      :src="songURL"
      @canplay="audioReady"
      @error="audioError"
      @timeupdate="timeUpdate"
      @ended="songEnd"
    ></audio>
  </div>
</template>
<script>
import Lyric from "lyric-parser";
import { mapGetters, mapMutations, mapActions } from "vuex";
import smallss from "@/components/Smallvideo.vue";
import BScroll from "better-scroll";
export default {
  components: {
    smallss
  },
  computed: {
    modeClass: function() {
      switch (this.mode) {
        case 0: // 列表循环
          return "iconfont icon-liebiaoxunhuan2";
        case 1: // 单曲循环
          return "iconfont icon-danquxunhuan2";
        case 2: // 随机播放
          return "iconfont icon-suiji1";
      }
    },
    ...mapGetters(["Full", "index", "songs", "id", "isPlay"])
  },
  data() {
    return {
      song_data: "",
      imgurl: "",
      name: "",
      lyric: "",
      artist: [],
      singer: "",
      alia: "",
      nowLyric: "",
      timeFirst: "",
      songURL: "",
      showContent: true,
      rotates: true,
      rotates1: false,
      currentLyric: null,
      line: "",
      currentLineNum: 0, // 设置一个歌词维护属性
      songReadey: false, // 能否跳转下一曲
      timeEnd: "",
      length,
      touch: {},
      length1: "100%",
      shengyin: true,
      mode: 0,
      marginTop: 0,
      noLyric: false,
      noLyricText: "",
      lrcLists: null,
      playingLyric: ""
    };
  },
  created() {},
  mounted() {
  },
  watch: {
    index: function(val, oldVal) {
      if (val != oldVal || oldVal == "") {
        console.log(this.song_data);
        this.song_data = this.songs[val];
        this.imgurl = this.song_data.al.picUrl + "?param=300y300";
        this.singer = this.song_data.ar[0].name;
        this.alia = this.song_data.alia[0];
        this.timeEnd = this.format(this.song_data.dt / 1000);
        this.getData();
      } else {
        console.log(this.song_data);
        this.song_data = this.songs[val];
        this.imgurl = this.song_data.al.picUrl + "?param=300y300";
        this.singer = this.song_data.name;
        this.alia = this.song_data.alia[0];
        this.timeEnd = this.format(this.song_data.dt / 1000);
        this.getData();
      }
    }
  },
  methods: {
    // 获取歌曲信息、歌词
    getData() {
      var id = sessionStorage.getItem("ID");
      this.axios.get("/song/url?id=" + id).then(res => {
        this.songURL = res.data.data[0].url;
      });
      this.axios.get("/lyric?id=" + id).then(res => {
        const data = res.data;
        if (data.nolyric) {
          // 纯音乐
          this.noLyric = true;
          this.noLyricText = "纯音乐，请欣赏";
          return;
        } else if (data.uncollected) {
          // 歌词为空
          this.noLyric = true;
          this.noLyricText = "暂时没有歌词";
          return;
        } else {
          this.noLyric = false;
          let lyric = res.data.lrc.lyric;
          this.currentLyric = new Lyric(lyric, this.handleLyric); //this.handleLyric回调函数
          this.line = this.currentLyric.lines;
          if (this.$refs.video.play()) {
            this.currentLyric.play();
          } else {
            this.shuaxin();
          }
        }
      });
    },

    //转为小播放器
    returnPage() {
      this.submitFull(false);
    },
    //转为大播放器
    returnFull() {
      this.submitFull(true);
    },
    //播放时间
    format(mss) {
      var min = Math.floor((mss / 60) << 0);
      min = min > 9 ? min : "0" + min;
      var sec = Math.floor(mss % 60);
      sec = sec > 9 ? sec : "0" + sec;
      return min + ":" + sec;
    },
    // 播放，暂停
    suspend() {
      var video = this.$refs.video;
      if (video.paused) {
        video.play();
        this.submitIsPlay(true);
        this.rotates = true;
        this.rotates1 = false;
        this.currentLyric.togglePlay();
      } else if (video.play()) {
        this.currentLyric.togglePlay();
        video.pause();
        this.submitIsPlay(false);
        this.rotates = false;
        this.rotates1 = true;
      }
    },
    //上一首
    prev() {
      this.shuaxin();
      switch (this.mode) {
        case 0:
          this.prevSong();
          break;
        case 1:
          this.prevSong();
          break;
        case 2:
          this.shuffle();
          break;
      }
    },
    prevSong() {
      if (this.index == 0) {
        sessionStorage.setItem("ID", this.songs[parseInt(this.index) - 1].id);
        sessionStorage.setItem("index", parseInt(this.index) - 1);
        this.submitId(this.songs[parseInt(this.index) - 1].id);
        this.submitIndex(parseInt(this.index) - 1);
      } else {
        sessionStorage.setItem(
          "ID",
          this.songs[parseInt(this.index) - 1].al.id
        );
        sessionStorage.setItem("index", parseInt(this.index) - 1);
        this.submitId(this.songs[parseInt(this.index) - 1].id);
        this.submitIndex(parseInt(this.index) - 1);
      }
    },
    //下一首
    next() {
      this.shuaxin();
      switch (this.mode) {
        case 0:
          this.nextSong();
          break;
        case 1:
          this.nextSong();
          break;
        case 2:
          this.shuffle();
          break;
      }
    },
    //列表循环
    nextSong() {
      if (this.index == this.songs.length - 1) {
        sessionStorage.setItem("ID", this.songs[0].id);
        sessionStorage.setItem("index", 0);
        this.submitId(this.songs[0].id);
        this.submitIndex(0);
      } else {
        sessionStorage.setItem("ID", this.songs[parseInt(this.index) + 1].id);
        sessionStorage.setItem("index", parseInt(this.index) + 1);
        this.submitId(this.songs[parseInt(this.index) + 1].id);
        this.submitIndex(parseInt(this.index) + 1);
      }
    },
    //单曲循环
    loop() {
      this.$refs.video.currentTime = 0;
      this.$refs.video.play();
      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
    },
    //随机播放
    shuffle() {
      this.shuaxin();
      var indexs = Math.floor(Math.random() * (this.songs.length + 1));
      if (indexs == this.index) {
        sessionStorage.setItem("ID", this.songs[parseInt(indexs) + 1].id);
        sessionStorage.setItem("index", parseInt(indexs) + 1);
        this.submitId(this.songs[parseInt(indexs) + 1].id);
        this.submitIndex(parseInt(indexs) + 1);
      } else {
        sessionStorage.setItem("ID", this.songs[parseInt(indexs)].id);
        sessionStorage.setItem("index", parseInt(indexs));
        this.submitId(this.songs[parseInt(indexs)].id);
        this.submitIndex(parseInt(indexs));
      }
    },
    //歌词数据处理
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      this.playingLyric = txt;
    },
    //音频播放时间更新
    timeUpdate() {
      const video = this.$refs.video;
      this.timeFirst = this.format(video.currentTime);
      this.length = (video.currentTime / video.duration) * 100 + "%";
    },
    //改变歌曲时间
    changeTime(time) {
      const video = this.$refs.video;
      const current = (time * video.duration) / 100;
      video.currentTime = current;
      this.currentLyric.seek(video.currentTime * 1000);
    },
    //歌曲播放完毕
    songEnd() {
      switch (this.mode) {
        case 0:
          setTimeout(() => {
            this.nextSong();
          }, 1000);
          break;
        case 1:
          this.loop();
          break;
        case 2:
          this.shuffle();
          break;
      }
    },
    //歌词刷新
    shuaxin() {
      this.currentLyric.stop();
      this.currentLyric = null;
      this.playingLyric = "";
      this.currentLineNum = 0;
    },
    //点击进度条
    start(e) {
      const left = this.$refs.barBg.offsetLeft;
      this.touch.startX = e.changedTouches[0].pageX - left;
      this.touch.width = this.$refs.barBg.clientWidth;
    },
    starts(e) {
      const left = this.$refs.barPr.offsetLeft;
      this.touch.startX = e.changedTouches[0].pageX - left;
      this.touch.width = this.$refs.barPr.clientWidth;
    },
    clickBg(e) {
      this.touch.width = this.$refs.barBg.clientWidth;
      const left = this.$refs.barBg.offsetLeft;
      this.touch.endX = e.changedTouches[0].pageX - left;
      const offsetWidth = (this.touch.endX / this.touch.width) * 100;
      this.length = offsetWidth + "%";
      this.changeTime(offsetWidth);
    },
    clickPr(e) {
      this.touch.width = this.$refs.barPr.clientWidth;
      const left = this.$refs.barPr.offsetLeft;
      this.touch.endX = e.changedTouches[0].pageX - left;
      const offsetWidth = (this.touch.endX / this.touch.width) * 100;
      if (offsetWidth >= 100) {
        this.length1 = "100%";
        this.shengyin = true;
        this.$refs.video.volume = 1;
      } else if (offsetWidth <= 0) {
        this.length1 = "0%";
        this.shengyin = false;
        this.$refs.video.volume = 0;
      } else {
        this.shengyin = true;
        this.length1 = offsetWidth + "%";
        this.$refs.video.volume = this.touch.endX / this.touch.width;
      }
    },
    //点击静音
    hideshengyin() {
      this.length1 = "0%";
      this.shengyin = false;
      this.$refs.video.volume = 0;
    },
    move(e) {
      const left = this.$refs.barBg.offsetLeft;
      const deltaX = e.changedTouches[0].pageX - left;
      const width = Math.min(Math.max(0, deltaX), this.touch.width);
      this.touch.offsetWidth = (width / this.touch.width) * 100;
      this.length = this.touch.offsetWidth + "%";
      this.changeTime(this.touch.offsetWidth);
    },
    moves(e) {
      const left = this.$refs.barPr.offsetLeft;
      const deltaX = e.changedTouches[0].pageX - left;
      const width = Math.min(Math.max(0, deltaX), this.touch.width);
      this.touch.offsetWidth = (width / this.touch.width) * 100;
      this.length1 = this.touch.offsetWidth + "%";
      this.$refs.video.volume = width / this.touch.width;
      if (width / this.touch.width <= 0) {
        this.shengyin = false;
      } else {
        this.shengyin = true;
      }
    },
    end() {
      this.changeTime(this.touch.offsetWidth);
    },
    //改变播放模式
    changeMode() {
      this.mode = (this.mode + 1) % 3;
    },
    ...mapMutations({
      submitId: "submitId",
      submitIndex: "submitIndex",
      submitFull: "submitFull",
      submitIsPlay: "submitIsPlay"
    })
  }
};
</script>
<style lang="less" scoped>
.play {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  overflow: hidden;
  background-size: 300%;
  background-position: center center;
  z-index: 99;
  .blur {
    background: #333;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    -webkit-filter: blur(26px);
    filter: blur(26px);
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    overflow: hidden;
    bottom: 0;
    img {
      width: 100%;
      height: 40%;
      top: 0;
      left: 0;
      right: 0;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      filter: blur(26px);
    }
  }
  .auto-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 55px;
    -webkit-box-flex: 0;
    flex: 0 0 55px;
    width: 100%;
    color: #fff;
    font-size: 19px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .left,
    .right {
      -webkit-box-flex: 0;
      flex: 0 0 99px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      i,
      span {
        -webkit-box-flex: 0;
        flex: 0 0 39px;
        margin: 0 5.5px;
        font-size: 20px;
      }
    }
    .left {
      margin-left: 10px;
      flex: 0 0 50px;
    }
    .right {
      -webkit-box-pack: end;
      justify-content: flex-end;
    }
    .title {
      -webkit-box-flex: 1;
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: nowrap;
      opacity: 0.96;
      .name {
        font-size: 15.5px;
        p {
          display: inline-block;
        }
      }
      .user {
        margin-top: 2.2px;
        font-size: 12px;
        span {
          margin-right: 4px;
        }
      }
    }
  }
  .content {
    position: absolute;
    top: 55px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    overflow: hidden;
    .cd {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-flex: 1;
      flex: 1 1 auto;
      overflow: hidden;
      .cd-area {
        -webkit-box-flex: 1;
        flex: 1 1 auto;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        .cd-image-wp {
          width: 280px;
          height: 280px;
          margin: 0 auto;
          .cd-image {
            width: 75%;
            height: 75%;
            border-radius: 50%;
            border: 35px solid black;
            box-shadow: 0 0 45px 0 rgba(0, 0, 0, 0.3);
          }
          .rotate {
            animation: rotateImg 20s linear infinite;
          }
          .rotate1 {
            animation: rotateImg 20s linear infinite;
            animation-play-state: paused;
          }
          @keyframes rotateImg {
            0% {
              -webkit-transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
            }
          }
        }
      }
      .mc-conf {
        -webkit-box-flex: 0;
        flex: 0 0 55px;
        width: 100%;
        padding: 8.2px 74.5px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        i {
          font-size: 16.5px;
          color: white;
          opacity: 1.2;
        }
      }
    }
    .lrc {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-flex: 1;
      flex: 1 1 auto;
      overflow: hidden;
      .vol {
        -webkit-box-flex: 0;
        flex: 0 0 44px;
        padding: 0 8px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        width: 100%;
        .touch-bar {
          width: 97%;
          height: 44px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          overflow: hidden;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          .left-sider {
            font-size: 13.2px;
            color: #fff;
            opacity: 0.95;
            width: 50px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-flex: 0;
            flex: 0 0 50px;
          }
          .bar {
            -webkit-box-flex: 1;
            flex: 1 1 auto;
            padding: 0 8px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            .progress {
              height: 2px;
              background: #95a5a6;
              position: relative;
              .range {
                width: 11px;
                height: 11px;
                border-radius: 5.5px;
                background: #fff;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate(-50%, -50%);
              }
              .current {
                background-color: #ecf0f1;
                height: 2px;
              }
            }
          }
        }
      }
      .lrc-area {
        -webkit-box-flex: 1;
        flex: 1 1 auto;
        width: 100%;
        overflow: hidden;
        margin-top: 30px;
        .full {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ecf0f1;
        }
        .lrc-info {
          height: 100%;
          overflow: auto;
          -webkit-transition: all 0.3s;
          transition: all 0.3s;
          padding: 0px 33px;
          .lrc-c {
            .lrc-list {
              color: #706f6f;
              opacity: 0.8;
              font-size: 14.4px;
              line-height: 1.8;
              padding: 4px 0;
              text-align: center;
            }
            .active {
              color: #ffffff;
              font-size: 16px;
            }
          }
        }
      }
    }
    .music-conf {
      -webkit-box-flex: 0;
      flex: 0 0 110px;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      padding: 8px;
      .music-progress {
        -webkit-box-flex: 0;
        flex: 0 0 44px;
        padding: 0 8px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        .touch-bar {
          width: 100%;
          height: 44px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          overflow: hidden;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          .left,
          .right {
            color: #fff;
            font-size: 12px;
            opacity: 0.95;
            width: 44px;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
          }
          .bar {
            -webkit-box-flex: 1;
            flex: 1 1 auto;
            padding: 0 8px;
            box-sizing: border-box;
            .progress {
              height: 2px;
              background: rgba(244, 244, 244, 0.9);
              position: relative;
              .current {
                height: 100%;
                width: 0;
              }
              .range {
                background: #fff;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
              }
              .range.music {
                width: 16.5px;
                height: 16.5px;
                border-radius: 8px;
                .icon {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 5px;
                  height: 5px;
                  border-radius: 2.5px;
                }
              }
            }
          }
        }
      }
      .bar {
        margin: 20px 0;
        display: flex;
        align-items: center;
        color: #bdc3c7;
        font-size: 12px;
        opacity: 1.1;
        span:first-child {
          color: #fff;
          font-size: 12px;
          opacity: 1.1;
        }
        span:last-child {
          color: #bdc3c7;
          font-size: 12px;
          opacity: 1.1;
        }
        .bar-bg {
          width: 100%;
          margin: 0 14px;
          height: 2px;
          background-color: #95a5a6;
          position: relative;
          .bar-layer {
            height: 2px;
            background-color: rgba(244, 244, 244, 0.9);
          }
          .point {
            position: absolute;
            top: -4px;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            background-color: #ecf0f1;
          }
        }
      }
      .music-play-set {
        -webkit-box-flex: 1;
        flex: 1 1 auto;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        color: #fff;
        opacity: 0.9;
        .play-type {
          left: 15px;
        }
        .play-type,
        .play-lists {
          position: relative;
          -webkit-box-flex: 0;
          flex: 0 0 44px;
          font-size: 21px;
        }
        .play-set {
          -webkit-box-flex: 0;
          flex: 0 0 254px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          justify-content: space-around;
          .play-index {
            position: relative;
            font-size: 21px;
          }
          .play-puase {
            position: relative;
            font-size: 28px;
          }
        }
        .icon-liebiaoxunhuan2 {
          left: 15px;
        }
      }
    }
  }
}
.isFull {
  bottom: 0;
}
audio {
  width: 0;
  height: 0;
}
</style>