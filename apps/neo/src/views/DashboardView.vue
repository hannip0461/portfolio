<script setup lang="ts">
import { shallowRef } from 'vue'
import CctvPanel from '../components/dashboard/CctvPanel.vue'
import DecisionFlow from '../components/dashboard/DecisionFlow.vue'
import EvidencePanel from '../components/dashboard/EvidencePanel.vue'
import IncidentQueue from '../components/dashboard/IncidentQueue.vue'
import ModuleStatusGrid from '../components/dashboard/ModuleStatusGrid.vue'
import ResponsePanel from '../components/dashboard/ResponsePanel.vue'
import SegmentMap from '../components/dashboard/SegmentMap.vue'
import { evidenceDocs } from '../data/evidence'
import { decisionSteps, incidents } from '../data/incidents'
import { modules } from '../data/modules'
import type { Incident } from '../types/neo'

const selectedIncident = shallowRef<Incident>(incidents[0])

function selectIncident(incident: Incident) {
  selectedIncident.value = incident
}
</script>

<template>
  <div class="workspace">
    <IncidentQueue
      :incidents="incidents"
      :selected-id="selectedIncident.id"
      @select="selectIncident"
    />

    <section class="panel main-panel">
      <div class="panel-head">
        <span class="tag red">통합 관제 대시보드</span>
      </div>

      <div class="situation">
        <SegmentMap />
        <CctvPanel />
      </div>

      <DecisionFlow :incident="selectedIncident" :steps="decisionSteps" />
    </section>

    <ResponsePanel />
    <EvidencePanel :docs="evidenceDocs" />
    <ModuleStatusGrid :modules="modules" />
  </div>
</template>
