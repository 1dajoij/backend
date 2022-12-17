<script setup lang="ts">
import { useUserStore } from '@/store';
const store = useUserStore();
console.log(store)
</script>

<template>
    <el-main>
        <router-view></router-view>
    </el-main>
</template>

<style scoped lang="scss">
.el-main {
    padding: 0;
    background-color: $colorA;
}
</style>