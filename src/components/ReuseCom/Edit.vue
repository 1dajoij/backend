<script setup lang="ts">
import { IRequest } from "@/request/api/namespace";
import { setBlackList, updateSingleField, delectBlackList } from "@/request/api/infoManage";
import { ref, watch, computed } from "vue";
import { useRoute } from 'vue-router';
import DialogVue from "@/components/ReuseCom/Dialog.vue";
import { ElNotification  } from 'element-plus'
import { Minus, Plus, WarnTriangleFilled, Delete } from "@element-plus/icons-vue";
type Tsingledata = IRequest.IbasicInfo | IRequest.IspecificInfo;
const route = useRoute();
const props = defineProps<{
    visible: boolean,
    data: Tsingledata | undefined
}>();
const emits = defineEmits<{
    (e: "toggleVisible"): void,
    (e: "refresh"): void
}>();
const visible = ref(false);
watch(() => props.visible, () => {
    visible.value = props.visible;
});

// input
const showEditbtn = (key: string): boolean => {
    const res: Set<string> = new Set([
        'id', 'name', 'last_updata_time', 'hot', 'type', 'largest_amount', 'episodes', 'isUpdate'
    ]);
    return !res.has(key)
};
const textareaBtn = (key: string): "textarea" | "text" => {
    const res: Set<string> = new Set([
        'picUrl', 'starring', 'brief_introduction', 'same_type_list', 'episodes'
    ]);
    return res.has(key) ? "textarea" : "text"
};
// visible
const visibleDia = ref<boolean>(false);
const toggleVisible = (bool?: boolean): void => {
    if(bool === undefined) {
        visibleDia.value = !visibleDia.value;
    } else {
        visibleDia.value = bool;
    };
};
// key
const propsKey = ref<string>("");
const propsVal = ref<string>("");
const handleClick = (key: string, val: string | number | null, bool: boolean): void => {
    propsKey.value = key;
    propsVal.value = String(val);
    toggleVisible(bool);
};
// setBlacklist
const setBlacklist = async () => {
    if(props.data === undefined) return;
    const res = await setBlackList(props.data?.id);
    if(res.code === 200) {
        emits("refresh");
        visible.value = false;
    };
};
// deleteBlacklist
const delectBlacklist = async (type?:"delete") => {
    if(props.data === undefined) return;
    const res = await delectBlackList(props.data?.id, type);
    if(res.code === 200) {
        emits("refresh");
        visible.value = false;
    };
};
// updateSingle
const updateSingle = async (newvalue: string): Promise<void> => {
    if(props.data === undefined) return;
    let type: 1 | 2 = 1;
    const { id } = props.data;
    if((<IRequest.IbasicInfo>props.data).name) {
        type = 1;
    } else if ((<IRequest.IspecificInfo>props.data).brief_introduction) {
        type = 2;
    } else {
        return;
    };
    const {code} = await updateSingleField(id, propsKey.value, newvalue, type);
    if(code === 200) {
        emits("refresh");
        ElNotification({title: "Success", message:"修改成功", type: "success", duration: 2500});
        visible.value = false;
    };
};
// 切换icon
const isDelete = computed(() => {
    return !(route.name === "black_list")
});
</script>

<template>
    <el-drawer v-if="data" v-model="visible" :show-close="false" @close="emits(`toggleVisible`)">
        <template #header>
            <span>编辑</span>
            <el-popconfirm
                v-if="isDelete"
                width="220"
                confirm-button-text="Confirm"
                cancel-button-text="Cancel"
                confirm-button-type="danger"
                icon-color="#f56c6c"
                :icon="WarnTriangleFilled"
                title="确定添加至黑名单吗？"
                @confirm="setBlacklist"
            >
                <template #reference>
                    <el-button type="danger" :icon="Plus" circle/>
                </template>
            </el-popconfirm>
            <template v-else>
                <el-popconfirm
                    width="220"
                    confirm-button-text="Confirm"
                    cancel-button-text="Cancel"
                    confirm-button-type="primary"
                    icon-color="#409eff"
                    :icon="WarnTriangleFilled"
                    title="确定取消添加至黑名单吗？"
                    @confirm="delectBlacklist"
                >
                    <template #reference>
                        <el-button type="primary" :icon="Minus" circle/>
                    </template>
                </el-popconfirm>
                <el-popconfirm
                    width="220"
                    confirm-button-text="Confirm"
                    cancel-button-text="Cancel"
                    confirm-button-type="danger"
                    icon-color="#f56c6c"
                    :icon="WarnTriangleFilled"
                    title="确定删除此条数据吗？"
                    @confirm="delectBlacklist('delete')"
                >
                    <template #reference>
                        <el-button type="danger" :icon="Delete" circle/>
                    </template>
                </el-popconfirm>
            </template>
        </template>
        <el-scrollbar>
            <div class="input-item" v-for="(value, key, index) in props.data" :key="index">
                <p>{{key}}</p>
                <div class="input-box">
                    <el-input disabled :type="textareaBtn(key)" :autosize="textareaBtn(key) === 'textarea' ? {minRows:2, maxRows: 4} :null" :placeholder="String(value)" />
                    <el-button @click="handleClick(key, value, true)" type="primary" plain v-if="showEditbtn(key)">修改</el-button>
                </div>
            </div>
        </el-scrollbar>
        <DialogVue :visible="visibleDia" @toggle-visible="toggleVisible" @update-info="updateSingle" :placeholder="propsVal"/>
    </el-drawer>
</template>

<style scoped lang="scss">
.el-drawer {
    .input-item{
        display: flex;
        justify-content: start;
        align-items: center;
        flex-wrap: wrap;
        p {
            display: inline-block;
            width: 100%;
            font-weight: 300;
            font-size: 16px;
            padding: 8px 6px;
        }
        .input-box {
            width: 100%;
            margin: 0 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-input, .el-textarea{
                margin: 8px 0;
                width: 76%;
            }
            .el-button{
                margin-right: 16px;
            }
        }
    }
}
</style>