import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import EditTodoView from "@/views/EditTodoView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/tasks/:id',
        name: 'modal',
        component: EditTodoView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;