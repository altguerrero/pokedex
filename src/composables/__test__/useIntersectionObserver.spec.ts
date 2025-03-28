import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

describe('useIntersectionObserver composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with target ref', () => {
    const { target } = useIntersectionObserver(() => {})
    expect(target.value).toBeNull()
  })

  it('should connect and disconnect observer', () => {
    const callback = vi.fn()
    const { target, connect, disconnect } = useIntersectionObserver(callback)

    target.value = document.createElement('div')

    connect()
    expect(target.value).toBeDefined()

    disconnect()
    expect(target.value).toBeDefined()
  })
})
