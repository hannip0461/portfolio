const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function usePortfolioScroll() {
  const scrollToTarget = (event: MouseEvent, target: string) => {
    event.preventDefault()
    const element = document.querySelector(target)
    if (!element) return

    element.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
    window.history.pushState({}, '', target)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  return { scrollToTarget, scrollToTop }
}
