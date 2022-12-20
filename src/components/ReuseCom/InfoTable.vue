<script setup lang="ts">
import { IRequest } from "@/request/api/namespace";
import { changePage } from "@/untils/symbolKey";
import { ref, watch , inject} from "vue";
const props = defineProps<{
    data: IRequest.IbasicInfo[] | IRequest.IspecificInfo[],
    lens: number
}>();

const togglePage = inject<(page: number) => Promise<void>>(changePage);

console.log(props.data)

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
            <el-table-column v-for="(_, key) in props.data[0]" :prop="key" :label="key" :show-overflow-tooltip="true" :fixed="key==='id'?true:false" />
        </el-table>
        <el-pagination v-model:current-page="page" background layout="prev, pager, next" :total="props.lens" :page-size="30"/>
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
    .el-table {
        border-radius: 8px;
        overflow: hidden;
    }
    .el-pagination {
        margin: 36px 0 0 0;
    }
}
</style>