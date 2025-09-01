<script setup lang="ts">
  import Sidebar from "./components/Sidebar.vue"
  import Navbar from "./components/Navbar.vue"
  import Sandbox from "./components/Sandbox.vue";
</script>

<template >
  <Navbar />
  <div class="px-10 grid grid-cols-1 md:grid-cols-12 gap-4">
    <Sandbox/>
    <Sidebar/>
  </div>
</template>
