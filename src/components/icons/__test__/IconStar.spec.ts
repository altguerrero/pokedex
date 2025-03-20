// tests/unit/IconStar.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconStar from '@/components/icons/IconStar.vue'

describe('IconStar.vue', () => {
  it('should render the SVG element', () => {
    const wrapper = mount(IconStar)
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })

  it('should have viewBox "0 0 26 26" and correct classes', () => {
    const wrapper = mount(IconStar)
    const svg = wrapper.find('svg')
    expect(svg.attributes('viewBox')).toBe('0 0 26 26')
    expect(svg.classes()).toContain('w-full')
    expect(svg.classes()).toContain('h-full')
  })

  it('should bind $attrs correctly', () => {
    const wrapper = mount(IconStar, {
      attrs: { class: 'text-yellow-500', 'data-testid': 'icon-star' },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('class')).toContain('text-yellow-500')
    expect(svg.attributes('data-testid')).toBe('icon-star')
  })
})
