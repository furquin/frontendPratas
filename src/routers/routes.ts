import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../components/produtos.vue'),
        name: 'home',
        children: [
            {
                path: 'produtos',
                component: () => import('../components/produtos.vue'),
            }
        ]
    },
    {
        path: '/login',
        component: () => import('../components/barraLogin.vue'),
    }
    // {
    //     path: '/:catchAll(.*)*',
    //     component: () => import('../components/404.vue'),
    //     name: '404'
    // }
]

export default routes