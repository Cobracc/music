<!--
 * @Author: 李浩栋
 * @Begin: 2019-09-06 11:39:05
 * @Update: 2019-09-17 20:25:56
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper pd23">
    <div class="detail_nav">
      <i @click="returnPage()" class="iconfont icon-fanhui1"></i>
      <p>排行榜</p>
    </div>
    <div class="load" v-show="loading">
      <pageloading></pageloading>
    </div>
    <div v-show="!loading">
      <div class="title">官方榜</div>
      <idxCard
        v-for="(item, index) in officialIdxList"
        :key="index"
        :imgUrl="item.coverImgUrl"
        :tracks="item.tracks"
        :idx="item.name"
        :updateTime="item.updateFrequency"
        @showIdxPage="showIdxPage"
      ></idxCard>
      <div class="title">推荐榜</div>
      <div class="img-col">
        <imgCard
          v-for="(item, index) in recommendedIdxList"
          :key="index"
          :imgUrl="item.coverImgUrl"
          :dec="item.name"
          :updateTime="item.updateFrequency"
          :idx="item.name"
          @showIdxPage="showIdxPage"
        ></imgCard>
      </div>
      <div class="title">更多榜单</div>
      <div class="img-col">
        <imgCard
          v-for="(item, index) in moreIdxList"
          :key="index"
          :imgUrl="item.coverImgUrl"
          :dec="item.name"
          :updateTime="item.updateFrequency"
          :idx="item.name"
          @showIdxPage="showIdxPage"
        ></imgCard>
      </div>
    </div>
  </div>
</template>

<script>
import idxCard from "@/components/idxCard.vue";
import imgCard from "@/components/imgCard.vue";
import pageloading from "@/components/Loading.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "",
  components: {
    idxCard,
    imgCard,
    pageloading
  },
  data() {
    return {
      officialIdxList: [],
      recommendedIdxList: [],
      moreIdxList: [],
      loading: true
    };
  },
  created() {
    this.getIdx();
  },
  methods: {
    getIdx() {
      this.axios.get("/toplist/detail").then(res => {
        if (res.data.code === 200) {
          this.loading = false;
          this.officialIdxList = res.data.list.slice(0, 4);
          this.recommendedIdxList = res.data.list.slice(4, 10);
          this.moreIdxList = res.data.list.slice(10, 25);
        }
      });
    },
    returnPage() {
      this.$router.go(-1);
    },
    showIdxPage(id) {
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: {
          id: id
        }
      });
      this.submitSongid(id);
      console.log("id1" + id);
      sessionStorage.setItem("songid", id);
    },
    ...mapMutations({
      submitSongid: "submitSongid"
    })
  }
};
</script>

<style lang='less' scoped>
.wrapper {
  .detail_nav {
    width: 95%;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    position: relative;
    z-index: 2;
    i {
      display: inline-block;
      font-size: 20px;
      color: black;
    }
    p {
      display: inline-block;
      font-size: 20px;
      margin-left: 15px;
      color: black;
      margin-top: -3px;
    }
  }
  .title {
    font-weight: 700;
    height: 40px;
    line-height: 50px;
    font-size: 16px;
  }
  .img-col {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
.pd23 {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 12px;
}
</style>
