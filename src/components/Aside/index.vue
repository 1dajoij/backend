<script setup lang="ts">
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
interface Props {
    collapse:boolean
};
const {collapse} = defineProps<Props>();
</script>

<template>
    <el-aside>
        <el-scrollbar>
            <div class="logo">
                一张图片
            </div>
            <el-menu :default-openeds="['1']" :collapse="collapse">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <message />
                        </el-icon>Navigator One
                    </template>
                    <el-menu-item-group>
                        <template #title>Group 1</template>
                        <el-menu-item index="1-1">Option 1</el-menu-item>
                        <el-menu-item index="1-2">Option 2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="Group 2">
                        <el-menu-item index="1-3">Option 3</el-menu-item>
                    </el-menu-item-group>
                    <el-sub-menu index="1-4">
                        <template #title>Option4</template>
                        <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="1-5">
                        <template #title>Option4</template>
                        <el-menu-item index="1-5-1">Option 5-1</el-menu-item>
                        <el-menu-item index="1-5-2">Option 5-1</el-menu-item>
                        <el-menu-item index="1-5-3">Option 5-1</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon><icon-menu /></el-icon>Navigator Two
                    </template>
                    <el-menu-item-group>
                        <template #title>Group 1</template>
                        <el-menu-item index="2-1">Option 1</el-menu-item>
                        <el-menu-item index="2-2">Option 2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="Group 2">
                        <el-menu-item index="2-3">Option 3</el-menu-item>
                    </el-menu-item-group>
                    <el-sub-menu index="2-4">
                        <template #title>Option 4</template>
                        <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <setting />
                        </el-icon>Navigator Three
                    </template>
                    <el-menu-item-group>
                        <template #title>Group 1</template>
                        <el-menu-item index="3-1">Option 1</el-menu-item>
                        <el-menu-item index="3-2">Option 2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="Group 2">
                        <el-menu-item index="3-3">Option 3</el-menu-item>
                    </el-menu-item-group>
                    <el-sub-menu index="3-4">
                        <template #title>Option 4</template>
                        <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<style scoped lang="scss">
.el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-info-light-8);
    max-width: 200px;
    width: auto;
    .logo{
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-menu {
        background-color: transparent;
        user-select: none;
        &:not(.el-menu--collapse){
            width: 200px;
        }
        .el-sub-menu{
            --el-menu-hover-bg-color: var(--el-color-info-light-9);
            --el-menu-active-color: var(--el-menu-text-color);
            .el-menu-item.is-active{
                background-color: var(--el-color-info-light-9);
            }
        }
    }
}
</style>