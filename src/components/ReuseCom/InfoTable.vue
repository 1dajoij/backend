<script setup lang="ts">
import { IRequest } from "@/request/api/namespace";
import { EditPen, Filter } from "@element-plus/icons-vue";
import { changePage } from "@/untils/symbolKey";
import { ref, watch , inject } from "vue";
import Empty from "@/views/Empty/index.vue";
import Edit from "@/components/ReuseCom/Edit.vue";
import FilterVue from "@/components/ReuseCom/Filter.vue";
type Tdata = IRequest.IbasicInfo[] | IRequest.IspecificInfo[];
type Tsingledata = IRequest.IbasicInfo | IRequest.IspecificInfo;
const props = defineProps<{
    data?: Tdata,
    lens: number
}>();

const togglePage = inject<(page: number) => Promise<void>>(changePage);

const page = ref<number>(1);
watch(() => page.value, () => {
    togglePage && togglePage(page.value);
});

// Edit
const editRef = ref<Tsingledata | undefined>(undefined);
const editVisible = ref<boolean>(false);
const EditToggleVisible = (): void => {
    editVisible.value = !editVisible.value;
};
const editClick = (data: Tsingledata): void => {
    editRef.value = data;
};

// Filter
const filterVisible = ref<boolean>(false);
const FilterToggleVisible = (bool?: boolean): void => {
    if(bool === undefined) {
        filterVisible.value = !filterVisible.value
    } else {
        filterVisible.value = bool;
    }
};
</script>

<template>
    <div class="table-box" v-if="props.data && props.lens>0">
        <el-table :data="props.data"
            height="calc(100vh - 180px)" style="width: calc(100% - 80px)"
            :row-style="{height: '86px'}"
            :row-key="(item: IRequest.IbasicInfo) => item.id"
            @row-click="editClick"
        >
            <el-table-column v-for="(_, key) in props.data[0]" :prop="key" :label="key" :show-overflow-tooltip="true" :fixed="key==='id'?true:false" />
            <el-table-column fixed="right" align="center" max-width="76px" min-width="56px">
                <template #header>
                    <div class="filter" @click="FilterToggleVisible()">
                        <el-icon>
                            <Filter />
                        </el-icon>
                        <span>筛选</span>
                    </div>
                </template>
                <template #default>
                    <div class="tools" @click="EditToggleVisible">
                        <el-icon style="font-size: 20px;">
                            <EditPen />
                        </el-icon>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination hide-on-single-page v-model:current-page="page" background layout="prev, pager, next" :total="props.lens" :page-size="30"/>
        <Edit
            :visible="editVisible"
            @toggle-visible="EditToggleVisible"
            :data="editRef"
        />
        <FilterVue
            :visible="filterVisible"
            @toggle-visible="FilterToggleVisible"
            :keys="props.data[0]"
        />
    </div>
    <Empty v-else/>
</template>

<style scoped lang="scss">
.table-box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-table {
        overflow: hidden;
        border-radius: 8px;
        .tools {
            cursor: pointer;
            color: var(--el-text-color-secondary);
            transition: .3s;
            &:hover {
                color: var(--el-color-primary);
            }
        }
        .filter {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .el-icon {
                font-size: 16px;
                margin-right: 4px;
                color: var(--el-text-color-secondary);
                transition: .3s;
            }
            &:hover .el-icon {
                color: var(--el-color-primary);
            }
        }
    }
    .el-pagination {
        margin: 36px 0 0 0;
    }
}
</style>