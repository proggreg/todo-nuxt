// import any store you want to interact with in tests
import { beforeAll, beforeEach, describe, test, vi, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mountSuspended } from 'nuxt-vitest/utils'
import { registerEndpoint } from 'vitest-environment-nuxt/utils'
import AppListItems from '@/components/app-list-items.vue'
import { useListsStore } from '@/stores/lists.ts'
// import AppListItems from '@/components/app-list-items.vue'

registerEndpoint('/test/', () => ({
  test: 'test-field'
}))
describe('today page', () => {
  const store = useListsStore() // uses the testing pinia!
  const today = new Date()
  beforeAll(() => {
    registerEndpoint('/api/today', () => ({
      test: 'test-field'
    }))
    registerEndpoint('/api/lists', () => ({
      test: 'test-field'
    }))
  })
  beforeEach(() => {
    store.$state.todaysTodos = [{
      name: 'test todo',
      done: false,
      dueDate: today
    }]

    // const wrapper = mount(AppListItems, {
    //   global: {
    //     plugins: [createTestingPinia({
    //       createSpy: vi.fn(),
    //       initialState: {
    //         todaysTodos: [{
    //           name: 'test',
    //           dueDate: today,
    //           done: false
    //         }]
    //       },
    //       stubActions: true
    //     })]
    //   }
    // })
  })

  test('should render todays todos', async () => {
    registerEndpoint('/api/today', () => ({
      test: 'test-field'
    }))
    // registerEndpoint('/api/lists/', () => ({
    //   test: 'test-field'
    // }))
    const component = await mountSuspended(AppListItems)
    const text = component.text()
    // console.log('text', text)
    // console.log('store', store.$state.todaysTodos)
    expect(text).toBeDefined()
    expect(text).toContain('test todo')
  })

//   TODO Slot Append slot and NuxtTime component not rendering
//   test('should render todays date', async () => {
//     registerEndpoint('/api/today', () => ({
//       test: 'test-field'
//     }))
//     // registerEndpoint('/api/lists/', () => ({
//     //   test: 'test-field'
//     // }))
//     const month = today.toLocaleString('default', { month: 'long' })
//     const component = await mountSuspended(AppListItems)
//     const text = component.text()
//     // console.log('text', text)
//     // console.log('store', store.$state.todaysTodos)
//     expect(text).toBeDefined()
//     // expect(text).toContain(month)
//     console.log(text, month)
//     console.log('html', component.html())
//   })
})
