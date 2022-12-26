<script setup lang="ts">
import { IRequest } from "@/request/api/namespace";
import { EditPen } from "@element-plus/icons-vue";
import { changePage } from "@/untils/symbolKey";
import { ref, watch , inject} from "vue";
import Empty from "@/views/Empty/index.vue";
import Edit from "@/components/ReuseCom/Edit.vue";
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
const toggleVisible = (): void => {
    editVisible.value = !editVisible.value
};
const editClick = (data: Tsingledata): void => {
    editRef.value = data;
};
watch(() => editRef.value, () => {
    console.log(editRef.value)
})
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
                <template #default>
                    <el-dropdown trigger="click">
                        <div class="tools">
                            <el-icon style="font-size: 20px;">
                                <EditPen />
                            </el-icon>
                        </div>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="toggleVisible">编辑</el-dropdown-item>
                            <el-dropdown-item disabled>添加至黑名单</el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="page" background layout="prev, pager, next" :total="props.lens" :page-size="30"/>
        <Edit :visible="editVisible" @toggle-visible="toggleVisible" :data="editRef"/>
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
        border-radius: 8px;
        overflow: hidden;
        .tools {
            cursor: pointer;
            color: var(--el-text-color-secondary);
            transition: .3s;
            &:hover {
                color: var(--el-color-primary);
            }
        }
    }
    .el-pagination {
        margin: 36px 0 0 0;
    }
}
</style>