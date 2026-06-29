<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { to: '/', label: '관제' },
  { to: '/lineage', label: '계보' },
  { to: '/logs', label: '이력' },
  { to: '/health', label: '상태' },
  { to: '/settings', label: '정책' },
]

const crumb = computed(() => String(route.meta.crumb ?? 'NEO ATMS'))
const portfolioUrl = import.meta.env.BASE_URL.replace(/neo\/?$/, '')
</script>

<template>
  <div class="app">
    <a class="skip-link" href="#main-content">본문으로 이동</a>
    <aside class="rail">
      <a class="brand" :href="portfolioUrl" aria-label="포트폴리오로 이동">NEO</a>
      <nav>
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rail-btn"
          :class="{ active: route.path === item.to }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <main id="main-content" class="shell">
      <header class="topbar">
        <div>
          <p class="crumb">{{ crumb }}</p>
          <div class="status-row">
            <span class="status-dot"></span>
            <span>시스템 정상</span>
            <span class="muted">08:24:03 KST</span>
          </div>
        </div>
        <a class="portfolio-link" :href="portfolioUrl">포트폴리오</a>
      </header>

      <RouterView class="route-view" />
    </main>
  </div>
</template>
