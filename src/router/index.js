import { createRouter, createWebHistory } from "vue-router"
import { isAdminAuthenticated } from "@/lib/adminAuth"

import Home from "../views/Home.vue"
import Book from "../views/Book.vue"
import Gallery from "../views/Gallery.vue"
import MoreInfo from "@/views/MoreInfo.vue"
import TheSpace from "@/views/TheSpace.vue"
import AdminHome from "@/views/AdminHome.vue"
import AdminLogin from "@/views/AdminLogin.vue"
import AdminManageBookings from "@/views/AdminManageBookings.vue"
import AdminCalendarPage from "@/views/AdminCalendarPage.vue"

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/book", name: "book", component: Book },
  { path: "/gallery", name: "gallery", component: Gallery },
  { path: "/the-space", name: "space", component: TheSpace },
  { path: "/more-info", name: "more info", component: MoreInfo },
  // None of the /admin/* routes are in Header.vue's menuItems -- intentionally
  // not linked anywhere on the site.
  {
    path: "/admin",
    name: "admin-home",
    component: AdminHome,
    meta: { requiresAdmin: true },
  },
  { path: "/admin/login", name: "admin-login", component: AdminLogin },
  {
    path: "/admin/manage-bookings",
    name: "admin-manage-bookings",
    component: AdminManageBookings,
    meta: { requiresAdmin: true },
  },
  {
    path: "/admin/calendar",
    name: "admin-calendar",
    component: AdminCalendarPage,
    meta: { requiresAdmin: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" }
  },
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})

router.beforeEach((to) => {
  if (to.meta.requiresAdmin && !isAdminAuthenticated()) {
    return { path: "/admin/login" }
  }
})

export default router
