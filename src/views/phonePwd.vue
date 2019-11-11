<template>
  <div class="wrapper">
    <div class="detailnav pd23">
      <i @click="returnPage()" class="iconfont icon-fanhui1"></i>
      <p>手机号登录</p>
    </div>
    <div class="inp border-bottom">
      <input type="password" v-model="pwd" placeholder="请输入密码" ref="inputs" autofocus="autofocus" />
      <router-link to="/forget">忘记密码</router-link>
    </div>
    <div class="btn">
      <button id="btn"></button>
      <label @click="logon" class="label" for="btn" ref="btnText">{{title}}</label>
    </div>
    <!-- 设置提示语 -->
    <alert :is-alert="alert" :alert="alertText"></alert>
  </div>
</template>

<script>
import alert from "@/components/alert.vue";
export default {
  name: "phonePwd",
  data() {
    return {
      pwd: "",
      alert: false,
      alertText: "用户名或密码错误",
      flag: true,
      title: "登录"
    };
  },
  components: {
    alert
  },
  methods: {
    returnPage() {
      this.$router.go(-1);
    },
    //获取手机号
    getPhone() {
      let reg = new RegExp(/\d*$/);
      let phone = reg.exec(window.location.hash)[0];
      return phone;
    },
    // 清空输入框
    clearInput() {
      this.pwd = "";
    },
    // 提示
    alertEvent() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.alert = true;
      this.timer = setTimeout(() => {
        this.alert = false;
        this.flag = true;
      }, 1000);
    },
    // 登陆成功后存取登录状态及信息
    _getLoginState() {
      this.axios
        .get({ url: '/login/status', withCredentials: true })
        .then(res => {
          console.log("11111111111111111111");
          // 存取用户 id
          let userId = res.data.profile.userId;
          if (res.data.code === 200) {
            // 存取用户信息
            let accountInfo = res.data.profile;
            // 成功登陆
            this.$store.commit("login_state");
            // 我们设置一个名为loginState
            localStorage.setItem("loginState", 1);
            // 存入用户头像 昵称
            localStorage.setItem("avatarUrl", accountInfo.avatarUrl);
            localStorage.setItem("nickname", accountInfo.nickname);
            // 存取用户 uid信息
            this.$store.commit("accountUid", userId);
            localStorage.setItem("accountUid", userId);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 判断密码是否正确
    passwordIsCorrect(pwd) {
      if (!pwd) {
        this.alertText = "请输入密码";
        this.alertEvent();
        this.LoadingEnd();
        return;
      } else {
        let phone = this.getPhone();
        this._isSure(phone, pwd);
      }
    },
    // 手机+密码登录
    _isSure(phone, pwd) {
      this.axios
        .get("/login/cellphone?phone=" + phone + "&password=" + pwd+"&timestamp=1513019930000")
        .then(res => {
          // 将账号存下，以后登录时账号输入框自动填写
          localStorage.setItem("account", phone);
          this.success();
        })
        .catch(error => {
          if (error) {
            this.error();
          }
        });
    },
    // 登录成功
    success() {
      // 修改状态为 1
      this.$store.commit("login_state");
      localStorage.setItem("loginState", 1);
      this.LoadingEnd();
      // 存取登陆状态
      this._getLoginState();
      this.alertText = "登录成功";
      this.$router.push({ path: "/" });
      // location.reload();
    },
    // 密码错误登录失败
    error() {
      this.alertText = "密码错误";
      this.alertEvent();
      this.clearInput();
      this.LoadingEnd();
      this.flag = true;
    },
    // 由于在点击时会触发两次请求 设置flag锁
    logon() {
      if (this.flag) {
        this.flag = false;
        this.Loading();
        this.passwordIsCorrect(this.pwd);
      }
    },
    // 登陆完成 按钮内容复位
    LoadingEnd() {
      this.title = "登录";
    },
    Loading() {
      this.title = "登录中...";
    },
    changFocus() {
      this.$nextTick(x => {
        this.$refs.inputs.focus();
      });
    }
  },
  created() {
    this.changFocus();
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  box-sizing: border-box;
  padding: 12px;
  .detailnav {
    display: flex;
    align-items: center;
    i {
      font-size: 20px;
      margin-right: 5px;
    }
    p {
      font-size: 20px;
      vertical-align: 5px;
    }
  }
  .inp {
    padding-bottom: 6px;
    display: flex;
    align-items: center;
    margin-top: 40px;
    input[type="password"] {
      height: 25px;
      font-size: 18px;
      margin-left: 10px;
      flex: 1;
      caret-color: #dd001b;
    }
    a {
      color: #25a4bb;
      text-decoration: none;
      outline: 0 none;
      border: none;
      cursor: pointer;
    }
  }
  .border-bottom::before {
    border-color: #aaa;
  }
  .btn {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    #btn {
      position: absolute;
      clip: rect(0, 0, 0, 0);
    }
    button {
      outline: 0 none;
      border: none;
      vertical-align: middle;
      font-size: 100%;
    }
    .label {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin-top: 30px;
      padding: 8px;
      border-radius: 20px;
      line-height: 20px;
      width: 80%;
      color: #fff;
      background: #dd001b;
    }
  }
}
input,
textarea,
button,
select,
a {
  outline: 0 none;
  border: none;
}
img,
object,
input,
textarea,
button,
select {
  vertical-align: middle;
}
</style>
