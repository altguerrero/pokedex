import { ref } from 'vue'

export function useLoader(minTime = 500) {
  const isVisible = ref(false)

  let showTime = 0

  const show = () => {
    showTime = Date.now()
    isVisible.value = true
  }

  const hide = async () => {
    const elapsed = Date.now() - showTime
    const remaining = minTime - elapsed

    if (remaining > 0) {
      await new Promise((resolve) => setTimeout(resolve, remaining))
    }

    await new Promise((resolve) => setTimeout(resolve, 300))
    isVisible.value = false
  }

  return { isVisible, show, hide }
}
