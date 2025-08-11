<script lang="ts" setup>
import Modal from "../ui/Modal.vue";
import Button from "../ui/Button.vue";
import { ref, watch } from "vue";
import { useItemsStore } from "../../stores/items";
import * as XLSX from "xlsx"; // ✅ Import here

// External variables
const modelValue = defineModel("modelValue", {
  type: Boolean,
  default: false,
});
const items = useItemsStore();

// Other variables
const form = ref<any>({
  dataset: [],
  type: "import", // Default to import
  title: "",
  subtitle: "",
  description: "",
});
const elModal = ref<InstanceType<typeof Modal> | null>(null);
const fileName = ref("No file selected");
const elFileInput = ref<any>();

// Handle data
const handleData = () => {
  // Here you would typically fetch the dataset from a store or API
  // For now, we will just set an empty array
  form.value.dataset = items.getItems;
};

// Handle actions
const saveSettings = async () => {
  items.setItems(form.value.dataset);
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
watch(
  () => form.value.type,
  (newValue) => {
    if (newValue === "import") {
      fileName.value = "No file selected";
    } else {
      form.value.title = "";
      form.value.subtitle = "";
      form.value.description = "";
    }
  }
);
const excelToJson = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      if (!e.target || !e.target.result) {
        reject(new Error("File reading failed"));
        return;
      }
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Take the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: ["title", "subtitle", "description"], // enforce keys
          range: 1, // skip first row if it’s a header
        });

        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};
const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    fileName.value = target.files[0].name;
    const data = await excelToJson(target.files[0]);
    form.value.dataset = data.map((item: any) => ({
      title: item.title || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
    }));
  } else {
    fileName.value = "No file selected";
  }
};
watch(
  () => [form.value.title, form.value.subtitle, form.value.description],
  (newValue) => {
    const titleArray = form.value.title.split(";");
    const subtitleArray = form.value.subtitle.split(";");
    const descriptionArray = form.value.description.split(";");

    const longestLength = Math.max(
      titleArray.length,
      subtitleArray.length,
      descriptionArray.length
    );

    form.value.dataset = Array(longestLength).fill({});
    for (let i = 0; i < longestLength; i++) {
      form.value.dataset[i] = {
        title: titleArray[i] || "",
        subtitle: subtitleArray[i] || "",
        description: descriptionArray[i] || "",
      };
    }
  }
);
</script>

<template>
  <Modal ref="elModal" v-model="modelValue" title="Dataset" width="1000px">
    <div class="modal-dataset">
      <div>
        <span class="block mb-50">Method</span>
        <div class="tabs mb-1">
          <div class="tabs__items" @click="() => (form.type = 'import')">
            <div class="radio">
              <div v-if="form.type === 'import'" class="radio__dot"></div>
            </div>
            Import
          </div>
          <div class="tabs__items" @click="() => (form.type = 'manual')">
            <div class="radio">
              <div v-if="form.type === 'manual'" class="radio__dot"></div>
            </div>
            Manual
          </div>
        </div>
        <!-- <div class="alert mb-1">
          <div class="flex">
            <Warning />
            <span>Warning!</span>
          </div>
          <p>Items already exists. Typing will overwrite it.</p>
        </div> -->
        <template v-if="form.type === 'import'">
          <span class="block mb-50">File</span>
          <span class="block mb-50" style="font-size: 0.8em"
            >Allowed file extension .csv, .xlsx, .xls</span
          >
          <div class="">
            <div class="btn btn-primary w-full">
              <input
                id="fileInput"
                ref="elFileInput"
                type="file"
                accept=".csv, .xlsx, .xls"
                @change="handleFileChange"
                class="w-full"
              />
              <!-- <div class="flex">
                <Button @click="browseFile">Browse</Button>
                <span style="font-size: 0.9em; margin-left: 0.75rem">{{
                  fileName
                }}</span>
              </div> -->
            </div>
          </div>
        </template>
        <template v-else>
          <span class="block mb-50">Title</span>
          <span class="block mb-50" style="font-size: 0.8em"
            >Use semicolon(;) to separate each data
          </span>
          <input
            type="text"
            v-model="form.title"
            class="w-full mb-1 form__input"
          />
          <span class="block mb-50">Subtitle</span>
          <span class="block mb-50" style="font-size: 0.8em"
            >Use semicolon(;) to separate each data
          </span>
          <input
            type="text"
            v-model="form.subtitle"
            class="w-full mb-1 form__input"
          />
          <span class="block mb-50">Description</span>
          <span class="block mb-50" style="font-size: 0.8em"
            >Use semicolon(;) to separate each data
          </span>
          <input
            type="text"
            v-model="form.description"
            class="w-full mb-1 form__input"
          />
        </template>
      </div>
      <div>
        <span class="block mb-1">Preview data</span>
        <div class="" style="height: 400px; overflow-y: auto">
          <table>
            <thead>
              <tr>
                <th width="10px">No</th>
                <th>Data 1</th>
                <th>Data 2</th>
                <th>Data 3</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in form.dataset">
                <td>{{ index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.subtitle }}</td>
                <td>{{ item.description }}</td>
              </tr>
              <tr v-if="form.dataset.length === 0">
                <td colspan="99" align="center">No items found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="modal-dataset__action">
      <Button variant="outlined" @click="handleClose()">Close</Button>
      <Button variant="primary" @click="handleSubmit()">Save</Button>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.modal-dataset {
  display: flex;
  gap: 24px;
  width: 100%;

  & > div:nth-child(1) {
    width: 100%;
    max-width: 400px;
  }

  & > div:nth-child(2) {
    width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    td,
    th {
      border: 1px solid #ccc;
      padding: 8px 12px;
      font-size: 0.9em;
    }
  }

  &__action {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 24px;
  }
}

.tabs {
  display: flex;
  gap: 8px;

  &__items {
    padding: 12px 18px 12px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.alert {
  background-color: #fff3cd;
  color: #856404;
  padding: 18px;
  border: 1px solid #ffeeba;

  p {
    font-size: 0.8em;
    margin: 8px 0 0;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 12px;
  }
}
</style>
