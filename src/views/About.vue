<template>
  <div class="about">
    <button @click="show()">1111111</button>
    <button @click="hide()">2222222</button>
    <h1>This is an about page</h1>
    <p class="text" v-html="requestText"></p>
    <button @click="formatDuring(354000)">333333</button>
    <p ref="lyricLine" v-for="(lines, index) in line" :key="index">{{lines.txt}}</p>
  </div>
</template>
<script>
import Lyric from "lyric-parser";
import { setCookie, getCookie, delCookie } from "@/assets/js/cookie.js";
export default {
  data() {
    return {
      id: "",
      requestText: "",
      currentLyric: null,
      line:null,
      currentLineNum: 0 // 设置一个歌词维护属性
    };
  },
  created() {},
  methods: {
    show() {
      let phone = 18815612722;
      let password = "1392264059@CC.";
      this.axios
        .get(
          "http://localhost:3000/login/cellphone?phone=" +
            phone +
            "&password=" +
            password
        )
        .then(function(res) {
          console.log(res);
          this.axios
            .get("http://localhost:3000/recommend/resource")
            .then(function(res) {
              console.log(res);
            });
        });
    },
    hide() {
      this.axios.get("/comment/playlist?id=2829883282").then(res => {
        if (res.data.code === 200) {
          console.log(res.data)
          var now = new Date();
          console.log("now"+now.getFullYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日")
          var myDate=new Date(1572320245852)
          this.requestText = (myDate.getHours())+":"+(myDate.getMinutes());
          console.log("myDate"+myDate.getFullYear()+"年"+(myDate.getMonth()+1)+"月"+myDate.getDate()+"日")
        }
      });
    },
    formatDuring(mss) {
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (mss % (1000 * 60)) / 1000;
      console.log(minutes + ":" + seconds);
      return (
        days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 "
      );
    },
    // handleLyric({ lineNum, txt }) {
    //   this.currentLineNum = lineNum;
    //   if (lineNum > 5) {
    //     let lineEl = this.$refs.lyricLine[lineNum - 5];
    //     this.$refs.lyricList.scrollToElement(lineEl, 1000); // 滚动到元素
    //   } else {
    //     this.$refs.lyricList.scrollTo(0, 0, 1000); // 滚动到顶部
    //   }
    //   this.playingLyric = txt;
    // }
  }
};
</script>