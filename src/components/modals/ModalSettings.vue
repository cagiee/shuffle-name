<script lang="ts" setup>
import Modal from "../ui/Modal.vue";
import Button from "../ui/Button.vue";
import { ref, watch } from "vue";
import { useSettingsStore } from "../../stores/settings";

// External variables
const modelValue = defineModel("modelValue", {
  type: Boolean,
  default: false,
});
const settings = useSettingsStore();

// Other variables
const form = ref({
  title: settings.title,
  primaryColor: settings.primaryColor,
  textColor: settings.textColor,
  backgroundColor: settings.backgroundColor,
});
const elModal = ref<InstanceType<typeof Modal> | null>(null);

// Handle data
const handleData = () => {
  form.value.title = settings.title;
  form.value.primaryColor = settings.primaryColor;
  form.value.textColor = settings.textColor;
  form.value.backgroundColor = settings.backgroundColor;
};

// Handle actions
const saveSettings = () => {
  settings.setTitle(form.value.title);
  settings.setPrimaryColor(form.value.primaryColor);
  settings.setTextColor(form.value.textColor);
  settings.setBackgroundColor(form.value.backgroundColor);
};
const handleClose = () => {
  elModal.value?.handleClose();
};
const handleSubmit = async () => {
  await saveSettings();
  elModal.value?.handleClose();
};

// Watchers
watch(
  () => modelValue.value,
  (newValue) => {
    if (newValue) {
      handleData();
    }
  }
);
</script>

<template>
  <Modal ref="elModal" v-model="modelValue" title="Settings">
    <div class="modal-settings">
      <div class="form">
        <label for="title" class="mb-50">Title</label>
        <input
          id="title"
          type="text"
          class="form__input mb-1"
          v-model="form.title"
        />
      </div>
      <div class="modal-settings__section">
        <label for="textColor">Text Color</label>
        <input id="textColor" type="color" v-model="form.textColor" />
      </div>
      <!-- <div class="modal-settings__section">
        <label for="textColor">Secondary Color</label>
        <input id="textColor" type="color" v-model="form.textColor" />
      </div> -->
      <div class="modal-settings__section">
        <label for="backgroundColor">Background Color</label>
        <input
          id="backgroundColor"
          type="color"
          v-model="form.backgroundColor"
        />
      </div>
    </div>
    <div class="modal-settings__action">
      <Button variant="outlined" @click="handleClose()">Close</Button>
      <Button variant="primary" @click="handleSubmit()">Save</Button>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
label {
  font-size: 0.8em;
  display: block;
}
.modal-settings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;

  &__section {
    input {
      width: 100%;
      height: 75px;
      box-sizing: border-box;
      margin-top: 6px;
    }
  }

  &__action {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 24px;
  }

  & > div:nth-child(1) {
    grid-column: 1 / span 2; /* Make it span both columns */
  }
}
</style>
