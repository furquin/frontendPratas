import { createPinia } from 'pinia'
import { App, markRaw } from 'vue'
import { Router } from 'vue-router'
import router from '@/routers/index'

declare module 'pinia' {
	export interface PiniaCustomProperties {
		$router: Router
	}
}

export function setup(app: App) {
	const pinia = createPinia()
	pinia.use(({ store }) => {
		store.$router = markRaw(router)
	})

	app.use(pinia)
}

export * from './auth.store'
