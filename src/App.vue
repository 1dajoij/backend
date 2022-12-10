<script setup lang="ts">
import Header from "./components/Header/index.vue"
import Aside from "./components/Aside/index.vue"
import Main from "./components/Main/index.vue"
import { ref } from "vue"
import type {Ref} from "vue"
const collapse: Ref<boolean> = ref(true);
function collapseToogle(): void {
  collapse.value = !collapse.value
};
</script>

<template>
  <el-container class="layout-container-demo">
    <Aside :collapse="collapse" />
    <el-container>
      <Header :collapse="collapse" @collapse-toogle="collapseToogle"/>
      <Main />
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.el-container {
  height: 100%;
  .el-container {
    flex-direction: column;
  }
}
</style>
