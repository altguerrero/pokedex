import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SearchInput from '@/components/SearchInput.vue'
import PokeballLoader from '@/components/PokeballLoader.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

describe('SearchInput.vue', () => {
  it('renders input with passed modelValue', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: 'Pikachu' },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('Pikachu')
  })

  it('emits update:modelValue when typing', async () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
    })

    const input = wrapper.find('input')
    await input.setValue('Charizard')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Charizard'])
  })

  it('shows PokeballLoader when isLoading is true', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '', isLoading: true },
    })

    expect(wrapper.findComponent(PokeballLoader).exists()).toBe(true)
  })

  it('renders IconSearch always', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
    })

    expect(wrapper.findComponent(IconSearch).exists()).toBe(true)
  })
})
