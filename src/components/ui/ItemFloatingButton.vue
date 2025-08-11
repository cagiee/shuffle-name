<script lang="ts" setup>
// imports
import { ref } from "vue";
import Dashboard from "../icons/Dashboard.vue";
import ModalItems from "../modals/ModalItems.vue";

// Other variables
const showSettingModal = ref(false);
</script>

<template>
  <div class="">
    <button class="btn-setting">
      <Dashboard @click="showSettingModal = true" />
    </button>
    <ModalItems v-model="showSettingModal" />
  </div>
</template>

<style lang="scss" scoped>
.btn-setting {
  border: 0;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
