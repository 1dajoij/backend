<script setup lang="ts">
import { UserFilled, Expand,Fold } from '@element-plus/icons-vue'
interface Props {
    collapse:boolean
};
const {collapse} = defineProps<Props>();
const emit = defineEmits<{
    (e: "collapseToogle"):void
}>();
</script>

<template>
    <el-header style="font-size: 12px;">
        <el-icon style="font-size: 24px;" @click="emit('collapseToogle')">
            <Expand v-if="collapse"/>
            <Fold v-else />
        </el-icon>
        <div class="toolbar">
            <span class="name">Tom</span>
            <el-dropdown trigger="contextmenu">
                <el-avatar :icon="UserFilled" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<style scoped lang="scss">
.el-header {
    position: relative;
    background-color: var(--el-color-info-light-7);
    color: var(--el-text-color-primary);
    display: flex;
    justify-content: space-between;
    &>.el-icon{
        height: 100%;
        padding: 0 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;
        .name{
            padding-right: 8px;
        }
    }
}

</style>