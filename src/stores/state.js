import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', () => {
  const user = ref({})
  const balans = ref({})
  const expenses = ref([])
  const departmentExpenses = ref([])
  const categoryExpenses = ref([])
  const invest = ref([])
  const oneInvest = ref([])

  return { user, balans, expenses, departmentExpenses, categoryExpenses, invest, oneInvest }
})
