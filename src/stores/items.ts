import { defineStore } from "pinia";

export interface IItem {
  title: string;
  subtitle: string;
  description: string;
}

export const useItemsStore = defineStore("items", {
  state: (): { items: IItem[]; selectedItems: IItem[] } => ({
    items: [],
    selectedItems: [],
  }),
  getters: {
    getItems: (state) => state.items,
    getSelectedItems: (state) => state.selectedItems,
  },
  actions: {
    addItem(item: IItem) {
      this.items.push(item);
    },
    setItems(items: IItem[]) {
      this.items = items;
    },
    selectItemByNumber(title: string) {
      const item = this.items.find((item) => item.title === title);
      if (item && !this.selectedItems.includes(item)) {
        this.selectedItems.push(item);
      }
    },
    removeSelectedItem(title: string) {
      this.selectedItems = this.selectedItems.filter(
        (item) => item.title !== title
      );
    },
    clearSelectedItems() {
      this.selectedItems = [];
    },
  },
  persist: true,
});
