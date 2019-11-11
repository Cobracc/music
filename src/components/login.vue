<template>
  <div class="login-menu">
    <login-top :loginState="loginState"></login-top>
    <div class="container border-bottom">
      <ul class="icons-wrapper">
        <!-- <li v-for="(item, index) in loginIcons" :key="index"
          :icons="item"
        is="icon"></li>-->
        <li class="icon-list" v-for="(item, index) in loginIcons" :key="index">
          <div class="icon">
            <i class="login" :class="item.icon"></i>
          </div>
          <span class="icon-text">{{item.text}}</span>
        </li>
      </ul>
    </div>
    <div class="wrapper pd23 border-bottom">
      <ul>
        <li class="list" v-for="(item, index) in loginIconsBottom" :key="index">
          <i class="login" :class="item.icon"></i>
          <span class="list-text">{{ item.text }}</span>
        </li>
      </ul>
    </div>
    <div class="wrapper pd23 border-bottom">
      <ul>
        <li class="list" v-for="(item, index) in loginIconsBottoms" :key="index">
          <i class="login" :class="item.icon"></i>
          <span class="list-text">{{ item.text }}</span>
        </li>
      </ul>
    </div>
    <div class="shezhi border-top">
      <span>
        <!-- <i class="login" :class="{ iconyueliang1,  icontaiyang }"></i> -->
        <!-- 在 vue 中，通过 v-once 指令，可以有效提高静态内容展示效率 -->
        <i class="iconfont icon-yejian login"></i>
        <span>夜间模式</span>
      </span>
      <span>
        <i class="login iconfont icon-xianxingtubiao_huabanfuben"></i>
        <span>设置</span>
      </span>
      <span @click="logout">
        <i class="login iconfont icon-tuichu2"></i>
        <span>退出</span>
      </span>
    </div>
  </div>
</template>

<script>
import loginTop from "@/components/login-top.vue";
export default {
  name: "login",
  data() {
    return {
      // 显式的将获取到的登陆标签设置为Number类型
      loginState: +localStorage.getItem("loginState"),
      loginIcons: [
        {
          icon: "iconfont icon-mail",
          text: "我的消息"
        },
        {
          icon: "iconfont icon-icon-user",
          text: "我的好友"
        },
        {
          icon: "iconfont icon-pifu",
          text: "个性皮肤"
        },
        {
          icon: "iconfont icon-changge1",
          text: "听歌识曲"
        }
      ],
      loginIconsBottom: [
        {
          icon: "iconfont icon-piao1",
          text: "演出"
        },
        {
          icon: "iconfont icon-gouwuche",
          text: "商城"
        },
        {
          icon: "iconfont icon-location1",
          text: "附近的人"
        },
        {
          icon: "iconfont icon-icon--",
          text: "口袋铃声"
        },
        {
          icon: "iconfont icon-dingdan",
          text: "我的订单"
        }
      ],
      loginIconsBottoms: [
        {
          icon: "iconfont icon-dingshi1",
          text: "定时停止播放"
        },
        {
          icon: "iconfont icon-richscan_icon",
          text: "扫一扫"
        },
        {
          icon: "iconfont icon-dingshi2",
          text: "音乐闹钟"
        },
        {
          icon: "iconfont icon-cebianlan_mianliuliang_",
          text: "在线听歌免流量"
        },
        {
          icon: "iconfont icon-game",
          text: "游戏推荐"
        },
        {
          icon: "iconfont icon-youhuiquan1",
          text: "优惠券"
        }
      ]
    };
  },
  methods: {
    //  退出登录
    logout() {
      this.axios.get("/logout").then(res => {
        if (res.data.code === 200) {
          console.log(res.data);
          localStorage.setItem("loginState", 0);
          location.reload();
        }
      });
    }
  },
  components: {
    loginTop
  }
};
</script>

<style lang="less" scoped>
.login-menu {
  position: fixed;
  z-index: 11;
  height: 100vh;
  overflow-y: auto;
  top: 0;
  left: 0;
  width: 315px;
  background: #fff;
  .border,
  .border-top,
  .border-right,
  .border-bottom,
  .border-left,
  .border-topbottom,
  .border-rightleft,
  .border-topleft,
  .border-rightbottom,
  .border-topright,
  .border-bottomleft {
    position: relative;
    border-bottom: 1px solid #eaeaea;
    ul {
      list-style: none;
    }
    .icons-wrapper {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      padding: 30px 6.8px 26.25px;
      display: flex;
      justify-content: space-around;
      .icon-list {
        height: 100%;
        text-align: center;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-align: center;
        align-items: center;
        .icon {
          width: 38px;
          height: 38px;
          line-height: 38px;
          .login {
            font-size: 21px;
            color: #dd001b;
          }
        }
        .icon-text {
          font-size: 12px;
        }
      }
    }
  }
  .pd23 {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 12px;
  }
  .wrapper {
    padding-top: 10.5px;
    padding-bottom: 10.5px;
    ul,
    ol,
    menu {
      list-style: none;
      .list {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10.5px 0;
        font-size: 16.2px;
        height: 42px;
        .login {
          font-size: 18px;
          margin-right: 8px;
        }
      }
    }
  }

  .shezhi {
    width: 315px;
    height: 47.25px;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10.5px 12px;
    position: fixed;
    bottom: 0;
    z-index: 2;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    font-size: 15.75px;
    .login {
      font-size: 21px;
      vertical-align: -2px;
      margin-right: 4.2px;
    }
  }
}
</style>
