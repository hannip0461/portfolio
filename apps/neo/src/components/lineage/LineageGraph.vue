<script setup lang="ts">
import type { GraphEdge, GraphNode } from '../../types/neo'

defineProps<{
  nodes: GraphNode[]
  edges: GraphEdge[]
}>()
</script>

<template>
  <div class="graph-board">
    <div class="query-strip">
      MATCH (e:Event {id:'INC-9902'})-[:OBSERVES|MATCHES|RECOMMENDS*]->(d:Decision)
    </div>

    <svg viewBox="0 0 780 420" preserveAspectRatio="none" aria-hidden="true">
      <path d="M85 83 L241 212 L599 109 L708 239" stroke="#94a3b8" stroke-width="2" fill="none" />
      <path d="M85 341 L241 212" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6" fill="none" />
    </svg>

    <article
      v-for="node in nodes"
      :key="node.id"
      class="graph-node"
      :class="[node.className, node.kind, node.status]"
    >
      <b>{{ node.title }}</b>
      <small>{{ node.detail }}</small>
    </article>

    <span v-for="edge in edges" :key="edge.id" class="edge-label" :class="edge.id">
      {{ edge.label }}
    </span>
  </div>
</template>
