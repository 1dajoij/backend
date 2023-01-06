<script setup lang="ts">
import InfoTable from '@/components/ReuseCom/InfoTable.vue';
import { IRequest } from "@/request/api/namespace";
import { changePage, filterData, resetFilter } from "@/untils/symbolKey";
import { onMounted, ref, inject } from "vue";

// 表格数据
const infolist = ref<IRequest.IbasicInfo[] | undefined>(undefined);
// 数据总长度
const lens = ref<number | undefined>(undefined);

const process = (res: IRequest.IinfoList | IRequest.Irequest): void => {
    if(res.code === 200) {
        ((<IRequest.IinfoList>res).infoList as IRequest.IbasicInfo[]).map(item => {
            // 替换 & 连接符
            item.starring = item.starring.replace(/&/g, "、")
        });
        lens.value = (<IRequest.IinfoList>res).allLength;
        infolist.value = (<IRequest.IinfoList>res).infoList as IRequest.IbasicInfo[];
    };
};

const change = inject<(
        page: number, type: 1 | 2, limit?: number,
        callback?: (type: 1 | 2, offset: number) => Promise<IRequest.IinfoList | IRequest.Irequest>
    ) => Promise<IRequest.IinfoList | IRequest.Irequest>
>(changePage);
const filter = inject<
    (key: string, word: string, type: 1 | 2) => Promise<IRequest.IinfoList | IRequest.Irequest>
>(filterData);
const reset = inject<
    (type: 1 | 2) => Promise<IRequest.IinfoList | IRequest.Irequest>
>(resetFilter);
const togglePage = async (page: number): Promise<void> => {
    if(change) {
        const res = await change(page, 1);
        process(res);
    }
};
const filterTable = async (key: string, word: string): Promise<void> => {
    if(filter) {
        const res = await filter(key, word, 1);
        process(res);
    }
};
const resetTable = async (): Promise<void> => {
    if (reset) {
        const res= await reset(1);
        process(res);
    }
};
onMounted(() => {
    togglePage(1);
});
</script>

<template>
    <div class="basicInfo" style="height: 100%;">
        <InfoTable
            v-if="infolist && lens"
            :data="infolist"
            :lens="lens"
            :toggle-page="togglePage"
            :filter="filterTable"
            :reset="resetTable"
        />
    </div>
</template>