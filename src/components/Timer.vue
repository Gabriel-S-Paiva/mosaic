<script setup lang="ts">
  import { ref } from 'vue';

  const timer:string = '22:37';
  const status = ref("Focus");
  const isPlaying = ref(true)
</script>

<template>
  <main class="w-full bg-white">
    <h2 class="px-5 py-2 bg-primary rounded-t-lg text-white text-xl font-bold font-['Switzer']">
      Timer
    </h2>
    <div class="p-5">
      <h3 class="w-fit bg-primary rounded-t px-2 py-1 text-white text-base font-bold font-['Switzer']">{{ status }}</h3>
      <div class="w-full h-56 rounded-r rounded-bl bg-amber-50">
        <!-- remove bg collor when finished -->
      </div>
      <p class="flex justify-center text-primary text-4xl font-bold font-['Nippo']">{{ timer }}</p>
      <div>
        <button>
          <span v-if="isPlaying" class="material-symbols-outlined">pause</span>
          <span v-else class="material-symbols-outlined">play_arrow</span>
        </button>
        <button>
          <span class="material-symbols-outlined">skip_next</span>
        </button>
      </div>
    </div>
  </main>
</template>