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
        <p class="section-kicker">프로젝트 포트폴리오</p>
        <h1 id="hero-title">김민진 프로젝트 포트폴리오</h1>
        <p class="hero-statement">
          프로젝트마다 문제, 구조, 해결 과정, 검증 결과를 중심으로 정리했습니다.
        </p>
        <p class="hero-description">
          핵심 요약은 빠르게 훑고, 상세 기록에서는 구조·구현·검증 내용을 이어서 확인할 수 있습니다.
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
          <li>성실함</li>
          <li>꾸준함</li>
          <li>책임감</li>
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
