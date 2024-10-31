import { resolve } from 'node:path'
import express, { static as serveStatic } from 'express'
import { APP_PORT } from './common/global.js'
import { hello } from './routers/hello.js'

function useRouters(app) {
    app.use(hello)
}

function useStatic(app) {
    app.use(serveStatic(resolve(import.meta.dirname, '..', 'dist')))
}

function startApp(app) {
    app.listen(APP_PORT, () => {
        console.info(`Serving app: http://localhost:${APP_PORT}`)
    })
}

function main() {
    const app = express()
    useRouters(app)
    useStatic(app)
    startApp(app)
}

main()