export interface ProjectScreenshot {
  src?: string
  alt: string
  caption: string
}

export interface ProjectTerm {
  term: string
  description: string
}

export interface ProjectResource {
  label: string
  url: string
}

export type ProjectArchitectureKind = 'input' | 'transport' | 'core' | 'data' | 'evidence' | 'operation'

export interface ProjectArchitectureStage {
  label: string
  kind: ProjectArchitectureKind
  connection?: string
  nodes: Array<{
    title: string
    detail?: string
    phase?: string
  }>
}

export interface ProjectArchitectureNode {
  title: string
  detail?: string
}

export interface ProjectArchitectureLane {
  label: string
  description?: string
  tone?: 'primary' | 'secondary' | 'control'
  nodes?: ProjectArchitectureNode[]
  source?: ProjectArchitectureNode
  branches?: ProjectArchitectureNode[]
  outcome?: ProjectArchitectureNode
}

export interface ProjectArchitectureMap {
  variant: 'astra' | 'neo' | 'hifive'
  boundary?: string
  lanes: ProjectArchitectureLane[]
}

export interface ProjectDecision {
  title: string
  context: string
  decision: string
  evidence: string
}

export interface FeaturedProject {
  id: string
  tier: 'primary' | 'secondary'
  detailLevel: 'full' | 'compact'
  number: string
  title: string
  period: string
  claim: string
  summary: string
  badge: string
  proof: {
    problemLabel?: string
    problem: string
    solution: string
    result: string
  }
  caseStudy: {
    requirements: string[]
    flow: string
    architectureImage?: ProjectScreenshot
    architecture?: ProjectArchitectureStage[]
    architectureMap?: ProjectArchitectureMap
    problem?: string[]
    approach?: string[]
    decisions?: ProjectDecision[]
    result: string[]
    verification: string
    verificationBoundary?: string
  }
  role: string
  rolePhases?: Array<{
    label: string
    detail: string
  }>
  stack: string[]
  image: string
  imageAlt: string
  screenshots: ProjectScreenshot[]
  screensTitle: string
  terms?: ProjectTerm[]
  link?: string
  linkLabel?: string
  resources?: ProjectResource[]
}

export interface AdditionalProject {
  title: string
  period: string
  detail: string
}

export interface ExperienceItem {
  company: string
  period: string
  position: string
  detail: string
}

export interface CapabilityGroup {
  title: string
  items: Array<{ label: string; evidence: string }>
}

export interface EducationItem {
  title: string
  period: string
  detail: string
}

const pagePath = (path: string) => `${import.meta.env.BASE_URL}${path}`
const assetPath = (path: string) => pagePath(path)
const neoOperatorUrl = import.meta.env.VITE_NEO_OPERATOR_URL ?? 'https://3-38-33-156.sslip.io/neo'
const neoResources = [
  { label: 'NEO 관제 화면', url: neoOperatorUrl },
  {
    label: 'NEO 저장소',
    url: 'https://github.com/hannip0461/NEO-Intelligent-ITS-Operator',
  },
]

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'astra',
    tier: 'primary',
    detailLevel: 'full',
    number: '02',
    title: 'ASTRA LiveOps Server',
    period: '개인 프로젝트 · 2026',
    claim: '재시도와 동시 요청 속에서도 재화 정합성을 지키고, 운영 사고를 복구합니다.',
    badge: '분산 상태 정합성 · LiveOps 복구 · 관측성',
    summary:
      '네트워크 재시도와 동시 요청에서도 가챠·재화 상태를 일관되게 유지하고, 콘텐츠 롤백과 대상자 보상까지 연결한 수집형 RPG 운영 서버입니다.',
    proof: {
      problemLabel: '개요',
      problem:
        '수집형 RPG 운영에서는 중복 요청과 콘텐츠 배포 실수가 재화·보상 오류로 이어질 수 있습니다.',
      solution:
        'Orleans Grain의 플레이어별 직렬화와 PostgreSQL 원자적 트랜잭션을 중심으로 멱등 처리, 콘텐츠 롤백, 사고 보상 절차를 구성했습니다.',
      result:
        '표준 테스트 91건과 실제 PostgreSQL 테스트 17건에서 재시도·동시성·장애 복구 경계를 확인했습니다.',
    },
    caseStudy: {
      requirements: [
        '동일 요청이 재전송되어도 재화 차감과 보상이 한 번만 처리되어야 했습니다.',
        '동시 명령에서도 플레이어 상태, 원장, 감사 기록이 같은 결과를 가리켜야 했습니다.',
        '잘못 배포된 콘텐츠를 이전 버전으로 되돌리고 영향 대상에게 보상할 수 있어야 했습니다.',
      ],
      flow: '명령 처리와 PostgreSQL 트랜잭션을 중심으로, 커밋 이후 비동기 처리와 LiveOps 복구 경로가 분기되는 구조',
      architectureImage: {
        src: assetPath('images/project-astra-system-architecture-approved.png'),
        alt: 'ASTRA의 동기 명령, PostgreSQL 커밋, 비동기 후속 처리와 LiveOps 복구 경로를 연결한 시스템 구조',
        caption: '동기 명령·Post-Commit·LiveOps 복구 경로',
      },
      architectureMap: {
        variant: 'astra',
        boundary: 'PostgreSQL이 상태·원장·감사·멱등 응답의 기준 데이터',
        lanes: [
          {
            label: '동기 명령 경로',
            description: '재시도와 동시 요청을 한 번의 결과로 고정',
            tone: 'primary',
            nodes: [
              { title: 'HTTP / TCP', detail: '동일 command 계약' },
              { title: 'API / Gateway', detail: '인증·검증·요청 해석' },
              { title: 'PlayerAccountGrain', detail: '플레이어별 명령 직렬화' },
              { title: 'PostgreSQL transaction', detail: '상태·원장·감사·응답 원자적 commit' },
            ],
          },
          {
            label: '커밋 이후 처리',
            description: '업무 트랜잭션과 후속 작업을 분리',
            tone: 'secondary',
            nodes: [
              { title: 'Outbox event', detail: '업무 데이터와 함께 기록' },
              { title: 'Worker lease / retry', detail: '중복 실행과 재시도 제어' },
              { title: 'Consumer / dead-letter', detail: '실패 격리와 운영자 재처리' },
              { title: 'OpenTelemetry / Elastic', detail: 'trace·지표·경보 확인' },
            ],
          },
          {
            label: 'LiveOps 복구 경로',
            description: '잘못된 배포를 되돌리고 영향 대상에게 보상',
            tone: 'control',
            nodes: [
              { title: 'Blazor Admin', detail: '배포·롤백·보상 명령' },
              { title: 'Snapshot / checksum', detail: '배포 버전과 복구 기준 고정' },
              { title: 'Impact snapshot', detail: '사고 영향 대상 확정' },
              { title: 'Incident Mail / audit', detail: '멱등 보상과 감사 기록' },
            ],
          },
        ],
      },
      decisions: [
        {
          title: '중복 요청을 새 명령으로 처리하지 않기',
          context: '재전송과 동시 명령이 같은 재화 차감·보상을 여러 번 실행할 수 있었습니다.',
          decision: 'Idempotency-Key와 요청 hash로 동일성을 확인하고, 상태·원장·감사·Outbox를 한 PostgreSQL transaction에서 commit한 뒤 완료 응답을 재사용했습니다.',
          evidence: '동시성·재시도·commit 후 응답 유실을 포함한 표준 91건과 실제 PostgreSQL 17건의 테스트로 불변조건을 확인했습니다.',
        },
        {
          title: '콘텐츠 사고의 복구 대상을 추측하지 않기',
          context: '잘못된 콘텐츠가 배포되면 어떤 버전에서 누구에게 영향을 줬는지 운영자가 재구성해야 했습니다.',
          decision: '배포 snapshot과 checksum을 불변 기록으로 남기고, rollback 시점의 영향 대상 snapshot을 기준으로 Incident Mail을 멱등 지급했습니다.',
          evidence: '배포·롤백·영향 대상 확정·보상·감사 기록이 같은 운영 절차로 이어지는지 화면과 장애 시나리오에서 확인했습니다.',
        },
      ],
      result: [
        '동일 요청 재전송과 commit 후 응답 유실에서도 저장된 완료 응답을 재사용하고 재화·보상은 한 번만 처리되는 경로를 확인했습니다.',
        '콘텐츠 버전·rollback·영향 대상 snapshot·Incident Mail·감사 기록이 하나의 복구 절차로 남는 것을 확인했습니다.',
      ],
      verification:
        '표준 테스트 91건과 실제 PostgreSQL 테스트 17건, 2-Silo·HTTP/TCP E2E·failure injection으로 정합성과 복구 경계를 검증했습니다.',
    },
    role: '개인 프로젝트 · 서버 아키텍처부터 정합성, 운영 복구, 테스트·배포까지 전 영역 구현',
    stack: ['.NET 10', 'ASP.NET Core', 'Microsoft Orleans', 'PostgreSQL', 'Redis', 'Blazor', 'OpenTelemetry', 'Docker'],
    image: assetPath('images/project-astra-content-ops.png'),
    imageAlt: 'ASTRA 콘텐츠 배포와 롤백 운영 화면',
    screenshots: [
      {
        src: assetPath('images/project-astra-content-ops.png'),
        alt: 'ASTRA 콘텐츠 배포와 롤백 화면',
        caption: '배포 버전·checksum을 고정하고 즉시 rollback하는 LiveOps 복구 화면',
      },
      {
        src: assetPath('images/project-astra-incident-mail.png'),
        alt: 'ASTRA 사고 대상자 보상 화면',
        caption: '영향 대상 snapshot과 멱등 보상을 확인하는 Incident Mail 화면',
      },
      {
        src: assetPath('images/project-astra-audit-log.png'),
        alt: 'ASTRA 운영 감사 로그 화면',
        caption: '운영 명령과 결과를 추적하는 감사 로그',
      },
      {
        src: assetPath('images/project-astra-outbox.png'),
        alt: 'ASTRA Transactional Outbox 운영 화면',
        caption: '재시도와 dead-letter를 관리하는 Outbox 화면',
      },
      {
        src: assetPath('images/project-astra-observability.png'),
        alt: 'ASTRA Kibana 관측성 대시보드',
        caption: 'trace와 PostgreSQL 장애 지표를 확인하는 Kibana Dashboard',
      },
      {
        src: assetPath('images/project-astra-operations.png'),
        alt: 'ASTRA 운영 상태 대시보드',
        caption: 'API, Silo, Worker와 데이터 계층의 운영 상태 화면',
      },
    ],
    screensTitle: '복구 절차와 운영 증거',
    link: 'https://github.com/hannip0461/ASTRA-LiveOps-Server',
    linkLabel: 'ASTRA 저장소',
    resources: [
      { label: 'ASTRA 저장소', url: 'https://github.com/hannip0461/ASTRA-LiveOps-Server' },
      { label: '프로젝트 종합 문서', url: 'https://github.com/hannip0461/ASTRA-LiveOps-Server/blob/main/docs/project/ASTRA_LiveOps_Project_Overview.pdf' },
      { label: '아키텍처 도식', url: 'https://github.com/hannip0461/ASTRA-LiveOps-Server/blob/main/docs/project/ASTRA_LiveOps_Architecture_Diagrams.pdf' },
      { label: 'GitHub Actions CI', url: 'https://github.com/hannip0461/ASTRA-LiveOps-Server/actions/workflows/ci.yml' },
    ],
  },
  {
    id: 'neo',
    tier: 'primary',
    detailLevel: 'full',
    number: '01',
    title: 'NEO Intelligent ITS Operator',
    period: '개인 프로젝트 · 2026',
    claim: '서로 다른 관제 신호를 판단하고, 운영자가 근거를 검토한 뒤 조치하게 합니다.',
    badge: '규칙 추론 · XAI 계보 · AWS 운영',
    summary:
      'ITS·CCTV·VMS·TAAS 입력을 Canonical Fact로 정규화하고, NEO 규칙 추론의 판단 계보와 문서 근거를 운영 화면에 연결한 설명 가능한 교통 관제 시스템입니다.',
    proof: {
      problemLabel: '개요',
      problem:
        '속도 저하, 정체 신호, CCTV 시야 제한처럼 서로 다른 입력이 동시에 발생하면 단일 경보만으로는 과잉 대응이나 누락을 피하기 어렵습니다.',
      solution:
        'FastAPI가 입력을 Canonical Fact로 정규화하고, NEO Rule KB·ATMS·CF가 Decision Package를 생성하도록 판단 경계를 분리했습니다. Neo4j와 NEMI는 판단을 바꾸지 않고 관계·문서 근거만 제공합니다.',
      result:
        '첫 진입부터 저장된 판단 패키지를 읽기 전용으로 재현하고, 새 판단은 선택 기능으로 분리했습니다. 사건 선택 → 판단 → 계보·문서 근거 → 운영자 검토 → 감사 이력을 한 흐름으로 확인할 수 있습니다.',
    },
    caseStudy: {
      requirements: [
        'ITS CSV, 교통 API, CCTV, VMS, TAAS 입력을 규칙이 처리할 공통 Fact로 변환해야 했습니다.',
        '최종 판단과 함께 실제 사용한 관측 Fact·Rule, 채택·충돌 근거와 판단 시점의 지식 기준을 재현할 수 있어야 했습니다.',
        'NEO가 판단하되 운영자가 충돌·데이터 경고와 근거를 확인한 뒤에만 검토를 완료하는 경계를 유지해야 했습니다.',
      ],
      flow: '관측 근거 → 적용 규칙 → NEO 판단 → 권고 조치를 주축으로, 채택 근거와 충돌 근거를 분리해 검토하는 구조',
      architectureImage: {
        src: assetPath('images/project-neo-system-architecture-approved.png'),
        alt: 'ITS·CCTV·VMS·TAAS 입력부터 NEO 판단, 읽기 전용 근거, 운영자 승인과 감사 피드백까지 연결한 시스템 구조',
        caption: 'NEO 판단·읽기 전용 근거·사람 중심 승인과 감사',
      },
      architectureMap: {
        variant: 'neo',
        boundary: 'AWS EC2 · Docker Compose · HTTPS는 처리 단계가 아닌 실행 환경',
        lanes: [
          {
            label: '판단 경로',
            description: '관제 입력을 같은 기준으로 해석하고 결정 패키지 생성',
            tone: 'primary',
            nodes: [
              { title: 'ITS · CCTV · VMS · TAAS', detail: '속도·정체·시야·사고 입력' },
              { title: 'Canonical Fact', detail: '출처·시간·자산 기준 통일' },
              { title: 'NEO Rule Engine', detail: 'Rule KB·ATMS·CF 판단' },
              { title: 'Decision Package', detail: '판단·근거·KB 버전 고정' },
            ],
          },
          {
            label: '읽기 전용 근거',
            description: '판단을 바꾸지 않고 운영자 검토에 필요한 근거만 조회',
            tone: 'secondary',
            source: { title: 'Decision Package', detail: '판단 결과와 조회 기준' },
            branches: [
              { title: 'Neo4j 판단 계보', detail: 'Fact → Rule → Decision' },
              { title: 'NEMI 문서 근거', detail: 'SOP·정책·사고 이력' },
            ],
            outcome: { title: 'Operator UI', detail: '판단과 두 근거를 함께 제시' },
          },
          {
            label: '사람의 통제',
            description: '자동 송출 없이 검토·승인·감사 상태를 보존',
            tone: 'control',
            nodes: [
              { title: '운영자 검토', detail: '계보·문서·영향 범위 확인' },
              { title: '승인 / 보류', detail: '최종 조치 권한은 운영자' },
              { title: '조치 / 감사 이력', detail: '감사 ID로 판단과 상태 재현' },
            ],
          },
        ],
      },
      decisions: [
        {
          title: '출처가 다른 입력을 규칙 안에서 직접 해석하지 않기',
          context: '교통 API·CCTV·VMS·TAAS의 형식과 시간 기준이 달라 규칙마다 변환 로직을 가지면 같은 사건도 다르게 판단될 수 있었습니다.',
          decision: 'FastAPI는 입력을 스키마 검증된 Canonical Fact로 정규화하고, NEO는 정규화된 Fact와 Rule KB·ATMS·CF만으로 Decision Package를 생성하게 분리했습니다.',
          evidence: 'Canonical Fact와 Decision Package 계약에 출처·시간·KB/Rule Set 버전·KB SHA-256을 남겨 판단 시점의 기준을 재현할 수 있게 했습니다.',
        },
        {
          title: '근거 탐색과 운영 검토 완료를 같은 동작으로 취급하지 않기',
          context: '그래프 노드 선택만으로 검토가 끝났다고 처리하면 충돌 근거나 누락된 데이터 경고를 건너뛴 채 조치 단계로 넘어갈 수 있었습니다.',
          decision: 'Neo4j의 실제 관계에서 Decision 중심 판단 경로를 계산하되, 노드 선택은 탐색 상태로만 유지했습니다. 충돌·데이터 경고 확인과 명시적 판단 경로 확인을 검토 완료 조건으로 분리했습니다.',
          evidence: '저장 계보 재조회와 7·30·100노드 응답, 계약 오류 대체 흐름, 키보드·모바일 환경에서 같은 검토 조건이 유지되는지 확인했습니다.',
        },
      ],
      result: [
        '첫 화면에서 저장된 판단과 대표 현장 증거를 바로 확인하고, Neo4j 판단 경로·NEMI 문서 근거·권고 조치를 순서대로 검토할 수 있게 했습니다.',
        '공개 저장소에는 Canonical Fact·Decision Package 계약과 AWS 배포 기록을 남겨 공개 가능한 범위의 구조와 운영 상태를 확인할 수 있게 했습니다.',
      ],
      verification:
        'AWS EC2 주요 화면 5종, 저장 판단 재현, 새 판단 실행, Neo4j 저장·재조회, NEMI 연결, 390px 모바일과 브라우저 콘솔 오류 0건을 확인했습니다.',
      verificationBoundary:
        '배포·운영 흐름을 검증한 결과이며, 추론 정확도 수치를 측정한 결과는 아닙니다.',
    },
    role: '개인 프로젝트 · 시스템 아키텍처, NEO 추론 경계, FastAPI·운영 UI, AWS 배포 구현',
    stack: ['C/C++', 'FastAPI', 'Vue 3', 'Neo4j', 'Qdrant', 'AWS EC2', 'Docker'],
    image: assetPath('images/project-neo-dashboard-202607.png'),
    imageAlt: 'NEO 저장 판단 재현과 운영자 검토 화면',
    screenshots: [
      {
        src: assetPath('images/project-neo-dashboard-202607.png'),
        alt: 'NEO 저장 판단 패키지와 대표 현장 증거 검토 화면',
        caption: '저장 판단 재현 → 현장 증거 → 근거 확인 → 운영자 검토를 한 화면에 연결',
      },
      {
        src: assetPath('images/project-neo-lineage-202607.png'),
        alt: 'NEO Neo4j 전체 판단 계보 화면',
        caption: '관측 Fact·적용 규칙·NEO 판단·채택·충돌 근거를 실제 관계로 탐색하는 전체 그래프',
      },
      {
        src: assetPath('images/project-neo-logs-202607.png'),
        alt: 'NEO 판단과 조치 감사 이력 화면',
        caption: '사건별 입력·판단·근거·조치를 감사 ID와 함께 재현하는 이력 화면',
      },
      {
        src: assetPath('images/project-neo-health-202607.png'),
        alt: 'NEO 핵심 서비스 상태 화면',
        caption: 'FastAPI·NEO·Neo4j·NEMI 연결 상태와 운영 영향을 함께 확인',
      },
    ],
    terms: [
      { term: 'NEO', description: 'Fact·Rule·ATMS·CF로 판단하는 규칙 추론 엔진으로, 이 프로젝트에서는 ITS 관제 도메인에 적용했습니다.' },
      {
        term: 'ATMS',
        description:
          'Assumption-based Truth Maintenance System(가정 기반 진리 유지 시스템) 계열. 가정/사실의 정합성과 충돌 시 유지·철회 대상을 관리하는 개념입니다.',
      },
      {
        term: 'CF',
        description:
          'Certainty Factor(확신도) 계열. 규칙 기반 전문가 시스템에서 판단의 신뢰 정도를 수치화하는 개념입니다.',
      },
      { term: 'NEMI', description: '직접 정의한 자체 근거 검색 모듈로, VectorDB/RAG 기반 근거 검색을 담당하는 프로젝트 내부 명칭입니다.' },
      { term: 'Neo4j', description: '외부 그래프 DB. 실제 관측 Fact·Rule·Decision 관계 저장과 판단 경로 조회에 사용했습니다.' },
    ],
    screensTitle: '운영 판단과 추적 화면',
    link: neoOperatorUrl,
    linkLabel: 'NEO 화면 보기',
    resources: [
      ...neoResources,
      {
        label: 'AWS 배포 기록',
        url: 'https://github.com/hannip0461/NEO-Intelligent-ITS-Operator/blob/main/docs/deployment/AWS_EC2_DEPLOYMENT.md',
      },
      {
        label: 'Decision Package 계약',
        url: 'https://github.com/hannip0461/NEO-Intelligent-ITS-Operator/blob/main/docs/design/DECISION_PACKAGE_SCHEMA.md',
      },
    ],
  },
  {
    id: 'hifive',
    tier: 'primary',
    detailLevel: 'full',
    number: '03',
    title: 'HI-FIVE Smart Tolling + PdM PoC',
    period: '팀 프로젝트 · 1차 2026.04.27–06.01 · 2차 06.04–06.30',
    claim: '1차 Edge AI 통행 처리에서 2차 카메라 품질 이상 탐지 PoC까지 확장했습니다.',
    badge: 'Edge AI · 이벤트 전송 · 품질 이상 탐지 PoC',
    summary:
      '1차에서 Jetson 차량·번호판 인식을 통행 이벤트와 관제 흐름으로 연결하고, 2차에서는 축적된 카메라 품질 지표를 Rule-Based·Isolation Forest·LSTM-AE로 비교하는 품질 이상 탐지 PoC를 구현했습니다.',
    proof: {
      problemLabel: '개요',
      problem: '1차는 Edge 인식 결과를 재시도 가능한 통행 이벤트로 전달해야 했고, 2차는 카메라 품질 저하 징후를 여러 지표로 조기에 확인해야 했습니다.',
      solution: 'YOLO/OCR 결과와 GPS를 Passage Event로 표준화하고, 축적된 품질 지표를 세 가지 탐지 방식으로 분석하는 PoC를 운영 화면·알림에 연결했습니다.',
      result: '1차 통행 처리와 2차 품질 이상 탐지의 목표·구현·검증 범위를 분리해 확인할 수 있습니다.',
    },
    caseStudy: {
      requirements: [
        '1차: 차량·번호판 인식과 GPS를 서버가 처리할 하나의 통행 이벤트로 묶고 재시도 가능한 전송 경계를 만들어야 했습니다.',
        '1차: Edge 입력부터 저장, 위치 판정, 검수·정산 후보와 관제 조회까지 한 흐름으로 시연해야 했습니다.',
        '2차: 전후방 카메라 품질 저하를 단일 임계값뿐 아니라 복합 패턴과 시계열 추세로 진단하고 운영자에게 알려야 했습니다.',
      ],
      flow: '1차 통행 이벤트 처리와 2차 품질 이상 탐지 PoC가 PostgreSQL 품질 지표를 기준으로 분리되는 구조',
      architectureImage: {
        src: assetPath('images/project-hifive-system-architecture-approved.png'),
        alt: '현장 Edge의 1차 스마트 톨링과 중앙 시스템의 2차 품질 이상 탐지 PoC를 분리한 시스템 구조',
        caption: '1차 Smart Tolling·2차 Quality Anomaly Detection PoC',
      },
      architectureMap: {
        variant: 'hifive',
        boundary: '현장 Edge와 중앙 시스템 사이의 전송·저장 경계를 명확히 분리',
        lanes: [
          {
            label: '1차 · 스마트 톨링',
            description: 'Edge 인식 결과를 재시도 가능한 통행 이벤트로 전달',
            tone: 'primary',
            nodes: [
              { title: 'Camera / GPS', detail: '전후방 영상·위치·통행 시점' },
              { title: 'Jetson YOLO / OCR', detail: '탐지 · 문자 후보 · Best-Fit' },
              { title: 'Passage Event', detail: 'Protobuf 이벤트 계약' },
              { title: 'WebTransport Ingress', detail: 'ACK · RETRY · REJECT' },
              { title: 'Spring / PostgreSQL', detail: '저장 · 위치 판정 · 검수 후보' },
              { title: '관제 / 통행 검수', detail: 'ACCEPT · REVIEW · REJECT' },
            ],
          },
          {
            label: '2차 · 품질 이상 탐지 PoC',
            description: '저장된 카메라 품질 지표에서 복합 이상 징후를 탐색',
            tone: 'secondary',
            nodes: [
              { title: '품질 지표', detail: 'OCR 신뢰도 · 성공률 · 전후방 일치율' },
              { title: 'PdM API / Scheduler', detail: '분석 계약 · 주기 실행' },
              { title: 'Rule / IF / LSTM-AE', detail: '서로 다른 방식의 이상 점수' },
              { title: '통합 위험도', detail: '고정 시나리오 기준 결과 결합' },
              { title: 'Dashboard / Email', detail: '위험 상태 · 권장 조치 알림' },
            ],
          },
        ],
      },
      decisions: [
        {
          title: 'Edge 재전송을 중앙 업무 처리와 섞지 않기',
          context: '영상·인식 결과·GPS를 제각각 보내면 사건 단위가 깨지고, 망 장애 시 같은 통행을 다시 처리할 기준도 모호해졌습니다.',
          decision: 'Jetson에서 Passage Event·Protobuf 계약으로 묶고 WebTransport Ingress가 ACK·RETRY·REJECT를 반환한 뒤 Spring Boot의 저장·판정 경계로 전달했습니다.',
          evidence: 'Edge 영상 스모크 테스트와 Ingress 응답 시나리오에서 수신·재시도·거절 경로를 각각 확인했습니다.',
        },
        {
          title: '현장 고장 예측과 품질 이상 탐지의 검증 범위를 분리',
          context: 'OCR 신뢰도와 성공률은 서서히 변하고 지표마다 민감도가 달라 한 기준만으로 품질 저하를 설명하기 어려웠습니다.',
          decision: 'Rule-Based·Isolation Forest·LSTM-AE를 나란히 계산하고 통합 위험도로 비교하는 PoC를 구성하되, 현장 고장 예측 성능이 아니라 품질 이상 탐지 가능성을 검증 범위로 한정했습니다.',
          evidence: 'PdM API 계약·분석·스케줄러와 고정/실시간 시나리오를 확인했으며, 실제 고장 라벨 기반 성능 검증은 후속 과제로 남겼습니다.',
        },
      ],
      result: [
        '1차에서 Edge 인식→이벤트 전송→중앙 저장·위치 판정→관제·검수로 이어지는 통행 처리 PoC를 시연했습니다.',
        '2차에서 품질 지표→세 방식의 분석→통합 위험도→운영 화면·이메일 알림을 연결했으며, 결과는 품질 이상 탐지 PoC 범위로 제한했습니다.',
      ],
      verification: '1차는 Edge 영상 스모크와 ACK·RETRY·REJECT 전송 경로를, 2차는 PdM API 계약·분석·스케줄러와 고정/실시간 시나리오를 확인했습니다.',
      verificationBoundary: '실제 현장 고장 라벨 기반 예측 성능은 검증하지 않았습니다.',
    },
    role: '팀장 · 통합 리딩',
    rolePhases: [
      { label: '1차', detail: 'Jetson YOLO/OCR · WebTransport Ingress' },
      { label: '2차', detail: 'PdM Backend · FastAPI 분석·테스트·알림' },
    ],
    stack: ['Jetson', 'YOLO/OCR', 'FastAPI', 'Spring Boot', 'PostgreSQL', 'Isolation Forest', 'LSTM-AE', 'Docker'],
    image: assetPath('images/project-hifive-pdm-202607.png'),
    imageAlt: 'HI-FIVE 카메라 인식 품질 이상 탐지 PoC 대시보드',
    screenshots: [
      {
        src: assetPath('images/project-hifive-pdm-202607.png'),
        alt: 'HI-FIVE 전후방 카메라 인식 품질 이상 탐지 화면',
        caption: '2차 · 세 가지 탐지 결과와 통합 위험도를 비교하는 품질 이상 탐지 PoC',
      },
      {
        src: assetPath('images/project-hifive-dashboard-202607.png'),
        alt: 'HI-FIVE 스마트 톨링 대시보드',
        caption: '1차 · Edge AI, GPS, 이벤트 수신과 통행 후보를 확인하는 관제 대시보드',
      },
      {
        src: assetPath('images/project-hifive-admin-202607.png'),
        alt: 'HI-FIVE 마스터 관리자 품질 이상 탐지 화면',
        caption: '2차 · 카메라별 품질 추세와 분석 결과를 관리하는 관리자 화면',
      },
    ],
    screensTitle: '1차 통행 처리와 2차 품질 분석',
    link: 'https://github.com/hannip0461/straffic_hi-five-1st-project',
    linkLabel: 'HI-FIVE 저장소',
    resources: [
      { label: '1차 Edge AI 데모', url: 'https://huggingface.co/spaces/hannip0461/hifive-edge-ai-demo' },
      { label: '1·2차 통합 저장소', url: 'https://github.com/hannip0461/straffic_hi-five-1st-project' },
      { label: '1·2차 산출물', url: 'https://coconut-truck-1db.notion.site/371cdef944a180a8bf3be44fcfcd9701' },
      { label: '2차 PdM PoC Backend', url: 'https://hub.docker.com/r/kimmj6466/hifive-pdm-backend' },
      { label: '2차 PdM PoC FastAPI', url: 'https://hub.docker.com/r/kimmj6466/hifive-pdm-fastapi' },
    ],
  },
  {
    id: 'furniture',
    tier: 'secondary',
    detailLevel: 'compact',
    number: '04',
    title: '가구 쇼핑몰 웹 애플리케이션',
    period: '팀 프로젝트 · 2026.03.14–04.12',
    claim: '상품 탐색부터 주문·고객지원·관리자 운영까지 하나의 구매 흐름으로 연결했습니다.',
    badge: '커머스 · 권한 흐름 · Frontend',
    summary:
      '상품 탐색, 장바구니, 주문, 고객지원, 관리자 운영까지 사용자와 관리자 흐름을 분리해 연결한 가구 쇼핑몰 웹 애플리케이션입니다.',
    proof: {
      problemLabel: '개요',
      problem: '가구 상품 탐색만 있는 화면이 아니라, 옵션 선택부터 주문, 고객지원, 관리자 운영까지 이어지는 커머스 흐름을 구현한 프로젝트입니다.',
      solution: '회원/관리자 권한을 나누고, 상품·옵션·재고 검증 → 주문 저장 → 주문내역/관리자 처리 흐름을 연결했습니다.',
      result: '구매자와 관리자의 주요 사용 흐름을 한 서비스 안에서 끊기지 않게 시연할 수 있게 했습니다.',
    },
    caseStudy: {
      requirements: [
        '비회원, 회원, 관리자의 접근 범위와 화면 흐름을 분리해야 했습니다.',
        '상품 옵션과 재고 확인부터 장바구니, 주문 저장, 관리자 처리까지 연결해야 했습니다.',
        '리뷰, QnA, 공지사항을 구매 이후 고객지원 흐름에 포함해야 했습니다.',
      ],
      flow: '상품 탐색 → 장바구니 → 주문/결제 → 고객지원 → 관리자 운영',
      architecture: [
        {
          label: '접근 권한',
          kind: 'input',
          connection: '분기',
          nodes: [
            { title: '비회원·회원', detail: '탐색·구매 흐름' },
            { title: '관리자', detail: '운영 기능' },
          ],
        },
        {
          label: '상품 탐색',
          kind: 'operation',
          connection: '옵션',
          nodes: [
            { title: '카테고리·검색', detail: '추천·목록' },
            { title: '상품 상세', detail: '옵션 선택' },
          ],
        },
        {
          label: '구매 처리',
          kind: 'core',
          connection: '상태',
          nodes: [
            { title: '장바구니', detail: '수량·옵션 검증' },
            { title: '주문·결제', detail: 'API와 화면 상태 연결' },
          ],
        },
        {
          label: '고객지원',
          kind: 'evidence',
          connection: '운영',
          nodes: [
            { title: '리뷰·QnA', detail: '구매 이후 참여' },
            { title: '공지사항', detail: '서비스 안내' },
          ],
        },
        {
          label: '관리자 운영',
          kind: 'operation',
          nodes: [
            { title: '상품·재고·주문', detail: '운영 대시보드' },
            { title: '회원·게시글', detail: '권한 기반 관리' },
          ],
        },
      ],
      problem: [
        '사용자 구매 흐름과 관리자 운영 흐름이 같은 데이터 상태를 기준으로 이어져야 했습니다.',
        '권한에 따라 접근 가능한 기능과 화면을 명확하게 나눌 필요가 있었습니다.',
      ],
      approach: [
        '상품 목록, 상세, 옵션 선택에서 장바구니로 이어지는 구매 흐름을 구성했습니다.',
        '주문 생성, 주문내역, 주문 상태 처리를 사용자와 관리자 화면에서 확인할 수 있게 연결했습니다.',
        '리뷰, QnA, 공지사항을 고객지원과 관리자 운영 흐름에 배치했습니다.',
      ],
      result: [
        '사용자 구매 흐름과 관리자 운영 흐름을 함께 보여줄 수 있는 쇼핑몰 서비스로 정리했습니다.',
      ],
      verification: '비회원/회원/관리자 시나리오 기준 브라우저 테스트 59건 PASS',
    },
    role: '팀장 · 직접 구현: 프론트엔드 · 설계/리딩: UI 흐름과 종합 QA',
    stack: ['Vue 3', 'Pinia', 'Axios', 'Spring Boot', 'JPA', 'PostgreSQL', 'Docker'],
    image: assetPath('images/project-furniture-home-main.jpg'),
    imageAlt: '가구 쇼핑몰 홈 화면',
    screenshots: [
      {
        src: assetPath('images/project-furniture-home-main.jpg'),
        alt: '가구 쇼핑몰 홈 화면',
        caption: '홈 메인과 카테고리 진입 화면',
      },
      {
        src: assetPath('images/project-furniture-category-main.jpg'),
        alt: '가구 쇼핑몰 카테고리 화면',
        caption: '카테고리 상품 목록과 필터 화면',
      },
      {
        src: assetPath('images/project-furniture-detail-main.jpg'),
        alt: '가구 쇼핑몰 상품 상세 화면',
        caption: '상품 상세와 장바구니 진입 화면',
      },
      {
        src: assetPath('images/project-furniture-checkout-main.jpg'),
        alt: '가구 쇼핑몰 주문 작성 화면',
        caption: '주문/결제 정보 입력 화면',
      },
      {
        src: assetPath('images/project-furniture-admin-main.jpg'),
        alt: '가구 쇼핑몰 관리자 대시보드',
        caption: '관리자 운영 대시보드',
      },
    ],
    screensTitle: '구매 흐름 화면',
    link: 'https://github.com/hannip0461/teamweb02',
    linkLabel: '가구 쇼핑몰 저장소',
    resources: [
      { label: '가구 쇼핑몰 저장소', url: 'https://github.com/hannip0461/teamweb02' },
      { label: 'Notion 기록', url: 'https://www.notion.so/de296acf563f838584b301756ee05b67' },
      { label: 'Docker frontend', url: 'https://hub.docker.com/r/kimmj6466/team4-frontend' },
      { label: 'Docker backend', url: 'https://hub.docker.com/r/kimmj6466/team4-backend' },
      { label: 'Docker DB', url: 'https://hub.docker.com/r/kimmj6466/team4-db' },
    ],
  },
  {
    id: 'incheon',
    tier: 'secondary',
    detailLevel: 'compact',
    number: '05',
    title: '인천 문화·관광 웹 애플리케이션',
    period: '팀 프로젝트 · 2026.02.09–03.13',
    claim: '관광 정보 화면을 회원 참여와 운영 관리가 가능한 MVC 서비스로 확장했습니다.',
    badge: '관광 정보 · MVC 확장 · 권한 제어',
    summary:
      '인천 문화·관광 정보 페이지를 Spring Boot 3와 Thymeleaf 기반 회원/게시판 서비스로 확장한 웹 애플리케이션입니다.',
    proof: {
      problemLabel: '개요',
      problem: '인천 문화·관광 정보를 단순 소개 페이지가 아니라 회원 참여와 게시판 운영까지 가능한 서비스형 웹으로 확장한 프로젝트입니다.',
      solution: 'Spring Boot MVC·Thymeleaf·PostgreSQL 기반으로 관광 카테고리, 회원/로그인, 공지·리뷰, 권한 흐름을 연결했습니다.',
      result: '관광 정보 탐색에서 회원 기능, 게시판, 관리자 운영까지 이어지는 웹 서비스 흐름을 만들었습니다.',
    },
    caseStudy: {
      requirements: [
        '지역·테마·문화·교통 정보를 일관된 탐색 구조와 공통 화면으로 구성해야 했습니다.',
        '정적 소개 화면에 회원가입, 로그인, 마이페이지와 게시판 기능을 연결해야 했습니다.',
        '회원과 관리자의 권한에 따라 게시물과 운영 기능을 분리해야 했습니다.',
      ],
      flow: '관광 정보 카테고리 → Spring MVC/Thymeleaf → 회원·공지·리뷰 → 권한/관리자 → Docker 실행 환경',
      architecture: [
        {
          label: '정보 구조',
          kind: 'input',
          connection: '탐색',
          nodes: [
            { title: '지역·테마', detail: '관광 카테고리' },
            { title: '문화·교통', detail: '정보 서브페이지' },
          ],
        },
        {
          label: '화면 계층',
          kind: 'operation',
          connection: 'MVC',
          nodes: [
            { title: '공통 UI', detail: '헤더·메뉴·콘텐츠' },
            { title: 'Thymeleaf', detail: '서버 렌더링 화면' },
          ],
        },
        {
          label: '서비스 로직',
          kind: 'core',
          connection: 'JPA',
          nodes: [
            { title: 'Spring Boot MVC', detail: '회원·게시판' },
            { title: '권한 제어', detail: '회원·관리자 분리' },
          ],
        },
        {
          label: '데이터',
          kind: 'data',
          connection: '배포',
          nodes: [
            { title: 'PostgreSQL', detail: '회원·공지·리뷰' },
          ],
        },
        {
          label: '배포',
          kind: 'operation',
          nodes: [
            { title: 'Docker', detail: '동일 실행 환경' },
            { title: 'GitHub Pages', detail: '정적 화면 공개' },
          ],
        },
      ],
      problem: [
        '여러 관광 서브페이지가 늘어나도 공통 레이아웃과 탐색 구조가 흔들리지 않아야 했습니다.',
        '정보 제공 화면과 회원·게시판·관리자 기능을 하나의 MVC 흐름으로 연결해야 했습니다.',
      ],
      approach: [
        '지역, 테마, 문화, 교통 기준의 관광 서브페이지와 공통 레이아웃을 구성했습니다.',
        '회원가입, 로그인, 마이페이지 흐름을 Spring MVC와 Thymeleaf 화면으로 연결했습니다.',
        '공지, 리뷰, 관리자 권한을 DB와 화면 흐름 기준으로 분리했습니다.',
      ],
      result: [
        '정적 정보 페이지를 회원 참여와 운영 관리가 가능한 Spring Boot MVC 서비스로 정리했습니다.',
      ],
      verification: '비회원 접근, 회원가입/로그인, 마이페이지, 리뷰 게시판, 관리자 기능, 관광 서브페이지 흐름 확인',
    },
    role: '팀장 · 직접 구현: 웹 퍼블리싱·공통 UI·주요 페이지 · 설계: 화면 구조',
    stack: ['Spring Boot 3', 'Thymeleaf', 'PostgreSQL', 'HTML5', 'CSS', 'JavaScript', 'Docker'],
    image: assetPath('images/project-incheon-main.jpg'),
    imageAlt: '인천 문화 관광 웹 애플리케이션 메인 화면',
    screenshots: [
      {
        src: assetPath('images/project-incheon-main.jpg'),
        alt: '인천 문화 관광 웹 애플리케이션 메인 화면',
        caption: '카테고리 기반 관광 정보 탐색 화면',
      },
      {
        src: assetPath('images/project-incheon-sub.jpg'),
        alt: '인천 문화 관광 서브페이지 화면',
        caption: '관광 정보 서브페이지 화면',
      },
      {
        src: assetPath('images/project-incheon-review.jpg'),
        alt: '인천 문화 관광 리뷰 게시판 화면',
        caption: '여행후기 게시판 화면',
      },
    ],
    screensTitle: '관광 정보와 참여 화면',
    link: 'https://github.com/teamweb802/teamweb01',
    linkLabel: '인천 관광 서비스 저장소',
    resources: [
      { label: 'GitHub Pages', url: 'https://teamweb802.github.io/teamweb01/' },
      { label: '인천 관광 서비스 저장소', url: 'https://github.com/teamweb802/teamweb01' },
      { label: 'Notion 기록', url: 'https://www.notion.so/15972bc8fbb78217aaa601ec207feadf?source=copy_link' },
    ],
  },
]

export const additionalProjects: AdditionalProject[] = []

export const experience: ExperienceItem[] = [
  {
    company: '대영전기',
    period: '2024.11–2025.12',
    position: '현장 운영 지원 · 계약직',
    detail:
      '현대자동차 울산 현장에서 자재, 인원·근태, 안전·행정 문서 흐름을 지원했습니다.',
  },
  {
    company: '(주)모아데이타',
    period: '2021.07–2022.12',
    position: '개발자 · 정규직',
    detail:
      'C/C++ 규칙 추론 엔진 유지보수, 규칙·온톨로지 로직, MariaDB 연동, Fact 데이터 변환을 담당했습니다.',
  },
]

export const capabilities: CapabilityGroup[] = [
  {
    title: 'Backend & Distributed Systems',
    items: [
      { label: '.NET / Microsoft Orleans', evidence: 'ASTRA의 플레이어별 명령 직렬화와 2-Silo 분산 실행 구성' },
      { label: 'Java / Spring Boot', evidence: '회원, 게시판, 주문, 관리자 API와 MVC 서비스 구현' },
      { label: 'Python / FastAPI', evidence: 'Edge Ingress, AI API, NEO 오케스트레이션 경계 구현' },
      { label: 'PostgreSQL / Redis', evidence: '트랜잭션 정합성, 원장·감사, 멱등 응답과 조회 가속 구성' },
      { label: 'HTTP / TCP + Protobuf', evidence: 'ASTRA와 HI-FIVE의 전송 경계와 command/event 계약 구성' },
    ],
  },
  {
    title: 'Reasoning & AI',
    items: [
      { label: 'C / C++', evidence: '기존 규칙 추론 엔진 유지보수와 로직 분석 경험' },
      { label: 'NEO Rule Engine', evidence: 'Fact, Rule, ATMS/CF와 Decision 흐름으로 판단 근거 구조화' },
      { label: 'Ontology / Neo4j', evidence: '룰·이벤트·판단 관계를 그래프 계보로 추적' },
      { label: 'NEMI RAG', evidence: 'NEO 판단과 분리된 VectorDB/RAG 문서 근거 검색 구성' },
      { label: 'YOLO / CRNN-OCR', evidence: 'HI-FIVE 차량 번호판 탐지와 문자 판독 파이프라인 구현' },
    ],
  },
  {
    title: 'Frontend & Infra',
    items: [
      { label: 'Vue 3 / TypeScript', evidence: '포폴/운영 화면을 컴포넌트와 데이터로 분리' },
      { label: 'Pinia / Axios', evidence: '상태 관리와 API 호출 경계를 화면 흐름에 맞춰 분리' },
      { label: 'Docker / Kubernetes', evidence: '멀티 서비스 이미지, Compose와 Helm 배포 구성 검증' },
      { label: 'OpenTelemetry / Elastic', evidence: 'API·TCP·DB·Worker trace와 운영 지표 대시보드 구성' },
      { label: 'GitHub Actions / Pages', evidence: '자동 테스트·이미지 발행과 정적 포트폴리오 배포' },
    ],
  },
]

export const educationItems: EducationItem[] = [
  {
    title: '[에스트래픽] 스마트 모빌리티 DX Academy',
    period: '2025.12.29–2026.07.02',
    detail: '스마트 모빌리티, ITS, Full Stack 프로젝트 과정',
  },
  {
    title: '유원대학교 스마트IT학과',
    period: '2015.03–2022.02',
    detail: '학점 4.13 / 4.5 · 소프트웨어, Android, 임베디드, C/C++, Java, Python',
  },
]
