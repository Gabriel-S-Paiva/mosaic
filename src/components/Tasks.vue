<script setup lang="ts">

</script>
<template>
  <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
    <h2 class=" text-white text-xl font-bold font-['Switzer']">
        Tasks
    </h2>
    <div class="flex gap-4">
        <button @click="">
            <span class="material-symbols-outlined text-white">settings</span>
        </button>
    </div>
  </div>
  <div class="px-5 py-2">
    <p class="text-sm font-normal font-['Switzer']">
      <!-- Delete Content after -->
      Description of the task chosen by the user when creating the task. This will support markdown
    </p>
    <div class="p-5 relative">
      <!--  Progress Bar -->
    </div>
    <div class="p-5">
        <ul> <!-- v-for="value in source" -->
        <!-- Subtasks -->
        </ul>
    </div>
    <button class="w-full h-10 mb-2 rounded bg-primary text-white text-base font-bold font-['Switzer']">+Add Task</button>
  </div>
</template>