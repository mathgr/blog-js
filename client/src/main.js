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
import CreateAccount from "./components/member/CreateAccount";

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

const mustNotBeAuthenticated = function (to, from, next) {
  if (store.getters.isLoggedIn) {
    next(false);
    return;
  }
  next();
}

const routes = [
  {
    path: '/',
    component: ArticlesList,
    name: 'home',
  },
  {
    path: '/articles/:id',
    component: Article,
    name: 'article',
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
    path: '/mes-articles',
    component: ArticlesListMember,
    name: 'my-articles',
    beforeEnter: mustBeAuthenticated,
  },
  {
    path: '/identification',
    component: Login,
    name: 'login',
    beforeEnter: mustNotBeAuthenticated,
  },
  {
    path: '/creer-mon-compte',
    component: CreateAccount,
    name: 'create-account',
    beforeEnter: mustNotBeAuthenticated,
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
