<template>
  <div class="bottom-audio border-top pd23" @click="returnFull">
    <div class="img-info" ref="circle">
      <img :src="imgUrls" alt />
    </div>
    <div class="con-info">
      <p class="name">{{name}}</p>
      <p class="lrc">{{ lyric }}</p>
    </div>
    <div class="button">
      <span class="circle">
        <i
          class="audio iconfont"
          @click.stop="play"
          :class="{'icon-suspend_icon': isPlay, 'icon-bofang5': !isPlay}"
        ></i>
      </span>
      <i class="audio iconfont icon-shuxiangliebiao"></i>
      <!-- <i class="audio audioliebiao" @click.stop="showAudioList"></i> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isPlay"])
  },
  props: {
    imgUrls: {
      type: String
    },
    name: {
      type: String
    },
    lyric: {
      type: String
    }
  },
  methods: {
    returnFull() {
      this.$emit("returnFull");
    },
    play() {
      this.$emit("play");
    }
  },
  watch: {
  }
};
</script>
<style lang='less' scoped>
.bottom-audio {
  display: flex;
  align-items: center;
  position: fixed;
  width: 375px;
  height: 52.5px;
  bottom: 0;
  z-index: 99;
  background-color: #333333;
  .img-info {
    width: 36.75px;
    height: 0;
    padding-bottom: 36.75px;
    border-radius: 50%;
    overflow: hidden;
    animation: rotating 24s linear infinite;
    transform-origin: center;
    img {
      width: 36.75px;
      height: 36.75px;
    }
  }
  .con-info {
    margin-left: 8.4px;
    width: 235.5px;
    .name {
      font-size: 13.65px;
      line-height: 1.5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: aliceblue;
    }
    .lrc {
      color: aliceblue;
      font-size: 12px;
      line-height: 1.5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .button {
    color: aliceblue;
    .audio {
      box-sizing: border-box;
      margin-left: 10px;
      font-size: 24px;
    }
    .circle {
      display: inline-block;
      text-align: center;
      line-height: 27px;
      width: 27px;
      height: 27px;
      border-radius: 50%;
      margin-left: 3px;
      .audio {
        margin-left: 0px;
        font-size: 24px;
      }
    }
  }
}
.pd23 {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 12px;
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>