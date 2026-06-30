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

export interface FeaturedProject {
  number: string
  title: string
  period: string
  summary: string
  badge: string
  proof: {
    problemLabel?: string
    problem: string
    solution: string
    result: string
  }
  caseStudy: {
    flow: string
    architecture: string[]
    problem: string[]
    approach: string[]
    result: string[]
    verification: string
  }
  role: string
  stack: string[]
  image: string
  imageAlt: string
  screenshots: ProjectScreenshot[]
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
const neoPath = 'http://127.0.0.1:5182/neo/'
const neoResources = import.meta.env.DEV ? [{ label: '로컬 NEO 화면', url: neoPath }] : []

export const featuredProjects: FeaturedProject[] = [
  {
    number: '01',
    title: 'NEO ITS / MaaS Decision System',
    period: '개인 프로젝트 · 2026',
    badge: '추론 · 판단 근거 · 운영 콘솔',
    summary:
      '교통 CSV/API/센서 입력을 자체 NEO Rule Engine이 판단 가능한 Fact로 정리하고, Neo4j 추론 계보와 NEMI 근거 검색을 관제 화면에 연결한 지능형 관제 의사결정 시스템입니다.',
    proof: {
      problemLabel: '개요',
      problem:
        '단일 수치나 알람만으로는 현장 상황을 정확히 판단하기 어렵습니다. NEO는 여러 관제 입력을 종합해 위험도를 판단하고, 판단 근거와 대응 가이드까지 함께 제공하는 지능형 관제 시스템입니다.',
      solution:
        '입력 데이터, 판단 근거, 대응 절차를 하나의 흐름으로 연결해 관제자가 알람을 검토하고 조치할 수 있게 구성했습니다.',
      result:
        '운영자는 단순 알림이 아니라 “왜 위험한지 → 어떤 근거인지 → 어떻게 대응할지”를 따라가며 판단할 수 있습니다.',
    },
    caseStudy: {
      flow: '교통 CSV/API/센서 입력 → Canonical Fact → NEO Rule Engine → 파생 Fact → 위험도/대응 판단 → Neo4j 계보/NEMI 근거 → 관제 화면',
      architecture: [
        '교통량, 속도, 장비 상태, 사고 위험 데이터를 공통 Fact 형식으로 정리',
        'KB 기반 Rule이 입력 Fact를 만들고, 파생 Fact를 다음 Rule의 판단 근거로 사용',
        '위험도, 상태, 대응 가이드 Fact를 단계적으로 생성',
        'Neo4j는 Event, Fact, Rule, Decision 관계를 계보로 연결',
        'NEMI는 VectorDB/RAG로 SOP, 사고 이력, VMS 가이드, 장비 매뉴얼 근거를 제공',
      ],
      problem: [],
      approach: [
        '입력 데이터를 출처, 시간, 자산 기준으로 정리한 뒤 KB 기반 Rule로 Fact를 생성했습니다.',
        '생성된 Fact를 다시 Rule에 적용해 위험도, 상태, 대응 가이드 Fact를 단계적으로 파생했습니다.',
        'ATMS/CF로 충돌하는 입력의 신뢰도와 판단 우선순위를 조정했습니다.',
        'Neo4j로 Event → Fact → Rule → Decision 추론 계보를 시각화했습니다.',
        'NEMI는 VectorDB/RAG로 SOP, 사고 이력, VMS 가이드, 장비 매뉴얼 근거를 제공했습니다.',
      ],
      result: [
        'NEO 판단 결과를 알림으로만 보여주지 않고, 위험 판단 과정과 근거, 대응 가이드를 함께 검토할 수 있는 관제 흐름으로 정리했습니다.',
      ],
      verification:
        '샘플 관제 입력 기준 Fact 생성 → 파생 Fact 생성 → 위험도 판단 → 대응 가이드 생성 → 계보/근거 조회 → 화면 표시 흐름 확인',
    },
    role: '시스템 아키텍처, NEO 추론 경계, FastAPI 연동, Frontend 운영 화면',
    stack: ['C/C++', 'Python', 'FastAPI', 'Vue 3', 'Pinia', 'Axios', 'Neo4j', 'VectorDB/RAG'],
    image: assetPath('images/project-neo-dashboard.png'),
    imageAlt: 'NEO ITS MaaS 운영자 의사결정 화면',
    screenshots: [
      {
        src: assetPath('images/project-neo-dashboard.png'),
        alt: 'NEO 운영 콘솔 판단 근거 화면',
        caption: '실시간 관제와 NEO 판단 근거 화면',
      },
      {
        src: assetPath('images/project-neo-lineage.png'),
        alt: 'NEO Neo4j 추론 계보 화면',
        caption: 'Neo4j 관계 그래프로 정리한 XAI 추론 계보',
      },
      {
        src: assetPath('images/project-neo-logs.png'),
        alt: 'NEO 판단 이력 화면',
        caption: '판단 이력과 감사 추적 화면',
      },
    ],
    terms: [
      { term: 'NEO', description: '직접 정의한 자체 규칙 추론 엔진으로, Fact/Rule/ATMS/CF 흐름을 묶는 프로젝트 내부 명칭입니다.' },
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
      { term: 'Neo4j', description: '외부 그래프 DB. 룰·이벤트·판단 관계 저장/조회에 사용했습니다.' },
    ],
    link: import.meta.env.DEV ? neoPath : undefined,
    linkLabel: 'NEO 화면 보기',
    resources: neoResources,
  },
  {
    number: '02',
    title: 'HI-FIVE Smart Tolling',
    period: '팀 프로젝트 · 2026.04.27–06.01',
    badge: 'Edge AI · 통행 이벤트 · PoC',
    summary:
      'Jetson Edge AI의 차량/번호판 인식 결과를 통행 이벤트로 표준화하고, Python Ingress·Spring Boot·Vue로 저장, 검수, 운영 조회까지 연결한 스마트 톨링 PoC입니다.',
    proof: {
      problemLabel: '개요',
      problem: '기존 하이패스의 단말기·고정 차선 의존을 줄이고, 위성 기반 위치 활용까지 고려한 완전 무정차 톨링 PoC입니다.',
      solution: 'Jetson Edge에서 YOLO로 차량·번호판을 탐지하고 OCR로 번호를 인식한 뒤, GPS와 함께 Passage Event로 표준화해 필요한 데이터만 서버로 전송했습니다.',
      result: 'Edge AI 인식 → 통행 이벤트 생성 → 구간 요금 산정 → 관제 대시보드 조회로 이어지는 흐름을 구현했습니다.',
    },
    caseStudy: {
      flow: 'Jetson → YOLO/OCR → GPS → Passage Event → WebTransport/QUIC → FastAPI Ingress → Backend → 관제',
      architecture: [
        'Jetson Edge AI가 차량/번호판 영상을 처리',
        'YOLO와 CRNN-OCR로 차량, 번호판, 문자 후보를 추출',
        'Passage Event payload로 인식 결과와 GPS를 표준화',
        'Python Ingress가 이벤트를 수신해 Spring Backend로 전달',
        'Vue 관제 화면에서 통행 이벤트와 운영 상태를 조회',
      ],
      problem: [],
      approach: [
        'YOLO/OCR 인식 결과와 GPS를 Passage Event로 묶어 서버가 처리할 최소 단위로 표준화했습니다.',
        'WebTransport over QUIC/TLS와 FastAPI Ingress로 Edge와 서버 사이의 수신 경계를 구성했습니다.',
        '운영망 장애 상황은 Watchdog 기반 망 이중화와 재시도 흐름으로 대응하도록 설계했습니다.',
      ],
      result: [
        '단말기 중심 하이패스가 아니라, Edge AI와 위치 데이터를 활용한 무정차 톨링 시나리오를 시연 가능한 형태로 정리했습니다.',
      ],
      verification: '샘플 차량 영상 기준 입력 → AI 인식 → 이벤트 전송 → 저장 → 대시보드 표시 단계 확인',
    },
    role: '팀장, 프로젝트 총괄, Python·Edge AI, YOLO, 백엔드',
    stack: ['Jetson', 'YOLO', 'CRNN-OCR', 'FastAPI', 'Spring Boot', 'Vue 3', 'PostgreSQL'],
    image: assetPath('images/project-hifive-dashboard-main.jpg'),
    imageAlt: 'HI-FIVE 스마트 톨링 운영 대시보드',
    screenshots: [
      {
        src: assetPath('images/project-hifive-home-main.jpg'),
        alt: 'HI-FIVE 스마트 톨링 서비스 소개 화면',
        caption: '서비스 목표와 통합 관제 방향을 보여주는 메인 화면',
      },
      {
        src: assetPath('images/project-hifive-dashboard-main.jpg'),
        alt: 'HI-FIVE 스마트 톨링 대시보드',
        caption: '차량 인식, GPS, 통행 후보를 확인하는 운영 대시보드',
      },
    ],
    link: 'https://github.com/teamweb803/straffic_hi-five-1st-project',
    linkLabel: 'GitHub 803 저장소',
    resources: [
      { label: '실행 데모', url: 'https://huggingface.co/spaces/hannip0461/hifive-edge-ai-demo' },
      { label: 'GitHub 803', url: 'https://github.com/teamweb803/straffic_hi-five-1st-project' },
      { label: 'Notion 기록', url: 'https://coconut-truck-1db.notion.site/371cdef944a180a8bf3be44fcfcd9701' },
      { label: 'Docker frontend', url: 'https://hub.docker.com/r/shshj323/hifive-frontend' },
      { label: 'Docker backend', url: 'https://hub.docker.com/r/shshj323/hifive-backend' },
    ],
  },
  {
    number: '03',
    title: '가구 쇼핑몰 웹 애플리케이션',
    period: '팀 프로젝트 · 2026.03.14–04.12',
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
      flow: '상품 탐색 → 장바구니 → 주문/결제 → 고객지원 → 관리자 운영',
      architecture: [
        '사용자 권한을 비회원, 회원, 관리자로 분리',
        '카테고리, 검색, 추천, 상세 화면에서 상품 탐색 시작',
        '장바구니, 주문, 결제 상태를 API와 화면 상태로 연결',
        '리뷰, QnA, 공지사항을 고객지원 흐름에 배치',
        '관리자 대시보드에서 상품, 재고, 회원, 주문, 게시글을 운영',
      ],
      problem: [],
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
    role: '팀장, 프론트엔드 구현, UI 흐름 설계, 종합 QA',
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
    link: 'https://github.com/teamweb803/teamweb02',
    linkLabel: 'GitHub 803 저장소',
    resources: [
      { label: 'GitHub 803', url: 'https://github.com/teamweb803/teamweb02' },
      { label: 'Notion 기록', url: 'https://www.notion.so/de296acf563f838584b301756ee05b67' },
      { label: 'Docker frontend', url: 'https://hub.docker.com/r/kimmj6466/team4-frontend' },
      { label: 'Docker backend', url: 'https://hub.docker.com/r/kimmj6466/team4-backend' },
      { label: 'Docker DB', url: 'https://hub.docker.com/r/kimmj6466/team4-db' },
    ],
  },
  {
    number: '04',
    title: '인천 문화·관광 웹 애플리케이션',
    period: '팀 프로젝트 · 2026.02.09–03.13',
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
      flow: '관광 정보 카테고리 → Spring MVC/Thymeleaf → 회원·공지·리뷰 → 권한/관리자 → Docker 실행 환경',
      architecture: [
        '관광 정보를 지역/테마/문화/교통 카테고리로 분리',
        '공통 헤더, 메뉴, 콘텐츠 영역을 서비스 화면 기준으로 구성',
        'Spring Boot MVC와 Thymeleaf로 회원/게시판 기능 연결',
        'PostgreSQL에 회원, 공지, 리뷰 데이터를 저장',
        'Docker 이미지로 실행 환경을 정리',
      ],
      problem: [],
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
    role: '팀장, 웹 퍼블리싱, 화면 구조 설계, 공통 UI, 주요 페이지 구성',
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
    link: 'https://github.com/teamweb802/teamweb01',
    linkLabel: 'GitHub 802 저장소',
    resources: [
      { label: 'GitHub Pages', url: 'https://teamweb802.github.io/teamweb01/' },
      { label: 'GitHub 802', url: 'https://github.com/teamweb802/teamweb01' },
      { label: 'Notion 기록', url: 'https://www.notion.so/15972bc8fbb78217aaa601ec207feadf?source=copy_link' },
    ],
  },
]

export const additionalProjects: AdditionalProject[] = [
  {
    title: 'Discord 음악봇',
    period: '2026.03',
    detail: 'Discord 음원 재생 제어와 Android 연동 흐름을 구현한 개인 프로젝트',
  },
  {
    title: '개인 NEO 프로젝트',
    period: '2021.12–2023.11',
    detail: 'C/C++ 기반 추론 엔진 분석, Python 보조 도구, Database 연계를 다룬 개인 프로젝트',
  },
  {
    title: 'Ontology List + Neo4j',
    period: '2021.09–10',
    detail: '온톨로지 관계를 정리하고 Neo4j 그래프 구조로 표현한 팀 프로젝트',
  },
]

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
      'C/C++ NEO 추론 엔진 유지보수, 규칙·온톨로지 로직, MariaDB 연동, Fact 데이터 변환을 담당했습니다.',
  },
]

export const capabilities: CapabilityGroup[] = [
  {
    title: 'Reasoning & AI',
    items: [
      { label: 'NEO Rule Engine', evidence: 'Fact, Rule, ATMS/CF, Decision Package 흐름으로 판단 근거를 구조화' },
      { label: 'Ontology / Neo4j', evidence: '룰·이벤트·판단 관계를 그래프 계보로 추적' },
      { label: 'NEMI RAG', evidence: 'VectorDB/RAG 방향의 근거 검색 모듈로 판단 설명 보강' },
      { label: 'YOLO', evidence: 'HI-FIVE 차량/번호판 후보 탐지에 적용' },
      { label: 'CRNN-OCR', evidence: '다중 프레임 번호판 문자 후보 보정 흐름에 사용' },
    ],
  },
  {
    title: 'Backend & Data',
    items: [
      { label: 'C / C++', evidence: '기존 NEO 추론 엔진 유지보수와 로직 분석 경험' },
      { label: 'Python / FastAPI', evidence: 'Edge Ingress, AI API, 데이터 변환 보조 도구에 활용' },
      { label: 'Java / Spring Boot', evidence: '회원, 게시판, 주문, 관리자 API와 MVC 서비스 구현' },
      { label: 'PostgreSQL / MariaDB', evidence: '관광/쇼핑몰/운영 데이터 저장과 권한별 조회 흐름 구성' },
      { label: 'Swagger / API 계약', evidence: '프론트·백엔드 분리 개발 시 API 확인 기준으로 사용' },
    ],
  },
  {
    title: 'Frontend & Infra',
    items: [
      { label: 'Vue 3 / TypeScript', evidence: '포폴/운영 화면을 컴포넌트와 데이터로 분리' },
      { label: 'Pinia / Axios', evidence: '상태 관리와 API 호출 경계를 화면 흐름에 맞춰 분리' },
      { label: 'Docker', evidence: '팀 프로젝트 frontend/backend/db 이미지와 실행 환경 정리' },
      { label: 'GitHub Pages', evidence: '정적 포트폴리오와 데모 페이지 배포' },
      { label: 'Windows / Linux', evidence: '로컬 개발, 컨테이너 실행, 배포 준비 환경 운용' },
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
