<script setup lang="ts">
import TableVue from '@/components/ReuseCom/BasicTable.vue';
import { IRequest } from "@/request/api/namespace";
import { getAllInfo } from "@/request/api/infoManage";
import { changePage } from "@/untils/symbolKey";
import { onMounted, ref, provide } from "vue";
import type {InjectionKey} from "vue";

const infolist = ref<IRequest.IbasicInfo[] | undefined>(undefined);

const togglePage = async (page: number): Promise<void> => {
    const limit = (page - 1) * 30;
    console.log(limit)
    const res = await getAllInfo(1, limit);
    console.log(res)
    if(res.code === 200) {
        ((res as IRequest.IinfoList).infoList as IRequest.IbasicInfo[]).map(item => {
            item.starring = item.starring.replace(/&/g, "、")
        });
        infolist.value = (res as IRequest.IinfoList).infoList as IRequest.IbasicInfo[];
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
    <div class="basicInfo" style="height: 100%;overflow: hidden;">
        <table-vue v-if="infolist" :data="infolist"/>
    </div>
</template>