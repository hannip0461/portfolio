<script setup lang="ts">
import type { GraphEdge, GraphNode } from '../../types/neo'
import LineageGraph from './LineageGraph.vue'

defineProps<{
  nodes: GraphNode[]
  edges: GraphEdge[]
}>()
</script>

<template>
  <section class="panel lineage-graph-panel">
    <div class="panel-head">
      <span class="tag violet">Neo4j Graph RAG 조회 결과</span>
      <span class="muted">Event → Fact → Rule → Decision</span>
    </div>
    <LineageGraph :nodes="nodes" :edges="edges" />
  </section>
</template>
