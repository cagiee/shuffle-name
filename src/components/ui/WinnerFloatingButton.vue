<script lang="ts" setup>
// imports
import { ref } from "vue";
import Trophy from "../icons/Trophy.vue";
import ModalWinners from "../modals/ModalWinners.vue";

// External variables

// Other variables
const showSettingModal = ref(false);
</script>

<template>
  <div class="">
    <button class="btn-setting">
      <Trophy @click="showSettingModal = true" />
    </button>
    <ModalWinners v-model="showSettingModal" />
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
