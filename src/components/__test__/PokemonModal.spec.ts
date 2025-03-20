import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import PokemonModal from '@/components/PokemonModal.vue'
import PokemonCard from '@/components/PokemonCard.vue'

vi.mock('@/stores/favorites', () => ({
  useFavoritesStore: () => ({
    isFavorite: () => false,
  }),
}))

const pokemon = {
  id: 1,
  name: 'Bulbasaur',
  image: '',
  weight: 69,
  height: 7,
  types: 'grass, poison',
  favorite: false,
}

const mountModal = () =>
  mount(PokemonModal, {
    props: { open: true, pokemon },
    global: {
      stubs: {
        teleport: true,
        Dialog: {
          template: '<div><slot /></div>',
        },
        DialogContent: {
          template: `
            <div class="dialog-content">
              <slot />
            </div>
          `,
        },
      },
    },
  })

describe('PokemonModal.vue', () => {
  it('renders PokemonCard when open is true', () => {
    const wrapper = mountModal()
    const dialogContent = wrapper.find('.dialog-content')
    expect(dialogContent.findComponent(PokemonCard).exists()).toBe(true)
  })

  it('emits close when clicking close icon', async () => {
    const wrapper = mountModal()
    const dialogContent = wrapper.find('.dialog-content')
    const closeButton = dialogContent.find('[data-testid="close-icon"]')
    expect(closeButton.exists()).toBe(true)
    await closeButton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('emits toggle when PokemonCard emits toggle', async () => {
    const wrapper = mountModal()
    const dialogContent = wrapper.find('.dialog-content')
    const card = dialogContent.findComponent(PokemonCard)
    await card.vm.$emit('toggle')
    expect(wrapper.emitted()).toHaveProperty('toggle')
  })
})
