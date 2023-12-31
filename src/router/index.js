import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/404View.vue";
import HomeView from "../views/HomeView.vue";

const stage = import.meta.env.VITE_STAGE;

const router = createRouter({
  // TODO: modo html5
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes: [
    //   {
    //     path: "/home",
    //     redirect: {name: "home"},
    // },
    {
      path: "/404",
      component: NotFound,
      name: "404",
    },
    {
      path: "/:catchAll(.*)*",
      redirect: { name: "404" },
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      alias: ["/home"],
      meta: {
        requiredsAuth: false,
      },
    },
    {
      path: "/session",
      component: () => import("../views/SessionView.vue"),
      children: [
        {
          path: "",
          components: {
            default: () => import("../views/LoginView.vue"),
            register: () => import("../views/RegisterView.vue"),
          },
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/chats",
      component: () => import("../views/Chats.vue"),
      meta: {
        requiredsAuth: true,
        roles: ["admin"],
      },
      children: [
        {
          // path: ":chatId(⧵⧵d+)",
          path: ":chatId",
          component: () => import("../views/ChatView.vue"),
          // TODO: toma los params de la ruta y los pasa por los props
          // props: true,
          // props: {
          //   chatId:
          // },
          props: (route) => {
            return {
              chatId: route.params.chatId,
            };
          },
        },
      ],
    },
  ],
});

if (stage === "dev") {
  router.addRoute({
    path: "/profile",
    component: () => import("../views/ProfileView.vue"),
  });
}

router.beforeEach((to, from) => {
  // console.log("beforeEach", to, from);
  // if (to.path === "/home") return {name: 'about'}
  // return true;
  // if(to.meta?.requiredsAuth && to.meta?.roles?.includes("admin")) {
  //   return {path: "/session"}
  // }
});

export default router;
