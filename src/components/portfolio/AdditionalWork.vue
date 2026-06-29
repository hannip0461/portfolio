<script setup lang="ts">
import type { AdditionalProject } from '../../data/portfolioContent'

defineProps<{
  projects: AdditionalProject[]
}>()
</script>

<template>
  <section class="section supporting-section" aria-labelledby="supporting-title">
    <div class="page-width supporting-layout">
      <div class="supporting-heading">
        <p class="section-kicker">Additional Work</p>
        <h2 id="supporting-title">추가 프로젝트</h2>
      </div>
      <div class="work-list">
        <article v-for="project in projects" :key="project.title" class="work-row">
          <div>
            <h3>{{ project.title }}</h3>
            <p>{{ project.detail }}</p>
          </div>
          <time>{{ project.period }}</time>
        </article>
      </div>
    </div>
  </section>
</template>
