import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '',
		redirect: () => (localStorage.getItem('pratas:token') ? { name: 'home' } : { name: 'login' }),
	},
	{
		path: '/',
		component: () => import('../components/barraNavegacao.vue'),
		name: 'home',
		children: [
			{
				path: 'produtos',
				component: () => import('../pages/produtos/produtos.vue'),
				name: 'produtos',
			},
			// {
			// 	path: 'relatorio',
			// 	component: () => import('../pages/produtos/produtos.vue'),
			// 	name: 'relatorio',
			// },
			{
				path: 'checkout',
				component: () => import('../pages/produtos/checkout.vue'),
				name: 'checkout',
			},
		],
	},
	{
		path: '/login',
		component: () => import('../pages/login/barraLogin.vue'),
		name: 'login',
	},
	{
		path: '/:catchAll(.*)*',
		component: () => import('../pages/notFound/notFound.vue'),
		name: '404',
	},
]

export default routes
