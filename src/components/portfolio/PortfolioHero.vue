<script setup lang="ts">
import { ArrowDown, GitBranch } from '@lucide/vue'

const emit = defineEmits<{
  navigate: [event: MouseEvent, target: string]
}>()

const coreStack = ['C/C++ / Rule Engine', 'Java / Spring Boot', 'Python / FastAPI', 'RAG / LLM', 'Docker / CI']
</script>

<template>
  <section id="about" class="hero" aria-labelledby="hero-title">
    <div class="page-width hero-inner">
      <div class="hero-copy">
        <p class="section-kicker">응용 소프트웨어 개발자</p>
        <h1 id="hero-title">요구사항을 이해하고, 필요한 구조를 설계해 결과까지 확인하는 개발자 김민진입니다.</h1>
        <div class="hero-statement">
          <p>(주)모아데이타에서 1년 6개월간 C/C++ 규칙 추론 엔진의 기능 개발, 지식베이스 구축, 데이터 연계를 단독으로 담당했습니다.</p>
          <p>이후 진행한 개인 및 팀 프로젝트에서는 Java와 Python으로 관제, 정산, 학습 서비스를 구현하고 테스트와 배포까지 직접 검증했습니다.</p>
        </div>
        <ul class="hero-stack" aria-label="주요 사용 기술">
          <li v-for="item in coreStack" :key="item">{{ item }}</li>
        </ul>
        <div class="hero-actions">
          <a class="button button-primary" href="#projects" @click="emit('navigate', $event, '#projects')">
            대표 프로젝트
            <ArrowDown :size="17" aria-hidden="true" />
          </a>
          <a class="button button-secondary" href="https://github.com/hannip0461" target="_blank" rel="noreferrer">
            <GitBranch :size="17" aria-hidden="true" />
            개인 GitHub
          </a>
        </div>
      </div>

      <aside class="hero-evidence" aria-label="대표 프로젝트별 핵심 역량">
        <p>대표 작업</p>
        <ol>
          <li>
            <span>01</span>
            <div>
              <strong>NEO</strong>
              <p>여러 관제 신호 검토 → 위험도와 대응 수준 조정</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>ASTRA</strong>
              <p>중복 요청과 재시도 → 정합성 유지와 콘텐츠 롤백 및 보상</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>HI-FIVE</strong>
              <p>Edge 통행 처리 → 품질 이상 탐지로 확장</p>
            </div>
          </li>
        </ol>
      </aside>
    </div>
  </section>
</template>
