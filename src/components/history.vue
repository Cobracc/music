<template>
  <div class="history pd23" v-if="history.length">
    <div class="history-title">
      <span>历史记录</span>
      <i class="iconfont icon-shanchu1" @click="clearHistory"></i>
    </div>
    <div class="wrapper">
      <div class="container">
        <ul class="icons-group">
          <li
            class="icon-list"
            @click="toSearch(item)"
            v-for="(item, index) in history"
            :key="index"
          >{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "@/Bus.js"
export default {
  name: "history",
  data() {
    return {
      history
    };
  },
  created() {
    this.getHistory();
  },
  methods: {
    // 获取历史记录
    getHistory() {
      Bus.$on("history", history => {
        this.history = history;
      });
    },
    // 清除历史记录
    clearHistory() {
      localStorage.removeItem("keys");
      this.history = [];
    },
    toSearch(keywords) {
      Bus.$emit("search", keywords);
    }
  }
};
</script>

<style lang='less' scoped>
.history {
  margin-top: 26.25px;
  .history-title {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    height: 42px;
    line-height: 42px;
    .iconfont {
      width: 42px;
      height: 42px;
      text-align: center;
      font-size: 21px;
    }
  }
  .wrapper {
    box-sizing: border-box;
    overflow: hidden;
    height: 26.25px;
    .container {
      overflow-x: scroll;
      .icons-group {
        height: 26.25px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        white-space: nowrap;
        width: auto;
        min-width: 100%;
        .icon-list {
          height: 22px;
          box-sizing: border-box;
          padding: 0 6.8px;
          font-size: small;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
          border-radius: 15.75px;
          background: #eee;
        }
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
.pd23 {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 12px;
}
</style>
