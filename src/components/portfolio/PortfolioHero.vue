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
        <h1 id="hero-title">요구사항을 구조로 풀고, 핵심 로직부터 사용자 화면까지 완성하는 개발자 김민진</h1>
        <p class="hero-statement">
          백엔드·분산 시스템·AI·운영 UI를 하나의 흐름으로 연결해, 사용자가 확인하고 조치할 수 있는 결과물로 만듭니다.
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
              <p>규칙 판단과 근거 추적</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>ASTRA</strong>
              <p>분산 상태 정합성과 운영 복구</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>HI-FIVE</strong>
              <p>Edge AI 이벤트와 품질 분석</p>
            </div>
          </li>
        </ol>
      </aside>
    </div>
  </section>
</template>
