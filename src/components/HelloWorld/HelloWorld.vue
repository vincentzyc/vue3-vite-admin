<template>
  <div>{{ count }} x {{ times }} = {{ result }}</div>
  <el-button type="primary" @click="times += 1">x1</el-button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{ count: number }>();

const times = ref(2);
const result = computed(() => props.count * times.value);

defineExpose(props);
</script>
