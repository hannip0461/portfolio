<script setup lang="ts">
defineProps<{
  rows: Array<{
    start: string
    relation: string
    end: string
    source: string
    state: string
  }>
}>()
</script>

<template>
  <section class="panel span-all">
    <div class="panel-head">
      <span class="tag blue">관계 결과</span>
      <span class="muted">조회 결과</span>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>시작</th>
          <th>관계</th>
          <th>도착</th>
          <th>출처</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="`${row.start}-${row.relation}`">
          <td>{{ row.start }}</td>
          <td>{{ row.relation }}</td>
          <td>{{ row.end }}</td>
          <td>{{ row.source }}</td>
          <td>{{ row.state }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
