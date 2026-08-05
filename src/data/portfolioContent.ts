export interface ProjectScreenshot {
  src?: string
  alt: string
  caption: string
  objectPosition?: 'top' | 'center'
  lightboxCrop?: boolean
}

export interface ProjectTerm {
  term: string
  description: string
}

export interface ProjectResource {
  label: string
  url: string
  kind?: 'demo'
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
  problem: string
  action: string
  result: string
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
    verification: string[]
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
    period: '개인 프로젝트 (2026.07.06~07.13, 보강 08.02)',
    claim: '동시 요청에도 재화\u00a0정합성을 지키고 장애를 복구하는 게임\u00a0운영\u00a0서버입니다.',
    badge: '분산 상태 정합성, LiveOps 복구, 관측성',
    summary:
      'Orleans Grain으로 플레이어별 명령을 직렬화하고, PostgreSQL 트랜잭션으로 상태와 원장, 감사 기록을 함께 저장했습니다. 콘텐츠 배포 버전과 영향 대상을 남겨 롤백과 보상 절차로 연결했습니다.',
    proof: {
      problemLabel: '개요',
      problem:
        '수집형 RPG 운영에서는 중복 요청과 콘텐츠 배포 실수가 재화, 보상 오류로 이어질 수 있습니다.',
      solution:
        'Orleans Grain의 플레이어별 직렬화와 PostgreSQL 원자적 트랜잭션으로 멱등 처리 구조를 적용하고, 콘텐츠 롤백과 사고 보상 절차를 연결했습니다.',
      result:
        '전체 테스트 108건 통과, 실제 PostgreSQL과 HTTP/TCP E2E, 2-Silo, Docker 이미지 5종 기동 확인',
    },
    caseStudy: {
      requirements: [
        '동일 요청 재전송: 재화 차감과 보상은 한 번만 반영',
        '동시 명령: 플레이어 상태, 원장, 감사 기록은 같은 결과를 유지',
        '콘텐츠 배포 사고: 이전 버전으로 되돌리고 영향 대상만 보상',
      ],
      flow: '명령 처리와 PostgreSQL 트랜잭션을 중심으로, 커밋 이후 비동기 처리와 LiveOps 복구 경로가 분기되는 구조',
      architectureImage: {
        src: assetPath('images/project-astra-system-architecture-approved.png'),
        alt: 'ASTRA의 동기 명령, PostgreSQL 커밋, 비동기 후속 처리와 LiveOps 복구 경로를 연결한 시스템 구조',
        caption: '동기 명령, Post-Commit, LiveOps 복구 경로',
      },
      architectureMap: {
        variant: 'astra',
        boundary: 'PostgreSQL이 상태, 원장, 감사, 멱등 응답의 기준 데이터',
        lanes: [
          {
            label: '동기 명령 경로',
            description: '재시도와 동시 요청을 한 번의 결과로 고정',
            tone: 'primary',
            nodes: [
              { title: 'HTTP / TCP', detail: '동일 command 계약' },
              { title: 'API / Gateway', detail: '인증, 검증, 요청 해석' },
              { title: 'PlayerAccountGrain', detail: '플레이어별 명령 직렬화' },
              { title: 'PostgreSQL transaction', detail: '상태, 원장, 감사, 응답 원자적 commit' },
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
              { title: 'OpenTelemetry / Elastic', detail: 'trace, 지표, 경보 확인' },
            ],
          },
          {
            label: 'LiveOps 복구 경로',
            description: '잘못된 배포를 되돌리고 영향 대상에게 보상',
            tone: 'control',
            nodes: [
              { title: 'Blazor Admin', detail: '배포, 롤백, 보상 명령' },
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
          problem: '재전송과 동시 명령이 겹치면 같은 재화 차감이나 보상이 여러 번 반영되고, 응답이 유실된 뒤에는 처리 여부를 구분하기 어려웠습니다.',
          action: '플레이어별 명령은 Orleans Grain에서 직렬화하고 Idempotency-Key와 요청 hash로 동일 요청을 판별했습니다. 상태, 원장, 감사, Outbox와 완료 응답은 한 PostgreSQL 트랜잭션에 저장했습니다.',
          result: '동시 요청과 응답 유실 뒤 재시도에서도 저장된 완료 결과를 재사용해 재화와 보상이 한 번만 반영되는 것을 실제 PostgreSQL 통합 테스트로 확인했습니다.',
        },
        {
          title: '커밋 이후 작업이 장애로 사라지지 않게 하기',
          problem: '명령 처리는 끝났지만 후속 이벤트를 전달하던 Worker가 중간에 종료되면, 저장된 상태와 운영 이벤트의 처리 결과가 어긋날 수 있었습니다.',
          action: '상태 변경과 Outbox 이벤트를 같은 PostgreSQL 트랜잭션에 저장했습니다. Worker는 lease와 재시도로 전달하고, 소비자는 event_id를 기준으로 중복 반영을 막으며 반복 실패는 dead-letter로 격리했습니다.',
          result: '소비자 반영 직후 Worker를 종료한 상황에서도 lease 만료 후 다시 전달됐고, 운영 결과는 한 번만 반영된 채 Outbox가 정상 완료되는 것을 장애 테스트로 확인했습니다.',
        },
        {
          title: '콘텐츠 사고의 복구 대상을 추측하지 않기',
          problem: '잘못된 콘텐츠가 배포되면 어떤 버전에서 누구에게 영향을 줬는지 사후에 다시 찾아야 했고, 보상을 중복 지급할 위험도 있었습니다.',
          action: '배포 snapshot과 checksum을 불변 기록으로 남기고, rollback 시점의 영향 대상 snapshot을 기준으로 Incident Mail을 한 번만 지급하도록 구성했습니다.',
          result: '배포 버전, 롤백, 영향 대상 확정, 사고 보상과 감사 기록이 하나의 복구 절차로 이어지는 것을 운영 화면과 장애 시나리오에서 확인했습니다.',
        },
      ],
      result: [
        '동일 요청이 다시 오거나 응답이 유실되어도 저장된 완료 결과를 재사용해 재화와 보상을 한 번만 반영했습니다.',
        '콘텐츠 버전, 롤백, 영향 대상, 사고 보상, 감사 기록을 하나의 복구 절차로 연결했습니다.',
      ],
      verification: [
        '단위 76건, 동시성 1건, 실패 주입 2건, 통합 29건을 합친 전체 테스트 108건을 통과했습니다.',
        '실제 PostgreSQL과 HTTP/TCP E2E를 확인하고, ADO.NET 멤버십에서 Silo 2개 등록과 한 Silo 종료 후 생존을 검증했습니다.',
        'Docker 이미지 5종을 non-root로 실제 기동했고, 릴리스 빌드 경고와 취약 패키지 0건, 최신 main GitHub Actions 통과를 확인했습니다.',
      ],
      verificationBoundary:
        '현재 확인 범위는 Helm lint와 template, Terraform validate까지입니다.\n실제 Kubernetes 배포와 Azure Terraform apply, 운영 규모의 처리량은 추가 검증이 필요합니다.',
    },
    role: '개인 프로젝트, 서버 아키텍처와 정합성, 운영 복구, 테스트 및 배포',
    stack: ['.NET 10', 'ASP.NET Core', 'Microsoft Orleans', 'PostgreSQL', 'Redis', 'Blazor', 'OpenTelemetry', 'Docker'],
    image: assetPath('images/project-astra-content-ops.png'),
    imageAlt: 'ASTRA 콘텐츠 배포와 롤백 운영 화면',
    screenshots: [
      {
        src: assetPath('images/project-astra-content-ops.png'),
        alt: 'ASTRA 콘텐츠 배포와 롤백 화면',
        caption: '배포 버전, checksum을 고정하고 즉시 rollback하는 LiveOps 복구 화면',
      },
      {
        src: assetPath('images/project-astra-incident-mail.png'),
        alt: 'ASTRA 사고 대상자 보상 화면',
        caption: '영향 대상 snapshot과 Incident Mail 보상 화면',
      },
      {
        src: assetPath('images/project-astra-outbox.png'),
        alt: 'ASTRA Transactional Outbox 운영 화면',
        caption: 'Outbox 재시도, dead-letter 관리 화면',
      },
      {
        src: assetPath('images/project-astra-observability.png'),
        alt: 'ASTRA Kibana 관측성 대시보드',
        caption: 'Kibana trace, PostgreSQL 장애 지표 대시보드',
      },
      {
        src: assetPath('images/project-astra-operations.png'),
        alt: 'ASTRA Trace와 PostgreSQL SLO 및 Outbox 운영 지표 대시보드',
        caption: 'Trace 수신량, PostgreSQL SLO와 Outbox 발행 및 재시도를 함께 확인하는 운영 지표',
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
    period: '개인 프로젝트 (2026.06.08~08.03)',
    claim: '여러 관제 신호를 함께 따져 위험도와 대응 수준을 조정하는 ITS\u00a0관제\u00a0시스템입니다.',
    badge: '규칙 추론, XAI 계보, AWS 운영',
    summary:
      '단일 경보를 그대로 위험으로 확정하지 않고, 속도, 정체, CCTV 상태 등 여러 Fact의 지지 근거와 충돌 근거를 함께 확인했습니다. ATMS와 CF로 판단 신뢰도를 계산해 위험도와 대응 가이드를 만들고, 운영 화면에서 그 근거를 검토할 수 있게 했습니다.',
    proof: {
      problemLabel: '개요',
      problem:
        '한 센서의 경보만으로 위험을 확정하면, 다른 센서가 정상인 상황에서도 과잉 대응하거나 반대로 중요한 충돌 신호를 놓칠 수 있었습니다.',
      solution:
        'FastAPI가 입력을 공통 Fact로 정규화하고, ATMS가 지지 근거와 충돌 근거를 구분하도록 했습니다. NEO는 CF로 판단 신뢰도를 계산하고 후속 규칙으로 위험도와 대응 가이드를 조정해 Decision Package에 함께 남깁니다.',
      result:
        'Python 테스트 219건 통과, PC와 모바일 6개 화면 및 AWS 실시간 파이프라인 검증',
    },
    caseStudy: {
      requirements: [
        '입력 통합: ITS CSV, 교통 API, CCTV, VMS, TAAS를 공통 Fact로 변환',
        '판단 조정: 지지 근거와 충돌 근거, CF를 반영해 위험도와 대응 가이드를 생성',
        '판단 재현과 운영자 통제: Fact, Rule, 지식 버전과 승인 이력을 함께 보존',
      ],
      flow: '관제 입력 → Canonical Fact → ATMS 지지 근거와 충돌 근거 검토 → CF 신뢰도 계산 → 위험도와 대응 가이드 → 운영자 검토',
      architectureImage: {
        src: assetPath('images/project-neo-system-architecture-approved.png'),
        alt: 'ITS, CCTV, VMS, TAAS 입력부터 NEO 판단, 읽기 전용 근거, 운영자 승인과 감사 피드백까지 연결한 시스템 구조',
        caption: 'NEO 판단, 읽기 전용 근거, 운영자 승인과 감사',
      },
      architectureMap: {
        variant: 'neo',
        boundary: 'AWS EC2, Docker Compose, HTTPS는 처리 단계가 아닌 실행 환경',
        lanes: [
          {
            label: '판단 경로',
            description: '관제 입력을 같은 기준으로 해석하고 결정 패키지 생성',
            tone: 'primary',
            nodes: [
              { title: 'ITS, CCTV, VMS, TAAS', detail: '속도, 정체, 시야, 사고 입력' },
              { title: 'Canonical Fact', detail: '출처, 시간, 자산 기준 통일' },
              { title: 'NEO Rule Engine', detail: 'Rule KB, ATMS, CF 판단' },
              { title: 'Decision Package', detail: '판단, 근거, KB 버전 고정' },
            ],
          },
          {
            label: '읽기 전용 근거',
            description: '판단을 바꾸지 않고 운영자 검토에 필요한 근거만 조회',
            tone: 'secondary',
            source: { title: 'Decision Package', detail: '판단 결과와 조회 기준' },
            branches: [
              { title: 'Neo4j 판단 계보', detail: 'Fact → Rule → Decision' },
              { title: 'NEMI 문서 근거', detail: 'Qdrant 벡터 검색, SOP, 정책' },
            ],
            outcome: { title: 'Operator UI', detail: '판단과 두 근거를 함께 제시' },
          },
          {
            label: '사람의 통제',
            description: '자동 송출 없이 검토, 승인, 감사 상태를 보존',
            tone: 'control',
            nodes: [
              { title: '운영자 검토', detail: '계보, 문서, 영향 범위 확인' },
              { title: '승인 / 보류', detail: '최종 조치 권한은 운영자' },
              { title: '조치 / 감사 이력', detail: '감사 ID로 판단과 상태 재현' },
            ],
          },
        ],
      },
      decisions: [
        {
          title: '단일 경보를 곧바로 위험으로 확정하지 않기',
          problem: '카메라가 시야 제한을 감지해도 속도와 정체 흐름이 정상이라면 단일 경보만으로 같은 위험도와 조치를 적용하기 어려웠습니다.',
          action: '관제 입력을 공통 Fact로 정리하고 ATMS가 지지 근거와 충돌 근거를 나누도록 했습니다. CF에는 출처 신뢰도, 감지 신뢰도와 최신성을 반영하고 후속 규칙으로 위험도와 대응 가이드를 조정했습니다.',
          result: '정체와 시야 제한이 함께 나타난 사건은 운영자 승인 대상으로, 시야 제한만 있고 교통 흐름이 정상인 사건은 관찰 후 재확인 대상으로 구분했습니다.',
        },
        {
          title: 'RAG 설명이 규칙 판단을 덮어쓰지 않게 하기',
          problem: '문서 검색과 설명 모델의 답을 판단 결과와 섞으면, 실제 규칙이 내린 결론과 검색으로 보충한 설명의 경계가 흐려질 수 있었습니다.',
          action: 'NEO만 Decision Package의 판단과 우선순위를 만들도록 했습니다. Neo4j는 판단 계보를, NEMI는 관련 문서를 조회하고 설명 모델은 이 근거를 읽어 설명만 하도록 역할을 나눴습니다.',
          result: '공개 파이프라인에서 NEO 판단을 유지한 채 Neo4j 20개 노드와 28개 관계, NEMI 문서 2건을 함께 반환하고 설명 화면에 연결했습니다.',
        },
        {
          title: '근거 확인과 운영자 조치를 한 번의 버튼으로 끝내지 않기',
          problem: '권고 조치를 곧바로 송출하거나 확인 버튼만 두면 오탐과 현장 예외를 검토한 이유가 운영 기록에 남지 않습니다.',
          action: 'VMS 조치는 승인 전 송출하지 않고, 보류와 오탐 요청은 확인 절차와 사유 입력을 거쳐 감사 ID와 함께 저장하도록 만들었습니다.',
          result: '취소하면 기록이 남지 않고, 사유를 입력한 경우에만 운영자 조치가 한 건 생성되는 흐름을 PC와 모바일에서 확인했습니다.',
        },
      ],
      result: [
        '여러 관제 입력을 함께 검토해 지지 근거가 충분한 사건과 충돌 신호가 있는 사건의 대응 수준을 구분했습니다.',
        '판단에 사용한 Fact, Rule, 신뢰도, 충돌 근거와 권고 조치를 Decision Package와 계보에 남겨 운영 화면에서 재현했습니다.',
        '운영자가 취소하면 기록이 남지 않고, 사유를 입력한 경우에만 감사 이력이 한 건 생성됩니다.',
      ],
      verification: [
        'Python 단위 테스트 219건과 Vue 프로덕션 빌드가 통과했습니다.',
        'AWS 공개 화면 6개를 PC와 모바일에서 확인하고, 운영자 조치의 취소와 사유 기록 흐름을 다시 점검했습니다.',
        '실시간 파이프라인은 3.15초에 완료됐으며 Neo4j 20노드, 28관계와 NEMI 문서 2건이 연결됐습니다.',
      ],
      verificationBoundary:
        '테스트 데이터에서는 추론 결과가 예상대로 나오는지 확인했습니다.\n현장 데이터로 정량 평가하지 못해 실환경 정확도와 일반화 성능은 추가\u00a0검증이 필요합니다. AI4I와 C-MAPSS는 각각 참조 규칙과 시뮬레이션 기준값으로 사용했습니다.',
    },
    role: '개인 프로젝트, 판단 근거 연동 구조와 NEO\u00a0추론\u00a0경계, FastAPI\u00a0운영\u00a0UI, AWS\u00a0배포\u00a0구현',
    stack: ['C/C++', 'Python / FastAPI', 'Vue 3', 'Neo4j / Qdrant', 'Docker / AWS EC2'],
    image: assetPath('images/project-neo-v2-dashboard.png'),
    imageAlt: 'NEO 사건 판단과 운영자 조치 검토 화면',
    screenshots: [
      {
        src: assetPath('images/project-neo-v2-dashboard.png'),
        alt: 'NEO 사건 판단과 운영자 조치 검토 화면',
        caption: '사건, 판단 근거, 현재 조치를 한 화면에서 검토',
      },
      {
        src: assetPath('images/project-neo-decision-pipeline-live.png'),
        alt: 'NEO 규칙 추론과 문서 근거 검색 및 Neo4j 판단 계보 실행 화면',
        caption: '운영 화면에 표시되기 전, 같은 실행 ID로 규칙 추론, 문서 근거 검색과 Neo4j 계보를 연결',
      },
      {
        src: assetPath('images/project-neo-v2-lineage.png'),
        alt: 'NEO Neo4j 전체 판단 계보 화면',
        caption: '관측 Fact부터 규칙과 판단까지 이어지는 Neo4j 계보',
      },
      {
        src: assetPath('images/project-neo-v2-predictive.png'),
        alt: 'NEO 설비 예지와 이상 분석 화면',
        caption: 'LSTM 잔차와 기준선을 거쳐 이상 신호를 NEO 판단으로 연결',
      },
      {
        src: assetPath('images/project-neo-v2-logs.png'),
        alt: 'NEO 판단과 조치 감사 이력 화면',
        caption: '사건별 판단과 운영자 조치를 감사 ID로 재현',
      },
    ],
    terms: [
      {
        term: 'NEO',
        description:
          'Fact, Rule, ATMS, CF로 판단하는 규칙 추론 엔진입니다. 교수님께 포트폴리오 사용 허가를 받아 엔진의 흐름을 이해한 뒤 ITS 관제 서비스에 적용했습니다. 입력 정규화, 판단 근거 연동, 운영 화면, AWS 배포는 직접 구현했습니다.',
      },
      {
        term: 'ATMS',
        description:
          'Assumption-based Truth Maintenance System(가정 기반 진리 유지 시스템) 계열. 가정/사실의 정합성과 충돌 시 유지, 철회 대상을 관리하는 개념입니다.',
      },
      {
        term: 'CF',
        description:
          'Certainty Factor(확신도) 계열. 규칙 기반 전문가 시스템에서 판단의 신뢰 정도를 수치화하는 개념입니다.',
      },
      {
        term: 'NEMI',
        description:
          '직접 만든 문서 근거 검색 모듈입니다. 판단 결과를 바꾸지 않고 관련 SOP와 정책 문서를 찾아 운영자 검토 화면에 제공합니다. Qdrant 벡터 검색을 사용하며, 단독 실행 시에는 어휘 기반 검색으로 전환됩니다.',
      },
    ],
    screensTitle: '판단 근거와 운영 기록',
    link: neoOperatorUrl,
    linkLabel: 'NEO 화면 보기',
    resources: [
      ...neoResources,
      {
        label: 'AWS 배포 기록',
        url: 'https://github.com/hannip0461/NEO-Intelligent-ITS-Operator/blob/main/docs/deployment/AWS_EC2_DEPLOYMENT.md',
      },
      {
        label: 'v2.0.0 릴리즈 기록',
        url: 'https://github.com/hannip0461/NEO-Intelligent-ITS-Operator/blob/main/docs/releases/NEO_V2.0.0.md',
      },
    ],
  },
  {
    id: 'hifive',
    tier: 'primary',
    detailLevel: 'full',
    number: '03',
    title: 'HI-FIVE Smart Tolling + PdM PoC',
    period: '팀 프로젝트 (1차 2026.04.27~06.01, 2차 06.04~06.30)',
    claim: '현장 Edge AI로 차량 번호판을 인식하고, 망 장애 대응과 품질 저하 예측까지 연결한 스마트 톨링 시스템입니다.',
    badge: 'Edge AI, 망 이중화, 예지보전',
    summary:
      '1차에서는 영상 추론을 현장 Jetson에서 처리하고 결과만 중앙으로 보내며, 주망 장애 시 예비망으로 전환하도록 구성했습니다. 2차에서는 세 가지 분석 방식으로 즉시 이상부터 장기적인 품질 저하 흐름까지 확인했습니다.',
    proof: {
      problemLabel: '개요',
      problem: '영상 추론을 중앙에서 처리하면 네트워크와 서버 부담이 커지고, 망 장애나 인식 품질 저하가 생기면 통행 결과의 신뢰도도 함께 낮아질 수 있었습니다.',
      solution: '현장 Edge에서 번호판을 인식해 결과 이벤트만 전송하고 주망과 예비망을 구성했습니다. 품질 지표는 Rule-Based, Isolation Forest, LSTM-AE로 나눠 분석했습니다.',
      result: 'Edge AI 통행 이벤트, 주망과 예비망 전환, 세 가지 분석 방식의 품질 탐지와 알림을 단계별 검증',
    },
    caseStudy: {
      requirements: [
        '1차 Edge AI: 현장에서 번호판을 인식하고 영상 대신 결과 이벤트만 중앙으로 전송',
        '1차 전송 복구: Passage Event 재시도와 주망, 예비망 전환으로 통행 이벤트 유지',
        '2차 예지보전: 즉시 임계값, 복합 패턴, 장기 시계열로 품질 저하를 나눠 확인',
      ],
      flow: '현장 Edge 인식 → 주망과 예비망 전송 → 중앙 저장과 관제 → 품질 지표 축적 → 세 가지 방식의 이상 탐지 → 화면과 이메일 알림',
      architectureImage: {
        src: assetPath('images/project-hifive-system-architecture-approved.png'),
        alt: '현장 Edge의 1차 스마트 톨링과 중앙 시스템의 2차 품질 이상 탐지 PoC를 분리한 시스템 구조',
        caption: '1차 Smart Tolling, 2차 Quality Anomaly Detection PoC',
      },
      architectureMap: {
        variant: 'hifive',
        boundary: '현장 Edge와 중앙 시스템 사이의 전송, 저장 경계를 명확히 분리',
        lanes: [
          {
            label: '1차 스마트 톨링',
            description: 'Edge 인식 결과를 재시도 가능한 통행 이벤트로 전달',
            tone: 'primary',
            nodes: [
              { title: 'Camera / GPS', detail: '전후방 영상, 위치, 통행 시점' },
              { title: 'Jetson YOLO/OCR', detail: '탐지, 문자 후보, Best-Fit' },
              { title: 'Passage Event', detail: 'Protobuf 이벤트 계약' },
              { title: 'WebTransport Ingress', detail: 'ACK, RETRY, REJECT' },
              { title: 'Spring / PostgreSQL', detail: '저장, 위치 판정, 검수 후보' },
              { title: '관제 / 통행 검수', detail: 'ACCEPT, REVIEW, REJECT' },
            ],
          },
          {
            label: '2차 품질 이상 탐지 PoC',
            description: '저장된 카메라 품질 지표에서 복합 이상 징후를 탐색',
            tone: 'secondary',
            nodes: [
              { title: '품질 지표', detail: 'OCR 신뢰도, 성공률, 전후방 일치율' },
              { title: 'PdM API / Scheduler', detail: '분석 계약, 주기 실행' },
              { title: 'Rule / IF / LSTM\u2011AE', detail: '서로 다른 방식의 이상 점수' },
              { title: '통합 위험도', detail: '고정 시나리오 기준 결과 결합' },
              { title: 'Dashboard / Email', detail: '위험 상태, 권장 조치 알림' },
            ],
          },
        ],
      },
      decisions: [
        {
          title: '1차: 중앙이 아닌 현장에서 영상 추론을 끝내기',
          problem: 'FHD 영상을 중앙으로 보내 추론하면 통신량과 서버 부하가 늘고, 고속 차량을 실시간으로 처리하기 어려웠습니다.',
          action: 'Jetson에서 GStreamer와 CUDA Memory를 ZeroCopy로 연결하고 TensorRT FP16으로 YOLO와 OCR 추론을 처리했습니다. 중앙에는 영상 대신 번호판과 GPS를 묶은 Passage Event만 보냈습니다.',
          result: '불필요한 CPU와 GPU 사이의 메모리 복사를 줄이고, 중앙 서버는 정산과 관제에 집중하는 구조로 분리했습니다.',
        },
        {
          title: '1차: 리사이즈 대신 필요한 영역을 다시 배치',
          problem: '1920x1080 영상에는 번호판과 무관한 상하 배경이 많았고, 전체 화면을 매번 리사이즈하면 처리 자원과 문자 품질을 함께 잃을 수 있었습니다.',
          action: '불필요한 상하 영역을 덜어낸 뒤 차선별 960x480 두 영역을 위아래로 붙여 960x960 입력을 만들었습니다. 픽셀 크기는 바꾸지 않고 번호판 영역이 더 크게 보이도록 했습니다.',
          result: '리사이즈 단계를 없애 입력 이미지 용량을 2.1MB에서 0.9MB로 줄였고, 발표자료 내부 비교에서는 상용 OCR보다 인식 정확도가 15% 높게 나타났습니다.',
        },
        {
          title: '1차: Edge 성능에 맞는 OCR과 다중 프레임 판정',
          problem: '한 프레임의 OCR 결과만 쓰면 고속 주행과 흔들림에 따라 인식이 달라지고, 무거운 모델은 Jetson에서 반복 추론하기 어려웠습니다.',
          action: 'Attention, Transformer, VLM을 비교한 뒤 가벼운 CRNN을 선택했습니다. 30ms 단위의 추론 결과를 50건 이상 모아 신뢰도와 일치율로 Best-Fit을 골랐습니다.',
          result: '100km/h 테스트 환경에서도 번호판 후보를 누적해 통행 이벤트를 만들고, 일치율이 낮은 건은 needs_review로 분리했습니다.',
        },
        {
          title: '1차: 빠른 전송과 24시간 운영을 함께 고려',
          problem: '유선망도 특정 상황에서 끊길 수 있어, 24시간 운영을 고려하면 평상시 전송 속도뿐 아니라 장애 이후의 연속성도 필요했습니다.',
          action: 'WebTransport와 MQTT를 유선망과 LTE에서 비교해 WebTransport를 선택했습니다. Watchdog가 주망을 감시하다 장애를 감지하면 예비 무선망으로 자동 전환하도록 구성했습니다.',
          result: '3000장 유선망 시험에서 전송 시간이 8.4초로 MQTT QoS1의 63.4초보다 짧았고, 장애 시나리오에서는 3초 이내 예비망 전환과 이벤트 연속 전송을 확인했습니다.',
        },
        {
          title: '2차: 즉시 이상부터 장기 열화까지 나눠서 탐지',
          problem: 'OCR 신뢰도와 성공률은 갑자기 떨어지기도 하고 여러 지표의 조합이나 긴 시간의 변화로 나타나기도 해 한 가지 기준만으로 품질 저하를 설명하기 어려웠습니다.',
          action: 'Rule-Based는 현재 임계값, Isolation Forest는 여러 지표의 조합, LSTM-AE는 시간에 따라 이어지는 열화 흐름을 맡도록 나누고 결과를 통합 위험도로 결합했습니다.',
          result: '고정 및 실시간 시나리오에서 즉시 이상, 복합 패턴과 장기적인 품질 저하 흐름을 구분하고, 위험도와 권장 조치를 화면과 이메일로 전달했습니다.',
        },
      ],
      result: [
        '1차에서는 Edge 인식 결과를 통행 이벤트로 전송하고, 중앙\u00a0저장, 위치 판정, 관제 검수까지 연결했습니다.',
        '2차에서는 품질 지표를 세 가지 방식으로 분석하고, 통합\u00a0위험도와 권장 조치를 화면 및 이메일로 전달했습니다.',
      ],
      verification: [
        '1차 입력과 추론에서는 리사이즈 없는 960x960 입력, CRNN 반복 추론과 Best-Fit 판정이 통행 이벤트로 이어지는 흐름을 확인했습니다.',
        '전송에서는 3000장 기준 WebTransport와 MQTT를 비교하고, 주망 장애 시 3초 이내 예비망 전환과 ACK/RETRY/REJECT 처리를 확인했습니다.',
        '2차에서는 세 가지 분석 방식이 고정 및 실시간 시나리오를 처리하고, 통합 결과가 화면과 이메일 알림으로 이어지는 흐름을 확인했습니다.',
      ],
      verificationBoundary:
        '고정 및 실시간 시나리오에서 품질 저하 징후가 탐지, 표시, 알림으로 이어지는 흐름을 확인했습니다.\n실제 현장 고장 라벨을 활용한 예측 성능은 추가 검증이 필요합니다.',
    },
    role: '팀장',
    rolePhases: [
      { label: '1차', detail: 'Jetson YOLO/CRNN-OCR, 입력 영상 최적화와 Best-Fit, WebTransport Ingress, 망 전환 테스트' },
      { label: '2차', detail: 'PdM Backend, FastAPI 세 가지 방식의 분석, 테스트와 이메일 알림 통합' },
    ],
    stack: ['Jetson / DeepStream', 'YOLO / CRNN-OCR', 'WebTransport / Protobuf', 'Spring Boot', 'FastAPI', 'PostgreSQL', 'Isolation Forest / LSTM-AE', 'Vue 3 / Docker'],
    image: assetPath('images/project-hifive-dashboard-202607.png'),
    imageAlt: 'HI-FIVE 차량 번호판 인식 스마트 톨링 대시보드',
    screenshots: [
      {
        src: assetPath('images/project-hifive-dashboard-202607.png'),
        alt: 'HI-FIVE 스마트 톨링 대시보드',
        caption: '1차 Edge AI, GPS, 이벤트 수신, 통행 후보 관제 대시보드',
      },
      {
        src: assetPath('images/project-hifive-input-optimization.png'),
        alt: 'HI-FIVE 입력 영상 최적화 비교',
        caption: 'FHD 입력의 불필요한 영역을 덜어내고 리사이즈 없이 960x960으로 재구성한 입력 최적화',
      },
      {
        src: assetPath('images/project-hifive-network-failover.png'),
        alt: 'HI-FIVE 주망과 예비망 자동 전환 구조',
        caption: 'Watchdog가 주망 장애를 감지하면 3초 이내 예비 무선망으로 전환하는 망 이중화',
      },
      {
        src: assetPath('images/project-hifive-pdm-202607.png'),
        alt: 'HI-FIVE 전후방 카메라 인식 품질 이상 탐지 화면',
        caption: '2차 Rule, Isolation Forest, LSTM\u2011AE 결과와 통합 위험도',
      },
      {
        src: assetPath('images/project-hifive-admin-202607.png'),
        alt: 'HI-FIVE 마스터 관리자 품질 이상 탐지 화면',
        caption: '2차 카메라별 품질 추세와 분석 결과 관리자 화면',
      },
    ],
    screensTitle: '1차 입력과 전송 최적화, 2차 품질 분석',
    link: 'https://github.com/hannip0461/straffic_hi-five-1st-project',
    linkLabel: 'HI-FIVE 저장소',
    resources: [
      {
        label: 'Edge AI 데모 보기',
        url: 'https://huggingface.co/spaces/hannip0461/hifive-edge-ai-demo',
        kind: 'demo',
      },
      { label: '1차와 2차 통합 저장소', url: 'https://github.com/hannip0461/straffic_hi-five-1st-project' },
      { label: '1차와 2차 산출물', url: 'https://app.notion.com/p/HI-FIVE-3aa96acf563f81ee8200d281cd86dca2' },
    ],
  },
  {
    id: 'edusync',
    tier: 'secondary',
    detailLevel: 'full',
    number: '04',
    title: 'EduSync Learning API',
    period: '개인 프로젝트 (2026.07.24~07.26, 보강 08.02)',
    claim: '중복과 순서가 뒤섞인 이벤트에도 학습\u00a0상태를 일관되게 유지하는 학습\u00a0API입니다.',
    badge: 'PHP 8.3, Slim 4, SQL Server 2022',
    summary:
      '웹, 모바일, 외부 플레이어의 이벤트를 SQL Server 원장과 진행 상태로 나눠 기록했습니다. 보호자 조회와 Classic\u00a0ASP 연동은 읽기 전용으로 분리했습니다.',
    proof: {
      problemLabel: '개요',
      problem:
        '네트워크 재전송, 늦게 도착한 이벤트, 동시 요청이 겹치면 이어보기 위치, 최대 시청 위치, 완료 시각이 서로 다른 상태를 가리킬 수 있었습니다.',
      solution:
        '이벤트 원장을 먼저 기록한 뒤 진행 상태를 key-range lock으로 갱신하고, 두 작업을 같은 트랜잭션에서 commit했습니다. 중복 키는 rollback 후 payload hash를 다시 비교해 정상 중복과 충돌을 분리했습니다.',
      result:
        '실제 SQL Server에서 데모 16종과 동시성 시나리오 6종 통과, Windows IIS 10 읽기 경계 확인',
    },
    caseStudy: {
      requirements: [
        '중복, 충돌: 동일 이벤트는 1회 반영, 같은 ID의 다른 payload는 거절',
        '순서, 동시성: 이어보기, 최대 시청, 최초\u00a0완료 규칙을 요청 순서와 무관하게 유지',
        '읽기 경계: 보호자와 Classic\u00a0ASP에는 필요한 데이터 조회만 허용',
      ],
      flow: '인증된 학습 이벤트 → 이벤트 원장 우선 기록 → 진행 상태 잠금, 갱신 → commit/rollback → 보호자, 레거시 읽기',
      architectureImage: {
        src: assetPath('images/project-edusync-system-architecture-approved.svg'),
        alt: '웹과 외부 플레이어의 학습 이벤트를 검증해 SQL Server 원장과 진행 상태를 원자적으로 저장하고, 중복, 충돌 분류와 읽기 전용 경계를 분리한 시스템 구조',
        caption: '이벤트 원장, 진행 상태의 원자적 저장과 읽기 전용 경계',
      },
      decisions: [
        {
          title: '중복 여부를 현재 진행 상태만 보고 판단하지 않기',
          problem:
            '동시에 들어온 첫 이벤트와 응답 유실 뒤 재전송은 현재 snapshot만으로 같은 요청인지 구분하기 어려웠습니다.',
          action:
            'source와 event_id를 유일 키로 둔 learning_events를 먼저 insert하고, 중복 키가 발생하면 transaction을 rollback한 뒤 payload_hash를 다시 조회했습니다. hash가 같으면 200 duplicate, 다르면 409 conflict로 분리했습니다.',
          result:
            '동일 payload 병렬 요청은 한 건만 적용하고 나머지는 기존 결과를 재사용했습니다. 같은 event_id에 다른 payload가 들어오면 409로 분리되는 것을 실제 SQL Server 동시성 시나리오로 확인했습니다.',
        },
        {
          title: '변경 이력과 현재 상태의 책임을 한 테이블에 섞지 않기',
          problem:
            '이어보기 위치는 최신 순서를 따르지만 최대 시청 위치와 최초 완료 시각은 과거 이벤트도 보존해야 해 한 행만으로는 변경 이유를 재현하기 어려웠습니다.',
          action:
            'learning_events는 수신 사실을 보존하는 원장으로, lecture_progress는 조회용 현재 상태로 분리했습니다. 두 테이블은 같은 transaction에서 갱신하고 lecture_progress에는 UPDLOCK, HOLDLOCK을 적용했습니다.',
          result:
            '늦게 도착한 checkpoint가 최대 시청 위치는 높이되 이어보기 위치는 되돌리지 않았고, rewind와 최초 완료 시각도 요청 순서와 관계없이 같은 규칙을 유지했습니다.',
        },
        {
          title: '레거시 조회를 쓰기 경로처럼 열어두지 않기',
          problem:
            '기존 IIS와 Classic ASP에서도 진행 상태를 조회해야 했지만, 인증 없이 데이터베이스 접근 범위를 넓히면 조회 어댑터가 새로운 쓰기 경로가 될 수 있었습니다.',
          action:
            '사이트를 루프백에만 바인딩하고 Classic ASP 소스에서도 REMOTE_ADDR를 먼저 확인했습니다. 매개변수화한 ADO 조회와 SELECT 전용 SQL 계정만 사용했습니다.',
          result:
            'Windows IIS 10에서 정상 조회와 잘못된 입력, 없는 데이터 응답을 확인하고 해당 계정의 INSERT, UPDATE, DELETE가 모두 거부되는 것을 검증했습니다.',
        },
      ],
      result: [
        '동일 이벤트가 다시 들어오면 기존 성공 결과를 재사용하고, 같은 ID에 다른 요청 본문이 오면 409로 구분했습니다.',
        'Bearer 경로의 학습자와 보호자 주체를 확인하고, 외부 플레이어 요청은 timestamp와 HMAC 서명을 검증했습니다.',
        'Classic\u00a0ASP는 루프백에서만 매개변수화된 ADO 조회를 허용하고, 조회 전용 SQL 계정으로 쓰기를 차단했습니다.',
      ],
      verification: [
        'Docker Compose에서 계약 테스트, HTTP와 SQL Server 통합 테스트, DB 배리어 기반 동시성 시나리오 6종을 통과했습니다.',
        '실제 요청과 응답, SQL Server 상태를 기록한 데모 16종이 모두 PASS였고 최신 main GitHub Actions도 통과했습니다.',
        'Windows IIS 10에서 200, 400, 404 응답을 확인하고, 조회 전용 SQL 계정의 INSERT, UPDATE, DELETE 거부를 검증했습니다.',
      ],
      verificationBoundary:
        '이번 검증은 신뢰된 외부 플레이어 서버와 루프백 전용 Classic\u00a0ASP 읽기 어댑터를 기준으로 진행했습니다.\n리버스 프록시 배치, 운영 부하, 장기 토큰 운용은 추가 검증이 필요합니다.',
    },
    role: '개인 프로젝트, API 계약과 SQL Server 트랜잭션, 동시성 제어, 테스트, IIS 호환 읽기 경계',
    stack: ['PHP 8.3', 'Slim 4', 'SQL Server 2022', 'PDO_SQLSRV', 'OpenAPI', 'Docker', 'Classic ASP'],
    image: assetPath('images/project-edusync-swagger.png'),
    imageAlt: 'EduSync Learning API OpenAPI 문서 화면',
    screenshots: [
      {
        src: assetPath('images/project-edusync-swagger.png'),
        alt: 'EduSync Learning API OpenAPI 문서',
        caption: '한국어 API 설명과 인증 경계를 반영한 OpenAPI 0.9.0 Swagger UI',
      },
      {
        src: assetPath('images/project-edusync-demo-report.png'),
        alt: 'EduSync Docker Compose와 SQL Server 기반 데모 검증 결과',
        caption: '실제 HTTP 요청과 SQL Server 상태, 동시성 결과를 기록한 16개 PASS 데모 보고서',
        lightboxCrop: true,
      },
      {
        src: assetPath('images/project-edusync-pipeline.png'),
        alt: 'EduSync 전체 파이프라인',
        caption: '웹, 외부 플레이어 인증, 원자적 저장, 읽기 전용 소비자 전체 파이프라인',
        objectPosition: 'center',
      },
    ],
    terms: [
      {
        term: 'Key-range lock',
        description: '아직 행이 없는 최초 생성 구간까지 잠가 동시 insert와 update가 같은 진행 상태를 만들도록 하는 SQL Server 잠금입니다.',
      },
    ],
    screensTitle: 'API 계약과 실행 검증 자료',
    link: 'https://github.com/hannip0461/edusync-learning-api',
    linkLabel: 'EduSync 저장소',
    resources: [
      { label: 'EduSync 저장소', url: 'https://github.com/hannip0461/edusync-learning-api' },
      { label: '실행 검증 자료', url: 'https://hannip0461.github.io/edusync-learning-api/' },
      { label: '아키텍처와 데이터 흐름', url: 'https://github.com/hannip0461/edusync-learning-api/blob/main/ARCHITECTURE.md' },
      { label: 'GitHub Actions 검증', url: 'https://github.com/hannip0461/edusync-learning-api/actions/workflows/verification-and-pages.yml' },
    ],
  },
  {
    id: 'furniture',
    tier: 'secondary',
    detailLevel: 'compact',
    number: '05',
    title: '가구 쇼핑몰 웹 애플리케이션',
    period: '팀 프로젝트 (2026.03.14~04.12)',
    claim: '고객의 상품 탐색과 주문부터 관리자의 재고와 주문 처리까지 각 사용자 흐름을 고려한 가구 쇼핑몰입니다.',
    badge: 'Vue 3, JWT 인증, 권한별 UI',
    summary:
      '고객은 상품 탐색부터 옵션 선택, 장바구니와 주문까지 자연스럽게 이어갈 수 있도록 구성했습니다. 관리자는 상품, 재고, 주문과 회원을 한곳에서 관리하며, JWT 인증과 권한에 따라 화면과 기능을 구분했습니다.',
    proof: {
      problemLabel: '개요',
      problem: '고객과 관리자에게 필요한 정보와 행동은 다르지만, 상품과 주문 상태는 같은 기준으로 이어져야 했습니다.',
      solution: 'Vue 3와 Pinia로 구매 흐름을 구성하고, JWT 인증과 권한에 따라 화면, 라우트, API 접근 범위를 나눴습니다.',
      result: '비회원, 회원, 관리자 구매 및 운영 흐름 브라우저 시나리오 59건 통과',
    },
    caseStudy: {
      requirements: [
        '권한: 비회원과 회원, 관리자가 서로 다른 기능에 접근',
        '주문: 옵션, 수량, 재고를 장바구니와 주문에 동일하게 반영',
        '운영: 상품, 재고, 주문, 회원, 게시글을 관리자 화면에서 처리',
      ],
      flow: '상품 탐색 → 장바구니 → 주문/결제 → 고객지원 → 관리자 운영',
      architecture: [
        {
          label: '접근 권한',
          kind: 'input',
          connection: '분기',
          nodes: [
            { title: '비회원과 회원', detail: '탐색과 구매 흐름' },
            { title: '관리자', detail: '운영 기능' },
          ],
        },
        {
          label: '상품 탐색',
          kind: 'operation',
          connection: '옵션',
          nodes: [
            { title: '카테고리, 검색', detail: '추천, 목록' },
            { title: '상품 상세', detail: '옵션 선택' },
          ],
        },
        {
          label: '구매 처리',
          kind: 'core',
          connection: '상태',
          nodes: [
            { title: '장바구니', detail: '수량, 옵션 검증' },
            { title: '주문, 결제', detail: 'API와 화면 상태 연결' },
          ],
        },
        {
          label: '고객지원',
          kind: 'evidence',
          connection: '운영',
          nodes: [
            { title: '리뷰, QnA', detail: '구매 이후 참여' },
            { title: '공지사항', detail: '서비스 안내' },
          ],
        },
        {
          label: '관리자 운영',
          kind: 'operation',
          nodes: [
            { title: '상품, 재고, 주문', detail: '운영 대시보드' },
            { title: '회원, 게시글', detail: '권한 기반 관리' },
          ],
        },
      ],
      problem: [
        '고객은 상품과 주문 정보를 쉽게 확인해야 하고, 관리자는 같은 데이터를 운영 관점에서 처리해야 했습니다.',
        '비회원과 회원, 관리자의 접근 범위를 화면뿐 아니라 API에서도 구분해야 했습니다.',
      ],
      approach: [
        'Vue 3와 Pinia로 상품 탐색, 옵션 선택, 장바구니, 주문까지 고객의 구매 흐름을 연결했습니다.',
        '상품, 재고, 주문, 회원 상태를 관리자가 한곳에서 확인하고 처리하도록 화면을 구성했습니다.',
        '프로젝트에서는 JWT 액세스 토큰과 리프레시 토큰으로 API 접근을 보호했고, 저는 권한에 따라 화면 요소와 라우트를 나눴습니다.',
      ],
      result: [
        '고객의 상품 탐색부터 주문 확인까지 하나의 구매 흐름으로 이어졌습니다.',
        '관리자 처리 결과가 고객 주문 내역에도 같은 상태로 반영되었습니다.',
        '비회원과 회원, 관리자가 각 권한에 맞는 기능만 사용하도록 구분했습니다.',
      ],
      verification: [
        '비회원과 회원, 관리자별로 상품 탐색, 장바구니, 주문, 리뷰, 관리자 주문 처리 흐름을 브라우저 시나리오 59건으로 확인했습니다.',
      ],
    },
    role: '팀장, 프론트엔드 직접 구현, 화면 구조 설계와 종합 QA',
    stack: ['Vue 3', 'Pinia', 'Axios', 'Spring Boot', 'Spring Security / JWT', 'PostgreSQL', 'Docker'],
    image: assetPath('images/project-furniture-home-main.jpg'),
    imageAlt: '가구 쇼핑몰 홈 화면',
    screenshots: [
      {
        src: assetPath('images/project-furniture-home-main.jpg'),
        alt: '가구 쇼핑몰 홈 화면',
        caption: '홈 메인과 카테고리 진입 화면',
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
    ],
  },
  {
    id: 'incheon',
    tier: 'secondary',
    detailLevel: 'compact',
    number: '06',
    title: '인천 문화, 관광 웹 애플리케이션',
    period: '팀 프로젝트 (2026.02.09~03.13)',
    claim: '지역과 테마별 관광 정보를 한곳에서 둘러보고 여행 후기를 나눌 수 있는 인천 관광 서비스입니다.',
    badge: 'Spring MVC, Thymeleaf, 권한 제어',
    summary:
      '지역, 테마, 문화, 교통 정보를 같은 화면 구조로 정리하고, 회원가입, 로그인, 마이페이지, 여행 후기와 관리자 기능을 Spring MVC로 연결했습니다.',
    proof: {
      problemLabel: '개요',
      problem: '인천의 관광 정보를 한곳에서 살펴보고 회원들이 여행 후기를 나눌 수 있는 서비스가 필요했습니다.',
      solution: '공통 레이아웃으로 관광 정보를 정리하고, Spring MVC와 PostgreSQL로 회원, 후기, 관리자 기능을 연결했습니다.',
      result: '관광 정보 탐색부터 후기 작성과 관리자 운영까지 주요 흐름 확인',
    },
    caseStudy: {
      requirements: [
        '탐색: 지역, 테마, 문화, 교통 페이지에 같은 헤더와 메뉴 사용',
        '회원: 가입, 로그인, 마이페이지와 리뷰 기능 제공',
        '권한: 회원과 관리자 기능을 화면, 서버에서 구분',
      ],
      flow: '관광 정보 카테고리 → Spring MVC/Thymeleaf → 회원, 공지, 리뷰 → 권한/관리자 → Docker 실행 환경',
      architecture: [
        {
          label: '정보 구조',
          kind: 'input',
          connection: '탐색',
          nodes: [
            { title: '지역과 테마', detail: '관광 카테고리' },
            { title: '문화, 교통', detail: '정보 서브페이지' },
          ],
        },
        {
          label: '화면 계층',
          kind: 'operation',
          connection: 'MVC',
          nodes: [
            { title: '공통 UI', detail: '헤더, 메뉴, 콘텐츠' },
            { title: 'Thymeleaf', detail: '서버 렌더링 화면' },
          ],
        },
        {
          label: '서비스 로직',
          kind: 'core',
          connection: 'JPA',
          nodes: [
            { title: 'Spring Boot MVC', detail: '회원, 게시판' },
            { title: '권한 제어', detail: '회원, 관리자 분리' },
          ],
        },
        {
          label: '데이터',
          kind: 'data',
          connection: '배포',
          nodes: [
            { title: 'PostgreSQL', detail: '회원, 공지, 리뷰' },
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
        '지역과 테마, 문화와 교통 정보가 여러 화면에 나뉘어도 사용자가 같은 방식으로 둘러볼 수 있어야 했습니다.',
        '관광 정보 열람에서 끝나지 않고 회원들이 여행 후기를 나눌 수 있는 흐름이 필요했습니다.',
      ],
      approach: [
        'Thymeleaf 공통 레이아웃으로 관광 카테고리를 같은 화면 구조에 담았습니다.',
        'Spring MVC로 회원가입, 로그인, 마이페이지와 여행 후기 게시판을 구현했습니다.',
        '회원과 관리자의 권한에 맞춰 이용할 수 있는 기능을 나눴습니다.',
      ],
      result: [
        '관광 정보 탐색부터 여행 후기 작성과 관리자 운영까지 하나의 서비스 흐름으로 연결했습니다.',
      ],
      verification: [
        '비회원 탐색부터 회원가입, 로그인, 마이페이지, 리뷰 작성, 관리자 기능까지 주요 흐름을 브라우저에서 확인했습니다.',
      ],
    },
    role: '팀장, 웹 퍼블리싱과 공통 UI 및 주요 화면 직접 구현, 화면\u00a0구조\u00a0설계',
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
    link: 'https://github.com/hannip0461/teamweb01',
    linkLabel: '인천 관광 서비스 저장소',
    resources: [
      { label: 'GitHub Pages', url: 'https://teamweb802.github.io/teamweb01/' },
      { label: '인천 관광 서비스 저장소', url: 'https://github.com/hannip0461/teamweb01' },
      { label: 'Notion 기록', url: 'https://www.notion.so/15972bc8fbb78217aaa601ec207feadf?source=copy_link' },
    ],
  },
]

export const experience: ExperienceItem[] = [
  {
    company: '대영전기',
    period: '2024.11~2025.12',
    position: '현장 행정 및 출역 관리 (계약직)',
    detail:
      '현대자동차 울산 도장공장에서 출역 인원과 근태 자료를 관리 자료로 정리하고, 자재 입출고와 안전 서류 정리를 보조했습니다.',
  },
  {
    company: '(주)모아데이타',
    period: '2021.07~2022.12',
    position: 'AI Lab 센터, 매니저 (정규직)',
    detail:
      '사내 솔루션과 헬스케어에 연동할 C/C++ 기능을 단독으로 개발하고 유지보수했습니다. 규칙 추론 엔진의 모듈 간 데이터 흐름을 추적해 오류를 수정하고, 포인터 구간과 메모리 누수를 점검한 뒤 Windows와\u00a0Linux에서 다시 실행해 검증했습니다. Rule과\u00a0Fact 지식베이스를 구성하고 MariaDB 데이터와 로그를 엔진\u00a0Fact로 변환해 연결했습니다.',
  },
]

export const capabilities: CapabilityGroup[] = [
  {
    title: 'Backend & Data',
    items: [
      { label: 'C / C++', evidence: '모아데이타 실무: 규칙 추론 엔진 단독 유지보수, MariaDB 데이터를 엔진\u00a0Fact로 변환' },
      { label: 'Python / FastAPI', evidence: 'NEO, HI-FIVE: 관제 오케스트레이션, Edge Ingress, 품질 분석 API' },
      { label: 'Java / Spring Boot', evidence: '가구, 인천, HI-FIVE: 주문, 관리자 API, 회원, 게시판 MVC, 통행 저장' },
      { label: '.NET / Microsoft Orleans', evidence: 'ASTRA: 플레이어별 명령 직렬화와 멱등 처리' },
      { label: 'PostgreSQL / MariaDB', evidence: 'ASTRA, HI-FIVE, 모아데이타: 원장, 감사, 멱등 응답, 통행, 품질 지표' },
    ],
  },
  {
    title: 'Reasoning & AI',
    items: [
      { label: '규칙 추론 엔진', evidence: '모아데이타 실무 유지보수, NEO에서 ITS 관제 도메인에 적용' },
      { label: 'Ontology / Neo4j', evidence: 'NEO: 관측 Fact, 규칙, 판단 관계를 계보로 저장하고 재조회' },
      { label: 'RAG / Qdrant', evidence: 'NEO: embeddinggemma 임베딩과 Qdrant 코사인 검색으로 판단과 분리한 근거 조회' },
      { label: 'YOLO / CRNN-OCR', evidence: 'HI-FIVE: 차량 번호판 탐지와 문자 판독' },
    ],
  },
  {
    title: 'Frontend & Infra',
    items: [
      { label: 'Vue 3 / TypeScript', evidence: 'NEO, 가구, 포트폴리오: 운영 화면, 커머스 UI, 정적 사이트' },
      { label: 'Docker', evidence: 'ASTRA, NEO, EduSync, 가구: Compose 실행 환경과 이미지 발행' },
      { label: 'OpenTelemetry / Elastic', evidence: 'ASTRA: API, TCP, DB, Worker 추적과 장애 지표 대시보드' },
    ],
  },
]

export const educationItems: EducationItem[] = [
  {
    title: '[에스트래픽] 스마트 모빌리티 DX Academy',
    period: '2025.12.29~2026.07.02',
    detail: '스마트 모빌리티와 ITS를 중심으로 풀스택 개발 과정을 이수했으며, 총 4회의 팀 프로젝트에서 팀장을 맡았습니다.',
  },
  {
    title: '유원대학교 스마트IT학과',
    period: '2015.03~2022.02',
    detail:
      '학사 졸업, 학점 4.13 / 4.5\n자료구조, 알고리즘, 데이터베이스 등 CS 기초부터 Android와 임베디드 시스템까지 학습하고, C/C++, Java, Python으로 과제와 프로젝트를 수행했습니다.',
  },
]
