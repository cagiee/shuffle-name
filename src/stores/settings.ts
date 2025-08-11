import { defineStore } from "pinia";

export interface ISettings {
  title: string;
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
}

export const useSettingsStore = defineStore("settings", {
  state: (): ISettings => ({
    title: "Lucky Draw",
    primaryColor: "#4a90e2",
    textColor: "#4a90e2",
    backgroundColor: "#f5f5f5",
  }),
  getters: {
    getTitle: (state) => state.title,
    getPrimaryColor: (state) => state.primaryColor,
    getTextColor: (state) => state.textColor,
    getBackgroundColor: (state) => state.backgroundColor,
  },
  actions: {
    setTitle(title: string) {
      this.title = title;
    },
    setPrimaryColor(color: string) {
      this.primaryColor = color;
    },
    setTextColor(color: string) {
      this.textColor = color;
    },
    setBackgroundColor(color: string) {
      this.backgroundColor = color;
    },
  },
  persist: true,
});
