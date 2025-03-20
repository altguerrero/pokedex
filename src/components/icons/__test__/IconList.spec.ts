import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconList from '@/components/icons/IconList.vue'

describe('IconList.vue', () => {
  it('should render the SVG element', () => {
    const wrapper = mount(IconList)
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })

  it('should pass attributes via $attrs to svg', () => {
    const wrapper = mount(IconList, {
      attrs: {
        class: 'w-6 h-6 text-blue-500',
        'data-testid': 'icon-list',
      },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('class')).toContain('w-6')
    expect(svg.attributes('data-testid')).toBe('icon-list')
  })
})
