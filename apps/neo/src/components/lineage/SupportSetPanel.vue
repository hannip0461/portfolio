<script setup lang="ts">
defineProps<{
  items: Array<[string, string]>
}>()
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <span class="tag blue">Support Set</span>
      <span class="muted">NEO 내부 ATMS 기준</span>
    </div>
    <div class="panel-body">
      <div v-for="[label, value] in items" :key="label" class="kv">
        <b>{{ label }}</b>
        <span>{{ value }}</span>
      </div>
    </div>
  </section>
</template>
