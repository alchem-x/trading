import { SNOWBALL_TOKEN } from '../common/global.js'

export async function getStock(symbol) {

    const params = new URLSearchParams({ 
        symbol,
     })
    const response = await fetch(`https://stock.xueqiu.com/v5/stock/quote.json?${params}`, {
        headers: {
            cookie: `xq_a_token=${SNOWBALL_TOKEN}`
        }
    })

    return await response.json()
}
