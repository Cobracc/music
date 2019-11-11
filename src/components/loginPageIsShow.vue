<template>
  <div>
    <transition name="mask-show">
      <div class="mask" v-show="show_login" @click="hide_login" @touchmove.prevent></div>
    </transition>
    <transition name="login-show" mode="out-in">
      <login v-show="show_login" @touchmove.prevent></login>
    </transition>
  </div>
</template>

<script>
import login from '@/components/login.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: '',
  components: {
    login
  },
  computed: {
    ...mapGetters({ show_login: 'show_login' })
  },
  methods: {
    ...mapMutations(['hide_login'])
  }
}
</script>

<style lang='less' scoped>
.mask {
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 375px;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
}

// 遮罩层动画
.mask-show-enter,
.mask-show-leave-to {
  opacity: 0;
}

.mask-show-enter-active,
.mask-show-leave-active {
  transition: opacity linear 0.3s;
}
// 左侧侧边栏显示隐藏动画
.login-show-enter,
.login-show-leave-to {
  transform: translateX(-315px);
}

.login-show-enter-active,
.login-show-leave-active {
  transition: transform linear 0.3s;
}
</style>
