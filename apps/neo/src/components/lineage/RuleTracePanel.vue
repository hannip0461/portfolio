<script setup lang="ts">
defineProps<{
  steps: Array<[string, string]>
}>()
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <span class="tag green">Rule Trace</span>
      <span class="muted">NEO → Neo4j</span>
    </div>
    <div class="pipeline trace-pipeline">
      <div v-for="[label, value] in steps" :key="label" class="pipe-step">
        <b>{{ label }}</b>
        <span>{{ value }}</span>
      </div>
    </div>
  </section>
</template>
