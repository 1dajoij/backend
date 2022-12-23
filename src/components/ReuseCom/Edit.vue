<script setup lang="ts">
import { IRequest } from "@/request/api/namespace";
import { ref, watch } from "vue";
type Tsingledata = IRequest.IbasicInfo | IRequest.IspecificInfo;
const props = defineProps<{
    visible: boolean,
    data: Tsingledata
}>();
const emits = defineEmits<{
    (e: "toggleVisible"): void
}>();
const visible = ref(false);
watch(() => props.visible, () => {
    visible.value = props.visible;
    console.log(props.data)
});
</script>

<template>
    <el-drawer v-model="visible" :show-close="false" @close="emits(`toggleVisible`)">
        <template #header>
            编辑
        </template>
        <el-button type="danger" @click="visible = !visible">关闭</el-button>
    </el-drawer>
</template>

<style scoped lang="scss">

</style>