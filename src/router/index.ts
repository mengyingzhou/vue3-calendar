/*
 * @Description:
 * @Date: 2023-05-15 10:35:14
 * @Author: didi
 * @LastEditTime: 2023-05-17 14:13:05
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../view/Home.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "Profile" */ "../view/Profile.vue"),
  },
  {
    path: "/star",
    name: "Star",
    component: () => import(/* webpackChunkName: "Profile" */ "../view/Star.vue"),
  },
  {
    path: "/follow",
    name: "Follow",
    component: () => import(/* webpackChunkName: "Profile" */ "../view/Follow.vue"),
  },
  {
    path: "/selected",
    name: "Selected",
    component: () => import(/* webpackChunkName: "Profile" */ "../view/Selected.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import(/* webpackChunkName: "Profile" */ "../view/Contact.vue"),
  },
  {
    path: "/select",
    name: "Select",
    component: () =>
      import(/* webpackChunkName: "select" */ "../view/selectday/index.vue"),
  },
  {
    path: "/selectdetail",
    name: "selectdetail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "../view/selectday/detail.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes,
});

export default router;
