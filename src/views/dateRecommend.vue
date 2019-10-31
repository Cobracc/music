<template>
  <div>
    <button @click="go">1111</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getDaterecommend();
  },
  methods: {
    // 获取每日推荐歌曲
    getDaterecommend() {
      this.axios
        .get("/login/cellphone?phone=18815612722&password=1392264059@CC.")
        .then(res => {
          if (res.data.code === 200) {
            // this.success();
            console.log(res.data);
          }
        });
    },
    success() {
      localStorage.setItem("account", 18815612722);
      localStorage.setItem("loginState", 1);
      this.axios.get("/login/status").then(res => {
        // 存取用户 id
        let userId = res.data.profile.userId;
        if (res.data.code === 200) {
          console.log(res.data);
          // 存取用户信息
          let accountInfo = res.data.profile;
          // 成功登陆
          // 修改状态为 1
          // Vuex在用户刷新的时候loginState会回到默认值false
          // 所以我们需要用到HTML5储存
          // 我们设置一个名为loginState
          localStorage.setItem("loginState", 1);
          // 存入用户头像 昵称
          localStorage.setItem("avatarUrl", accountInfo.avatarUrl);
          localStorage.setItem("nickname", accountInfo.nickname);
          // 存取用户 uid信息
          localStorage.setItem("accountUid", userId);
        }
      });
    },
    go() {
      this.axios.get("/login/status").then(res => {
        if (res.data.code === 200) {
          console.log(res.data);
        }
      });
    }
  }
};
</script>