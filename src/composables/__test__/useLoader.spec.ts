import { expect, describe, beforeEach, vi, afterEach, it } from 'vitest'
import { useLoader } from '@/composables/useLoader'

describe('useLoader composable', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should start with isVisible as false', () => {
    const { isVisible } = useLoader()
    expect(isVisible.value).toBe(false)
  })

  it('should set isVisible to true when show() is called', () => {
    const { isVisible, show } = useLoader()
    show()
    expect(isVisible.value).toBe(true)
  })

  it('should hide immediately after minTime is already elapsed', async () => {
    const { isVisible, show, hide } = useLoader(500)

    show()
    vi.advanceTimersByTime(600)
    const hidePromise = hide()

    vi.advanceTimersByTime(300)
    vi.runAllTicks()

    await hidePromise
    expect(isVisible.value).toBe(false)
  })
})
