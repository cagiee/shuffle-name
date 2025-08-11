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

// Other variables
const elModal = ref<InstanceType<typeof Modal> | null>(null);

// Handle data

// Handle actions
const confirmDelete = (title: string) => {
  console.log("delete action");
  if (confirm("Are you sure you want to delete this winner?")) {
    deleteAction(title);
  }
};
const deleteAction = (title: string) => {
  items.removeSelectedItem(title);
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
    <table
      v-if="items.getSelectedItems.length > 0"
      border="1"
      class="can-select"
    >
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
        <tr v-for="(item, index) in items.getSelectedItems" :key="index">
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
</style>
