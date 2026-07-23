<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, ArrowUpRight } from '@lucide/vue'
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
const getProjectDemo = (project: FeaturedProject) =>
  project.resources?.find((resource) => resource.kind === 'demo')
</script>

<template>
  <section id="projects" class="section projects-section" aria-labelledby="projects-title">
    <div class="page-width">
      <header class="section-heading projects-heading">
        <div>
          <p class="section-kicker">Selected Projects</p>
          <h2 id="projects-title">대표 프로젝트</h2>
        </div>
        <p>분산 서버·교통 관제·Edge AI 프로젝트를 실제 운영 화면과 함께 정리했습니다.</p>
      </header>

      <div class="primary-project-list">
        <article
          v-for="(project, index) in primaryProjects"
          :key="project.id"
          class="project-row"
          :class="[{ reverse: index % 2 === 1 }, `project-row-${project.id}`]"
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
            <p class="project-claim">{{ project.claim }}</p>
            <p class="project-proof">{{ project.proof.result }}</p>

            <dl class="project-snapshot" aria-label="프로젝트 핵심 정보">
              <div>
                <dt>핵심 구현</dt>
                <dd>{{ project.badge }}</dd>
              </div>
              <div>
                <dt>직접 담당</dt>
                <dd>
                  <span>{{ project.role }}</span>
                  <ul v-if="project.rolePhases?.length" class="project-role-phases">
                    <li v-for="phase in project.rolePhases" :key="phase.label">
                      <strong>{{ phase.label }}</strong>
                      <span>{{ phase.detail }}</span>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>

            <div class="project-actions">
              <button class="text-link project-case-button" type="button" @click="emit('openProject', project)">
                상세보기
                <ArrowRight :size="17" aria-hidden="true" />
              </button>
              <a
                v-if="getProjectDemo(project)"
                class="text-link"
                :href="getProjectDemo(project)?.url"
                target="_blank"
                rel="noreferrer"
              >
                {{ getProjectDemo(project)?.label }}
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
              <p class="project-claim">{{ project.claim }}</p>
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
                  상세보기
                  <ArrowRight :size="17" aria-hidden="true" />
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
