<script setup lang="ts">

</script>
<template>
    <div class="p-5">
      <h3 class="w-fit bg-primary rounded-t px-2 py-1 text-white text-base font-bold font-['Switzer']">Tasks</h3>
      <div class="w-full relative h-56 rounded-r rounded-bl bg-amber-50 my-3.5">
        <!-- remove bg collor when finished -->
         <p class="absolute -bottom-3 right-12 opacity-60 justify-start text-black text-sm font-normal font-['Switzer']">next up:</p>
         <div class="absolute -bottom-2.5 -right-2.5 w-14 h-8 bg-amber-400 rounded outline-3 outline-white">
            <!-- remove bg collor when finished -->
         </div>
      </div>
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