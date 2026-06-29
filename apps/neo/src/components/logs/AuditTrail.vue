<script setup lang="ts">
import type { AuditEvent } from '../../types/neo'

defineProps<{
  events: AuditEvent[]
}>()
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <span class="tag green">Audit Trail</span>
      <span class="muted">08:24 사건</span>
    </div>
    <ol class="audit-list">
      <li v-for="event in events" :key="`${event.time}-${event.actor}`">
        <time>{{ event.time }}</time>
        <b>{{ event.actor }}</b>
        <span>{{ event.event }}</span>
        <p>{{ event.detail }}</p>
      </li>
    </ol>
  </section>
</template>
