import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('./pages/Index.vue')
const Stock = () => import('./pages/Stock/Stock.vue')

export function createAppRouter() {
    return createRouter({
        history: createWebHistory(),
        routes: [
            { path: '/', component: Index, },
            { path: '/stock', component: Stock, },
        ],
    })
}
