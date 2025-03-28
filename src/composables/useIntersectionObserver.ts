import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(callback: () => void) {
  const target = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    if (observer) observer.disconnect()

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback()
        }
      },
      { threshold: 1 },
    )

    if (target.value) observer.observe(target.value)
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  const disconnect = () => {
    if (observer) observer.disconnect()
  }

  const connect = () => {
    if (target.value) observer?.observe(target.value)
  }

  return {
    target,
    disconnect,
    connect,
  }
}
