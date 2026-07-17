# Design QA — 승인된 02 시스템 구조 복원

## Comparison target

- Source visual truth
  - ASTRA: `C:\Users\kimmj\AppData\Local\Temp\codex-clipboard-f9881ec3-f524-4343-917c-c5bf1acc7031.png`
  - NEO: `C:\Users\kimmj\AppData\Local\Temp\codex-clipboard-3ef55272-376a-46bf-a249-516db64bcfb5.png`
  - HI-FIVE: `C:\Users\kimmj\AppData\Local\Temp\codex-clipboard-13f7406e-4e3b-4732-b3b8-24124c00157a.png`
- Permanent implementation assets
  - `public/images/project-astra-system-architecture-approved.png`
  - `public/images/project-neo-system-architecture-approved.png`
  - `public/images/project-hifive-system-architecture-approved.png`
- Implementation screenshots
  - `C:\Users\kimmj\Documents\Codex\2026-07-16\019f07d8-68c3-7bf2-93ca-eb30887ee75c\portfolio-audit-2026-07-16\astra-architecture-restored-1440-full.png`
  - `C:\Users\kimmj\Documents\Codex\2026-07-16\019f07d8-68c3-7bf2-93ca-eb30887ee75c\portfolio-audit-2026-07-16\neo-architecture-restored-1440-full.png`
  - `C:\Users\kimmj\Documents\Codex\2026-07-16\019f07d8-68c3-7bf2-93ca-eb30887ee75c\portfolio-audit-2026-07-16\hifive-architecture-restored-1440-full.png`
  - Mobile inline: `C:\Users\kimmj\Documents\Codex\2026-07-16\019f07d8-68c3-7bf2-93ca-eb30887ee75c\portfolio-audit-2026-07-16\hifive-architecture-restored-390-final.png`
  - Mobile enlarged: `C:\Users\kimmj\Documents\Codex\2026-07-16\019f07d8-68c3-7bf2-93ca-eb30887ee75c\portfolio-audit-2026-07-16\hifive-architecture-lightbox-390-passed.png`
- Viewports: 1440 × 900, 1280 × 720, 390 × 844
- State: 각 대표 프로젝트 상세 모달의 `02 시스템 구조`; 모바일은 인라인 가로 탐색과 확대 화면 포함

## Full-view comparison evidence

- 원본 3장과 각 1440px 구현 캡처를 같은 비교 입력에서 대조했다.
- 구현은 원본을 재작성하지 않고 승인 PNG 자체를 렌더링한다. 원본과 `public/images` 복사본의 SHA-256 비교는 ASTRA·NEO·HI-FIVE 모두 일치했다.
- 1440px에서 세 다이어그램은 전체 폭과 종횡비를 유지했고 페이지·모달·다이어그램의 비의도적 가로 오버플로는 모두 0이었다.

## Focused region comparison evidence

- 다이어그램 내부의 글꼴, 선 굵기, 색, 아이콘, 화살표, 설명 문구는 별도 HTML/CSS 재현물이 아니라 승인 원본 픽셀이므로 시각적 변형이 없다.
- 별도 확대 크롭이 필요하지 않았다. 원본 자체가 02 전체 영역이고, 구현 캡처에서 같은 영역이 온전히 보이며 클릭 확대도 검증했다.

## Required fidelity surfaces

- Fonts and typography: 다이어그램 내부 타이포그래피는 원본 그대로다. 주변 모달 헤더·캡션은 기존 포트폴리오 서체와 위계를 유지하며 잘림이 없다.
- Spacing and layout rhythm: 데스크톱은 원본 종횡비를 유지해 한 화면에 배치한다. 모바일은 억지 축소 대신 960px 인라인 캔버스와 내부 가로 탐색을 사용한다.
- Colors and visual tokens: 다이어그램 색상은 원본 PNG와 동일하다. 외곽선과 캡션만 기존 모달 토큰을 사용한다.
- Image quality and asset fidelity: 원본과 영구 자산이 바이트 단위로 동일하며 CSS/SVG 대체물이나 재생성 이미지를 사용하지 않았다.
- Copy and content: 이미지 속 문구는 승인본과 동일하다. 프로젝트별 대체 텍스트와 확대 버튼 이름을 별도로 제공했다.
- Icons: 모든 다이어그램 아이콘은 승인 원본에 포함된 형태 그대로다.
- Accessibility and behavior: `figure`·`button`·`img alt`를 제공했다. 확대 열기/닫기, 모바일 내부 가로 스크롤, 포커스 복귀 경로를 확인했다.

## Comparison history

### Pass 1

- [P2] 모바일 확대 화면이 일반 프로젝트 스크린샷 규칙을 상속해 다이어그램을 288px로 축소했다.
- Impact: 구조 문구와 연결선이 읽히지 않아 확대 기능의 목적을 충족하지 못했다.
- Fix: 시스템 구조 전용 라이트박스 상태를 추가하고, 확대 영역을 내부 스크롤 방식으로 분리했다.

### Pass 2

- 자연 크기 1727px는 모바일 첫 화면에서 좌측 여백 비중이 지나치게 커 탐색 시작점이 비효율적이었다.
- Fix: 확대 캔버스를 1200px로 조정해 텍스트 가독성과 첫 화면 정보량을 함께 확보하고 안내 문구를 `크게 볼 수 있습니다`로 바로잡았다.
- Post-fix evidence: 390px에서 stage `368px`, image/scroll width `1200px`, page overflow `0`; 확대 열기와 닫기 정상 동작.

## Verification

- `npm run build`: passed
- Console errors: 0
- Primary interactions: 프로젝트 쿼리로 모달 열기, 02 이미지 표시, 모바일 가로 탐색, 확대 열기/닫기 모두 passed
- Remaining P0/P1/P2 findings: none
- P3 follow-up: none required for restoration scope

final result: passed
