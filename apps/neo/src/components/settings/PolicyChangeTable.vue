<script setup lang="ts">
import type { PolicyChange } from '../../types/neo'

defineProps<{
  changes: PolicyChange[]
}>()
</script>

<template>
  <section class="panel span-all">
    <div class="panel-head">
      <span class="tag violet">정책 변경 이력</span>
      <span class="muted">최근 승인</span>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>시간</th>
          <th>대상</th>
          <th>변경</th>
          <th>승인</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="change in changes" :key="`${change.time}-${change.target}`">
          <td>{{ change.time }}</td>
          <td>{{ change.target }}</td>
          <td>{{ change.change }}</td>
          <td>{{ change.approver }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
