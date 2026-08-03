<script setup lang="ts">
import type { EducationItem } from '../../data/portfolioContent'

defineProps<{
  items: EducationItem[]
}>()
</script>

<template>
  <section id="education" class="section education-section" aria-labelledby="education-title">
    <div class="page-width">
      <header class="section-heading">
        <div>
          <p class="section-kicker">Education</p>
          <h2 id="education-title">학력 및 교육</h2>
        </div>
      </header>
      <div class="education-detail">
        <article v-for="item in items" :key="item.title" class="education-item">
          <p class="education-period">{{ item.period }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.detail }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
