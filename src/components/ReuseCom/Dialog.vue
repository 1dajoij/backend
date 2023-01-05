<script setup lang="ts">
import { ref, watch } from "vue";
import { ElNotification  } from 'element-plus'
const props = defineProps<{
    visible: boolean,
    placeholder: string
}>();
const emits = defineEmits<{
    (e: "toggleVisible", b?: boolean): void,
    (e: "updateInfo", newvalue: string): void
}>();
const input = ref<string>("");
const visible = ref<boolean>(false);
watch(() => visible.value, () => {
    if(visible.value === false) {
        emits("toggleVisible", visible.value);
    };
});
watch(() => props.visible, () => {
    visible.value = props.visible;
    if(props.visible) {
        input.value = props.placeholder;
    }
});
// 做一些对更新的限制
const update = (): void => {
    if (input.value === '') return;
    if (input.value === props.placeholder) {
        ElNotification({title: "Warning", message:"内容没有变化！", type: "warning", duration: 2500})
        return;
    }
    emits('updateInfo', input.value);
    visible.value = !visible.value;
};
</script>

<template>
    <el-dialog v-model="visible" width="30%" title="编辑" align-center>
        <div class="dialog-box">
            <el-input v-model="input" type="textarea" :autosize="{minRows:2, maxRows: 20}"></el-input>
            <el-button type="danger" @click="update">修改</el-button>
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