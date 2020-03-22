import Vue from "vue";
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from "./App.vue";
import Article from "./components/article/Article";
import ArticlesList from "./components/article/ArticlesList";
import ArticlesListMember from "./components/article/ArticlesListMember";
import Login from "./components/member/Login";
import ArticleCreateOrEdit from "./components/article/ArticleCreateOrEdit";

Vue.config.productionTip = false;

Vue.prototype.$api_url = 'http://localhost:3000';

Vue.use(VueRouter);
Vue.use(Vuex);

const mustBeAuthenticated = function (to, from, next) {
  if (!store.getters.isLoggedIn) {
    next({name: 'login'});
    return;
  }

  next();
};

const routes = [
  {
    path: '/',
    component: ArticlesList,
    name: 'home',
  },
  {
    path: '/articles/nouveau',
    component: ArticleCreateOrEdit,
    props: {
      isEditing: false,
    },
    name: 'new-article',
    beforeEnter: mustBeAuthenticated,
  },
  {
    path: '/articles/:id/edition',
    component: ArticleCreateOrEdit,
    props: {
      isEditing: true,
    },
    name: 'edit-article',
    beforeEnter: mustBeAuthenticated,
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
    },
  },
  {
    path: '/mes-articles',
    component: ArticlesListMember,
    name: 'my-articles',
    beforeEnter: mustBeAuthenticated,
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
    memberId: state => {
      if (state.jwtFromRequest === null) {
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
