<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in" mode="out-in">
      <keep-alive :include="/keep+/">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <!-- <HelloWorld :count="6" /> -->
</template>

<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
</script>
