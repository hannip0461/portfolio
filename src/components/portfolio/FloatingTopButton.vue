<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'
import { onMounted, onUnmounted, shallowRef } from 'vue'

const emit = defineEmits<{
  top: []
}>()

const isVisible = shallowRef(false)
const syncVisibility = () => {
  isVisible.value = window.scrollY > 720
}

onMounted(() => {
  syncVisibility()
  window.addEventListener('scroll', syncVisibility, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', syncVisibility))
</script>

<template>
  <button v-show="isVisible" class="floating-top-button" type="button" aria-label="맨 위로 이동" @click="emit('top')">
    <ArrowUp :size="17" aria-hidden="true" />
    <span>TOP</span>
  </button>
</template>
