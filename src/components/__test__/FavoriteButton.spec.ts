import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FavoriteButton from '@/components/FavoriteButton.vue'
import IconStar from '@/components/icons/IconStar.vue'

describe('FavoriteButton.vue', () => {
  it('renders with inactive styles when isActive is false', () => {
    const wrapper = mount(FavoriteButton, {
      props: { isActive: false },
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('text-content-disabled')
    expect(button.classes()).toContain('hover:text-content-disabled')
  })

  it('renders with active styles when isActive is true', () => {
    const wrapper = mount(FavoriteButton, {
      props: { isActive: true },
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('text-action-accent')
    expect(button.classes()).toContain('hover:text-action-accent')
  })

  it('emits toggle event when clicked', async () => {
    const wrapper = mount(FavoriteButton, {
      props: { isActive: false },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('toggle')
    expect(wrapper.emitted('toggle')?.length).toBe(1)
  })

  it('renders the IconStar inside', () => {
    const wrapper = mount(FavoriteButton, {
      props: { isActive: true },
    })
    expect(wrapper.findComponent(IconStar).exists()).toBe(true)
  })
})
