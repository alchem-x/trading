<template>
  <div class="stock-container">
    <div class="form">
      <NInput @keydown.enter="onSearch" v-model:value="inputSymbol" placeholder="输入股票代码" />
      <NButton @click="onSearch">搜索</NButton>
    </div>
    <StockQuote />
  </div>
</template>

<script setup>
import { onMounted,ref } from 'vue'
import { NButton, NInput } from 'naive-ui'
import { useStockStore } from '@/store/stock'
import StockQuote from './StockQuote.vue'
import { useRoute, useRouter } from 'vue-router'

const stockStore = useStockStore()
const route = useRoute()
const router = useRouter()

const inputSymbol = ref(route.query.symbol ?? '')

function updateQuerySymbol(symbol) {
  if (route.query.symbol !== symbol) {
    router.push({
      query: {
        symbol,
      }
    })
  }
}

function onSearch() {
  updateQuerySymbol(inputSymbol.value)
  stockStore.symbol = inputSymbol.value
  stockStore.onSearch()
}

onMounted(async () => {
  if (route.query.symbol) {
    inputSymbol.value = route.query.symbol
    stockStore.symbol = route.query.symbol
    await stockStore.onSearch()
  }
  await stockStore.pollRealtimeStock()
})
</script>

<style scoped lang="less">
.stock-container {
  padding: 1rem;
  box-sizing: border-box;

  .form {
    display: flex;
    gap: 1rem;
  }
}
</style>
