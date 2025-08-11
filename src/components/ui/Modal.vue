<script lang="ts" setup>
// Imports
import { watch } from "vue";

// External variables
const props = defineProps({
  title: {
    type: String,
    default: "Modal Title",
  },
  width: {
    type: String,
    default: "500px",
  },
  noPersist: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits();
const modelValue = defineModel("modelValue", {
  type: Boolean,
  default: false,
});

// Other variables

// Handle actions
const handleOpen = () => {
  setTimeout(() => {
    const elModalOverlay = document.getElementById(
      "elModalOverlay"
    ) as HTMLElement | null;
    const elModalContent = document.getElementById(
      "elModalContent"
    ) as HTMLElement | null;

    if (elModalOverlay) {
      elModalOverlay.style.opacity = "1";
    }
    if (elModalContent) {
      elModalContent.style.transform = "scale(1)";
      elModalContent.style.opacity = "1";
    }
  }, 100);
};

const handleClose = () => {
  const elModalOverlay = document.getElementById(
    "elModalOverlay"
  ) as HTMLElement | null;
  const elModalContent = document.getElementById(
    "elModalContent"
  ) as HTMLElement | null;
  if (elModalOverlay) {
    elModalOverlay.style.opacity = "0";
  }
  if (elModalContent) {
    elModalContent.style.transform = "scale(0.95)";
    elModalContent.style.opacity = "0";
  }
  setTimeout(() => {
    modelValue.value = false;
  }, 300);
};

watch(
  () => modelValue.value,
  (newValue) => {
    if (newValue) {
      handleOpen();
    }
  },
  { immediate: true }
);

defineExpose({
  handleOpen,
  handleClose,
});
</script>

<template>
  <div v-if="modelValue" class="modal">
    <div
      id="elModalOverlay"
      class="modal__overlay"
      @click="noPersist ? handleClose() : ''"
    ></div>
    <div
      id="elModalContent"
      class="modal__content"
      :style="`width: ${props.width}`"
    >
      <div class="modal__title">
        {{ props.title }}
      </div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: 0.3s ease;
    opacity: 0;
  }

  &__content {
    position: relative;
    background-color: white;
    padding: 36px;
    border-radius: 8px;
    z-index: 1;
    max-width: 90%;
    width: 100%;
    transition: 0.3s ease;
    opacity: 0;
    transform: scale(0.95);
  }

  &__title {
    font-size: 1.25em;
    margin-bottom: 16px;
    color: #111;
  }
}
</style>
