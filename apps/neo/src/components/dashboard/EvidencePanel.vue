<script setup lang="ts">
import type { EvidenceDoc } from '../../types/neo'

defineProps<{
  docs: EvidenceDoc[]
}>()
</script>

<template>
  <section class="panel wide evidence">
    <div class="panel-head">
      <span class="tag violet">Neo4j + NEMI 근거</span>
      <span class="muted">관계망과 문서 근거를 함께 표시</span>
    </div>

    <div class="evidence-body">
      <div class="graph-mini">
        <svg viewBox="0 0 650 180" aria-hidden="true">
          <path d="M92 56 L260 96 L476 56 L596 116" stroke="#94a3b8" stroke-width="2" fill="none" />
          <path d="M92 146 L260 96" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="5 5" fill="none" />
        </svg>
        <div class="node n1">ITS CSV<br /><small>속도 12km/h</small></div>
        <div class="node n2">INC-9902<br /><small>정체 사실</small></div>
        <div class="node rule n3">Neo4j Rule<br /><small>터널+정체</small></div>
        <div class="node action n4">Decision<br /><small>VMS 우회</small></div>
        <div class="node muted n5">Radar<br /><small>무효화</small></div>
      </div>

      <div class="docs">
        <article v-for="doc in docs" :key="doc.id" class="doc">
          <small>{{ doc.source }} · score {{ doc.score.toFixed(2) }}</small>
          <b>{{ doc.title }}</b>
          <p>{{ doc.excerpt }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
