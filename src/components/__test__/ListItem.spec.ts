import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ListItem from '@/components/ListItem.vue'
import FavoriteButton from '@/components/FavoriteButton.vue'

describe('ListItem.vue', () => {
  const props = {
    name: 'Bulbasaur',
    isFavorite: false,
  }

  it('renders pokemon name correctly', () => {
    const wrapper = mount(ListItem, {
      props,
    })

    expect(wrapper.text()).toContain('Bulbasaur')
  })

  it('emits "open" event when clicking the item', async () => {
    const wrapper = mount(ListItem, {
      props,
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('open')).toBeTruthy()
  })

  it('emits "toggle" event when clicking FavoriteButton', async () => {
    const wrapper = mount(ListItem, {
      props,
    })

    const favoriteButton = wrapper.findComponent(FavoriteButton)
    await favoriteButton.vm.$emit('toggle')

    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('does NOT emit "open" when clicking FavoriteButton', async () => {
    const wrapper = mount(ListItem, {
      props,
    })

    const favoriteButton = wrapper.findComponent({ name: 'FavoriteButton' })
    await favoriteButton.trigger('click')

    expect(wrapper.emitted('toggle')).toBeTruthy()

    expect(wrapper.emitted('open')).toBeFalsy()
  })
})
