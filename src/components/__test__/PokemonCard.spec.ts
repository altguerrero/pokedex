import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PokemonCard from '@/components/PokemonCard.vue'
import FavoriteButton from '@/components/FavoriteButton.vue'

Object.assign(navigator, {
  clipboard: { writeText: vi.fn() },
})

const toastMock = vi.fn()

vi.mock('@/components/ui/toast/use-toast', () => ({
  useToast: () => ({
    toast: toastMock,
  }),
}))

describe('PokemonCard.vue', () => {
  const props = {
    name: 'Bulbasaur',
    image: '/bulbasaur.png',
    weight: 69,
    height: 7,
    types: 'grass, poison',
    isFavorite: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders pokemon details correctly', () => {
    const wrapper = mount(PokemonCard, { props })
    expect(wrapper.text()).toContain('Name:')
    expect(wrapper.text()).toContain('Bulbasaur')
  })

  it('emits toggle event when FavoriteButton is clicked', async () => {
    const wrapper = mount(PokemonCard, { props })
    await wrapper.findComponent(FavoriteButton).vm.$emit('toggle')
    expect(wrapper.emitted('toggle')).toBeTruthy()
  })

  it('copies text to clipboard and shows toast on share', async () => {
    const wrapper = mount(PokemonCard, { props })
    await wrapper.find('button').trigger('click')

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'Name: Bulbasaur, Weight: 69, Height: 7, Types: grass - poison',
    )

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Copied!',
      }),
    )
  })
})
