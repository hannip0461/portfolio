# Portfolio Evidence Map

목적: README/산출물 재조회로 토큰을 낭비하지 않기 위한 짧은 근거 메모.

## NEO
- 근거: `NEO_SYSTEM_PIPELINE_NOTE.md`, 포폴용 `/neo` Vue 화면.
- 핵심: Sensor/API 입력 -> Canonical Fact -> NEO Rule Engine -> ATMS/CF -> Decision Package -> Neo4j 계보 -> NEMI 근거 검색 -> 운영 화면.
- 주의: NEO/NEMI는 직접 정의한 이름. 통용 프레임워크처럼 쓰면 안 됨.
- 추가 필요: 수치 성과, 실제 API/DB 연결 근거는 확인 필요.

## HI-FIVE
- 근거: `github.com/teamweb803/straffic_hi-five-1st-project` README.
- 확인 기술: Jetson Orin Nano, Python, DeepStream, TensorRT, YOLO, CRNN-OCR, FastAPI, aioquic, WebTransport over QUIC/TLS, Protobuf, Spring Boot, PostgreSQL, Vue, Pinia, Axios, Docker.
- 핵심: Jetson Edge AI 인식 결과를 Passage Event로 표준화하고 FastAPI Ingress/Backend/관제 화면으로 연결.
- 링크 근거: GitHub, Notion, DockerHub frontend/backend/fastapi/jetson/postgres.
- 추가 필요: 테스트 결과 수치, 배포 URL, 핵심 코드 라인 확인 필요.

## Furniture
- 근거: `github.com/teamweb803/teamweb02` README.
- 확인 기술: Vue, Vite, Router, Pinia, Axios, Spring Boot, Spring Security, JPA, JWT, WebFlux, PostgreSQL, Docker Compose, Swagger.
- 핵심: 비회원/회원/관리자 흐름, 상품 탐색/장바구니/주문/고객지원/관리자 운영.
- 현재 포폴 근거: 브라우저 테스트 59건 PASS.
- 추가 필요: 59건 PASS 원본 로그/문서 위치 확인 필요.

## Incheon
- 근거: `github.com/teamweb802/teamweb01` README.
- 확인 기술: Spring Boot 3, Java 21, Spring Web, JPA, Spring Security, Thymeleaf, HTML/CSS/JS, Docker.
- 핵심: 인천 문화관광 정보 화면을 회원/공지/리뷰/정책/권한 포함 서비스로 확장.
- 링크 근거: GitHub Pages demo, GitHub, Notion.
- 추가 필요: 담당 범위 세부, 테스트/검증 기록 확인 필요.

## 다음 반영 원칙
- 카드 문장: 작업 범위가 아니라 `현실적 문제/목표 -> 구현 판단 -> 검증 가능한 결과`로 작성.
- 상세 모달: `문제 상황 -> 구조 -> 해결 방식 -> 검증/결과` 흐름 유지.
- `문제 원인`처럼 억지 원인 분석으로 보이는 라벨/문장은 쓰지 않음.
- 모르는 수치/성과는 만들지 말고 `확인 필요`로 남김.
- 기술 스킬은 키워드 나열보다 “어디에 어떻게 썼는지”로 적음.
