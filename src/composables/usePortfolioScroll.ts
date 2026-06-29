const scrollDurationMs = 900

let activeScrollAnimation = 0

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const easeInOutCubic = (progress: number) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2

export function usePortfolioScroll() {
  const animateScrollTo = (top: number) => {
    window.cancelAnimationFrame(activeScrollAnimation)

    if (prefersReducedMotion()) {
      window.scrollTo({ top, behavior: 'auto' })
      return
    }

    const startTop = window.scrollY
    const distance = top - startTop

    if (Math.abs(distance) < 2) {
      window.scrollTo({ top, behavior: 'auto' })
      return
    }

    const startedAt = window.performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / scrollDurationMs, 1)
      window.scrollTo(0, startTop + distance * easeInOutCubic(progress))

      if (progress < 1) {
        activeScrollAnimation = window.requestAnimationFrame(step)
      }
    }

    activeScrollAnimation = window.requestAnimationFrame(step)
  }

  const scrollToTarget = (event: MouseEvent, target: string) => {
    event.preventDefault()
    const element = document.querySelector(target)

    if (!element) return

    animateScrollTo(window.scrollY + element.getBoundingClientRect().top)
  }

  const scrollToTop = () => {
    animateScrollTo(0)
  }

  return {
    scrollToTarget,
    scrollToTop,
  }
}
