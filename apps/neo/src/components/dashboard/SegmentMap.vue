<script setup lang="ts">
const profiles = [
  { label: '-5분', speedClass: 'speed-high', value: '61km/h' },
  { label: '현재', speedClass: 'speed-low', value: '12km/h' },
  { label: '우회로', speedClass: 'speed-mid', value: '혼잡' },
]

const signals = [
  ['검지', 'ITS CSV + MOLIT'],
  ['시야', 'CCTV 저시정'],
  ['제약', '터널 진입 2km'],
  ['위험', '후속 추돌'],
]

const sources = ['ITS CSV', 'MOLIT API', 'CCTV', 'EX VMS']
</script>

<template>
  <div class="map-card">
    <div class="subhead">
      <strong>구간 프로파일</strong>
      <span class="tag amber">Link-B201 / 터널 접근부</span>
    </div>

    <div class="segment-profile">
      <div v-for="profile in profiles" :key="profile.label" class="profile-row">
        <span class="profile-label">{{ profile.label }}</span>
        <span class="profile-track" :class="profile.speedClass"><span></span></span>
        <span class="profile-value">{{ profile.value }}</span>
      </div>

      <div class="profile-grid">
        <div v-for="[label, value] in signals" :key="label" class="profile-cell"><b>{{ label }}</b><span>{{ value }}</span></div>
      </div>
    </div>

    <div class="map-tools">
      <span v-for="source in sources" :key="source" class="map-tool">{{ source }}</span>
    </div>
  </div>
</template>
