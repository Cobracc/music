<!--
 * @Author: 李浩栋
 * @Begin: 2019-08-28 10:41:47
 * @Update: 2019-08-28 12:29:24
 * @Update log: 更新日志
 -->
<template>
  <div class="song-hot-search">
    <p class="hot-search-title">热搜榜</p>
    <ul>
      <li
        class="hot-search-list"
        v-for="(item, index) in hotSearchList"
        :key="index"
        @click="returnKey(item.searchWord)"
      >
        <span class="num">{{ index + 1 }}</span>
        <div class="song-info">
          <div class="song-info-title">
            <p class="song-name">{{ item.searchWord }}</p>
            <span class="num">{{ item.score }}</span>
            <img v-if="item.iconUrl" class="search-png" :src="item.iconUrl" />
          </div>
          <!-- 歌曲介绍 -->
          <div class="song-Introduced">{{ item.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "hotSearch",
  data() {
    return {
      hotSearchList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取热搜榜单
    getList() {
      this.axios.get("/search/hot/detail").then(res => {
        if (res.data.code === 200) {
          this.hotSearchList = res.data.data;
          this.$emit("childFn", false);
        }
      });
    },
    //通过点击热歌榜将关键字返回给父组件，父组件调用搜索组件的搜索功能
    returnKey(key) {
      this.$emit("returnKey", key);
    }
  }
};
</script>

<style lang='less' scoped>
.song-hot-search {
  box-sizing: border-box;
  padding: 0 12px;
  margin-top: 31.5px;
  .hot-search-list {
    display: flex;
    margin: 10.5px 0;
    &:nth-of-type(1) > .num {
      color: #dd001b;
    }
    &:nth-of-type(2) > .num {
      color: #dd001b;
    }
    &:nth-of-type(3) > .num {
      color: #dd001b;
    }
    > .num {
      line-height: 52.5px;
      font-size: 13.65px;
    }
    .song-info {
      margin-left: 20px;
      height: 100%;
      .song-info-title {
        display: flex;
        line-height: 31.5px;
        .song-name {
          margin-right: 5.25px;
        }
        .num {
          font-size: 12px;
          margin-left: 6px;
          color: #ccc;
        }
        .search-png {
          margin-left: 10.5px;
          height: 10.5px;
          margin-top: 10.5px;
        }
      }
    }
    .song-Introduced {
      font-size: 12px;
      color: #aaa;
    }
  }
}
</style>
