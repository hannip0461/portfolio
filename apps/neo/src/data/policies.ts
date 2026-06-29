import type { Policy, PolicyChange } from '../types/neo'

export const policies: Policy[] = [
  { id: 'mode', label: '자동화 수준', value: '반자동 추천 모드', note: '송출 전 운영자 검토 필수', scope: 'VMS/SOP', guardrail: '자동 송출 금지' },
  { id: 'cf', label: '위험 판단 CF', value: '0.82 이상', note: 'NEO 판단 표시 기준', scope: 'NEO Engine', guardrail: '0.90 이상도 승인 필요' },
  { id: 'atms', label: 'ATMS 충돌 처리', value: '무효화 우선', note: '상충 센서는 대응 근거에서 제외', scope: 'Rule KB', guardrail: '제외 사유 저장' },
  { id: 'vms', label: 'VMS 송출', value: '검토 후 요청', note: '직접 송출 대신 검토 큐 등록', scope: 'EX VMS API', guardrail: '2단계 확인' },
]

export const policyChanges: PolicyChange[] = [
  { time: '08:19', target: 'CF 기준', change: '0.80 → 0.82', approver: '운영 리드' },
  { time: '08:11', target: 'ATMS 충돌', change: 'Radar 단독 입력 제외', approver: '시스템 관리자' },
  { time: '07:54', target: 'VMS 송출', change: '검토 큐 등록만 허용', approver: '관제 책임자' },
]
