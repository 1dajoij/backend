import { defineStore } from 'pinia';

interface user{
    name: string | null;
    picUrl?: string;
    [key: string]: any;
}

export const useUserStore = defineStore('storeId', {
  state: (): user => {
    return {
        name: null,
    }
  },
  getters: {
    getIndex: (state): number => {
        if(state.name) {
            return 1
        } else {
            return 0
        }
    }
  }
});