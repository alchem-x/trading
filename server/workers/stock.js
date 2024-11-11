import { getStock } from '../services/snowball.js'
import { DB_TABLE_STOCK } from '../common/global.js'
import { getTableData, updateTableData } from '../services/noco.js'


function formatDate(date) {
    return new Date(date).toLocaleDateString().replace(/\//g, '-')
}

async function syncStockData() {
    try {
        for (let i = 0; ; i += 1000) {
            const d = await getTableData({ offset: 0 + i, limit: 1000, tableId: DB_TABLE_STOCK })
            const list = d?.list
            if (list?.length) {
                for (const it of list) {
                    const { data } = await getStock(it.symbol)
                    if (data && data.quote) {
                        const quote = data.quote
                        it.name = quote.name
                        it.date = new Date(quote.timestamp).toISOString()
                        it.open = quote.open
                        it.current = quote.current
                        it.last_close = quote.last_close
                        it.low = quote.low
                        it.high = quote.high
                        it.change = quote.chg
                        it.percent = quote.percent
                        it.volume = quote.volume
                        it.amount = quote.amount
                        it.turnover_rate = quote.turnover_rate
                        console.debug(formatDate(it.date), it.symbol, it.name, it.current)
                    }
                    delete it.CreatedAt
                    delete it.UpdatedAt
                }
                await updateTableData({ list, tableId: DB_TABLE_STOCK })
            } else {
                break
            }
        }
    } catch (err) {
        console.error(err)
    }
}

export const stockJobs = []

export function startStockJobs() {
    stockJobs.push(...[
        new Cron('0 30 15 * * *', { name: 'SyncStockData',timezone: 'Asia/Shanghai' }, syncStockData),
    ])
}

if (process.argv[1] === import.meta.filename) {
    await syncStockData()
}
