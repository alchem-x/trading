<template>
  <div class="trading-index">
    <div class="form">
      <NInput v-model:value="symbol" />
      <NButton @click="onClickSearch">Search</NButton>
    </div>
    <pre v-text="data"></pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NButton, NInput, NCode } from 'naive-ui'

const symbol = ref('SH000001')
const data = ref('')

async function onClickSearch() {
  const response = await fetch('/api/snowball/stock?symbol=' + symbol.value)
  const r = await response.json()
  if (r?.data) {
    data.value = JSON.stringify(r.data, null, 2)
  }
}
</script>

<style scoped lang="less">
.trading-index {
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
