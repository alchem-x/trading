<template>
  <div class="stock-container">
    <div class="form">
      <NInput @keydown.enter="onSearch" v-model:value="symbol" />
      <NButton @click="onSearch">Search</NButton>
    </div>
    <pre v-text="data"></pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NButton, NInput } from 'naive-ui'
import { getStock } from '@/apis/snowball.js'

const symbol = ref('SH000001')
const data = ref('')

async function onSearch() {
  const stock = await getStock(symbol.value)
  if (stock) {
    data.value = JSON.stringify(stock, null, 2)
  }
}
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
