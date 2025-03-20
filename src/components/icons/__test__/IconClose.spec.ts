import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconClose from '@/components/icons/IconClose.vue'

describe('IconClose.vue', () => {
  it('should render the SVG element', () => {
    const wrapper = mount(IconClose)
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })

  it('should forward custom attributes to svg', () => {
    const wrapper = mount(IconClose, {
      attrs: {
        class: 'text-red-500',
        'data-testid': 'icon-close',
      },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('class')).toContain('text-red-500')
    expect(svg.attributes('data-testid')).toBe('icon-close')
  })
})
