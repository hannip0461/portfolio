import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardView from './views/DashboardView.vue'
import IncidentLogsView from './views/IncidentLogsView.vue'
import LineageView from './views/LineageView.vue'
import SettingsView from './views/SettingsView.vue'
import SystemHealthView from './views/SystemHealthView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: DashboardView, meta: { nav: '관제', crumb: 'NEO ATMS / 실시간 관제' } },
    { path: '/lineage', component: LineageView, meta: { nav: '계보', crumb: 'NEO ATMS / XAI 추론 계보' } },
    { path: '/logs', component: IncidentLogsView, meta: { nav: '이력', crumb: 'NEO ATMS / 판단 이력' } },
    { path: '/health', component: SystemHealthView, meta: { nav: '상태', crumb: 'NEO ATMS / 시스템 상태' } },
    { path: '/settings', component: SettingsView, meta: { nav: '정책', crumb: 'NEO ATMS / 운영 정책' } },
  ],
})

export default router
