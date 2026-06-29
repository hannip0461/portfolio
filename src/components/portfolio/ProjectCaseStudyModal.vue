<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef, useTemplateRef } from 'vue'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from '@lucide/vue'
import type { FeaturedProject, ProjectScreenshot } from '../../data/portfolioContent'

const props = defineProps<{
  project: FeaturedProject
}>()

const emit = defineEmits<{
  close: []
}>()

const isExternalLink = (link: string) => link.startsWith('http')
const selectedScreenshot = shallowRef<ProjectScreenshot | null>(null)
const screenshotStrip = useTemplateRef<HTMLElement>('screenshotStrip')

const openScreenshot = (shot: ProjectScreenshot) => {
  if (shot.src) selectedScreenshot.value = shot
}

const closeScreenshot = () => {
  selectedScreenshot.value = null
}

const scrollScreenshots = (direction: -1 | 1) => {
  const strip = screenshotStrip.value
  if (!strip) return

  strip.scrollBy({
    left: direction * Math.round(strip.clientWidth * 0.85),
    behavior: 'smooth',
  })
}

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="project-modal-backdrop" @click.self="emit('close')">
    <article
      class="project-modal"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`project-modal-title-${project.number}`"
    >
      <header class="project-modal-header">
        <div>
          <p class="section-kicker">프로젝트 상세 기록</p>
          <h2 :id="`project-modal-title-${project.number}`">{{ project.title }}</h2>
          <p v-if="project.number === '01'" class="project-modal-note">
            NEO는 직접 정의한 자체 규칙 추론 엔진입니다.
          </p>
        </div>
        <button class="project-modal-close" type="button" aria-label="닫기" @click="emit('close')">
          <X :size="20" aria-hidden="true" />
        </button>
      </header>

      <div class="project-modal-proof">
        <div>
          <strong>문제</strong>
          <span>{{ project.proof.problem }}</span>
        </div>
        <div>
          <strong>해결</strong>
          <span>{{ project.proof.solution }}</span>
        </div>
        <div>
          <strong>결과</strong>
          <span>{{ project.proof.result }}</span>
        </div>
      </div>

      <section class="project-modal-screenshots" aria-label="프로젝트 화면">
        <header>
          <h3>프로젝트 화면</h3>
          <div v-if="project.screenshots.length > 2" class="project-screenshot-controls">
            <button type="button" aria-label="이전 화면" @click="scrollScreenshots(-1)">
              <ArrowLeft :size="17" aria-hidden="true" />
            </button>
            <button type="button" aria-label="다음 화면" @click="scrollScreenshots(1)">
              <ArrowRight :size="17" aria-hidden="true" />
            </button>
          </div>
        </header>
        <div ref="screenshotStrip" class="project-screenshot-strip">
          <button
            v-for="shot in project.screenshots"
            :key="shot.caption"
            class="project-screenshot"
            type="button"
            :disabled="!shot.src"
            @click="openScreenshot(shot)"
          >
            <img v-if="shot.src" :src="shot.src" :alt="shot.alt" loading="eager" decoding="async" />
            <div v-else class="project-screenshot-empty" aria-hidden="true"></div>
            <small>{{ shot.caption }}</small>
          </button>
        </div>
      </section>

      <div class="project-modal-body">
        <section>
          <h3>전체 아키텍처</h3>
          <p class="case-flow">{{ project.caseStudy.flow }}</p>
          <ol class="architecture-steps">
            <li v-for="item in project.caseStudy.architecture" :key="item">{{ item }}</li>
          </ol>
        </section>
        <section>
          <h3>문제 원인</h3>
          <ul>
            <li v-for="item in props.project.caseStudy.problem" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section>
          <h3>해결 과정</h3>
          <ul>
            <li v-for="item in props.project.caseStudy.approach" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section>
          <h3>테스트</h3>
          <p>{{ project.caseStudy.verification }}</p>
        </section>
        <section>
          <h3>결과</h3>
          <ul>
            <li v-for="item in props.project.caseStudy.result" :key="item">{{ item }}</li>
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

      <section class="project-modal-judgement" aria-label="개발 판단 근거">
        <div>
          <h3>개발 판단</h3>
          <p>{{ project.caseStudy.decision }}</p>
        </div>
        <div>
          <h3>트레이드오프</h3>
          <p>{{ project.caseStudy.tradeoff }}</p>
        </div>
        <div>
          <h3>검증 방법</h3>
          <p>{{ project.caseStudy.verification }}</p>
        </div>
        <div>
          <h3>내 담당</h3>
          <p>{{ project.caseStudy.ownership }}</p>
        </div>
        <div>
          <h3>확장 방향</h3>
          <p>{{ project.caseStudy.nextStep }}</p>
        </div>
      </section>

      <footer v-if="project.link" class="project-modal-actions">
        <a
          :href="project.link"
          :target="isExternalLink(project.link) ? '_blank' : undefined"
          :rel="isExternalLink(project.link) ? 'noreferrer' : undefined"
        >
          {{ project.linkLabel }}
          <ArrowUpRight :size="17" aria-hidden="true" />
        </a>
      </footer>

      <div v-if="selectedScreenshot" class="screenshot-lightbox" @click="closeScreenshot">
        <figure @click.stop>
          <button type="button" aria-label="이미지 닫기" @click="closeScreenshot">
            <X :size="20" aria-hidden="true" />
          </button>
          <img v-if="selectedScreenshot.src" :src="selectedScreenshot.src" :alt="selectedScreenshot.alt" />
          <figcaption>{{ selectedScreenshot.caption }}</figcaption>
        </figure>
      </div>
    </article>
  </div>
</template>
