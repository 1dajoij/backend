<script setup lang="ts">
import InfoTable from '@/components/ReuseCom/InfoTable.vue';
import { IRequest } from "@/request/api/namespace";
import { getAllInfo } from "@/request/api/infoManage";
import { changePage } from "@/untils/symbolKey";
import { onMounted, ref, provide } from "vue";
import type {InjectionKey} from "vue";

// 表格数据
const infolist = ref<IRequest.IbasicInfo[] | undefined>(undefined);
// 数据总长度
const lens = ref<number | undefined>(undefined);

const togglePage = async (page: number): Promise<void> => {
    const limit = (page - 1) * 30;
    const res = await getAllInfo(1, limit);
    if(res.code === 200) {
        ((<IRequest.IinfoList>res).infoList as IRequest.IbasicInfo[]).map(item => {
            // 替换 & 连接符
            item.starring = item.starring.replace(/&/g, "、")
        });
        lens.value = (<IRequest.IinfoList>res).allLength
        infolist.value = (<IRequest.IinfoList>res).infoList as IRequest.IbasicInfo[];
    }
};

provide(
    changePage as InjectionKey<(page: number) => Promise<void>>,
    togglePage
);

onMounted(() => {
    togglePage(1);
})
</script>

<template>
    <div class="basicInfo" style="height: 100%;">
        <InfoTable v-if="infolist && lens" :data="infolist" :lens="lens"/>
    </div>
</template>