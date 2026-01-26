import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Book from "../views/Book.vue";
import Gallery from "../views/Gallery.vue";
import Prices from "@/views/Prices.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/book", name: "book", component: Book },
  { path: "/gallery", name: "gallery", component: Gallery },
  { path: "/prices", name: "prices", component: Prices },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

export default router;
