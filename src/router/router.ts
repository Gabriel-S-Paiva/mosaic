// Import Router
import { createRouter, createWebHistory } from "vue-router";

// Import Views
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import LoginView from "../views/LoginView.vue";

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
    {
        path: "/login",
        name: "Login",
        component: LoginView,
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/",
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router