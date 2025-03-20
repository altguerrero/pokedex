import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconLoader from '@/components/icons/IconLoader.vue'

describe('IconLoader.vue', () => {
  it('should render the SVG element', () => {
    const wrapper = mount(IconLoader)
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })

  it('should have the correct viewBox and dimensions', () => {
    const wrapper = mount(IconLoader)
    const svg = wrapper.find('svg')
    expect(svg.attributes('viewBox')).toBe('0 0 106 106')
    expect(svg.attributes('width')).toBe('106')
    expect(svg.attributes('height')).toBe('106')
  })

  it('should pass $attrs correctly', () => {
    const wrapper = mount(IconLoader, {
      attrs: { class: 'pokeball-icon', 'data-testid': 'icon-loader' },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('class')).toContain('pokeball-icon')
    expect(svg.attributes('data-testid')).toBe('icon-loader')
  })
})
