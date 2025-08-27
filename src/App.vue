<script setup lang="ts">
  import Timer from "./components/Timer.vue"
  import Navbar from "./components/Navbar.vue"
  import Sandbox from "./components/Sandbox.vue";
</script>

<template >
  <Navbar />
  <div class="px-10 grid grid-cols-12 gap-4">
    <Sandbox/>
    <Timer/>
  </div>
</template>
