<script setup lang="ts">
const emit = defineEmits<{
  navigate: [event: MouseEvent, target: string]
}>()

const basePath = import.meta.env.BASE_URL
</script>

<template>
  <header class="site-header">
    <div class="utility-bar">
      <div class="page-width utility-inner">
        <span>김민진 · Backend / AI / Full Stack</span>
        <a href="mailto:kimmj646676@gmail.com">kimmj646676@gmail.com</a>
      </div>
    </div>

    <div class="page-width nav-row">
      <a class="brand" :href="basePath" aria-label="김민진 포트폴리오 홈">
        <span class="brand-mark">KM</span>
        <span>
          <strong>김민진</strong>
          <small>Backend · AI · Full Stack</small>
        </span>
      </a>
      <nav class="site-nav" aria-label="주요 메뉴">
        <a href="#about" @click="emit('navigate', $event, '#about')">소개</a>
        <a href="#projects" @click="emit('navigate', $event, '#projects')">프로젝트</a>
        <a href="#experience" @click="emit('navigate', $event, '#experience')">경력</a>
        <a href="#skills" @click="emit('navigate', $event, '#skills')">기술</a>
        <a href="#contact" @click="emit('navigate', $event, '#contact')">연락</a>
      </nav>
    </div>
  </header>
</template>
