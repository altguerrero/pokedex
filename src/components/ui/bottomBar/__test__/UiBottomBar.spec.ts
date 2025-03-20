import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { BottomBar } from '@/components/ui/bottomBar'

describe('UiBottomBar.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BottomBar)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(BottomBar, {
      slots: {
        default: '<div class="slot-content">Hello</div>',
      },
    })

    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.find('.slot-content').text()).toBe('Hello')
  })

  it('applies shadow-bottom-bar class', () => {
    const wrapper = mount(BottomBar)
    expect(wrapper.classes()).toContain('shadow-bottom-bar')
  })
})
