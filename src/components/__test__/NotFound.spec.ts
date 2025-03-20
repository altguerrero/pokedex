import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NotFound from '@/components/NotFound.vue'

describe('NotFound.vue', () => {
  it('renders title and message', () => {
    const wrapper = mount(NotFound)
    expect(wrapper.text()).toContain('Uh-oh!')
    expect(wrapper.text()).toContain('You look lost on your journey!')
  })

  it('emits reset when button is clicked', async () => {
    const wrapper = mount(NotFound)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('reset')).toBeTruthy()
  })
})
