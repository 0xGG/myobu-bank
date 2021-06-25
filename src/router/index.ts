import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../components/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { title: "Myōbu | Dashboard" },
  },
  {
    path: "/:walletAddress",
    name: "Dashboard",
    component: Dashboard,
    meta: { title: "Myōbu | Dashboard" },
  },
  {
    path: "*",
    name: "catchAll",
    component: Dashboard,
    meta: { title: "Myōbu | Dashboard" },
  },
];

console.log("BASE_URL", process.env.BASE_URL);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) document.title = to.meta.title;
  next();
});

export default router;
