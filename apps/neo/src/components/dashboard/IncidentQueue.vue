<script setup lang="ts">
import type { Incident } from '../../types/neo'

defineProps<{
  incidents: Incident[]
  selectedId: string
}>()

const emit = defineEmits<{
  select: [incident: Incident]
}>()
</script>

<template>
  <section class="panel queue">
    <div class="panel-head">
      <span class="tag red">실시간 사건</span>
      <span class="muted">{{ incidents.length }}건</span>
    </div>

    <button
      v-for="incident in incidents"
      :key="incident.id"
      class="incident"
      :class="{ active: incident.id === selectedId }"
      type="button"
      @click="emit('select', incident)"
    >
      <div class="incident-top">
        <strong>{{ incident.id }}</strong>
        <span>{{ incident.time }}</span>
      </div>
      <p class="incident-title">{{ incident.title }}</p>
      <p class="incident-meta">{{ incident.location }}</p>
      <p class="muted">{{ incident.summary }}</p>
      <span class="tag" :class="{ red: incident.severity === 'critical', amber: incident.severity === 'warning', green: incident.severity === 'normal' }">
        CF {{ incident.cf.toFixed(2) }} / {{ incident.status }}
      </span>
    </button>
  </section>
</template>
