import { createApp, markRaw } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import roteador from './routers'
import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(({ store }) => {
	store.$router = markRaw(roteador)
})

createApp(App).use(Quasar, quasarUserOptions).use(roteador).use(pinia).mount('#app')
