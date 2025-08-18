<script setup lang="ts">
import confettiSound from "./assets/confetti.mp3";
import SettingFloatingButton from "./components/ui/SettingFloatingButton.vue";
import ItemFloatingButton from "./components/ui/ItemFloatingButton.vue";
import { useSettingsStore } from "./stores/settings";
import { useItemsStore } from "./stores/items";
import Button from "./components/ui/Button.vue";
import { ref, computed } from "vue";
import WinnerFloatingButton from "./components/ui/WinnerFloatingButton.vue";
import ConfettiVideo from "./components/ui/ConfettiVideo.vue";
import OrangeButton from "./components/ui/OrangeButton.vue";

const settings = useSettingsStore();
const itemsStore = useItemsStore();
const page = ref<string>("home"); // Current page, can be used for navigation or state management
const type = ref<string>("home"); // Current page, can be used for navigation or state management

const displayedTitle = ref<string>("");
const displayedSubtitle = ref<string>("");
const displayedDescription = ref<string>("");
const isSpinning = ref<boolean>(false);
const confetti = ref();

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
  type.value = "shuffle"; // Set type to shuffle
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
    triggerConfettiSoundEffect();
    spinInterval = undefined;
    confetti.value?.celebrate(); // Trigger confetti celebration
    itemsStore.selectItemByNumber(displayedTitle.value, page.value); // Update selected item in store
    isSpinning.value = false;
    itemsStore.removeItemBySubtitle(displayedSubtitle.value); // Remove item from store
  }
};

const resetSpin = (): void => {
  stopSpin();
  displayedTitle.value = "";
  displayedSubtitle.value = "";
  displayedDescription.value = "";
};

const prizeText = computed(() => {
  switch (page.value) {
    case "kasur":
      return "2 Set Kasur Dreamline Comfort King";
    case "kalung":
      return "1 pcs Necklace Beli Berlian";
    case "motor":
      return "1 Unit Yamaha Fazzio";
    case "mobil":
      return "1 Suzuki Grand Vitara Type GX At Singleton";
    default:
      break;
  }
});

const confettiAudio = ref<HTMLAudioElement | null>(null);
const triggerConfettiSoundEffect = async () => {
  const audio = confettiAudio.value;
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
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
    <img
      v-show="page === 'home'"
      src="./assets/homepage.png"
      alt=""
      class="bg-image"
    />
    <img
      v-show="page === 'kasur'"
      src="./assets/kasur.png"
      alt=""
      class="bg-image"
    />
    <img
      v-show="page === 'kalung'"
      src="./assets/kalung.png"
      alt=""
      class="bg-image"
    />
    <img
      v-show="page === 'motor'"
      src="./assets/motor.png"
      alt=""
      class="bg-image"
    />
    <img
      v-show="page === 'mobil'"
      src="./assets/mobil.png"
      alt=""
      class="bg-image"
    />
    <div v-if="type === 'shuffle'" class="overlay">
      <div
        class="block"
        style="width: 100; margin: 18px 0 18px; font-size: 1.75em"
        align="center"
      >
        {{ displayedTitle }}
      </div>
      <!-- <div class="start-button-wrapper">
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
      </div> -->
    </div>

    <div v-if="type === 'shuffle'" class="no-coupon-text" align="center">
      NO COUPON
    </div>
    <div
      v-if="type === 'shuffle' && !isSpinning && displayedSubtitle !== ''"
      class="subtitle-text"
      align="center"
    >
      {{ displayedSubtitle }}
    </div>
    <div
      v-if="type === 'shuffle' && !isSpinning && displayedDescription !== ''"
      class="description-text"
      style=""
      align="center"
    >
      {{ displayedDescription }}
    </div>
    <div class="floating-menu-button">
      <WinnerFloatingButton />
      <ItemFloatingButton />
      <!-- <SettingFloatingButton /> -->
    </div>
    <div v-if="type === 'idle' && prizeText" class="prize-text">
      {{ prizeText }}
    </div>
    <div
      v-if="type === 'home' || type === 'idle'"
      class="start-button"
      :class="{ 'idle-button': type === 'idle' }"
    >
      <OrangeButton @click="type === 'idle' ? startSpin() : ''"
        >Start</OrangeButton
      >
    </div>
    <div v-if="type === 'shuffle' && isSpinning" class="stop-button">
      <OrangeButton @click="stopSpin()">Stop</OrangeButton>
    </div>
    <div v-if="type === 'shuffle' && !isSpinning" class="reset-button">
      <OrangeButton
        @click="
          type = 'idle';
          resetSpin();
        "
        >Reset</OrangeButton
      >
    </div>
    <template v-if="page === 'home'">
      <div
        @click="
          page = 'motor';
          type = 'idle';
        "
        class="motorcycle-button"
      ></div>
      <div
        @click="
          page = 'kalung';
          type = 'idle';
        "
        class="necklace-button"
      ></div>
      <div
        @click="
          page = 'kasur';
          type = 'idle';
        "
        class="bed-button"
      ></div>
      <div
        @click="
          page = 'mobil';
          type = 'idle';
        "
        class="car-button"
      ></div>
    </template>
    <div
      class="home-button"
      @click="
        page = 'home';
        type = 'home';
        resetSpin();
      "
    ></div>
    <ConfettiVideo ref="confetti" />
    <audio ref="confettiAudio" :src="confettiSound" preload="auto"></audio>
  </div>
</template>
<style lang="scss" scoped>
.prize-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5em !important;
  font-weight: 800;
  color: #fff;
  z-index: 1; /* Ensure it stays above the background */
  font-family: "Montserrat";
  text-transform: uppercase;
  width: max-content;
}
.no-coupon-text {
  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5em !important;
  font-weight: 800;
  color: #fff;
  z-index: 1; /* Ensure it stays above the background */
  font-family: "Montserrat";
  text-transform: uppercase;
  width: max-content;
}
.subtitle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5em !important;
  font-weight: 800;
  color: #fff;
  z-index: 1; /* Ensure it stays above the background */
  font-family: "Montserrat";
  text-transform: uppercase;
  width: max-content;
}
.description-text {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5em !important;
  font-weight: 800;
  color: #fff;
  z-index: 1; /* Ensure it stays above the background */
  font-family: "Montserrat";
  text-transform: uppercase;
  width: max-content;
}
.home-button {
  width: 680px;
  height: 140px;
  position: absolute;
  top: 12%;
  left: 31%;
  cursor: pointer;
}
.bed-button {
  width: 220px;
  height: 130px;
  position: absolute;
  top: 80%;
  left: 61%;
  cursor: pointer;
}
.car-button {
  width: 340px;
  height: 230px;
  position: absolute;
  top: 70%;
  left: 41%;
  cursor: pointer;
}
.motorcycle-button {
  width: 195px;
  height: 180px;
  position: absolute;
  top: 74%;
  left: 29.5%;
  cursor: pointer;
}
.necklace-button {
  width: 80px;
  height: 120px;
  position: absolute;
  top: 82%;
  left: 32%;
  cursor: pointer;
}
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.prize-text {
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3em;
  font-weight: 900;
  color: #fff;
  z-index: 1; /* Ensure it stays above the background */
}
.reset-button {
  position: absolute;
  top: 63%;
  left: 70%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.stop-button {
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.start-button {
  position: absolute;
  top: 64%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.idle-button {
  top: 52%;
}
.container {
  background-color: var(--background-color);
  width: 1792px;
  height: 1024px;
  padding: 12px 48px;
  position: relative;
}
.floating-menu-button {
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 12px;
  z-index: 2;
}
.overlay {
  position: absolute;
  top: 42%;
  left: 50%;
  width: 942px;
  height: 93px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 5px solid #ffa200;
  border-radius: 999px;
  z-index: 1; /* Ensure it stays behind other content */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  color: #000;
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
