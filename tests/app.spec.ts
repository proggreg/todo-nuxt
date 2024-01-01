import { it, expect } from 'vitest'
import { mountSuspended } from 'vitest-environment-nuxt/utils'
import App from '~/components/test.vue'

it('can mount components within nuxt suspense', async () => {
  const component = await mountSuspended(App)

  expect(component.html()).toMatchInlineSnapshot(`
      "<h1>Test</h1>"`)
})
