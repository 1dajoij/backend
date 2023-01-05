<script setup lang="ts">
import InfoTable from '@/components/ReuseCom/InfoTable.vue';
import { IRequest } from "@/request/api/namespace";
import { getAllInfo, getFilterData } from "@/request/api/infoManage";
import { changePage, filterData } from "@/untils/symbolKey";
import { onMounted, ref, provide, reactive } from "vue";
import type {InjectionKey} from "vue";

const infolist = ref<IRequest.IspecificInfo[] | undefined>(undefined);
const lens = ref<number>(0);
const process = (res: IRequest.IinfoList | IRequest.Irequest): void => {
    if(res.code === 200) {
        ((<IRequest.IinfoList>res).infoList as IRequest.IspecificInfo[]).map(item => {
            // 替换 & 连接符
            item.same_type_list = item.same_type_list.replace(/&/g, "、");
        });
        lens.value = (<IRequest.IinfoList>res).allLength
        infolist.value = (<IRequest.IinfoList>res).infoList as IRequest.IspecificInfo[];
    }
};
const filter = reactive<{
    key: string,
    word: string,
}>({
    key: "",
    word: ""
});
const filterTable = (key: string, word: string): void => {
    filter.key = key;
    filter.word = word;
    togglePage(1);
};
async function togglePage(page: number): Promise<void> {
    const offset = (page - 1) * 30;
    let res;
    if((filter.key === "") || (filter.word === "")) {
        res = await getAllInfo(2, offset);
    } else {
        res = await getFilterData(filter.key, filter.word, offset, 2);
    }
    process(res);
};
provide(
    changePage as InjectionKey<(page: number) => Promise<void>>,
    togglePage
);
provide(
    filterData as InjectionKey<(key: string, word: string) => Promise<void>>,
    filterTable
);
onMounted(() => {
    togglePage(1);
});
</script>

<template>
    <div class="specificInfo" style="height:100%">
        <InfoTable v-if="infolist && lens" :data="infolist" :lens="lens"/>
    </div>
</template>