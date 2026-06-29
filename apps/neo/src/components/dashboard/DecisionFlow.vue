<script setup lang="ts">
import type { DecisionStep, Incident } from '../../types/neo'

defineProps<{
  incident: Incident
  steps: DecisionStep[]
}>()
</script>

<template>
  <section class="decision">
    <div class="decision-title">
      <span class="tag red">{{ incident.id }}</span>
      <h1>NEO 판단: {{ incident.title }} 감지</h1>
    </div>

    <div class="chain">
      <article v-for="step in steps" :key="step.id" class="chain-step">
        <strong>{{ step.label }}</strong>
        <span class="tag blue">{{ step.title }}</span>
        <p>{{ step.body }}</p>
      </article>
    </div>
  </section>
</template>
