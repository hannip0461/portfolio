<script setup lang="ts">
import PolicyCard from '../components/settings/PolicyCard.vue'
import PolicyChangeTable from '../components/settings/PolicyChangeTable.vue'
import { policies, policyChanges } from '../data/policies'
</script>

<template>
  <div class="workspace settings">
    <section class="panel">
      <div class="panel-head">
        <span class="tag amber">운영 정책</span>
        <span class="muted">검토 기반 제어 · 변경 추적</span>
      </div>

      <div class="policy-grid">
        <PolicyCard v-for="policy in policies" :key="policy.id" :policy="policy" />
      </div>

      <div class="button-row">
        <button>임시 저장</button>
        <button class="primary">정책 검토 요청</button>
      </div>
    </section>

    <div class="side-stack">
      <section class="panel">
        <div class="panel-head">
          <span class="tag blue">적용 범위</span>
        </div>
        <div class="panel-body">
          <div class="kv"><b>VMS</b><span>문구 생성 후 송출 검토</span></div>
          <div class="kv"><b>SOP</b><span>체크리스트 자동 제안</span></div>
          <div class="kv"><b>NEO</b><span>Rule KB·ATMS·CF 포함 추론 엔진</span></div>
          <div class="kv"><b>Neo4j</b><span>관계 계보 저장·조회</span></div>
          <div class="kv"><b>NEMI</b><span>정책/SOP 근거 검색</span></div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <span class="tag green">변경 원칙</span>
        </div>
        <div class="panel-body">
          <div class="kv"><b>자동 송출</b><span>비활성</span></div>
          <div class="kv"><b>운영자 승인</b><span>필수</span></div>
          <div class="kv"><b>근거 보존</b><span>Neo4j 계보 저장</span></div>
          <div class="kv"><b>변경 기록</b><span>승인자와 기준값 보존</span></div>
        </div>
      </section>
    </div>

    <PolicyChangeTable :changes="policyChanges" />
  </div>
</template>
