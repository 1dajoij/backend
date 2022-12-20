<script setup lang="ts">
import InfoTable from '@/components/ReuseCom/InfoTable.vue';
import { IRequest } from "@/request/api/namespace";
import { getAllInfo } from "@/request/api/infoManage";
import { changePage } from "@/untils/symbolKey";
import { onMounted, ref, provide } from "vue";
import type {InjectionKey} from "vue";

const infolist = ref<IRequest.IspecificInfo[] | undefined>(undefined);
const lens = ref<number>(0);

async function togglePage(page: number): Promise<void> {
    const limit = (page - 1) * 30;
    const res = await getAllInfo(2, limit);
    if(res.code === 200) {
        lens.value = (<IRequest.IinfoList>res).allLength
        infolist.value = (<IRequest.IinfoList>res).infoList as IRequest.IspecificInfo[];
    }
}

provide(
    changePage as InjectionKey<(page: number) => Promise<void>>,
    togglePage
);

onMounted(() => {
    togglePage(1);
})
</script>

<template>
    <div class="specificInfo" style="height:100%">
        <InfoTable v-if="infolist && lens" :data="infolist" :lens="lens"/>
    </div>
</template>