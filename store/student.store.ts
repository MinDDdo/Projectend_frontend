import { defineStore } from 'pinia'

interface Student {
  id: string;
  classroomId: string;
}

export const studentStore = defineStore('student', {
  state: (): Student => {
    return {
      id: '',
      classroomId: ''
    }
  },

  persist: [
    {
      paths: ['id', 'classroomId'],
      storage: localStorage,
    },
  ],
})