<script setup lang="ts">
import { IRequest } from "@/request/api/namespace";
import { ref, watch } from "vue";
import DialogVue from "@/components/ReuseCom/Dialog.vue";
type Tsingledata = IRequest.IbasicInfo | IRequest.IspecificInfo;
const props = defineProps<{
    visible: boolean,
    data: Tsingledata | undefined
}>();
const emits = defineEmits<{
    (e: "toggleVisible"): void
}>();
const visible = ref(false);
watch(() => props.visible, () => {
    visible.value = true;
    // 
    console.log(props.data);
});

// input
const showEditbtn = (key: string): boolean => {
    const res: Set<string> = new Set([
        'id', 'name', 'last_updata_time'
    ]);
    return !res.has(key)
};
const textareaBtn = (key: string): "textarea" | "text" => {
    const res: Set<string> = new Set([
        'picUrl', 'starring', 'brief_introduction', 'same_type_list'
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
</script>

<template>
    <el-drawer v-if="data" v-model="visible" :show-close="false" @close="emits(`toggleVisible`)">
        <template #header>
            编辑
        </template>
        <el-scrollbar>
            <div class="input-item" v-for="(value, key, index) in props.data" :key="index">
                <p>{{key}}</p>
                <div class="input-box">
                    <el-input disabled :type="textareaBtn(key)" :autosize="textareaBtn(key) === 'textarea'" :placeholder="String(value)" />
                    <el-button @click="toggleVisible(true)" type="primary" plain v-if="showEditbtn(key)">编辑</el-button>
                </div>
            </div>
        </el-scrollbar>
        <DialogVue :visible="visibleDia" @toggleVisible="toggleVisible"/>
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
                margin-right: 8px;
            }
        }
    }
}
</style>