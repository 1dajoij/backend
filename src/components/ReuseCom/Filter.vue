<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus'
const props = defineProps<{
    visible: boolean,
    keys: {
        [key: string]: any
    }
}>();
const emits = defineEmits<{
    (e: "toggleVisible", bool: boolean): void,
    (e: "changeTableData", search: string): void,
    (e: "resetTableData"): void
}>();
const visible = ref<boolean>(false);
watch(() => props.visible, () => {
    visible.value = props.visible;
});
watch(() => visible.value, () => {
    if(visible.value === false) {
        emits("toggleVisible", visible.value);
    };
});
// select
const select = ref<string>("");
// input
const input = ref<string>("");
// confim
const confim = (): void => {
    input.value = input.value.trim();
    if((select.value !== "") && (input.value !== "")) {
        emits("changeTableData", input.value);
        visible.value = !visible.value;
    } else {
        ElMessage.error("请检查筛选项是否正确")
    }
};
// reset
const reset = (): void => {
    emits("resetTableData");
    visible.value = !visible.value;
};
</script>

<template>
    <el-dialog
        v-model="visible"
        width="46%"
        destroy-on-close
        draggable
        title="筛选"
    >
        <div class="main">
            <el-select v-model="select" placeholder="Select">
                <el-option
                    v-for="(_,key) in props.keys"
                    :key="key"
                    :label="key"
                    :value="key"
                />
            </el-select>
            <el-input v-model="input" placeholder="Please input" />
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="reset">Reset</el-button>
                <el-button @click="confim" type="primary">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-select {
        max-width: 22%;
        margin-right: 8px;
    }
}
</style>