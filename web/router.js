import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('./pages/Index.vue')

export function createAppRouter() {
    return createRouter({
        history: createWebHistory(),
        routes: [
            { path: '/', component: Index, },
        ],
    })
}
