<script setup lang="ts">
import type { ModuleStatus } from '../../types/neo'

defineProps<{
  module: ModuleStatus
}>()
</script>

<template>
  <article class="module-card">
    <div class="module-card-head">
      <small>{{ module.name }}</small>
      <span :class="module.status === 'ok' ? 'ok' : 'warn'">{{ module.status === 'ok' ? '정상' : '주의' }}</span>
    </div>
    <b>{{ module.value }}</b>
    <p>{{ module.note }}</p>
    <dl class="metric-row">
      <div><dt>latency</dt><dd>{{ module.latency }}</dd></div>
      <div><dt>SLA</dt><dd>{{ module.sla }}</dd></div>
      <div><dt>error</dt><dd>{{ module.errorRate }}</dd></div>
    </dl>
    <small class="muted">{{ module.source }}</small>
  </article>
</template>
