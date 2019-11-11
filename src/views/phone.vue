<template>
  <div class="wrapper">
    <div class="detailnav pd23">
      <i @click="returnPage()" class="iconfont icon-fanhui1"></i>
      <p>手机号登录</p>
    </div>
    <div class="wrappers">
      <div class="info">未注册手机号登录后将自动创建账号</div>
      <!-- 绑定内联样式 使用 对象 -->
      <div class="inp border-bottom" :style="{opacity}">
        <span>+86</span>
        <input
          type="text"
          v-model.trim="phone"
          placeholder="请输入手机号"
          ref="inputs"
          autofocus="autofocus"
          @input="canShow"
        />
        <i v-show="isShow" class="iconfont icon-cha5 phone iconguanbi" @click="clearInput"></i>
      </div>
      <div class="btn">
        <button id="btn"></button>
        <label @click="clickEvent" class="label" for="btn" ref="btnText">下一步</label>
      </div>
      <transition>
        <alert :is-alert="alert" alert="请输入11位数字的手机号"></alert>
      </transition>
    </div>
  </div>
</template>

<script>
// import loginBtn from 'base/button'
import alert from "@/components/alert.vue";

export default {
  name: "phoneAccount",
  data() {
    return {
      phone: "",
      isShow: false,
      opacity: 0.5,
      alert: false,
      timer: null,
      flag: true
    };
  },
  components: {
    alert
  },
  methods: {
    returnPage() {
      this.$router.go(-1);
    },
    changFocus() {
      this.$nextTick(x => {
        this.$refs.inputs.focus();
      });
    },
    // 判断输入内容是否合法
    contextIsTrue(text) {
      let exp = /^1[345789]\d{9}$/;
      return exp.test(text);
    },
    // 清空 input
    clearInput() {
      this.phone = "";
      this.canShow();
    },
    // 判断 叉 是否显示
    canShow() {
      this.isShow = this.phone;
      if (this.isShow) {
        this.opacity = 1;
      } else {
        this.opacity = 0.5;
      }
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
      }, 1000);
    },
    // 点击时会触发两次请求 设置锁
    clickEvent() {
      if (this.flag) {
        this.flag = false;
        if (this.contextIsTrue(this.phone)) {
          this._determineRegistered(this.phone);
        } else {
          this.alertEvent();
          this.clearInput();
          this.flag = true;
        }
      }
    },
    // 判断手机号有没有被注册
    _determineRegistered(phone) {
      this.axios.get("/cellphone/existence/check?phone=" + phone).then(res => {
        if (res.data.exist !== -1) {
          this.$router.push({
            path: "/pwd",
            query: { phone: this.phone }
          });
        } else if (res.data.exist === -1) {
          this.$router.push({
            path: "/verify",
            query: { phone: this.phone }
          });
        }
        this.flag = true;
      });
    },
    // 当储存中有账号信息时自动填写
    autoFill() {
      let phone = localStorage.getItem("account");
      if (phone) {
        this.phone = phone;
        this.canShow();
        return true;
      }
      return false;
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  created() {
    // 当自动填写后就不自动获取焦点
    if (this.autoFill()) {
      this.changFocus();
    }
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
  .wrappers {
    box-sizing: border-box;
    padding: 12px;
    .info {
      width: 100vw;
      height: 80px;
      display: flex;
      align-items: center;
      font-size: small;
      color: #ccc;
    }
    .inp {
      padding-bottom: 5.25px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid black;
      input[type="text"] {
        height: 25px;
        font-size: 20px;
        margin-left: 10px;
        flex: 1;
        caret-color: #dd001b;
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
