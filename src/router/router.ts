// Import Router
import { createRouter, createWebHistory } from "vue-router";

// Import Views
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/profile",
        name: "Profile",
        component: ProfileView
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router