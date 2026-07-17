<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, shallowRef, useTemplateRef, type Component } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Database,
  GitBranch,
  MonitorCog,
  RadioTower,
  Route,
  X,
  ZoomIn,
} from '@lucide/vue'
import type { FeaturedProject, ProjectArchitectureKind } from '../../data/portfolioContent'

const props = defineProps<{
  project: FeaturedProject
}>()

const emit = defineEmits<{
  close: []
}>()

const dialog = useTemplateRef<HTMLElement>('dialog')
const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')
const lightboxCloseButton = useTemplateRef<HTMLButtonElement>('lightboxCloseButton')
const selectedScreenshotIndex = shallowRef<number | null>(null)
let returnFocus: HTMLElement | null = null
let screenshotReturnFocus: HTMLElement | null = null

const isExternalLink = (link: string) => link.startsWith('http')
const heroScreenshot = computed(() => props.project.screenshots[0] ?? null)
const additionalScreenshots = computed(() => props.project.screenshots.slice(1))
const visibleStack = computed(() => props.project.stack.slice(0, 5))
const lightboxItems = computed(() => {
  const architectureImage = props.project.caseStudy.architectureImage
  return architectureImage ? [...props.project.screenshots, architectureImage] : props.project.screenshots
})
const selectedScreenshot = computed(() => {
  if (selectedScreenshotIndex.value === null) return null
  return lightboxItems.value[selectedScreenshotIndex.value] ?? null
})
const isArchitectureSelected = computed(
  () => Boolean(props.project.caseStudy.architectureImage) && selectedScreenshotIndex.value === props.project.screenshots.length,
)
const resourceLinks = computed(() => {
  if (props.project.resources?.length) return props.project.resources
  if (props.project.link) return [{ label: props.project.linkLabel ?? '프로젝트 링크', url: props.project.link }]
  return []
})

const architectureIcons: Record<ProjectArchitectureKind, Component> = {
  input: RadioTower,
  transport: Route,
  core: Cpu,
  data: Database,
  evidence: GitBranch,
  operation: MonitorCog,
}

const openScreenshot = async (index: number, event: MouseEvent) => {
  if (!lightboxItems.value[index]?.src) return
  screenshotReturnFocus = event.currentTarget instanceof HTMLElement ? event.currentTarget : null
  selectedScreenshotIndex.value = index
  await nextTick()
  lightboxCloseButton.value?.focus()
}

const closeScreenshot = () => {
  selectedScreenshotIndex.value = null
  nextTick(() => screenshotReturnFocus?.focus())
}

const moveLightbox = (direction: -1 | 1) => {
  if (selectedScreenshotIndex.value === null) return
  selectedScreenshotIndex.value = Math.min(
    lightboxItems.value.length - 1,
    Math.max(0, selectedScreenshotIndex.value + direction),
  )
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
        <div class="project-modal-heading">
          <span aria-hidden="true">{{ project.number }}</span>
          <div>
            <p>프로젝트 상세</p>
            <h2 :id="`project-modal-title-${project.id}`">{{ project.title }}</h2>
          </div>
        </div>
        <button ref="closeButton" class="project-modal-close" type="button" aria-label="닫기" @click="emit('close')">
          <X :size="20" aria-hidden="true" />
        </button>
      </header>

      <section class="project-modal-hero" aria-label="프로젝트 핵심 요약">
        <figure v-if="heroScreenshot" class="project-modal-featured-media">
          <button
            type="button"
            :disabled="!heroScreenshot.src"
            :aria-label="`${heroScreenshot.caption} 확대 보기`"
            @click="openScreenshot(0, $event)"
          >
            <img v-if="heroScreenshot.src" :src="heroScreenshot.src" :alt="heroScreenshot.alt" decoding="async" />
            <span class="project-media-zoom" aria-hidden="true">
              <ZoomIn :size="17" />
            </span>
          </button>
          <figcaption>{{ heroScreenshot.caption }}</figcaption>
        </figure>

        <div class="project-modal-hero-copy">
          <p class="project-modal-claim">{{ project.claim }}</p>
          <p class="project-modal-summary">{{ project.summary }}</p>

          <dl class="project-modal-meta">
            <div>
              <dt>기간</dt>
              <dd>{{ project.period }}</dd>
            </div>
            <div v-if="project.detailLevel === 'full'">
              <dt>담당 범위</dt>
              <dd>
                <span>{{ project.role }}</span>
                <ul v-if="project.rolePhases?.length" class="project-modal-role-phases">
                  <li v-for="phase in project.rolePhases" :key="phase.label">
                    <strong>{{ phase.label }}</strong>
                    <span>{{ phase.detail }}</span>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>

          <ul class="project-stack" aria-label="핵심 기술">
            <li v-for="item in visibleStack" :key="item">{{ item }}</li>
          </ul>
        </div>
      </section>

      <div v-if="project.detailLevel === 'full'" class="project-case-study">
        <section class="case-study-section">
          <header class="case-study-heading">
            <span>01</span>
            <div>
              <h3>요구사항</h3>
              <p>프로젝트가 반드시 만족해야 했던 조건</p>
            </div>
          </header>
          <ul class="case-requirement-list">
            <li v-for="item in project.caseStudy.requirements" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section
          class="case-study-section case-study-architecture"
          :class="{ 'case-study-architecture-approved': project.caseStudy.architectureImage }"
          :aria-label="project.caseStudy.architectureImage ? '02 시스템 구조' : undefined"
        >
          <figure v-if="project.caseStudy.architectureImage" class="approved-architecture">
            <div class="approved-architecture-scroll">
              <button
                type="button"
                :aria-label="`${project.caseStudy.architectureImage.caption} 확대 보기`"
                @click="openScreenshot(project.screenshots.length, $event)"
              >
                <img
                  :src="project.caseStudy.architectureImage.src"
                  :alt="project.caseStudy.architectureImage.alt"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </div>
            <figcaption>{{ project.caseStudy.architectureImage.caption }} · 클릭하면 크게 볼 수 있습니다.</figcaption>
          </figure>

          <template v-else>
            <header class="case-study-heading">
              <span>02</span>
              <div>
                <h3>시스템 구조</h3>
                <p>핵심 경계와 분기까지 한눈에 보는 처리 흐름</p>
              </div>
            </header>
            <div
              v-if="project.caseStudy.architectureMap"
              class="architecture-map"
              :class="`architecture-map-${project.caseStudy.architectureMap.variant}`"
              :aria-label="project.caseStudy.flow"
            >
              <p v-if="project.caseStudy.architectureMap.boundary" class="architecture-boundary">
                {{ project.caseStudy.architectureMap.boundary }}
              </p>
              <ol class="architecture-lanes">
                <li
                  v-for="lane in project.caseStudy.architectureMap.lanes"
                  :key="lane.label"
                  class="architecture-lane"
                  :class="`architecture-lane-${lane.tone ?? 'secondary'}`"
                >
                  <header>
                    <strong>{{ lane.label }}</strong>
                    <p v-if="lane.description">{{ lane.description }}</p>
                  </header>

                  <ol
                    v-if="lane.nodes?.length"
                    class="architecture-lane-track"
                    :style="{ '--lane-columns': lane.nodes.length }"
                  >
                    <li v-for="node in lane.nodes" :key="node.title" class="architecture-step">
                      <strong>{{ node.title }}</strong>
                      <span v-if="node.detail">{{ node.detail }}</span>
                    </li>
                  </ol>

                  <div v-else class="architecture-branch-track">
                    <div v-if="lane.source" class="architecture-branch-source">
                      <strong>{{ lane.source.title }}</strong>
                      <span v-if="lane.source.detail">{{ lane.source.detail }}</span>
                    </div>
                    <ul class="architecture-branch-list">
                      <li v-for="branch in lane.branches" :key="branch.title">
                        <strong>{{ branch.title }}</strong>
                        <span v-if="branch.detail">{{ branch.detail }}</span>
                      </li>
                    </ul>
                    <div v-if="lane.outcome" class="architecture-branch-outcome">
                      <strong>{{ lane.outcome.title }}</strong>
                      <span v-if="lane.outcome.detail">{{ lane.outcome.detail }}</span>
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <ol
              v-else-if="project.caseStudy.architecture"
              class="architecture-flow"
              :style="{ '--architecture-columns': project.caseStudy.architecture.length }"
              :aria-label="project.caseStudy.flow"
            >
              <li
                v-for="(stage, index) in project.caseStudy.architecture"
                :key="`${stage.label}-${index}`"
                class="architecture-stage"
              >
                <header class="architecture-stage-header">
                  <span class="architecture-stage-icon" aria-hidden="true">
                    <component :is="architectureIcons[stage.kind]" :size="17" :stroke-width="1.9" />
                  </span>
                  <span class="architecture-stage-number">{{ String(index + 1).padStart(2, '0') }}</span>
                  <strong>{{ stage.label }}</strong>
                </header>
                <ul class="architecture-node-list">
                  <li v-for="node in stage.nodes" :key="`${stage.label}-${node.title}`" class="architecture-node">
                    <span v-if="node.phase" class="architecture-node-phase">{{ node.phase }}</span>
                    <strong>{{ node.title }}</strong>
                    <p v-if="node.detail">{{ node.detail }}</p>
                  </li>
                </ul>
                <div
                  v-if="index < project.caseStudy.architecture.length - 1"
                  class="architecture-connector"
                  aria-hidden="true"
                >
                  <span v-if="stage.connection">{{ stage.connection }}</span>
                  <ArrowRight :size="18" :stroke-width="2.2" />
                </div>
              </li>
            </ol>
          </template>
        </section>

        <section class="case-study-section">
          <header class="case-study-heading">
            <span>03</span>
            <div>
              <h3>문제와 해결</h3>
              <p>문제 상황에서 내린 판단과 그 근거</p>
            </div>
          </header>
          <ol v-if="project.caseStudy.decisions?.length" class="decision-list">
            <li v-for="(decision, index) in project.caseStudy.decisions" :key="decision.title">
              <header>
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <h4>{{ decision.title }}</h4>
              </header>
              <p><strong>상황</strong>{{ decision.context }}</p>
              <p><strong>판단</strong>{{ decision.decision }}</p>
              <p class="decision-evidence"><strong>근거</strong>{{ decision.evidence }}</p>
            </li>
          </ol>
          <div v-else class="problem-resolution-grid">
            <div v-if="project.caseStudy.problem?.length">
              <h4>문제 상황</h4>
              <ul>
                <li v-for="item in project.caseStudy.problem" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div v-if="project.caseStudy.approach?.length">
              <h4>판단과 해결</h4>
              <ul>
                <li v-for="item in project.caseStudy.approach" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="case-study-section">
          <header class="case-study-heading">
            <span>04</span>
            <div>
              <h3>검증과 결과</h3>
              <p>검증 방법과 확인 결과, 검증하지 않은 범위</p>
            </div>
          </header>
          <div class="verification-result-flow">
            <div class="verification-criteria">
              <h4>검증 방법</h4>
              <p>{{ project.caseStudy.verification }}</p>
            </div>
            <div class="verification-findings">
              <h4>확인한 결과</h4>
              <ul>
                <li v-for="item in project.caseStudy.result" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div v-if="project.caseStudy.verificationBoundary" class="verification-boundary">
              <h4>검증 범위 밖</h4>
              <p>{{ project.caseStudy.verificationBoundary }}</p>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="project-compact-study">
        <section class="compact-project-section">
          <h3>프로젝트 목표</h3>
          <p>{{ project.proof.problem }}</p>
        </section>

        <section class="compact-project-section">
          <h3>직접 담당</h3>
          <p>{{ project.role }}</p>
        </section>

        <section class="compact-project-section">
          <h3>핵심 구현</h3>
          <ul>
            <li
              v-for="item in (project.caseStudy.approach ?? project.caseStudy.requirements).slice(0, 3)"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </section>

        <section class="compact-project-section compact-project-result">
          <h3>확인한 결과</h3>
          <div>
            <ul>
              <li v-for="item in project.caseStudy.result" :key="item">{{ item }}</li>
            </ul>
            <p class="compact-project-verification">
              <strong>확인 범위</strong>
              {{ project.caseStudy.verification }}
            </p>
          </div>
        </section>
      </div>

      <section
        v-if="additionalScreenshots.length"
        class="project-additional-screenshots"
        :aria-labelledby="`additional-screenshots-title-${project.id}`"
      >
        <header>
          <p>주요 화면</p>
          <h3 :id="`additional-screenshots-title-${project.id}`">{{ project.screensTitle }}</h3>
        </header>
        <div class="project-screenshot-grid">
          <figure v-for="(shot, index) in additionalScreenshots" :key="shot.caption">
            <button
              type="button"
              :disabled="!shot.src"
              :aria-label="`${shot.caption} 확대 보기`"
              @click="openScreenshot(index + 1, $event)"
            >
              <img v-if="shot.src" :src="shot.src" :alt="shot.alt" loading="lazy" decoding="async" />
            </button>
            <figcaption>{{ shot.caption }}</figcaption>
          </figure>
        </div>
      </section>

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
        <strong>관련 자료</strong>
        <div>
          <a
            v-for="resource in resourceLinks"
            :key="resource.url"
            :href="resource.url"
            :target="isExternalLink(resource.url) ? '_blank' : undefined"
            :rel="isExternalLink(resource.url) ? 'noreferrer' : undefined"
          >
            {{ resource.label }}
            <ArrowUpRight :size="16" aria-hidden="true" />
          </a>
        </div>
      </footer>

      <div
        v-if="selectedScreenshot"
        class="screenshot-lightbox"
        :class="{ 'screenshot-lightbox-architecture': isArchitectureSelected }"
        role="dialog"
        aria-modal="true"
        aria-label="프로젝트 화면 확대"
        @click="closeScreenshot"
      >
        <figure @click.stop>
          <div class="screenshot-lightbox-toolbar">
            <span>{{ selectedScreenshotIndex! + 1 }} / {{ lightboxItems.length }}</span>
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
              :disabled="selectedScreenshotIndex === lightboxItems.length - 1"
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
