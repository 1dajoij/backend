<script setup lang="ts">
import { Menu as IconMenu, User,Document } from '@element-plus/icons-vue'
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
interface Props {
    collapse:boolean
};
const {collapse} = defineProps<Props>();

const active = ref<string>("");

const router = useRouter();
watch(() => router.currentRoute.value.path, (toPath) => {
    active.value = toPath;
})
</script>

<template>
    <el-aside>
        <el-scrollbar>
            <div class="logo">
            </div>
            <el-menu
                :default-openeds="['1']"
                :collapse="collapse"
                :default-active="active"
                router
            >
                <el-sub-menu index="/data_manage">
                    <template #title>
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <span>数据管理</span>
                    </template>
                    <el-menu-item index="/data_manage/basic">基础信息</el-menu-item>
                    <el-menu-item index="/data_manage/specific">详细信息</el-menu-item>
                    <el-menu-item index="/data_manage/black">黑名单</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/errorlist">
                    <template #title>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>错误列表</span>
                    </template>
                    <el-menu-item index="/errorlist/basic">基本信息错误</el-menu-item>
                    <el-menu-item index="/errorlist/specific">详情信息错误</el-menu-item>
                    <el-menu-item index="/errorlist/movie">播放地址错误</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/user_manage">
                    <template #title>
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="/user_manage/userlist">用户列表</el-menu-item>
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
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .el-menu {
        background-color: transparent;
        user-select: none;
        &:not(.el-menu--collapse){
            -width: 200px;
        }
        // & .el-menu-item.is-active{
        //     -background-color: var(--el-color-info-light-9);
        //     color: rgb(183, 178, 177);
        // }
        // & .el-sub-menu.is-active {
        //     background-color: var(--el-color-info-light-9);
        // }
    }
}
</style>