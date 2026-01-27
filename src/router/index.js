import { createRouter, createWebHistory } from "vue-router"

import Home from "../views/Home.vue"
import Book from "../views/Book.vue"
import Gallery from "../views/Gallery.vue"
import MoreInfo from "@/views/MoreInfo.vue"

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/book", name: "book", component: Book },
  { path: "/gallery", name: "gallery", component: Gallery },
  { path: "/more-info", name: "more info", component: MoreInfo },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})

export default router
