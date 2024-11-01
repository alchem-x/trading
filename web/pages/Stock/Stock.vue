<template>
  <div class="stock-container">
    <div class="form">
      <NInput @keydown.enter="stockStore.onSearch" v-model:value="stockStore.inputSymbol" />
      <NButton @click="stockStore.onSearch">Search</NButton>
    </div>
    <pre v-text="stockStore.stockData"></pre>
  </div>
</template>

<script setup>
import { NButton, NInput } from 'naive-ui'
import { useStockStore } from '@/store/stock';

const stockStore = useStockStore()
</script>

<style scoped lang="less">
.stock-container {
  padding: 1rem;
  box-sizing: border-box;

  .form {
    display: flex;
    gap: 1rem;
  }

  pre {
    box-sizing: border-box;
    margin: 1rem 0 0 0;
    border: 1px solid #ccc;
    padding: .5rem;
    height: calc(100vh - 16px - 16px - 34px - 16px);
    overflow: auto;
    border-radius: 2px;
    ;
  }
}
</style>
