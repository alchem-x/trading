import express, {static as serveStatic} from 'express'
import { resolve } from 'node:path'

function main() {
    const app = express()
    app.use(serveStatic(resolve(import.meta.dirname, '..', 'dist')))
    
    app.get('/api/hello', function (req, res) {
        res.send('Hello World')
    })

    const port = process.env.PORT ?? 3000

    app.listen(port, () => {
        console.info(`Listen port ${port}`)
    })
}

main()