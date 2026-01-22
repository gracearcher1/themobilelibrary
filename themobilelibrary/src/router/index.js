import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Book from "../views/Book.vue";
import Gallery from "../views/Gallery.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/book", name: "book", component: Book },
  { path: "/gallery", name: "gallery", component: Gallery },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
