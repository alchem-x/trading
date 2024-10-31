import { Router } from 'express'

export const hello = Router()

hello.get('/api/hello', (req, res) => {
    res.send('Hello Trading')
})
