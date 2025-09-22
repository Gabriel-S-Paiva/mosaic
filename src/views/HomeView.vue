<script setup lang="ts">
import Sandbox from "../components/Sandbox.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <div class="px-10 grid grid-cols-1 md:grid-cols-12 gap-4">
    <Sandbox/>
    <Sidebar/>
  </div>
</template>