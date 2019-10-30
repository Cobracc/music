<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <play></play>
  </div>
</template>
<script>
import play from "@/views/Play.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    play
  },
  computed: {
  },
  data() {
    return {
      show: false
    };
  }
};
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#app {
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0;
}
</style>
