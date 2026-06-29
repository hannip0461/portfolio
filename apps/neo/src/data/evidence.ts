import type { EvidenceDoc } from '../types/neo'

export const evidenceDocs: EvidenceDoc[] = [
  {
    id: 'TAAS-2024-03',
    source: 'TAAS 사고 이력',
    title: '터널 진입부 추돌 패턴',
    excerpt: '시야 제한과 급감속이 결합된 구간에서 후속 추돌 위험이 높음.',
    score: 0.91,
  },
  {
    id: 'VMS-POLICY-17',
    source: 'EX VMS 정책',
    title: '터널 전방 정체 메시지',
    excerpt: '2km 전방부터 감속·우회 정보를 단계적으로 송출.',
    score: 0.88,
  },
  {
    id: 'SOP-TUNNEL-04',
    source: '터널 운영 SOP',
    title: '정체 지속 시 대응',
    excerpt: 'CCTV 확인 후 순찰대 공유, VMS 문구 검토, 우회로 상태 확인.',
    score: 0.84,
  },
]
