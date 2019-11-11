<!--
 * @Author: 李浩栋
 * @Begin: 2019-07-30 16:42:30
 * @Update: 2019-10-10 22:09:30
 * @Update log: 更新日志
 -->
<template>
  <div class="wrapper" :class="{loginBg:!loginState}">
    <!-- 没有登录状态样式 -->
    <div class="no-login" v-if="!loginState">
      <div class="content">
        <p>登陆网易云音乐</p>
        <p>手机电脑多端同步，尽享海量高品质音乐</p>
      </div>
      <!-- 在一个组件的根元素上直接监听一个原生事件 使用native修饰-->
      <router-link to="login" tag="button" class="to-login" @click.native="hide_login">立即登录</router-link>
    </div>
    <!-- 已经登陆状态样式 -->
    <div class="login-ed" v-if="loginState">
      <div class="img-info">
        <el-avatar class="account-bg" :src="avatarUrl + '?param=200y200'"></el-avatar>
        <!-- <img class="account-bg" :src="avatarUrl" alt=""> -->
        <p class="account-nickname">{{nickname}}</p>
      </div>
      <div class="daily_sign-in">
        <el-button type="danger" size="mini" round>
          <i class="login icontubiaozhizuo-"></i>签到
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "loginTop",
  data() {
    return {
      avatarUrl: "",
      nickname: ""
    };
  },
  props: {
    loginState: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.$nextTick(() => {
      this.getUserInfo(this.loginState);
    });
  },
  computed: {
    _loginState: {
      get() {
        return this.loginState;
      },
      set(val) {
        this.$emit("update_state", val);
      }
    }
  },
  methods: {
    getUserInfo(bool) {
      console.log(bool);
      if (bool) {
        // 通过本地存储获取用户头像和昵称
        this.avatarUrl = localStorage.getItem("avatarUrl");
        this.nickname = localStorage.getItem("nickname");
      }
    },
    ...mapMutations(["hide_login"])
  }
};
</script>

<style lang="less" scoped>
.loginBg {
  // 如果没有登陆，背景是灰色
  background-color: rgba(204, 204, 204, 0.3);
}
.wrapper {
  // 左侧上部大背景
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding: 31.5px 12px 47.25px;
  width: 100%;
  height: 157.5px;
  .login-ed {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    .img-info {
      // 用户信息 包括头像和昵称
      text-align: center;
      width: 1.3rem;
      height: 1.3rem;
      .account-bg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .daily_sign-in {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 0.07rem;
      font-size: 0.2rem;
      margin-top: auto;
      color: #fff;
      width: 1.2rem;
      height: 0.44rem;
      border-radius: 0.2rem;
      background: red;
    }
  }
  .no-login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    .content {
      text-align: center;
      p {
        font-size: 12px;
        line-height: 15.75px;
        color: rgba(0, 0, 0, 0.4);
      }
    }
    .to-login {
      background-color: transparent;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 5.25px 26.25px;
      border: 1px solid rgba(0, 0, 0, 0.4);
      border-radius: 26.25px;
      font-size: 10.5px;
      color: rgba(0, 0, 0, 0.4);
    }
    button {
      vertical-align: middle;
      outline: 0 none;
      line-height: 1.5;
      font-family: tahoma, arial, "Hiragino Sans GB", simsun, sans-serif;
    }
  }
}
</style>
