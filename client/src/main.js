import Vue from "vue";
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from "./App.vue";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import ListArticles from "./components/article/ArticlesList";
import Article from "./components/article/Article";
import Login from "./components/member/Login";

Vue.config.productionTip = false;

Vue.prototype.$api_url = 'http://localhost:3000';

Vue.use(VueRouter);
Vue.use(Vuex);

const routes = [
  {
    path: '/',
    component: ListArticles,
    name: 'home',
  },
  {
    path: '/articles/:id',
    component: Article,
    name: 'article',
  },
  {
    path: '/identification',
    component: Login,
    name: 'login',
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next(false);
        return;
      }

      next();
    }
  },
];
const router = new VueRouter({
  routes,
});

const store = new Vuex.Store({
  state: {
    jwtFromRequest: null,
  },
  getters: {
    isLoggedIn: state => {
      return state.jwtFromRequest !== null
    },
    userId: state => {
      if (!this.isLoggedIn(state)) {
        return null;
      }

      const jwtData = JSON.parse(atob(state.jwtFromRequest.split('.')[1]));

      return jwtData.member_id;
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
