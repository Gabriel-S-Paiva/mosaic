<script setup lang="ts">

</script>
<template>
    <div class="p-5">
      <h3 class="w-fit bg-primary rounded-t px-2 py-1 text-white text-base font-bold font-['Switzer']">Tasks</h3>

      <p class="text-sm font-normal font-['Switzer']">
        <!-- Delete Content after -->
        Description of the task chosen by the user when creating the task. This will support markdown
      </p>
    </div>
    <div class="p-5 relative">
     <!--  Progress Bar -->
    </div>
    <div class="p-5">
        <ul> <!-- v-for="value in source" -->
        <!-- Subtasks -->
        </ul>
    </div>
    <div class="p-5">
      <button class="w-full h-10 rounded bg-primary text-white text-base font-bold font-['Switzer']">+Add Task</button>
    </div>
</template>