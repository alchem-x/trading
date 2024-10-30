import { createApp, h } from 'vue'
import { createAppRouter } from './router.js'
import App from './App.vue'
import { createPinia } from 'pinia'

function main() {
    const app = createApp({
        render() {
            return h(App)
        }
    })
    app.use(createAppRouter())
    app.use(createPinia())
    const divRef = document.createElement('div')
    document.body.appendChild(divRef)
    app.mount(divRef)
}

main()
