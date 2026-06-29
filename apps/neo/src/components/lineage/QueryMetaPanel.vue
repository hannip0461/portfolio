<script setup lang="ts">
defineProps<{
  metrics: Array<[string, string]>
}>()
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <span class="tag amber">조회 메타</span>
    </div>
    <div class="panel-body metric-list">
      <div v-for="[label, value] in metrics" :key="label">
        <b>{{ label }}</b>
        <span>{{ value }}</span>
      </div>
    </div>
  </section>
</template>
