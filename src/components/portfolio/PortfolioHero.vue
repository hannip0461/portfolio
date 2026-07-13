<script setup lang="ts">
import { ArrowDown, GitBranch, Mail } from '@lucide/vue'

const emit = defineEmits<{
  navigate: [event: MouseEvent, target: string]
}>()

const profileImage = `${import.meta.env.BASE_URL}images/profile-kim-minjin.png`
</script>

<template>
  <section id="about" class="hero" aria-labelledby="hero-title">
    <div class="page-width hero-inner">
      <div class="hero-copy">
        <p class="section-kicker">Backend · AI · Full Stack</p>
        <h1 id="hero-title">백엔드 중심 AI·풀스택 개발자 김민진</h1>
        <p class="hero-statement">
          복잡한 상태와 데이터를 운영 가능한 시스템으로 연결합니다.
        </p>
        <p class="hero-description">
          게임 LiveOps 서버, 지능형 교통 관제, Edge AI 톨링 프로젝트를 통해 백엔드 설계와 AI 연동, 운영 검증 역량을 보여드립니다.
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

      <aside class="hero-profile" aria-label="기본 연락 정보">
        <img :src="profileImage" alt="김민진 프로필" width="1254" height="1254" />
        <div>
          <strong>김민진</strong>
          <span>Backend · AI · Full Stack</span>
        </div>
        <ul class="hero-profile-points" aria-label="업무 성향">
          <li>꾸준한 기록</li>
          <li>문제 분해</li>
          <li>검증 중심</li>
        </ul>
        <a href="mailto:kimmj646676@gmail.com">
          <Mail :size="16" aria-hidden="true" />
          kimmj646676@gmail.com
        </a>
        <a href="https://github.com/hannip0461" target="_blank" rel="noreferrer">
          <GitBranch :size="16" aria-hidden="true" />
          github.com/hannip0461
        </a>
      </aside>
    </div>
  </section>
</template>
