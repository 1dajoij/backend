<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps<{
    visible: boolean
}>();
const emits = defineEmits<{
    (e: "toggleVisible", b?: boolean): void
}>();
const visible = ref<boolean>(false);
watch(() => visible.value, () => {
    if(visible.value === false) {
        emits("toggleVisible", visible.value);
    };
});
watch(() => props.visible, () => {
    visible.value = props.visible;
});
const input = ref<string>("");
</script>

<template>
    <el-dialog v-model="visible" title="请输入修改后的值" align-center>
        <div class="dialog-box">
            <el-input v-model="input" type="textarea"></el-input>
            <el-button type="danger">修改</el-button>
        </div>
    </el-dialog>
</template>

<style scoped lang="scss">
.dialog-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    .el-textarea{
        margin-bottom: 12px;
    }
}
</style>