<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'

const emit = defineEmits<{
  top: []
}>()
</script>

<template>
  <button class="floating-top-button" type="button" aria-label="맨 위로 이동" @click="emit('top')">
    <ArrowUp :size="17" aria-hidden="true" />
    <span>TOP</span>
  </button>
</template>
