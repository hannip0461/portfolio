<script setup lang="ts">
import AuditTrail from '../components/logs/AuditTrail.vue'
import DecisionSummary from '../components/logs/DecisionSummary.vue'
import LogsTable from '../components/logs/LogsTable.vue'
import { auditTrail, logs } from '../data/incidents'
</script>

<template>
  <div class="workspace logs">
    <LogsTable :entries="logs" />

    <div class="side-stack">
      <DecisionSummary />
      <AuditTrail :events="auditTrail" />
    </div>
  </div>
</template>
