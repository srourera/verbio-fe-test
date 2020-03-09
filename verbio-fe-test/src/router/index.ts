import Vue from "vue";
import VueRouter from "vue-router";
import Chat from "../views/Chat/Chat.vue";
import Login from "../views/Login/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Chat",
    component: Chat
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
