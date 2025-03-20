import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from './favorites'
import { nextTick } from 'vue'

describe('useFavoritesStore', () => {
  const mockPokemon = { id: 1, name: 'Bulbasaur', favorite: false }

  beforeEach(() => {
    setActivePinia(createPinia())

    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    })

    vi.clearAllMocks()
  })

  it('should initialize with empty favorites', () => {
    const store = useFavoritesStore()
    expect(store.favorites).toEqual([])
  })

  it('should sync favorites to localStorage', async () => {
    const store = useFavoritesStore()
    store.toggleFavorite(mockPokemon)
    await nextTick()

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([{ ...mockPokemon, favorite: true }]),
    )
  })

  it('should add a pokemon to favorites', () => {
    const store = useFavoritesStore()
    store.toggleFavorite(mockPokemon)
    expect(store.favorites).toHaveLength(1)
  })

  it('should remove a pokemon from favorites if already added', () => {
    const store = useFavoritesStore()
    store.toggleFavorite(mockPokemon)
    store.toggleFavorite(mockPokemon)
    expect(store.favorites).toHaveLength(0)
  })

  it('should return true if pokemon is favorite', () => {
    const store = useFavoritesStore()
    store.toggleFavorite(mockPokemon)
    expect(store.isFavorite(mockPokemon.id)).toBe(true)
  })

  it('should return false if pokemon is not favorite', () => {
    const store = useFavoritesStore()
    expect(store.isFavorite(mockPokemon.id)).toBe(false)
  })

  it('should load favorites from localStorage', () => {
    localStorage.getItem = vi
      .fn()
      .mockReturnValue(JSON.stringify([{ ...mockPokemon, favorite: true }]))
    const store = useFavoritesStore()
    expect(store.favorites).toHaveLength(1)
    expect(store.favorites[0]).toEqual({ ...mockPokemon, favorite: true })
  })
})
