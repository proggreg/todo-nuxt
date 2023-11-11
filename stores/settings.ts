export const useSettingsStore = defineStore('settings', () => {
  const darkMode = ref(false)

  const statuses = ref([
    {
      name: 'Open',
      color: '#87909e'
    }, {
      name: 'In Progress',
      color: '#ee5e99'
    }, {
      name: 'Closed',
      color: '#008844'
    }])

  return { darkMode, statuses }
})
