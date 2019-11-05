<template>
  <div>
    <div
      class="recommend_song"
      @click="godetail(index)"
      v-for="(item,index) in songList"
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
  </div>
</template>
<script>
export default {
  props: {
    songList: {
      type: Array
    }
  },
  methods: {
    godetail(index) {
      this.$emit("showIndex", index);
    }
  }
};
</script>
<style lang="less" scoped>
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
</style>