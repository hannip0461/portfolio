<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight } from '@lucide/vue'
import type { FeaturedProject } from '../../data/portfolioContent'

const props = defineProps<{
  projects: FeaturedProject[]
}>()

const emit = defineEmits<{
  openProject: [project: FeaturedProject]
}>()

const primaryProjects = computed(() => props.projects.filter((project) => project.tier === 'primary'))
const secondaryProjects = computed(() => props.projects.filter((project) => project.tier === 'secondary'))
const isExternalLink = (link: string) => link.startsWith('http')
const getProjectDemoUrl = (project: FeaturedProject) =>
  project.resources?.find((resource) => resource.label.includes('실행 데모'))?.url
</script>

<template>
  <section id="projects" class="section projects-section" aria-labelledby="projects-title">
    <div class="page-width">
      <header class="section-heading projects-heading">
        <div>
          <p class="section-kicker">Selected Projects</p>
          <h2 id="projects-title">대표 프로젝트</h2>
        </div>
        <p>각 프로젝트가 무엇을 구현했고 어떤 역량을 증명하는지 먼저 확인할 수 있습니다.</p>
      </header>

      <div class="primary-project-list">
        <article
          v-for="(project, index) in primaryProjects"
          :key="project.id"
          class="project-row"
          :class="{ reverse: index % 2 === 1 }"
        >
          <button
            class="project-media"
            type="button"
            :aria-label="`${project.title} 상세 기록 보기`"
            @click="emit('openProject', project)"
          >
            <img
              :src="project.image"
              :alt="project.imageAlt"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              decoding="async"
            />
          </button>

          <div class="project-content">
            <div class="project-meta">
              <span class="project-number">{{ project.number }}</span>
              <p class="project-period">{{ project.period }}</p>
            </div>
            <h3>{{ project.title }}</h3>
            <p class="project-summary">{{ project.summary }}</p>

            <dl class="project-snapshot" aria-label="프로젝트 핵심 정보">
              <div>
                <dt>보여주는 역량</dt>
                <dd>{{ project.badge }}</dd>
              </div>
              <div>
                <dt>담당</dt>
                <dd>{{ project.role }}</dd>
              </div>
              <div>
                <dt>결과</dt>
                <dd>{{ project.proof.result }}</dd>
              </div>
            </dl>

            <div class="project-actions">
              <button class="text-link project-case-button" type="button" @click="emit('openProject', project)">
                상세 기록
                <ArrowUpRight :size="17" aria-hidden="true" />
              </button>
              <a
                v-if="getProjectDemoUrl(project)"
                class="text-link project-demo-link"
                :href="getProjectDemoUrl(project)"
                target="_blank"
                rel="noreferrer"
              >
                HF 실행 데모
                <ArrowUpRight :size="17" aria-hidden="true" />
              </a>
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

      <section v-if="secondaryProjects.length" class="secondary-projects" aria-labelledby="secondary-projects-title">
        <header class="secondary-projects-heading">
          <p class="section-kicker">Additional Projects</p>
          <h3 id="secondary-projects-title">추가 구현 프로젝트</h3>
        </header>

        <div class="secondary-project-grid">
          <article v-for="project in secondaryProjects" :key="project.id" class="secondary-project">
            <button
              class="secondary-project-media"
              type="button"
              :aria-label="`${project.title} 상세 기록 보기`"
              @click="emit('openProject', project)"
            >
              <img :src="project.image" :alt="project.imageAlt" loading="lazy" decoding="async" />
            </button>
            <div class="secondary-project-content">
              <p class="project-period">{{ project.period }}</p>
              <h4>{{ project.title }}</h4>
              <p>{{ project.summary }}</p>
              <dl class="secondary-project-facts">
                <div>
                  <dt>역량</dt>
                  <dd>{{ project.badge }}</dd>
                </div>
                <div>
                  <dt>담당</dt>
                  <dd>{{ project.role }}</dd>
                </div>
              </dl>
              <div class="project-actions">
                <button class="text-link project-case-button" type="button" @click="emit('openProject', project)">
                  상세 기록
                  <ArrowUpRight :size="17" aria-hidden="true" />
                </button>
                <a
                  v-if="project.link"
                  class="text-link"
                  :href="project.link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {{ project.linkLabel }}
                  <ArrowUpRight :size="17" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>
