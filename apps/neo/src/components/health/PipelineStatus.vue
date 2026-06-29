<script setup lang="ts">
import type { PipelineSource } from '../../types/neo'

defineProps<{
  sources: PipelineSource[]
}>()

const steps = [
  ['수집', 'ITS CSV / MOLIT / CCTV'],
  ['NEO', 'Rule KB / ATMS / CF'],
  ['Graph', 'Neo4j Graph RAG'],
  ['Evidence', 'NEMI Vector RAG'],
  ['대응', 'VMS 검토 큐'],
]
</script>

<template>
  <section class="panel span-all">
    <div class="panel-head">
      <span class="tag green">시스템 상태</span>
      <span class="muted">수집 → 판단 → 근거 → 검토</span>
    </div>

    <div class="pipeline">
      <div v-for="[label, detail] in steps" :key="label" class="pipe-step">
        <b>{{ label }}</b>
        <span>{{ detail }}</span>
      </div>
    </div>

    <div class="source-grid">
      <div v-for="source in sources" :key="source.name" class="source-row">
        <b>{{ source.name }}</b>
        <span>{{ source.state }}</span>
        <small>{{ source.latency }}</small>
        <time>{{ source.lastSync }}</time>
      </div>
    </div>
  </section>
</template>
