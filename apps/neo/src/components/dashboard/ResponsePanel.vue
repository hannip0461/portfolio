<script setup lang="ts">
const metrics = [
  ['0.95', 'CF'],
  ['3', '근거'],
  ['1', 'ATMS 제외'],
]

const checks = ['CCTV 시야 확인', 'NEO 내부 ATMS 충돌 입력 제거', '우회로 상태 확인']
</script>

<template>
  <aside class="panel action-panel">
    <div class="panel-head">
      <span class="tag red">대응 절차</span>
      <span class="muted">검토 필요</span>
    </div>

    <div class="action-summary">
      <div class="metric-grid">
        <div v-for="[value, label] in metrics" :key="label" class="metric"><b>{{ value }}</b><span>{{ label }}</span></div>
      </div>

      <div class="vms">
        <strong>VMS 초안</strong>
        <p>전방 터널 정체. 감속 운행 및 우회 가능 구간 확인 바랍니다.</p>
      </div>

      <div class="sop">
        <strong>SOP 체크</strong>
        <div class="checklist">
          <div v-for="check in checks" :key="check">✓ {{ check }}</div>
        </div>
      </div>
    </div>

    <div class="action-foot">
      <button class="primary">검토 및 송출 준비</button>
      <button>오탐 처리 요청</button>
    </div>
  </aside>
</template>
