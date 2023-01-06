<script setup lang="ts">
const props = withDefaults(defineProps<{
    description: string
}>(), {
    description: "暂无数据"
});
</script>

<template>
    <div class="nothing">
        <el-empty :description="props.description" />
    </div>
</template>

<style lang="scss" scoped>
.nothing{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>