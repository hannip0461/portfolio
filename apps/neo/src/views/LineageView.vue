<script setup lang="ts">
import CypherPanel from '../components/lineage/CypherPanel.vue'
import LineageGraphPanel from '../components/lineage/LineageGraphPanel.vue'
import NodePropertyPanel from '../components/lineage/NodePropertyPanel.vue'
import QueryMetaPanel from '../components/lineage/QueryMetaPanel.vue'
import RelationTable from '../components/lineage/RelationTable.vue'
import RuleTracePanel from '../components/lineage/RuleTracePanel.vue'
import SupportSetPanel from '../components/lineage/SupportSetPanel.vue'
import { graphEdges, graphNodes } from '../data/graph'
import { cypherQuery, nodeProps, queryMetrics, queryRows, supportSet, traceSteps } from '../data/lineage'
</script>

<template>
  <div class="workspace lineage-workspace">
    <LineageGraphPanel :nodes="graphNodes" :edges="graphEdges" />

    <aside class="lineage-side">
      <CypherPanel :query="cypherQuery" />
      <NodePropertyPanel :properties="nodeProps" />
      <QueryMetaPanel :metrics="queryMetrics" />
    </aside>

    <RelationTable :rows="queryRows" />
    <SupportSetPanel :items="supportSet" />
    <RuleTracePanel :steps="traceSteps" />
  </div>
</template>
