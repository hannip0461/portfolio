<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, shallowRef, useTemplateRef } from 'vue'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from '@lucide/vue'
import type { FeaturedProject, ProjectScreenshot } from '../../data/portfolioContent'

const props = defineProps<{
  project: FeaturedProject
}>()

const emit = defineEmits<{
  close: []
}>()

const dialog = useTemplateRef<HTMLElement>('dialog')
const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')
const lightboxCloseButton = useTemplateRef<HTMLButtonElement>('lightboxCloseButton')
const screenshotStrip = useTemplateRef<HTMLElement>('screenshotStrip')
const activeScreenshotIndex = shallowRef(0)
const selectedScreenshotIndex = shallowRef<number | null>(null)
let returnFocus: HTMLElement | null = null

const isExternalLink = (link: string) => link.startsWith('http')
const selectedScreenshot = computed(() => {
  if (selectedScreenshotIndex.value === null) return null
  return props.project.screenshots[selectedScreenshotIndex.value] ?? null
})
const resourceLinks = computed(() => {
  if (props.project.resources?.length) return props.project.resources
  if (props.project.link) return [{ label: props.project.linkLabel ?? '프로젝트 링크', url: props.project.link }]
  return []
})

const openScreenshot = async (_shot: ProjectScreenshot, index: number) => {
  if (!props.project.screenshots[index]?.src) return
  selectedScreenshotIndex.value = index
  await nextTick()
  lightboxCloseButton.value?.focus()
}

const closeScreenshot = () => {
  selectedScreenshotIndex.value = null
  nextTick(() => screenshotStrip.value?.children[activeScreenshotIndex.value]?.querySelector('button')?.focus())
}

const moveLightbox = (direction: -1 | 1) => {
  if (selectedScreenshotIndex.value === null) return
  selectedScreenshotIndex.value = Math.min(
    props.project.screenshots.length - 1,
    Math.max(0, selectedScreenshotIndex.value + direction),
  )
}

const scrollScreenshots = (direction: -1 | 1) => {
  const strip = screenshotStrip.value
  if (!strip) return

  activeScreenshotIndex.value = Math.min(
    props.project.screenshots.length - 1,
    Math.max(0, activeScreenshotIndex.value + direction),
  )
  const target = strip.children[activeScreenshotIndex.value] as HTMLElement | undefined
  target?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
}

const syncScreenshotIndex = () => {
  const strip = screenshotStrip.value
  if (!strip?.children.length) return
  const children = Array.from(strip.children) as HTMLElement[]
  activeScreenshotIndex.value = children.reduce((nearest, item, index) => {
    const currentDistance = Math.abs(children[nearest].offsetLeft - strip.scrollLeft)
    const nextDistance = Math.abs(item.offsetLeft - strip.scrollLeft)
    return nextDistance < currentDistance ? index : nearest
  }, 0)
}

const trapFocus = (event: KeyboardEvent) => {
  const scope = selectedScreenshot.value
    ? document.querySelector<HTMLElement>('.screenshot-lightbox figure')
    : dialog.value
  if (!scope) return

  const focusable = Array.from(
    scope.querySelectorAll<HTMLElement>(
      'a[href], button:not(:disabled), summary, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((item) => !item.hasAttribute('hidden'))
  if (!focusable.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    if (selectedScreenshot.value) closeScreenshot()
    else emit('close')
    return
  }
  if (event.key === 'Tab') trapFocus(event)
  if (selectedScreenshot.value && event.key === 'ArrowLeft') moveLightbox(-1)
  if (selectedScreenshot.value && event.key === 'ArrowRight') moveLightbox(1)
}

onMounted(async () => {
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  document.addEventListener('keydown', onKeyDown)
  document.body.style.overflow = 'hidden'
  await nextTick()
  closeButton.value?.focus()
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
  document.body.style.overflow = ''
  returnFocus?.focus()
})
</script>

<template>
  <div class="project-modal-backdrop" @click.self="emit('close')">
    <article
      ref="dialog"
      class="project-modal"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`project-modal-title-${project.id}`"
    >
      <header class="project-modal-header">
        <div>
          <p class="section-kicker">프로젝트 상세 기록</p>
          <h2 :id="`project-modal-title-${project.id}`">{{ project.title }}</h2>
          <p v-if="project.id === 'neo'" class="project-modal-note">
            NEO는 직접 정의한 자체 규칙 추론 엔진입니다.
          </p>
        </div>
        <button ref="closeButton" class="project-modal-close" type="button" aria-label="닫기" @click="emit('close')">
          <X :size="20" aria-hidden="true" />
        </button>
      </header>

      <section class="project-modal-overview" aria-label="프로젝트 요약">
        <p>{{ project.proof.problem }}</p>
        <dl>
          <div>
            <dt>기간</dt>
            <dd>{{ project.period }}</dd>
          </div>
          <div>
            <dt>담당</dt>
            <dd>{{ project.role }}</dd>
          </div>
          <div>
            <dt>핵심 역량</dt>
            <dd>{{ project.badge }}</dd>
          </div>
          <div>
            <dt>기술</dt>
            <dd>{{ project.stack.join(' · ') }}</dd>
          </div>
        </dl>
      </section>

      <section class="project-modal-screenshots" aria-label="프로젝트 화면">
        <header>
          <h3>프로젝트 화면</h3>
          <div v-if="project.screenshots.length > 1" class="project-screenshot-controls">
            <span>{{ activeScreenshotIndex + 1 }} / {{ project.screenshots.length }}</span>
            <button
              type="button"
              aria-label="이전 화면"
              :disabled="activeScreenshotIndex === 0"
              @click="scrollScreenshots(-1)"
            >
              <ArrowLeft :size="17" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="다음 화면"
              :disabled="activeScreenshotIndex === project.screenshots.length - 1"
              @click="scrollScreenshots(1)"
            >
              <ArrowRight :size="17" aria-hidden="true" />
            </button>
          </div>
        </header>
        <div ref="screenshotStrip" class="project-screenshot-strip" @scroll.passive="syncScreenshotIndex">
          <div v-for="(shot, index) in project.screenshots" :key="shot.caption" class="project-screenshot-item">
            <button
              class="project-screenshot"
              type="button"
              :disabled="!shot.src"
              :aria-label="`${shot.caption} 확대 보기`"
              @click="openScreenshot(shot, index)"
            >
              <img v-if="shot.src" :src="shot.src" :alt="shot.alt" loading="lazy" decoding="async" />
              <div v-else class="project-screenshot-empty" aria-hidden="true"></div>
            </button>
            <small>{{ shot.caption }}</small>
          </div>
        </div>
      </section>

      <div class="project-modal-body">
        <section>
          <h3>구조</h3>
          <p class="case-flow">{{ project.caseStudy.flow }}</p>
          <ol class="architecture-steps">
            <li v-for="item in project.caseStudy.architecture" :key="item">{{ item }}</li>
          </ol>
        </section>
        <section v-if="project.caseStudy.problem.length">
          <h3>문제 상황</h3>
          <ul>
            <li v-for="item in project.caseStudy.problem" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section>
          <h3>구현 과정</h3>
          <ul>
            <li v-for="item in project.caseStudy.approach" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section>
          <h3>검증</h3>
          <p>{{ project.caseStudy.verification }}</p>
        </section>
        <section>
          <h3>결과</h3>
          <ul>
            <li v-for="item in project.caseStudy.result" :key="item">{{ item }}</li>
          </ul>
        </section>
      </div>

      <details v-if="project.terms?.length" class="project-term-list">
        <summary>참고 용어</summary>
        <dl>
          <div v-for="item in project.terms" :key="item.term">
            <dt>{{ item.term }}</dt>
            <dd>{{ item.description }}</dd>
          </div>
        </dl>
      </details>

      <footer v-if="resourceLinks.length" class="project-modal-actions">
        <a
          v-for="resource in resourceLinks"
          :key="resource.url"
          :href="resource.url"
          :target="isExternalLink(resource.url) ? '_blank' : undefined"
          :rel="isExternalLink(resource.url) ? 'noreferrer' : undefined"
        >
          {{ resource.label }}
          <ArrowUpRight :size="17" aria-hidden="true" />
        </a>
      </footer>

      <div
        v-if="selectedScreenshot"
        class="screenshot-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="프로젝트 화면 확대"
        @click="closeScreenshot"
      >
        <figure @click.stop>
          <div class="screenshot-lightbox-toolbar">
            <span>{{ selectedScreenshotIndex! + 1 }} / {{ project.screenshots.length }}</span>
            <button ref="lightboxCloseButton" type="button" aria-label="이미지 닫기" @click="closeScreenshot">
              <X :size="20" aria-hidden="true" />
            </button>
          </div>
          <div class="screenshot-lightbox-stage">
            <button
              type="button"
              aria-label="이전 이미지"
              :disabled="selectedScreenshotIndex === 0"
              @click="moveLightbox(-1)"
            >
              <ArrowLeft :size="20" aria-hidden="true" />
            </button>
            <img v-if="selectedScreenshot.src" :src="selectedScreenshot.src" :alt="selectedScreenshot.alt" />
            <button
              type="button"
              aria-label="다음 이미지"
              :disabled="selectedScreenshotIndex === project.screenshots.length - 1"
              @click="moveLightbox(1)"
            >
              <ArrowRight :size="20" aria-hidden="true" />
            </button>
          </div>
          <figcaption>{{ selectedScreenshot.caption }}</figcaption>
        </figure>
      </div>
    </article>
  </div>
</template>
