import { Router } from 'express'
import { getStock } from '../services/snowball.js'

export const snowball = Router()

snowball.get('/api/snowball/stock', async (req, res) => {
    const { symbol } = req.query
    const r = await getStock(symbol)
    res.header('Cache-Control', 'no-store')
    res.json(r)
})
