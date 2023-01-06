<script setup lang="ts">
import InfoTable from '@/components/ReuseCom/InfoTable.vue';
import Empty from "@/views/Empty/index.vue";
import { IRequest } from "@/request/api/namespace";
import { changePage, filterData, resetFilter } from "@/untils/symbolKey";
import { onMounted, ref, inject} from "vue";

const infolist = ref<IRequest.IspecificInfo[] | undefined>(undefined);
const lens = ref<number>(0);
const process = (res: IRequest.IinfoList | IRequest.Irequest): void => {
    if(res.code === 200) {
        ((<IRequest.IinfoList>res).infoList as IRequest.IspecificInfo[]).map(item => {
            // 替换 & 连接符
            item.same_type_list = item.same_type_list.replace(/&/g, "、");
        });
        lens.value = (<IRequest.IinfoList>res).allLength;
        infolist.value = (<IRequest.IinfoList>res).infoList as IRequest.IspecificInfo[];
    }
};
const change = inject<
    (page: number, type: 1 | 2) => Promise<IRequest.IinfoList | IRequest.Irequest>
>(changePage);
const filter = inject<
    (key: string, word: string, type: 1 | 2) => Promise<IRequest.IinfoList | IRequest.Irequest>
>(filterData);
const reset = inject<
    (type: 1 | 2) => Promise<IRequest.IinfoList | IRequest.Irequest>
>(resetFilter);
const togglePage = async (page: number): Promise<void> => {
    if(change) {
        const res = await change(page, 2);
        process(res);
    }
};
const filterTable = async (key: string, word: string): Promise<void> => {
    if(filter) {
        const res = await filter(key, word, 2);
        process(res);
    }
};
const resetTable = async (): Promise<void> => {
    if (reset) {
        const res= await reset(2);
        process(res);
    }
};
onMounted(() => {
    togglePage(1);
});
</script>

<template>
    <div class="specificInfo" style="height:100%">
        <InfoTable
            v-if="infolist && lens"
            :data="infolist"
            :lens="lens"
            :toggle-page="togglePage"
            :filter="filterTable"
            :reset="resetTable"
            />
        <Empty v-else @click="resetTable" description="没有搜索到结果，点击返回"/>
    </div>
</template>