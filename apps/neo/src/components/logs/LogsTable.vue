<script setup lang="ts">
import type { LogEntry } from '../../types/neo'

withDefaults(
  defineProps<{
    entries: LogEntry[]
    highlightedId?: string
  }>(),
  { highlightedId: 'INC-9902' },
)
</script>

<template>
  <section class="panel log-main">
    <div class="panel-head">
      <span class="tag blue">판단 이력</span>
      <span class="muted">최근 사건 · 감사 추적</span>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>시간</th>
          <th>ID</th>
          <th>위치</th>
          <th>판단</th>
          <th>CF</th>
          <th>근거</th>
          <th>조치</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id" :class="{ 'selected-row': entry.id === highlightedId }">
          <td>{{ entry.time }}</td>
          <td>{{ entry.id }}</td>
          <td>{{ entry.location }}</td>
          <td>{{ entry.decision }}</td>
          <td class="numeric">{{ entry.cf.toFixed(2) }}</td>
          <td>
            <b>{{ entry.source }}</b>
            <small>{{ entry.evidence }}</small>
          </td>
          <td>{{ entry.action }}</td>
          <td><span class="state-pill">{{ entry.state }}</span></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
