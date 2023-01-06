<script setup lang="ts">
import { IRequest } from "@/request/api/namespace";
import { getAllInfo, getFilterData } from "@/request/api/infoManage";
import { changePage, filterData, resetFilter } from "@/untils/symbolKey";
import { provide, reactive } from "vue";
import type {InjectionKey} from "vue";

const filter = reactive<{
    key: string,
    word: string,
}>({
    key: "",
    word: ""
});
const filterTable = async (key: string, word: string, type: 1 | 2): Promise<IRequest.IinfoList | IRequest.Irequest> => {
    filter.key = key;
    filter.word = word;
    return await togglePage(1, type);
};
const reset = async (type: 1 | 2): Promise<IRequest.IinfoList | IRequest.Irequest> => {
    filter.key = "";
    filter.word = "";
    return await togglePage(1, type);
};
const togglePage = async (page: number, type: 1 | 2, limit?: number): Promise<IRequest.IinfoList | IRequest.Irequest> => {
    const offset = (page - 1) * 30;
    let res: IRequest.IinfoList | IRequest.Irequest;
    if((filter.key === "") || (filter.word === "")) {
        res = await getAllInfo(type, offset);
    } else {
        res = await getFilterData(filter.key, filter.word, offset, limit, type);
    };
    return res;
};
provide(
    changePage as InjectionKey<(page: number, type: 1 | 2) => Promise<IRequest.IinfoList | IRequest.Irequest>>,
    togglePage
);
provide(
    filterData as InjectionKey<(key: string, word: string, type: 1 | 2) => Promise<IRequest.IinfoList | IRequest.Irequest>>,
    filterTable
);
provide(
    resetFilter as InjectionKey<(type: 1 | 2) => Promise<IRequest.IinfoList | IRequest.Irequest>>,
    reset
);
</script>

<template>
    <router-view />
</template>