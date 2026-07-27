<script setup lang="ts">
import { Code2, Database, GitBranch } from '@lucide/vue'
import type { CapabilityGroup } from '../../data/portfolioContent'

defineProps<{
  groups: CapabilityGroup[]
}>()
</script>

<template>
  <section id="skills" class="section skills-section" aria-labelledby="skills-title">
    <div class="page-width">
      <header class="section-heading">
        <div>
          <p class="section-kicker">Capabilities</p>
          <h2 id="skills-title">기술 영역</h2>
        </div>
      </header>
      <div class="capability-grid">
        <section v-for="(group, index) in groups" :key="group.title" class="capability-group">
          <Code2 v-if="index === 0" :size="24" aria-hidden="true" />
          <Database v-else-if="index === 1" :size="24" aria-hidden="true" />
          <GitBranch v-else :size="24" aria-hidden="true" />
          <h3>{{ group.title }}</h3>
          <ul>
            <li v-for="item in group.items" :key="item.label">
              <strong>{{ item.label }}</strong>
              <span>{{ item.evidence }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>
