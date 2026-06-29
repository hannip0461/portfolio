<script setup lang="ts">
defineProps<{
  query: string
}>()
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <span class="tag blue">Cypher</span>
      <span class="muted">조회 전용</span>
    </div>
    <pre class="cypher-box">{{ query }}</pre>
  </section>
</template>
