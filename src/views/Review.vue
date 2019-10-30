<template>
  <div class="wrapper">
    <div class="detailnav pd23">
      <i @click="returnPage()" class="iconfont icon-fanhui1"></i>
      <p>评论({{total}})</p>
      <i class="iconfont icon-fenxiang1 fenxiang"></i>
    </div>
    <div class="plhead_wrap">
      <div class="review_fl">
        <img :src="datas.coverImgUrl+ `?param=100y100`" />
      </div>
      <div class="review_center">
        <p class="f-thide2 f-brk lsthd_title">{{datas.name}}</p>
        <div>
          by
          <a href="#">{{nickname}}</a>
        </div>
      </div>
      <i class="iconfont icon-qianjin4 i" @click="goDetail"></i>
    </div>
    <div class="m_newcomm" v-show="hotComments.length>0">
      <div class="m-talk pylst_comment">
        <div class="m-comments">
          <h4 class="cmt_title">精彩评论</h4>
          <div class="cmt_list" v-for="(item,index) in hotComments" :key="index">
            <div class="cmt_item j-cmt_item_567961059">
              <div class="cmt_head">
                <a class="userphoto">
                  <img :src="item.user.avatarUrl+ `?param=50y50`" alt />
                </a>
              </div>
              <div class="cmt_wrap f-bd f-bd-btm">
                <div class="cmt_header">
                  <div class="cmt_meta">
                    <span class="cmt_user">
                      <a class="nickname">{{item.user.nickname}}</a>
                    </span>
                    <div class="cmt_time">
                      <span v-html="Time(item.time)"></span>
                    </div>
                  </div>
                  <div class="cmt_like">
                    <span class="cmt_likearea">
                      <span class="cmt_count">{{item.likedCount}}</span>
                      <i class="iconfont icon-dianzan cmt_likeicn"></i>
                    </span>
                  </div>
                </div>
                <div class="cmt_content">
                  <span class="cmt_text" v-html="Trim(hotComments[index].content)"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m_newcomm">
      <div class="m-talk pylst_comment">
        <div class="m-comments">
          <h4 class="cmt_title">
            最新评论
            <p>{{total}}</p>
          </h4>
          <div class="cmt_list" v-for="(item,index) in comments" :key="index">
            <div class="cmt_item j-cmt_item_567961059">
              <div class="cmt_head">
                <a class="userphoto">
                  <img :src="item.user.avatarUrl+ `?param=50y50`" alt />
                </a>
              </div>
              <div class="cmt_wrap f-bd f-bd-btm">
                <div class="cmt_header">
                  <div class="cmt_meta">
                    <span class="cmt_user">
                      <a class="nickname">{{item.user.nickname}}</a>
                    </span>
                    <div class="cmt_time">
                      <span v-html="Time(item.time)"></span>
                    </div>
                  </div>
                  <div class="cmt_like">
                    <span class="cmt_likearea">
                      <span class="cmt_count">{{item.likedCount}}</span>
                      <i class="iconfont icon-dianzan cmt_likeicn"></i>
                    </span>
                  </div>
                </div>
                <div class="cmt_content">
                  <span class="cmt_text" v-html="Trim(item.content)"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div>
          <div class="cmt_more f-bd f-bd-top">
            <span class="box">
              查看全部43437条评论
              <i></i>
            </span>
          </div>
        </div>-->
      </div>
    </div>
    <Loading v-show="loading"></Loading>
  </div>
</template>
<script>
import Loading from "@/components/Loading.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: true,
      total: "",
      datas: "",
      nickname: "",
      comments: "",
      content: "",
      hotComments: ""
    };
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters(["songid"])
  },
  created() {
    this.getReview();
  },
  mounted() {},
  watch: {
    songid(val, olval) {
      this.getReview();
    }
  },
  methods: {
    getReview() {
      const id = sessionStorage.getItem("songid");
      console.log("ids" + id);
      this.axios.get("/comment/playlist?id=" + id).then(res => {
        if (res.data.code === 200) {
          this.loading = false;
          this.total = res.data.total;
          this.hotComments = res.data.hotComments;
          this.comments = res.data.comments;
          console.log(res.data);
        }
      });
      this.axios.get("/playlist/detail?id=" + id).then(res => {
        if (res.data.code === 200) {
          this.datas = res.data.playlist;
          this.nickname = this.datas.creator.nickname;
          console.log(res.data);
        }
      });
    },
    Trim(str) {
      return str.replace(/\n|\r\n/g, "<br/>");
    },
    Time(str) {
      var now = new Date();
      var myDate = new Date(str);
      if (myDate.getFullYear() < now.getFullYear()) {
        return (
          myDate.getFullYear() +
          "年" +
          (myDate.getMonth() + 1) +
          "月" +
          myDate.getDate() +
          "日"
        );
      } else {
        if (
          (myDate.getMonth() + 1 < now.getMonth() + 1 && now.getDate() > 1) ||
          (myDate.getMonth() == now.getMonth() &&
            now.getDate() > myDate.getDate() + 1)
        ) {
          return myDate.getMonth() + 1 + "月" + myDate.getDate() + "日";
        } else if (
          myDate.getMonth() + 1 == now.getMonth() &&
          myDate.getDate() == now.getDate() - 1
        ) {
          return "昨天" + myDate.getHours() + ":" + myDate.getMinutes();
        } else if (
          myDate.getMonth() == now.getMonth() &&
          now.getDate() == myDate.getDate() + 1
        ) {
          return "昨天" + myDate.getHours() + ":" + myDate.getMinutes();
        } else if (
          myDate.getMonth() == now.getMonth() &&
          now.getDate() == myDate.getDate()
        ) {
          return myDate.getHours() + ":" + myDate.getMinutes();
        } 
      }
      console.log(
        "now" +
          now.getFullYear() +
          "年" +
          (now.getMonth() + 1) +
          "月" +
          now.getDate() +
          "日"
      );

      console.log(
        "myDate" +
          myDate.getFullYear() +
          "年" +
          (myDate.getMonth() + 1) +
          "月" +
          myDate.getDate() +
          "日"
      );
    },
    returnPage() {
      this.$router.go(-1);
    },
    goDetail() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 12px;
  .detailnav {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    position: relative;
    z-index: 2;
    i {
      display: inline-block;
      font-size: 18px;
      color: black;
    }
    p {
      display: inline-block;
      font-size: 18px;
      margin-left: 15px;
      color: black;
      margin-top: -3px;
      font-weight: 600;
    }
    .fenxiang {
      position: absolute;
      right: 0;
    }
  }
  .plhead_wrap {
    border-bottom: 8px solid rgb(221, 216, 216);
    .review_fl {
      position: relative;
      display: inline-block;
      img {
        display: inline-block;
        width: 84px;
        height: 84px;
      }
    }
    .review_center {
      display: inline-block;
      position: relative;
      width: 68%;
      margin-left: 10px;
      top: -5px;
      p {
        height: 60px;
        font-size: 18px;
        font-size: 600;
        word-wrap: break-word;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      a {
        text-decoration: none;
        color: rgb(118, 118, 247);
      }
    }
    .i {
      display: inline-block;
      position: absolute;
      line-height: 84px;
    }
  }
  .m_newcomm {
    position: relative;
    padding-top: 20px;
    .pylst_comment {
      margin-top: -20px;
      .m-comments {
        word-wrap: break-word;
        word-break: break-word !important;
        border-bottom: 10px solid rgba(0, 0, 0, 0.1);
        .cmt_title {
          margin: 0;
          padding: 6px 0px;
          color: #666;
          font-size: 16px;
          font-weight: 550;
        }
        .cmt_title {
          height: 25px;
          line-height: 25px;
          p {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.3);
            display: inline-block;
            margin-left: 5px;
          }
        }
        .cmt_list {
          .cmt_item {
            padding-top: 10px;
            width: 100%;
            display: flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            flex-direction: row;

            .cmt_head {
              height: 35px;
            }
            .cmt_head {
              -webkit-box-flex: 0;
              flex: none;
              a {
                position: relative;
                display: block;
              }
              a {
                color: #507daf;
                text-decoration: none;
                img {
                  display: block;
                  border-radius: 50%;
                  width: 30px;
                  height: 30px;
                  border: 0;
                }
              }
            }
            .cmt_wrap {
              padding-bottom: 11px;
              -webkit-box-flex: 1;
              flex: auto;
              width: 0;
              .cmt_header {
                display: flex;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                flex-direction: row;
                .cmt_meta {
                  -webkit-flex: auto;
                  -webkit-box-flex: 1;
                  flex: auto;
                  width: 0;
                  font-size: 0;
                  .cmt_user {
                    max-width: 100%;
                    display: inline-flex;
                    -webkit-box-align: center;
                    align-items: center;
                    a {
                      font-size: 14px;
                      color: #666;
                      line-height: 20px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      -webkit-box-flex: 1;
                      -webkit-flex: auto;
                      flex: auto;
                    }
                  }
                  .cmt_time {
                    font-size: 9px;
                    color: #999;
                  }
                }
                .cmt_like {
                  width: 65px;
                  height: 22px;
                  line-height: 22px;
                  font-size: 11px;
                  color: #999;
                  -webkit-flex: none;
                  -webkit-box-flex: 0;
                  flex: none;
                  text-align: right;
                  .cmt_likearea {
                    display: inline-block;
                    min-width: 30px;
                    padding-left: 5px;
                    .cmt_count {
                      vertical-align: middle;
                    }
                    .cmt_likeicn {
                      display: inline-block;
                      width: 14px;
                      margin-left: 6px;
                      line-height: 0;
                      vertical-align: middle;
                      cursor: pointer;
                    }
                  }
                }
              }
              .cmt_content {
                position: relative;
                color: #333;
                font-size: 15px;
                line-height: 22px;
                margin-top: 5px;
                .cmt_text {
                  vertical-align: middle;
                }
              }
            }
            .cmt_wrap {
              padding-left: 10px;
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
            .f-bd {
              position: relative;
            }
          }
        }
      }
    }
  }
}
a {
  text-decoration: none;
}
</style>