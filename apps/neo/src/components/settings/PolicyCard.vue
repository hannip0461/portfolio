<script setup lang="ts">
import type { Policy } from '../../types/neo'

defineProps<{
  policy: Policy
}>()
</script>

<template>
  <article class="policy-card">
    <small>{{ policy.scope }}</small>
    <h3>{{ policy.label }}</h3>
    <b>{{ policy.value }}</b>
    <p>{{ policy.note }}</p>
    <span>{{ policy.guardrail }}</span>
  </article>
</template>
