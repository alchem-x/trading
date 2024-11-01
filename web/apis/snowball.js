export async function getStock(symbol) {
    const response = await fetch('/api/snowball/stock?symbol=' + symbol)
    const r = await response.json()
    return r?.data
}