<template>
  <div class="flex flex-center" style="height: 100%">
    <img src="@/assets/img/404.jpg" alt="404" />
    <h1>{{ text }}</h1>
  </div>
</template>
<script setup lang="ts">
const text = ref('404');
</script>
