<script setup lang="ts">
import { ArrowUpRight, GitBranch, Mail } from '@lucide/vue'

const emit = defineEmits<{
  navigate: [event: MouseEvent, target: string]
}>()
</script>

<template>
  <footer id="contact" class="site-footer">
    <div class="page-width footer-layout">
      <div class="footer-intro">
        <p class="section-kicker">Contact</p>
        <h2>연락처</h2>
        <p class="footer-description">
          <span>궁금한 점이 있다면 이메일로 연락해 주세요.</span>
          <span>프로젝트 코드는 GitHub에서 확인할 수 있습니다.</span>
        </p>
      </div>
      <div class="footer-links">
        <a class="footer-contact-link" href="mailto:kimmj646676@gmail.com">
          <span class="footer-link-type">
            <Mail :size="17" aria-hidden="true" />
            Email
          </span>
          <span class="footer-link-copy">
            <strong>이메일 보내기</strong>
            <span>kimmj646676@gmail.com</span>
          </span>
          <ArrowUpRight :size="18" aria-hidden="true" />
        </a>
        <a
          class="footer-contact-link"
          href="https://github.com/hannip0461"
          target="_blank"
          rel="noreferrer"
        >
          <span class="footer-link-type">
            <GitBranch :size="17" aria-hidden="true" />
            GitHub
          </span>
          <span class="footer-link-copy">
            <strong>코드와 기록 보기</strong>
            <span>github.com/hannip0461</span>
          </span>
          <ArrowUpRight :size="18" aria-hidden="true" />
        </a>
      </div>
    </div>
    <div class="page-width footer-bottom">
      <span>© 2026 Kim Minjin</span>
      <a href="#about" @click="emit('navigate', $event, '#about')">맨 위로</a>
    </div>
  </footer>
</template>
