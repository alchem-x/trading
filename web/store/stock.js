import { defineStore } from 'pinia'
import { getStock } from '@/apis/snowball.js'

export const useStockStore = defineStore('stock', {
    state() {
        return {
            inputSymbol: 'SH000001',
            stockData: '',
        }
    },
    actions: {
        async onSearch() {
            const data = await getStock(this.inputSymbol)
            if (data) {
                this.stockData = JSON.stringify(data, null, 2)
            }
        },
    },
})