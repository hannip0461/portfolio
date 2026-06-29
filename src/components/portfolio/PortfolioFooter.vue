<script setup lang="ts">
import { GitBranch, Mail } from '@lucide/vue'

const emit = defineEmits<{
  navigate: [event: MouseEvent, target: string]
}>()
</script>

<template>
  <footer id="contact" class="site-footer">
    <div class="page-width footer-layout">
      <div>
        <p class="section-kicker">Contact</p>
        <h2>프로젝트와 역할을 자세히 이야기할 수 있습니다.</h2>
      </div>
      <div class="footer-links">
        <a href="mailto:kimmj646676@gmail.com">
          <Mail :size="18" aria-hidden="true" />
          kimmj646676@gmail.com
        </a>
        <a href="https://github.com/teamweb803" target="_blank" rel="noreferrer">
          <GitBranch :size="18" aria-hidden="true" />
          github.com/teamweb803
        </a>
        <a href="https://github.com/teamweb802" target="_blank" rel="noreferrer">
          <GitBranch :size="18" aria-hidden="true" />
          github.com/teamweb802
        </a>
      </div>
    </div>
    <div class="page-width footer-bottom">
      <span>© 2026 Kim Minjin</span>
      <a href="#about" @click="emit('navigate', $event, '#about')">맨 위로</a>
    </div>
  </footer>
</template>
