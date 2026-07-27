<script setup lang="ts">
import { ArrowDown, GitBranch } from '@lucide/vue'

const emit = defineEmits<{
  navigate: [event: MouseEvent, target: string]
}>()
</script>

<template>
  <section id="about" class="hero" aria-labelledby="hero-title">
    <div class="page-width hero-inner">
      <div class="hero-copy">
        <p class="section-kicker">요구사항 · 설계 · 구현 · 운영</p>
        <h1 id="hero-title">백엔드, AI, 사용자 화면을 직접 구현하는 개발자 김민진</h1>
        <p class="hero-statement">
          분산 상태의 정합성을 지키고, 규칙과 Edge AI의 판단 근거를 사용자가 확인하고 조치할 수 있게 만듭니다.
        </p>
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
              <p>관제 신호 통합 → 판단 근거 추적·운영자 승인</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>ASTRA</strong>
              <p>중복·재시도 → 정합성 유지·운영 복구</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>HI-FIVE</strong>
              <p>Edge 통행 처리 → 품질 이상 탐지로 확장</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <strong>EduSync</strong>
              <p>동시 학습 이벤트 → 원자적 저장·레거시 연동</p>
            </div>
          </li>
        </ol>
      </aside>
    </div>
  </section>
</template>
