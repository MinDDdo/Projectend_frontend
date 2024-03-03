import { defineStore } from 'pinia'

interface Teacher {
  id: string;
}

export const teacherStore = defineStore('teacher', {
  state: (): Teacher => {
    return {
      id: '',
    }
  },

  persist: [
    {
      paths: ['id'],
      storage: localStorage,
    },
  ],
})