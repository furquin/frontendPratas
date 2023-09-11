import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../components/barraNavegacao.vue'),
        name: 'home',
        children: [
            {
                path: 'produtos',
                component: () => import('../components/produtos/produtos.vue'),
                name: 'produtos'
            },
            {
                path: 'relatorio',
                component: () => import('../components/produtos/produtos.vue'),
                name: 'relatorio'
            },
            {
                path: 'checkout',
                component: () => import('../components/produtos/produtos.vue'),
                name: 'checkout'
            }
        ]
    },
    {
        path: '/login',
        component: () => import('../components/barraLogin.vue'),
        name: 'login',
    }
    // {
    //     path: '/:catchAll(.*)*',
    //     component: () => import('../components/404.vue'),
    //     name: '404'
    // }
]

export default routes