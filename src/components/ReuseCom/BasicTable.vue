<script setup lang="ts">
import { IRequest } from "@/request/api/namespace";
import { changePage } from "@/untils/symbolKey";
import { ref, watch , inject} from "vue";
const props = defineProps<{
    data: IRequest.IbasicInfo[],
}>();

const togglePage = inject<(page: number) => Promise<void>>(changePage);

const page = ref<number>(1);
watch(() => page.value, () => {
    togglePage && togglePage(page.value);
})
</script>

<template>
    <div class="box">
        <el-table :data="props.data" 
        height="calc(100vh - 180px)" style="width: calc(100% - 80px)"
        :row-style="{height: '86px'}"
        :row-key="(item: IRequest.IbasicInfo) => item.id">
            <el-table-column fixed prop="id" label="Id" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="largest_amount" label="largest_amount" />
            <el-table-column prop="release_data" label="release_data" />
            <el-table-column prop="score" label="score" />
            <el-table-column prop="picUrl" label="picUrl" :show-overflow-tooltip="true"/>
            <el-table-column prop="finish_state" label="finish_state" />
            <el-table-column prop="starring" label="starring" :show-overflow-tooltip="true"/>
            <el-table-column prop="hot" label="hot" />
            <el-table-column prop="type" label="type" />
        </el-table>
        <el-pagination v-model:current-page="page" background layout="prev, pager, next" :total="1000" />
    </div>
</template>

<style scoped lang="scss">
.box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-pagination {
        margin: 36px 0 0 0;
    }
}
</style>