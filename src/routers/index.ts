import { createRouter, createWebHashHistory } from "vue-router"
import routes from "./routes"

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: routes,

})

export default roteador