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
    isPlay: false
  },
  getters: {
    songid: state => state.songid,
    id: state => state.id,
    index: state => state.index,
    songs: state => state.songs,
    Full: state => state.Full,
    isPlay: state => state.isPlay
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
    }
  },
  actions: {}
});
