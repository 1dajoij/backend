<script setup lang="ts">
import {getBlackMovie} from "@/request/api/infoManage";
import InfoTable from '@/components/ReuseCom/InfoTable.vue';
import Empty from "@/views/Empty/index.vue";
import { IRequest } from "@/request/api/namespace";
import { changePage, resetFilter } from "@/untils/symbolKey";
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
const reset = inject<
    (type: 1 | 2) => Promise<IRequest.IinfoList | IRequest.Irequest>
>(resetFilter);
const togglePage = async (page: number): Promise<void> => {
    if(change) {
        const res = await change(page, 1, 30, async (type, offset) => {
            return await getBlackMovie(offset)
        });
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
    <div class="blackList" style="height: 100%;">
        <InfoTable
            v-if="infolist && lens"
            :data="infolist"
            :lens="lens"
            :toggle-page="togglePage"
        />
        <Empty v-else @click="resetTable" description="没有搜索到结果，如果是筛选导致可以点击页面返回"/>
    </div>
</template>

<style lang="scss" scoped>
</style>