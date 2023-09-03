import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import roteador from './routers'

createApp(App).use(Quasar, quasarUserOptions).use(roteador).mount('#app')
