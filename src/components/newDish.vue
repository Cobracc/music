<template>
  <div class="wrapper pd23">
    <div class="title">
      <div class="recommended">
        <span :class="{active:type==='dish'}" @click="type='dish'">新碟</span>
        <i>|</i>
        <span :class="{active:type==='newSong'}" @click="type='newSong'">新歌</span>
      </div>
      <div class="square">
        <span v-show="type==='dish'" @click.stop="moreNewDish">更多新碟</span>
        <span v-show="type==='newSong'" @click.stop="moreNewSongs">新歌推荐</span>
      </div>
    </div>
    <div class="img-col" v-show="type==='dish'">
      <img-card
        v-for="(item, index) in dishList"
        :key="index"
        :imgUrl="item.picUrl"
        :dec="item.name"
        :dishId="item.id"
      ></img-card>
    </div>
    <div class="img-col" v-show="type==='newSong'" >
      <img-card
        v-for="(item, index) in newSongsList"
        :key="index"
        :imgUrl="item.album.blurPicUrl"
        :dec="item.name"
        :albumId="item.id"
      ></img-card>
    </div>
  </div>
</template>

<script>
import imgCard from "@/components/imgCard.vue";
export default {
  name: "newDish",
  components: {
    imgCard
  },
  data() {
    return {
      dishList: [],
      newSongsList: [],
      type: "dish"
    };
  },
  methods: {
    //获取新碟
    getDishListInfo() {
      this.axios.get("/top/album?offset=0&limit=3").then(res => {
        if (res.data.code === 200) {
          this.dishList = res.data.albums;
        }
      });
    },
    //获取新歌
    getNewSongsInfo() {
      this.axios.get("/top/song?type=96&limit=3").then(res => {
        if (res.data.code === 200) {
          let shuffled = res.data.data.slice(0,3);
          this.newSongsList = shuffled;
        }
      });
    },
    // 更多新碟
    moreNewDish() {
      this.$router.push("/moreNewDish");
    },
    // 新歌推荐
    moreNewSongs() {
      this.$router.push("/moreNewSongs");
    }
  },
  created() {
    this.getDishListInfo();
    this.getNewSongsInfo();
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  margin-top: 15px;
  .title {
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    .recommended {
      font-size: 14.5px;
      .active {
        font-size: 18px;
        font-weight: 700;
        color: black;
      }
      i {
        margin-left: 5px;
        margin-right: 5px;
        color:#ddd;
      }
    }
    .square {
      box-sizing: border-box;
      padding: 5.25px 5.25px 5.25px 6.825px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      font-size: 12px;
      border-radius: 52.5px;
      letter-spacing: 2.625px;
      text-align: center;
      border: 1px solid #ccc;
      margin-left: auto;
    }
  }
  .img-col {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
.p23 {
  box-sizing: border-box;
  padding: 0 12px;
}
</style>
