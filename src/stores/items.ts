import { defineStore } from "pinia";

export interface IItem {
  title: string;
  subtitle: string;
  description: string;
}

export interface ISelectableItem extends IItem {
  section: string;
}

export const useItemsStore = defineStore("items", {
  state: (): { items: IItem[]; selectedItems: ISelectableItem[] } => ({
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
    removeItemBySubtitle(subtitle: string) {
      console.log(`Removing item with subtitle: ${subtitle}`);
      this.items = this.items.filter((item) => item.subtitle !== subtitle);
    },
    selectItemByNumber(title: string, section: string) {
      const item = this.items.find((item) => item.title === title);
      if (item && !this.selectedItems.some((i) => i.title === title)) {
        const mappedItem: ISelectableItem = {
          ...item,
          section,
        };
        this.selectedItems.push(mappedItem);
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
