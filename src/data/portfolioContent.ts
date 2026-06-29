export interface ProjectScreenshot {
  src?: string
  alt: string
  caption: string
}

export interface ProjectTerm {
  term: string
  description: string
}

export interface FeaturedProject {
  number: string
  title: string
  period: string
  summary: string
  badge: string
  proof: {
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
    decision: string
    tradeoff: string
    verification: string
    ownership: string
    nextStep: string
  }
  role: string
  stack: string[]
  image: string
  imageAlt: string
  screenshots: ProjectScreenshot[]
  terms?: ProjectTerm[]
  link?: string
  linkLabel?: string
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
  items: Array<{ label: string }>
}

export interface EducationItem {
  title: string
  period: string
  detail: string
}

const pagePath = (path: string) => `${import.meta.env.BASE_URL}${path}`
const assetPath = (path: string) => pagePath(path)

export const featuredProjects: FeaturedProject[] = [
  {
    number: '01',
    title: 'NEO ITS / MaaS Decision System',
    period: '개인 프로젝트 · 2026',
    badge: '추론 · 판단 근거 · 운영 콘솔',
    summary:
      '교통 센서/API 입력을 표준 Fact로 정리하고, 자체 추론 엔진 NEO의 판단·근거·추천 조치를 운영 화면에서 따라갈 수 있게 구성한 의사결정 시스템입니다.',
    proof: {
      problem: '형식이 다른 입력과 판단 근거를 한 흐름으로 묶어야 함',
      solution: 'Fact 정규화와 근거 계보 구조화',
      result: '입력-규칙-판단-근거-조치 흐름 추적',
    },
    caseStudy: {
      flow: '원천 입력 → Canonical Fact → NEO 추론 → Decision Package → Neo4j 계보/NEMI 근거 → 운영자 조치',
      architecture: [
        'Sensor/API 입력을 공통 이벤트 형식으로 수집',
        '교통 이벤트를 NEO 입력용 Canonical Fact로 정규화',
        'NEO가 Rule, ATMS, CF 기준으로 판단과 지지 근거 생성',
        'Decision Package에 판단 결과, 우선순위, 추천 조치, match trace를 묶음',
        'Neo4j로 룰/이벤트/판단 관계를 계보로 저장',
        'NEMI 근거 검색을 연결해 판단 근거 문서를 함께 확인',
      ],
      problem: [
        '센서/API 입력마다 형식·신뢰도·발생 주기가 달라 그대로는 NEO 추론 입력으로 쓰기 어려웠습니다.',
        'NEO 판단에는 Rule, ATMS, CF, Neo4j 관계, NEMI 근거가 함께 쓰이므로 화면에서도 이 관계가 끊기지 않아야 했습니다.',
      ],
      approach: [
        '원천 입력을 Canonical Fact로 바꿔 NEO가 받는 데이터 경계를 고정했습니다.',
        'NEO 판단 결과를 Rule match, ATMS 정합성, CF, priority, action이 포함된 Decision Package로 묶었습니다.',
        'Neo4j는 룰/이벤트/판단 관계를 추적하고, NEMI는 관련 근거를 찾는 역할로 분리했습니다.',
        '운영 화면은 판단 결과 → 입력 Fact → 적용 Rule → 근거 → 추천 조치를 같은 흐름에서 읽도록 정리했습니다.',
      ],
      result: [
        '형식이 다른 입력을 표준 Fact로 맞춰 추론 입력 품질을 일정하게 유지했습니다.',
        '운영자가 입력-규칙-판단-근거-조치 흐름을 따라가며 NEO 판단을 검토할 수 있게 했습니다.',
      ],
      decision: 'NEO 내부 로직을 그대로 노출하지 않고, 운영자가 검토해야 할 판단 근거 단위로 재구성했습니다.',
      tradeoff: '화면 정보량은 늘었지만, 관제 상황에서 결정 배경을 확인할 수 있는 구조를 우선했습니다.',
      verification:
        '샘플 이벤트 기준 입력 → Canonical Fact → Rule match → Decision Package → Neo4j/NEMI 근거 → 화면 표시가 이어지는지 확인했습니다.',
      ownership: '시스템 아키텍처, NEO 입출력 경계, FastAPI 연동, 운영 화면 구성을 담당했습니다.',
      nextStep: '실제 운영 로그 기준으로 근거 필터링과 판단 이력 비교를 보강할 수 있습니다.',
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
      { term: 'NEO', description: '직접 정의한 자체 규칙 추론 엔진. 공개/통용 프레임워크명이 아닙니다.' },
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
      { term: 'NEMI', description: '직접 정의한 자체 근거 검색 모듈. VectorDB/RAG 기반 근거 검색을 담당합니다.' },
      { term: 'Neo4j', description: '외부 그래프 DB. 룰·이벤트·판단 관계 저장/조회에 사용했습니다.' },
    ],
    link: pagePath('neo/'),
    linkLabel: 'NEO 화면 보기',
  },
  {
    number: '02',
    title: 'HI-FIVE Smart Tolling',
    period: '팀 프로젝트 · 2026.04.27–06.01',
    badge: 'Edge AI · 통행 이벤트 · PoC',
    summary:
      'Jetson Edge AI의 차량/번호판 인식 결과를 통행 이벤트로 표준화하고, Python Ingress·Spring Boot·Vue로 저장, 검수, 운영 조회까지 연결한 스마트 톨링 PoC입니다.',
    proof: {
      problem: '인식 결과를 운영 이벤트로 연결해야 함',
      solution: 'Passage Event와 Ingress 경계 설계',
      result: 'Edge-Backend-관제 흐름 PoC 완성',
    },
    caseStudy: {
      flow: 'Jetson → YOLO/OCR → Protobuf → QUIC/TLS → Backend → Vue 관제',
      architecture: [
        'Jetson Edge AI가 차량/번호판 영상을 수집',
        'YOLO와 CRNN-OCR로 차량, 번호판, 문자 후보를 추출',
        '다중 프레임 결과를 Passage Event payload로 표준화',
        'Python Ingress가 이벤트를 수신해 Backend로 전달',
        'PostgreSQL에 인식 결과, GPS, 검수/정산 후보, 상태 저장',
        'Vue 관제 화면에서 통행 이벤트와 운영 상태를 조회',
      ],
      problem: [
        '차량/번호판 인식 결과를 그대로 저장하면 검수, 정산 후보, 관제 조회에서 같은 기준으로 재사용하기 어려웠습니다.',
        'Edge는 영상 인식에 집중하고 서버는 표준 이벤트를 처리하도록 역할을 나눠야 지연과 운영 부담을 줄일 수 있었습니다.',
        '번호판 OCR은 프레임별 오차가 있어 단일 프레임 결과보다 다중 프레임 후보를 모아 판단하는 구조가 필요했습니다.',
      ],
      approach: [
        'YOLO 탐지 결과와 CRNN-OCR 후보를 Passage Event로 묶어 서버 처리 단위를 고정했습니다.',
        '다중 프레임 OCR 후보를 누적한 뒤 Best-Fit 기준으로 번호판 값을 보정했습니다.',
        'Protobuf, QUIC/TLS, Python Ingress로 Edge 이벤트를 Backend 저장 흐름에 연결했습니다.',
        'Backend는 통행 이벤트, 검수/정산 후보, GPS telemetry를 저장하고 Vue 관제 화면에서 조회하도록 구성했습니다.',
        '팀장으로서 Edge AI, Python Ingress, Backend 구현 범위와 통합 순서를 조율했습니다.',
      ],
      result: [
        '차량 인식 결과가 통행 이벤트 저장, 검수/정산 후보, 관제 조회로 이어지는 PoC 흐름을 완성했습니다.',
        '모델 출력이 운영 데이터가 되는 end-to-end 흐름을 팀 단위로 검증했습니다.',
      ],
      decision: '모델 인식률 지표만 보여주기보다 Edge 이벤트가 검수·정산·관제까지 이어지는 서비스 흐름을 우선했습니다.',
      tradeoff: '모델 정확도 개선에만 집중하기보다 전송, 저장, 조회까지 연결되는 end-to-end 검증을 먼저 선택했습니다.',
      verification: '샘플 차량 영상 기준 입력 → YOLO/OCR → Passage Event → Ingress → Backend 저장 → Vue 관제 표시를 단계별로 확인했습니다.',
      ownership: '팀장으로 프로젝트 총괄, Python/Edge AI, YOLO, Backend 흐름을 담당했습니다.',
      nextStep: '실차 데이터 다양화, OCR confidence 기준 조정, 재전송 정책을 보강할 수 있습니다.',
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
  },
  {
    number: '03',
    title: '가구 쇼핑몰 웹 애플리케이션',
    period: '팀 프로젝트 · 2026.03.14–04.12',
    badge: '커머스 · 권한 흐름 · Frontend',
    summary:
      '상품 탐색, 장바구니, 주문, 고객지원, 관리자 운영까지 권한별 사용 흐름을 연결한 가구 쇼핑몰 웹 애플리케이션입니다.',
    proof: {
      problem: '권한별 구매·운영 흐름을 분리해야 함',
      solution: '역할별 화면/API 흐름 정리',
      result: '브라우저 테스트 59건 PASS',
    },
    caseStudy: {
      flow: '상품 탐색 → 장바구니 → 주문/결제 → 고객지원 → 관리자 운영',
      architecture: [
        '사용자 권한을 비회원, 회원, 관리자로 분리',
        '카테고리, 검색, 추천, 상세 화면에서 상품 탐색 시작',
        '장바구니, 주문, 결제 상태를 API와 화면 상태로 연결',
        '리뷰, QnA, 공지사항을 고객지원 흐름에 배치',
        '관리자 대시보드에서 상품, 재고, 회원, 주문, 게시글을 운영',
        'Swagger 문서와 브라우저 테스트로 통합 검수',
      ],
      problem: [
        '비회원 탐색, 회원 구매, 관리자 운영은 접근 권한과 API가 달라 역할별 진입·차단 기준을 먼저 정리해야 했습니다.',
        '장바구니, 주문, 리뷰, QnA, 공지처럼 상태가 바뀌는 기능이 많아 화면별 동작보다 사용자 시나리오 기준 검증이 필요했습니다.',
        '프론트엔드/백엔드를 분리 개발해 Swagger 계약과 실제 브라우저 동작을 함께 맞춰야 했습니다.',
      ],
      approach: [
        '사용자 역할별 핵심 시나리오를 상품 탐색 → 장바구니 → 주문/결제 → 고객지원 → 관리자 처리로 정리했습니다.',
        'Vue 3, Router, Pinia, Axios로 화면 이동, 전역 상태, API 호출 경계를 분리했습니다.',
        'JWT 인증, 회원 정보, 주문 상태, 고객지원, 관리자 관리 기능을 사용자 흐름에 맞췄습니다.',
        'Swagger API 확인 뒤 브라우저에서 사용자 시나리오 기준으로 통합 검수했습니다.',
      ],
      result: [
        '비회원/회원 구매 흐름과 관리자 운영 흐름을 한 서비스에서 시연 가능한 상태로 완성했습니다.',
        '브라우저 테스트 59건 PASS로 주요 구매/운영 시나리오가 끊기지 않는지 확인했습니다.',
      ],
      decision: '기능을 병렬로 늘리기보다 상품 탐색에서 주문 완료까지 이어지는 흐름을 우선했습니다.',
      tradeoff: '세부 UI 연출보다 권한별 흐름과 관리자 운영 기능의 연결성을 먼저 잡았습니다.',
      verification: '비회원/회원/관리자 기준 브라우저 테스트 59건을 수행했고 PASS 59 / FAIL 0 / BLOCKED 0으로 확인했습니다.',
      ownership: '팀장으로 프론트엔드 구현, UI 흐름 설계, 종합 검수를 담당했습니다.',
      nextStep: '주문 상태별 예외 처리, 관리자 통계, 장바구니 UX를 더 개선할 수 있습니다.',
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
  },
  {
    number: '04',
    title: '인천 문화·관광 웹 애플리케이션',
    period: '팀 프로젝트 · 2026.02.09–03.13',
    badge: '관광 정보 · MVC 확장 · 권한 제어',
    summary:
      '인천 문화·관광 정적 페이지를 Spring Boot 3와 Thymeleaf 기반 회원/게시판 서비스로 확장한 웹 애플리케이션입니다.',
    proof: {
      problem: '정적 페이지를 서비스형 웹으로 확장해야 함',
      solution: 'MVC/DB/권한 흐름 추가',
      result: '관광+회원+게시판 흐름 완성',
    },
    caseStudy: {
      flow: '정적 페이지 → Spring Boot MVC/Thymeleaf → PostgreSQL 회원/게시판 → Docker 실행 환경',
      architecture: [
        '관광 정보를 지역/테마/문화/교통 카테고리로 분리',
        '공통 헤더, 메뉴, 콘텐츠 영역을 정적 페이지로 먼저 구성',
        'Spring Boot MVC와 Thymeleaf로 회원/게시판 기능 연결',
        'PostgreSQL에 회원, 공지, 리뷰 데이터를 저장',
        'Docker 이미지로 실행 환경을 정리',
      ],
      problem: [
        '정적 관광 정보 페이지에 회원, 게시판, 파일, 권한 기능을 붙여 서비스 흐름으로 확장해야 했습니다.',
        'Spring Boot 3와 Thymeleaf로 전환하면서 URL, 화면, DB 모델을 MVC 흐름에 맞게 다시 정리해야 했습니다.',
        '관리자, 작성자, 로그인 사용자에 따라 공지사항과 리뷰의 접근 권한이 달라져야 했습니다.',
      ],
      approach: [
        '관광 정보 탐색 축을 인천 안내, 테마여행, 문화관광, 교통, 맛집/숙박/쇼핑으로 정리했습니다.',
        'Spring Boot 3, Thymeleaf, PostgreSQL로 회원가입, 로그인, 마이페이지, 공지, 리뷰 기능을 연결했습니다.',
        '공지사항은 관리자 권한, 리뷰는 로그인 사용자와 작성자 본인 권한 기준으로 제어했습니다.',
        '검색과 파일 첨부를 추가해 단순 소개 페이지를 회원/게시판 서비스로 확장했습니다.',
      ],
      result: [
        '정적 관광 페이지를 회원/게시판/관리 기능이 포함된 웹 애플리케이션으로 확장했습니다.',
        'DB 연동, 권한 제어, 파일 업로드를 포함한 Spring Boot MVC 구현 경험을 정리했습니다.',
      ],
      decision: '관광 정보 소개에 그치지 않고 회원/게시판 기능을 붙여 서비스 형태로 확장했습니다.',
      tradeoff: '시각 연출보다 MVC 구조, DB 연동, 권한 제어를 안정적으로 구현하는 쪽을 우선했습니다.',
      verification: '비회원 접근, 회원가입/로그인, 마이페이지, 리뷰 게시판, 관리자 기능, 관광 서브페이지 흐름을 기준으로 확인했습니다.',
      ownership: '팀리더로 화면 구조, 공통 UI, 주요 페이지 구성, 서비스 확장 흐름을 담당했습니다.',
      nextStep: '관광 데이터 검색/필터, 관리자 콘텐츠 관리, 반응형 세부 화면을 강화할 수 있습니다.',
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
      { label: 'NEO Rule Engine' },
      { label: 'Ontology' },
      { label: 'ATMS / CF' },
      { label: 'YOLO' },
      { label: 'CRNN-OCR' },
    ],
  },
  {
    title: 'Backend & Data',
    items: [
      { label: 'C / C++' },
      { label: 'Python' },
      { label: 'FastAPI' },
      { label: 'Java / Spring Boot' },
      { label: 'PostgreSQL / MariaDB' },
      { label: 'Neo4j' },
    ],
  },
  {
    title: 'Frontend & Infra',
    items: [
      { label: 'Vue 3' },
      { label: 'Pinia' },
      { label: 'Docker' },
      { label: 'Axios' },
      { label: 'Windows / Linux' },
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
