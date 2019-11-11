import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songid: "",
    id: "",
    index: "",
    songs: [],
    Full: true,
    isPlay: false,
    show_login: false,
    loginState: 0, // 登陆状态，初始值为 0 未登录，登陆成功设置为 1
    accountUid: 0
  },
  getters: {
    songid: state => state.songid,
    id: state => state.id,
    index: state => state.index,
    songs: state => state.songs,
    Full: state => state.Full,
    isPlay: state => state.isPlay,
    show_login: state => state.show_login,
    login_state: state => state.login_state,
    accountUid: state => state.accountUid
  },
  mutations: {
    submitSongid(state, songid) {
      state.songid = songid;
      console.log("songid" + state.songid);
    },
    submitId(state, id) {
      state.id = id;
    },
    submitIndex(state, index) {
      state.index = index;
    },
    submitSongs(state, songs) {
      state.songs = songs;
    },
    submitFull(state, Full) {
      state.Full = Full;
    },
    submitIsPlay(state, isPlay) {
      state.isPlay = isPlay;
    },
    show_login(state) {
      state.show_login = true;
    },
    hide_login(state) {
      state.show_login = false;
    },
    login_state(state) {
      state.login_state = 1;
    },
    accountUid(state, id) {
      state.accountUid = id;
    }
  },
  actions: {}
});
