<template>
  <div class="wrapper pd23">
    <i class="iconfont icon-fanhui1" @click="returnPage"></i>
    <input
      class="search"
      type="text"
      :placeholder="placeholder"
      ref="inp"
      autofocus="autofocus"
      v-model.trim="keywords"
      @focus="displayList"
    />
    <i
      v-show="keywords"
      @click="clearInp"
      class="iconfont icon-cha5 guanbi"
      :style="{right: Right}"
    ></i>
    <i class="iconfont icon-geshou" v-if="page" @click="goSingerPage"></i>
    <!-- 搜索建议列表信息 -->
    <div class="floatInfo" v-show="showList">
      <ul>
        <li @click="searchKey(keywords)" class="blue border-bottom">
          搜索
          <span class="text">"{{ keywords }}"</span>
        </li>
        <li
          @click="searchKey(item.keyword)"
          class="border-bottom"
          v-for="(item, index) in searchList"
          :key="index"
        >
          <i class="iconfont icon-sousuo3"></i>
          {{ item.keyword }}
        </li>
      </ul>
    </div>
    <div class="mask" v-show="showList" @click="hideList"></div>
  </div>
</template>

<script>
import Bus from "@/Bus.js";
export default {
  name: "searchInp",
  props: {
    page: {
      type: String
    },
    Right: {
      default: "12px"
    },
    keyword: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchList: [],
      keywords: "",
      showList: false,
      history: [],
      time: null,
      placeholder: ""
    };
  },
  created() {
    this.changFocus();
    this.getPlaceholder();
    // 历史记录项点击搜索
    this.historySearch();
    this.setKeyword();
  },
  mounted() {
    this.getHistory();
  },
  watch: {
    // 是否显示搜索建议
    keywords: function(val, oldVal) {
      if (this.keywords === this.keyword) {
        this.hideList();
        return;
      }
      // 在内容变化时，并且当内容长度大于0 说明有内容时
      if (this.keywords.length > 0) {
        // 显示建议列表
        this.displayList();
      } else {
        // 隐藏建议列表
        this.hideList();
      }
    },
    keyword: function(val, oldVal) {
      if (val) {
        this.keywords = val;
      }
    }
  },
  methods: {
    //  第一次访问需要调用方法更改数据
    setKeyword() {
      if (this.keyword) {
        this.keywords = this.keyword;
      }
    },

    // 历史记录项目点击搜索
    historySearch() {
      Bus.$on("search", keywords => {
        this.searchKey(keywords);
      });
    },
    // 点击清除按钮清除搜索框的内容
    clearInp() {
      this.keywords = "";
    },
    changFocus() {
      if (!this.keyword) {
        this.$nextTick(x => {
          this.$refs.inp.focus();
        });
      }
    },

    // 设置输入框的默认显示
    getPlaceholder() {
      this.axios.get("/search/default").then(res => {
        if (res.data.code === 200) {
          this.placeholder = res.data.data.showKeyword;
        }
      });
    },
    // 隐藏搜索建议列表
    hideList() {
      this.showList = false;
    },
    // 显示搜索列表建议
    displayList() {
      if (!this.keywords) {
        return;
      }
      this.showList = true;
      this.setSearchList(this.keywords);
    },
    // 请求搜索建议数据
    getSuggestList(keyword) {
      this.axios
        .get("/search/suggest?keywords=" + keyword + "&type=mobile")
        .then(res => {
          if (res.data.code === 200) {
            this.searchList = res.data.result.allMatch;
          }
        });
    },
    // 根据搜索内容展示搜索建议列表使用防抖
    setSearchList(keywords) {
      if (this.time) {
        clearTimeout(this.time);
        this.time = null;
      }
      this.time = setTimeout(() => {
        this.getSuggestList(keywords);
      }, 50);
    },
    // 获取历史搜索记录
    getHistory(key) {
      let keys = localStorage.getItem("keys")
        ? localStorage.getItem("keys").split(",")
        : [];
      if (key) {
        // 将关键字插入到数组最前面
        keys.unshift(key);
        // 存入本地之前进行去重
        keys = this.unique(keys);
        // 存入本地
        localStorage.setItem("keys", keys);
      }
      this.history = keys;
      Bus.$emit("history", this.history);
    },
    // 向导航标签传递key值
    pushKey(key) {
      this.$nextTick(() => {
        Bus.$emit("push", key);
      });
    },
    // 搜索功能跳转到搜索展示页面
    searchKey(key) {
      this.getHistory(key);
      this.hideList();
      this.clearInp();
      setTimeout(() => {
        this.pushKey(key);
      }, 0);
      // this.$router.push({
      //   path: `/composite/${key}`
      // });
    },
    // 数组去重
    unique(arr) {
      if (!Array.isArray(arr)) {
        console.log("type error!");
        return;
      }
      return Array.prototype.filter.call(arr, function(item, index) {
        return arr.indexOf(item) === index;
      });
    },
    beforeDestroy() {
      // 销毁监听事件
      this.$Bus.$off("push", "history");
    },
    goSingerPage() {
      this.$router.push("/singer");
    },
    returnPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  height: 36.75px;
  line-height: 36.75px;
  .guanbi {
    position: absolute;
    right: 12px;
  }
  .geshou {
    margin-left: 15.75px;
  }
  .iconfont {
    font-size: 18.25px;
  }
  .search {
    flex: 1;
    margin-left: 15.75px;
    font-size: 16px;
    border-bottom: 1px solid #aaa;
  }
  input {
    outline: 0 none;
    border: none;
    vertical-align: middle;
    line-height: 1.5;
  }
  .floatInfo {
    width: 299px;
    position: absolute;
    top: 42px;
    box-shadow: 0 4px 16px #aaa;
    background-color: #fff;
    z-index: 2;
    box-sizing: border-box;
    padding: 0 12px;
    li {
      height: 42px;
      line-height: 42px;
      color: #888;
      list-style: none;
      border-bottom: 1px solid #eaeaea;
      .text {
        margin-left: 8px;
      }
      .iconfont {
        font-size: 21px;
        vertical-align: -2.1px;
      }
    }
    .blue {
      color: #38f;
    }
  }
  .mask {
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
  }
  .mask {
    position: fixed;
    top: 36.75px;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
}
.pd23 {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 12px;
}
</style>
