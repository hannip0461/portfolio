<script setup lang="ts">
import ModuleHealthCard from '../components/health/ModuleHealthCard.vue'
import PipelineStatus from '../components/health/PipelineStatus.vue'
import { modules, pipelineSources } from '../data/modules'
</script>

<template>
  <div class="workspace health">
    <PipelineStatus :sources="pipelineSources" />

    <section class="panel span-all">
      <div class="panel-head">
        <span class="tag blue">모듈 상태</span>
        <span class="muted">SLA · latency · error</span>
      </div>

      <div class="module-grid">
        <ModuleHealthCard v-for="module in modules" :key="module.name" :module="module" />
      </div>
    </section>
  </div>
</template>
