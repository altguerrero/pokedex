import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PokeballLoader from '@/components/PokeballLoader.vue'
import IconLoader from '@/components/icons/IconLoader.vue'

describe('PokeballLoader.vue', () => {
  it('renders IconLoader component', () => {
    const wrapper = mount(PokeballLoader)
    expect(wrapper.findComponent(IconLoader).exists()).toBe(true)
  })

  it('applies default scale when no size prop is passed', () => {
    const wrapper = mount(PokeballLoader)
    const innerDiv = wrapper.find('[data-testid="scale-wrapper"]')
    expect(innerDiv.classes()).toContain('scale-100')
  })

  it('applies small scale when size prop is "small"', () => {
    const wrapper = mount(PokeballLoader, {
      props: { size: 'small' },
    })
    const innerDiv = wrapper.find('[data-testid="scale-wrapper"]')
    expect(innerDiv.classes()).toContain('scale-[0.2]')
  })

  it('renders blinking dot inside', () => {
    const wrapper = mount(PokeballLoader)
    const dot = wrapper.find('span')
    expect(dot.exists()).toBe(true)
    expect(dot.classes()).toContain('animate-blink')
  })
})
