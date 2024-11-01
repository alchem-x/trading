<template>
    <div class="stock-quote-container" v-if="stockStore.stockData">
        <div class="item" v-for="(it) of items">
            <span class="name">{{ it.name }}:</span>
            <span class="value" :class="it.className">{{ it.value }}</span>
        </div>
    </div>
</template>

<script setup>
import { useStockStore } from '@/store/stock'
import { simplifyNumber } from '@/common/formating.js'
import { computed } from 'vue';

const stockStore = useStockStore()

const items = computed(() => {
    const { quote, market } = stockStore.stockData
    if (quote) {
        return [
            { name: quote.symbol, value: quote.name, },
            { name: '价格', value: `${quote.current} (${quote.chg >= 0 ? `+${quote.chg}` : quote.chg}, ${quote.percent >= 0 ? `+${quote.percent}` : quote.percent}%)`, className: { red: quote.chg > 0, green: quote.chg < 0 } },
            { name: '最高', value: quote.high, className: { red: quote.high > quote.last_close, green: quote.high < quote.last_close } },
            { name: '最低', value: quote.low, className: { red: quote.low > quote.last_close, green: quote.low < quote.last_close } },
            { name: '今开', value: quote.open, className: { red: quote.open > quote.last_close, green: quote.open < quote.last_close } },
            { name: '昨收', value: quote.last_close, },
            { name: '涨停', value: quote.limit_up, className: { red: quote.limit_up > quote.last_close, green: quote.limit_up < quote.last_close } },
            { name: '跌停', value: quote.limit_down, className: { red: quote.limit_down > quote.last_close, green: quote.limit_down < quote.last_close } },
            { name: '成交量', value: simplifyNumber(Math.trunc(quote.volume / 100)) + '手', },
            { name: '成交额', value: simplifyNumber(quote.amount), },
            { name: '换手', value: quote.turnover_rate + '%', },
            { name: '振幅', value: quote.amplitude + '%', },
            { name: '货币单位', value: quote.currency, },
            { name: '状态', value: market.status, },
        ]
    }
    else {
        return [
            { name: '异常', value: '数据为空', className: 'red' }
        ]
    }
})

</script>

<style scoped lang="less">
.stock-quote-container {
    margin-top: 1rem;

    .item {
        display: flex;
        gap: .25rem;
        font-size: 16px;

        .name {
            color: #111;
        }

        .value {

            &.red {
                color: #ee2500;
                font-weight: 500;
            }

            &.green {
                color: #093;
                font-weight: 500;
            }

            font-weight: 400;
        }
    }
}
</style>
