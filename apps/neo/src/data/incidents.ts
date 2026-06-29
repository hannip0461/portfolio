import type { AuditEvent, DecisionStep, Incident, LogEntry } from '../types/neo'

export const incidents: Incident[] = [
  {
    id: 'INC-9902',
    title: '연쇄 추돌 위험',
    location: '터널 진입 2km 전',
    time: '08:24:03',
    severity: 'critical',
    cf: 0.95,
    status: '대응 검토',
    summary: 'ITS 5분 CSV 정체 신호와 CCTV 시야 제한이 동시에 확인됨.',
  },
  {
    id: 'INC-9901',
    title: '낙하물 의심',
    location: '분기점 1차로',
    time: '08:21:44',
    severity: 'warning',
    cf: 0.72,
    status: '센서 확인',
    summary: '레이더 단독 감지라 ATMS 교차 검증 대기.',
  },
  {
    id: 'INC-9897',
    title: '정체 회복',
    location: '서부IC 하행',
    time: '08:18:10',
    severity: 'normal',
    cf: 0.61,
    status: '모니터링',
    summary: '속도 회복 추세지만 VMS 메시지는 유지 중.',
  },
]

export const decisionSteps: DecisionStep[] = [
  {
    id: 'neo',
    label: '1. NEO Engine',
    title: 'Rule KB + CF + ATMS',
    body: '규칙 매칭, 신뢰도 계산, 충돌 입력 제거를 하나의 추론 엔진 안에서 처리.',
  },
  {
    id: 'neo4j',
    label: '2. Neo4j Graph RAG',
    title: '관계 조회',
    body: 'Event, Fact, Rule, Decision 관계를 외부 그래프 DB에서 조회해 경로를 제시.',
  },
  {
    id: 'nemi',
    label: '3. NEMI Vector RAG',
    title: '문서 근거',
    body: 'TAAS 사고 이력, VMS 정책, 터널 SOP에서 근거 문장과 적용 지침을 회수.',
  },
  {
    id: 'decision',
    label: '4. 운영자 검토',
    title: 'Operator Review',
    body: 'VMS 문구와 SOP는 자동 실행하지 않고 검토 큐에 올려 최종 승인 대기.',
  },
]

export const logs: LogEntry[] = [
  {
    id: 'INC-9902',
    time: '08:24',
    location: '터널 진입 2km 전',
    decision: '연쇄 추돌 위험',
    cf: 0.95,
    action: 'VMS 우회 문구 검토',
    source: 'ITS CSV + CCTV + Rule KB',
    evidence: 'Neo4j 4-hop / NEMI SOP 0.88',
    reviewer: '관제 1조',
    state: '검토 대기',
  },
  {
    id: 'INC-9901',
    time: '08:21',
    location: '분기점 1차로',
    decision: '낙하물 의심',
    cf: 0.72,
    action: '센서 재확인',
    source: 'Radar-102',
    evidence: 'ATMS 교차 검증 대기',
    reviewer: '자동 큐',
    state: '보류',
  },
  {
    id: 'INC-9888',
    time: '08:02',
    location: '서부IC 하행',
    decision: '정체 완화',
    cf: 0.67,
    action: '알림 종결 처리',
    source: 'ITS CSV',
    evidence: '속도 회복 3회 연속',
    reviewer: '관제 2조',
    state: '종결',
  },
]

export const auditTrail: AuditEvent[] = [
  { time: '08:24:03', actor: 'NEO Engine', event: '위험 판단', detail: '터널 접근 정체 조건 충족, CF 0.95 산출' },
  { time: '08:24:05', actor: 'ATMS', event: '입력 정규화', detail: 'Radar 단독 감지는 support set에서 제외' },
  { time: '08:24:07', actor: 'Neo4j', event: '관계 조회', detail: 'Event → Fact → Rule → Decision 경로 반환' },
  { time: '08:24:09', actor: 'NEMI', event: '근거 회수', detail: '터널 SOP와 VMS 우회 문구 후보 반환' },
  { time: '08:24:12', actor: 'Operator Queue', event: '검토 등록', detail: '자동 송출 없이 관제 검토 큐로 전환' },
]
