import { ref } from "vue";
import { defineStore } from "pinia";

export const useUrlStore = defineStore("url", () => {
  const url = ref(import.meta.env.VITE_APP_API);
  const urlImg = ref(import.meta.env.VITE_APP_API_IMG);
  return {
    url,
    urlImg
  };
});