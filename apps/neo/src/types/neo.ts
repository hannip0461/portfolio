export type Severity = 'critical' | 'warning' | 'normal'
export type NodeKind = 'event' | 'fact' | 'rule' | 'decision' | 'evidence'
export type StatusKind = 'active' | 'muted' | 'invalid' | 'normal'

export interface Incident {
  id: string
  title: string
  location: string
  time: string
  severity: Severity
  cf: number
  status: string
  summary: string
}

export interface DecisionStep {
  id: string
  label: string
  title: string
  body: string
  status?: StatusKind
}

export interface EvidenceDoc {
  id: string
  source: string
  title: string
  excerpt: string
  score: number
}

export interface GraphNode {
  id: string
  kind: NodeKind
  title: string
  detail: string
  status?: StatusKind
  className?: string
}

export interface GraphEdge {
  id: string
  from: string
  to: string
  label: string
}

export interface ModuleStatus {
  name: string
  value: string
  note: string
  status: 'ok' | 'warn'
  latency: string
  sla: string
  errorRate: string
  source: string
}

export interface Policy {
  id: string
  label: string
  value: string
  note: string
  scope: string
  guardrail: string
}

export interface LogEntry {
  id: string
  time: string
  location: string
  decision: string
  cf: number
  action: string
  source: string
  evidence: string
  reviewer: string
  state: string
}

export interface AuditEvent {
  time: string
  actor: string
  event: string
  detail: string
}

export interface PipelineSource {
  name: string
  state: string
  latency: string
  lastSync: string
}

export interface PolicyChange {
  time: string
  target: string
  change: string
  approver: string
}
