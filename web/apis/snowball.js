export async function getStock(symbol) {
    const response = await fetch('/api/snowball/stock?symbol=' + symbol)
    const r = await response.json()
    return r?.data
}

export async function getRealtimeStock(symbol) {
    const response = await fetch('/api/snowball/realtime-stock?symbol=' + symbol)
    const r = await response.json()
    return r?.data
}