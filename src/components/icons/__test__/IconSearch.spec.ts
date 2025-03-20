import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconSearch from '@/components/icons/IconSearch.vue'

describe('IconSearch.vue', () => {
  it('should render the SVG element', () => {
    const wrapper = mount(IconSearch)
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })

  it('should have the correct viewBox and dimensions', () => {
    const wrapper = mount(IconSearch)
    const svg = wrapper.find('svg')
    expect(svg.attributes('viewBox')).toBe('0 0 18 18')
  })

  it('should pass $attrs correctly', () => {
    const wrapper = mount(IconSearch, {
      attrs: { class: 'icon-search', 'data-testid': 'icon-search' },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('class')).toContain('icon-search')
    expect(svg.attributes('data-testid')).toBe('icon-search')
  })
})
