import type { ModuleStatus, PipelineSource } from '../types/neo'

export const modules: ModuleStatus[] = [
  { name: 'NEO Engine', value: 'CF 0.95', note: 'Rule KB / ATMS / CF 통합 추론', status: 'ok', latency: '41ms', sla: '99.9%', errorRate: '0.1%', source: 'internal' },
  { name: 'Neo4j Graph RAG', value: '5 nodes', note: '외부 그래프 DB 관계 경로 조회', status: 'ok', latency: '38ms', sla: '99.7%', errorRate: '0.3%', source: 'external Neo4j' },
  { name: 'NEMI Vector RAG', value: 'score 0.88', note: '정책·SOP 근거 회수', status: 'ok', latency: '126ms', sla: '99.2%', errorRate: '0.6%', source: 'VectorDB' },
  { name: 'Traffic Ingest', value: '5분', note: 'ITS CSV / MOLIT 수집', status: 'ok', latency: '5m', sla: '99.5%', errorRate: '0.2%', source: 'batch/API' },
  { name: 'CCTV Vision', value: '저시정', note: '터널 진입부 확인 필요', status: 'warn', latency: '212ms', sla: '98.4%', errorRate: '1.9%', source: 'CCTV' },
  { name: 'VMS Queue', value: '검토 1건', note: '송출 전 운영자 승인', status: 'ok', latency: '9ms', sla: '99.9%', errorRate: '0.0%', source: 'EX VMS API' },
]

export const pipelineSources: PipelineSource[] = [
  { name: 'ITS 5분 CSV', state: '정상', latency: '4m 58s', lastSync: '08:24' },
  { name: 'MOLIT API', state: '정상', latency: '312ms', lastSync: '08:23' },
  { name: 'CCTV 터널 진입부', state: '주의', latency: '212ms', lastSync: '08:24' },
  { name: 'EX VMS API', state: '대기', latency: '9ms', lastSync: '08:24' },
]
