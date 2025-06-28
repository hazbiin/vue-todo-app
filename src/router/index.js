import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ModalView from "@/views/ModalView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/tasks/:id',
        name: 'modal',
        component: ModalView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;