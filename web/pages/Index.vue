<template>
    <div class="index-container">
        <img :src="'/images/stock.png'">
        <div>
            <RouterLink :to="'/stock'">
                <NButton>
                    开始摇滚 📈
                </NButton>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { NButton } from 'naive-ui';

</script>


<style scoped lang="less">
.index-container {
    box-sizing: border-box;
    min-height: 100vh;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
        user-select: none;
        max-width: 400px;
        width: 100%;
    }
}
</style>
