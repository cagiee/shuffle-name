<script setup lang="ts">
import SettingFloatingButton from "./components/ui/SettingFloatingButton.vue";
import ItemFloatingButton from "./components/ui/ItemFloatingButton.vue";
import { useSettingsStore } from "./stores/settings";
import { useItemsStore } from "./stores/items";
import Button from "./components/ui/Button.vue";
import { ref } from "vue";
import WinnerFloatingButton from "./components/ui/WinnerFloatingButton.vue";

const settings = useSettingsStore();
const itemsStore = useItemsStore();

const displayedTitle = ref<string>("");
const displayedSubtitle = ref<string>("");
const displayedDescription = ref<string>("");
const isSpinning = ref<boolean>(false);

let spinInterval: number | undefined;

// Start random animation
const hasItems = (): boolean => {
  return itemsStore.getItems.length > 0;
};
const startSpin = (): void => {
  if (!hasItems()) {
    console.warn("No items available to spin");
    alert("No items available to spin");
    return;
  }
  stopSpin(); // ensure no duplicate interval
  isSpinning.value = true;

  const items = itemsStore.getItems;

  spinInterval = window.setInterval(() => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    displayedTitle.value = randomItem.title;
    displayedSubtitle.value = randomItem.subtitle;
    displayedDescription.value = randomItem.description;
  }, 100); // change every 100ms (fast)
};

// Stop immediately
const stopSpin = (): void => {
  if (spinInterval) {
    clearInterval(spinInterval);
    spinInterval = undefined;
    console.log(
      "Spin stopped",
      displayedTitle.value,
      displayedSubtitle.value,
      displayedDescription.value
    );
    itemsStore.selectItemByNumber(displayedTitle.value); // Update selected item in store
    isSpinning.value = false;
  }
};

const resetSpin = (): void => {
  stopSpin();
  displayedTitle.value = "";
  displayedSubtitle.value = "";
  displayedDescription.value = "";
};
</script>

<template>
  <div
    class="container"
    :style="{
      '--primary-color': settings.primaryColor,
      '--text-color': settings.textColor,
      '--background-color': settings.backgroundColor,
    }"
  >
    <div class="overlay">
      <div
        class="block"
        style="width: 100; margin: 18px 0 18px; font-size: 1.75em"
        align="center"
      >
        {{ displayedTitle === "" ? settings.title : displayedTitle }}
      </div>

      <div
        v-if="!isSpinning && displayedSubtitle !== ''"
        class="block"
        style="width: 100%; font-size: 0.7em; font-weight: normal"
        align="center"
      >
        {{ displayedSubtitle }}
      </div>
      <div
        v-if="!isSpinning && displayedDescription !== ''"
        class="block"
        style="
          width: 100%;
          font-size: 0.45em;
          font-weight: normal;
          margin-top: 12px;
        "
        align="center"
      >
        {{ displayedDescription }}
      </div>
      <div class="start-button-wrapper">
        <div class="btn-start-button">
          <Button v-if="!isSpinning" size="lg" class="" @click="startSpin"
            >Start</Button
          >
          <Button v-else size="lg" class="btn-error" @click="stopSpin"
            >Stop</Button
          >
          <Button
            v-if="displayedTitle && !isSpinning"
            size="lg"
            class="btn-error"
            @click="resetSpin"
            >Reset</Button
          >
        </div>
      </div>
    </div>
    <div class="floating-button">
      <WinnerFloatingButton />
      <ItemFloatingButton />
      <SettingFloatingButton />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: var(--background-color);
  min-height: 100vh;
  padding: 12px 48px;
}
.floating-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 12px;
  z-index: 2;
}
.overlay {
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  min-height: 200px;
  padding: 40px;
  transform: translateY(-50%);
  background-color: #f0f0f077;
  z-index: 1; /* Ensure it stays behind other content */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
  font-weight: 600;
  color: var(--text-color);
}
.start-button-wrapper {
  position: relative;
}
.btn-start-button {
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, 100px);
  display: flex;
  gap: 12px;
}
</style>
