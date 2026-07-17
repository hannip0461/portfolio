<script setup lang="ts">
import type { ExperienceItem } from '../../data/portfolioContent'

defineProps<{
  items: ExperienceItem[]
}>()
</script>

<template>
  <section id="experience" class="section experience-section" aria-labelledby="experience-title">
    <div class="page-width experience-layout">
      <header class="experience-heading">
        <p class="section-kicker">Experience</p>
        <h2 id="experience-title">경력</h2>
      </header>
      <div class="timeline">
        <article v-for="item in items" :key="item.company" class="timeline-row">
          <time>{{ item.period }}</time>
          <div>
            <h3>{{ item.company }}</h3>
            <p class="timeline-position">{{ item.position }}</p>
            <p>{{ item.detail }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
