<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import type { FeaturedProject } from '../../data/portfolioContent'

defineProps<{
  projects: FeaturedProject[]
}>()

const emit = defineEmits<{
  openProject: [project: FeaturedProject]
}>()

const isExternalLink = (link: string) => link.startsWith('http')
</script>

<template>
  <section id="projects" class="section projects-section" aria-labelledby="projects-title">
    <div class="page-width">
      <header class="section-heading">
        <div>
          <p class="section-kicker">핵심 프로젝트</p>
          <h2 id="projects-title">주요 프로젝트</h2>
        </div>
        <p>문제, 역할, 결과를 먼저 확인할 수 있도록 정리한 핵심 프로젝트입니다.</p>
      </header>

      <article
        v-for="(project, index) in projects"
        :key="project.title"
        class="project-row"
        :class="{ reverse: index % 2 === 1 }"
      >
        <button
          class="project-media"
          type="button"
          :aria-label="`${project.title} 상세 기록 보기`"
          @click="emit('openProject', project)"
        >
          <img :src="project.image" :alt="project.imageAlt" loading="eager" decoding="async" />
        </button>
        <div class="project-content">
          <span class="project-number">{{ project.number }}</span>
          <p class="project-period">{{ project.period }}</p>
          <p class="project-badge">{{ project.badge }}</p>
          <h3>{{ project.title }}</h3>
          <p class="project-summary">{{ project.summary }}</p>
          <dl class="project-proof-list" aria-label="프로젝트 요약">
            <div>
              <dt>문제</dt>
              <dd>{{ project.proof.problem }}</dd>
            </div>
            <div>
              <dt>핵심</dt>
              <dd>{{ project.proof.solution }}</dd>
            </div>
            <div>
              <dt>결과</dt>
              <dd>{{ project.proof.result }}</dd>
            </div>
          </dl>
          <dl class="project-details">
            <div>
              <dt>담당</dt>
              <dd>{{ project.role }}</dd>
            </div>
            <div>
              <dt>기술</dt>
              <dd>
                <ul class="project-stack-list" aria-label="사용 기술">
                  <li v-for="item in project.stack" :key="item">{{ item }}</li>
                </ul>
              </dd>
            </div>
          </dl>
          <div class="project-actions">
            <button class="text-link project-case-button" type="button" @click="emit('openProject', project)">
              상세 기록 보기
              <ArrowUpRight :size="17" aria-hidden="true" />
            </button>
            <a
              v-if="project.link"
              class="text-link"
              :href="project.link"
              :target="isExternalLink(project.link) ? '_blank' : undefined"
              :rel="isExternalLink(project.link) ? 'noreferrer' : undefined"
            >
              {{ project.linkLabel }}
              <ArrowUpRight :size="17" aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
