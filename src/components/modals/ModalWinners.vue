<script lang="ts" setup>
import Modal from "../ui/Modal.vue";
import Button from "../ui/Button.vue";
import { ref } from "vue";
import { useItemsStore } from "../../stores/items";

// External variables
const modelValue = defineModel("modelValue", {
  type: Boolean,
  default: false,
});
const items = useItemsStore();
const page = ref("kasur");

// Other variables
const elModal = ref<InstanceType<typeof Modal> | null>(null);

// Handle data

// Handle actions
const confirmDelete = (title: string) => {
  if (confirm("Are you sure you want to delete this winner?")) {
    deleteAction(title);
  }
};
const deleteAction = (title: string) => {
  items.removeSelectedItem(title);
};
const filteredItems = () => {
  return items.getSelectedItems.filter((item) => item.section === page.value);
};
const itemsCounter = (section: string) => {
  return items.getSelectedItems.filter((item) => item.section === section)
    .length;
};
</script>

<template>
  <Modal
    ref="elModal"
    v-model="modelValue"
    title="Winners"
    no-persist
    width="1000px"
  >
    <div class="tab">
      <div :class="{ active: page === 'kasur' }" @click="page = 'kasur'">
        Kasur 【 {{ itemsCounter("kasur") }} 】
      </div>
      <div :class="{ active: page === 'kalung' }" @click="page = 'kalung'">
        Kalung 【 {{ itemsCounter("kalung") }} 】
      </div>
      <div :class="{ active: page === 'motor' }" @click="page = 'motor'">
        Motor 【 {{ itemsCounter("motor") }} 】
      </div>
      <div :class="{ active: page === 'mobil' }" @click="page = 'mobil'">
        Mobil 【 {{ itemsCounter("mobil") }} 】
      </div>
    </div>
    <table v-if="filteredItems().length > 0" border="1" class="can-select">
      <thead>
        <tr>
          <td>No</td>
          <td>Number</td>
          <td>Name</td>
          <td>Description</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredItems()" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.subtitle }}</td>
          <td>{{ item.description }}</td>
          <td>
            <Button class="btn-error" @click="confirmDelete(item.title)">
              Delete
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
    <span v-else>Data is empty</span>
  </Modal>
</template>

<style lang="scss" scoped>
label {
  font-size: 0.8em;
  display: block;
}
table {
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 0.5em;
    text-align: left;
    border: 1px solid #ddd;
  }
  th {
    background-color: #f2f2f2;
  }
}
.tab {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;

  & > div {
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-bottom: 3px solid transparent;

    &.active {
      border-bottom: 3px solid #007bff;
    }
  }
}
</style>
