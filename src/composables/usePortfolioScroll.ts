const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const MIN_DURATION = 260
const MAX_DURATION = 560

// 네이티브 smooth는 지속 시간을 못 정해서 긴 이동이 블러로 지나간다.
// 거리에 따라 260~560ms로 묶어 짧은 이동은 자연스럽고 긴 이동은 늘어지지 않게 한다.
const durationFor = (distance: number) => {
  const ratio = Math.min(Math.abs(distance) / 2400, 1)
  return MIN_DURATION + (MAX_DURATION - MIN_DURATION) * ratio
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

let activeTween = 0

const cancelTween = () => {
  if (activeTween) {
    cancelAnimationFrame(activeTween)
    activeTween = 0
  }
}

const tweenTo = (to: number) => {
  cancelTween()

  const from = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const target = Math.max(0, Math.min(to, maxScroll))
  const distance = target - from

  if (prefersReducedMotion() || Math.abs(distance) < 2) {
    window.scrollTo(0, target)
    return
  }

  const duration = durationFor(distance)
  const start = performance.now()

  // 이동 중에 사용자가 직접 스크롤하면 즉시 손을 뗀다. 스크롤 하이재킹 방지.
  const release = () => {
    cancelTween()
    removeListeners()
  }
  const removeListeners = () => {
    window.removeEventListener('wheel', release)
    window.removeEventListener('touchstart', release)
    window.removeEventListener('keydown', onKey)
  }
  const onKey = (event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
      release()
    }
  }

  window.addEventListener('wheel', release, { passive: true })
  window.addEventListener('touchstart', release, { passive: true })
  window.addEventListener('keydown', onKey)

  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1)
    window.scrollTo(0, from + distance * easeOutCubic(progress))

    if (progress < 1) {
      activeTween = requestAnimationFrame(step)
      return
    }

    activeTween = 0
    removeListeners()
  }

  activeTween = requestAnimationFrame(step)
}

export function usePortfolioScroll() {
  const scrollToTarget = (event: MouseEvent, target: string) => {
    event.preventDefault()
    const element = document.querySelector(target)
    if (!element) return

    // scroll-margin-top이 반응형으로 120px과 16px을 오가므로 CSS 값을 그대로 읽는다
    const offset = parseFloat(getComputedStyle(element).scrollMarginTop) || 0
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    tweenTo(top)
    window.history.pushState({}, '', target)
  }

  const scrollToTop = () => tweenTo(0)

  return { scrollToTarget, scrollToTop }
}
