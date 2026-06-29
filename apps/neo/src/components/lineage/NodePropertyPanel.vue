<script setup lang="ts">
defineProps<{
  properties: Array<[string, string]>
}>()
</script>

<template>
  <section class="panel">
    <div class="panel-head">
      <span class="tag green">선택 노드</span>
      <span class="muted">Neo4j</span>
    </div>
    <div class="property-list">
      <div v-for="[key, value] in properties" :key="key" class="kv compact">
        <b>{{ key }}</b>
        <span>{{ value }}</span>
      </div>
    </div>
  </section>
</template>
