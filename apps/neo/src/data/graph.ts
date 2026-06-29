import type { GraphEdge, GraphNode } from '../types/neo'

export const graphNodes: GraphNode[] = [
  { id: 'csv', kind: 'fact', title: 'ITS 5분 CSV', detail: '속도 12km/h', status: 'active', className: 'gx-sensor' },
  { id: 'radar', kind: 'fact', title: 'Radar 단독 감지', detail: 'NEO 내부 ATMS 제외', status: 'invalid', className: 'gx-radar' },
  { id: 'event', kind: 'event', title: 'INC-9902', detail: '차량 정체', status: 'active', className: 'gx-event' },
  { id: 'rule', kind: 'rule', title: 'Neo4j Rule', detail: '터널+정체+우회 불가', status: 'active', className: 'gx-rule' },
  { id: 'decision', kind: 'decision', title: 'Decision', detail: 'VMS 우회 유도', status: 'active', className: 'gx-action' },
]

export const graphEdges: GraphEdge[] = [
  { id: 'gx-observes', from: 'csv', to: 'event', label: 'observes' },
  { id: 'gx-violates', from: 'event', to: 'rule', label: 'matches' },
  { id: 'gx-recommends', from: 'rule', to: 'decision', label: 'recommends' },
  { id: 'gx-invalidated', from: 'radar', to: 'event', label: 'invalidated' },
]
