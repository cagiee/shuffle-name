<script lang="ts" setup>
// imports
import { ref } from "vue";
import Cog from "../icons/Cog.vue";
import ModalSetting from "../modals/ModalSettings.vue";

// Other variables
const showSettingModal = ref(false);
</script>

<template>
  <div class="">
    <button class="btn-setting">
      <Cog @click="showSettingModal = true" />
    </button>
    <ModalSetting v-model="showSettingModal" />
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
