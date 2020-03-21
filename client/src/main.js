import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import ListArticles from "./components/article/ArticlesList";
import Article from "./components/article/Article";

Vue.config.productionTip = false;

Vue.prototype.$api_url = 'http://localhost:3000';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: ListArticles,
  },
  {
    path: '/articles/:id',
    component: Article,
    name: 'article',
  },
];
const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
