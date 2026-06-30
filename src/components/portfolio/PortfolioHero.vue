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
        <p class="section-kicker">AI Full Stack Portfolio</p>
        <h1 id="hero-title">김민진 프로젝트 포트폴리오</h1>
        <p class="hero-statement">
          문제를 구조로 정리하고, 구현과 검증까지 연결하는 개발자입니다.
        </p>
        <p class="hero-description">
          1분 안에 핵심 프로젝트를 훑고, 상세 기록에서는 문제 상황·담당 역할·구조·해결 방식·검증 결과를 이어서 확인할 수 있습니다.
        </p>
        <div class="hero-actions">
          <a class="button button-primary" href="#projects" @click="emit('navigate', $event, '#projects')">
            프로젝트 보기
            <ArrowDown :size="17" aria-hidden="true" />
          </a>
          <a class="button button-secondary" href="https://github.com/teamweb803" target="_blank" rel="noreferrer">
            <GitBranch :size="17" aria-hidden="true" />
            GitHub 803
          </a>
          <a class="button button-secondary" href="https://github.com/teamweb802" target="_blank" rel="noreferrer">
            <GitBranch :size="17" aria-hidden="true" />
            GitHub 802
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
        <a href="https://github.com/teamweb803" target="_blank" rel="noreferrer">
          <GitBranch :size="16" aria-hidden="true" />
          github.com/teamweb803
        </a>
        <a href="https://github.com/teamweb802" target="_blank" rel="noreferrer">
          <GitBranch :size="16" aria-hidden="true" />
          github.com/teamweb802
        </a>
      </aside>
    </div>
  </section>
</template>
