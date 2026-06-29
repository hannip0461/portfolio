<script setup lang="ts">
import type { ModuleStatus } from '../../types/neo'

defineProps<{
  modules: ModuleStatus[]
}>()
</script>

<template>
  <section class="panel health">
    <div class="panel-head">
      <span class="tag green">운영 모듈</span>
      <span class="muted">상태 요약</span>
    </div>

    <div class="health-body">
      <article v-for="module in modules" :key="module.name" class="module">
        <strong>{{ module.name }}</strong>
        <span :class="module.status === 'ok' ? 'ok' : 'warn'">{{ module.value }}</span>
        <small class="muted">{{ module.note }}</small>
      </article>
    </div>
  </section>
</template>
