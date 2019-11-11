import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Songsheet from "./views/Songsheet.vue";
import Detail from "./views/Detail.vue";
import Idx from "./views/Idx.vue";
import Search from "./views/Search.vue";
import Singer from "./views/Singer.vue";
import Review from "./views/Review.vue";
import dateRecommend from "./views/dateRecommend.vue";
import moreNewDish from "./views/moreNewDish.vue";
import moreNewSongs from "./views/moreNewSongs.vue";
import login from "./views/loginIndex.vue";
import phone from "./views/phone.vue";
import pwd from "./views/phonePwd.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/songsheet",
      name: "songsheet",
      component: Songsheet,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/detail",
      name: "detail",
      component: Detail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/idx",
      name: "idx",
      component: Idx,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/singer",
      name: "singer",
      component: Singer,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/review",
      name: "review",
      component: Review
    },
    {
      path: "/dateRecommend",
      name: "dateRecommend",
      component: dateRecommend,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/moreNewDish",
      name: "moreNewDish",
      component: moreNewDish,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/moreNewSongs",
      name: "moreNewSongs",
      component: moreNewSongs,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/phone",
      name: "phone",
      component: phone,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/pwd",
      name: "pwd",
      component: pwd,
      meta: {
        keepAlive: true
      }
    }
  ]
});
