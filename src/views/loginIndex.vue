<template>
  <div class="wrapper">
    <div class="logo">
      <i class="iconfont icon-wangyiyunyinle1"></i>
    </div>
    <router-link to="phone" tag="button" class="phoneLogin">手机号登陆</router-link>
  </div>
</template>

<script>
export default {
  name: "loginPage"
};
</script>

<style lang="less" scoped>
.wrapper {
    width: 100vw;
    height: 100%;
    background-color: #dd001b;
    position: absolute;
    text-align: center;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  .logo {
    margin: 100px auto;
    width: 60px;
    height: 60px;
    background: #f7132e;
    border-radius: 50%;
    line-height: 60px;
    text-align: center;
    i {
      color: white;
      font-size: 30px;
      vertical-align: middle;
    }
  }
  .phoneLogin {
    width: 278.25px;
    height: 42px;
    border-radius: 21px;
    background-color: #fff;
    color: #dd001b;
    font-weight: 600;
    letter-spacing: 3px;
    margin: 150px auto;
  }
}
</style>
