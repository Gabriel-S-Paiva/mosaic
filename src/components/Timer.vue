<script setup lang="ts">
  import { ref } from 'vue';

  const timer = ref(1500);
  const status = ref({
    type: "Focus",
    count:1,
    goal:4,
  });
  const isPlaying = ref(false);
  let timeObj:number

  const startTimer = () => {
    isPlaying.value = true
    timeObj = setInterval(()=>{
      timer.value--
      formatTimer(timer.value)
    }, 1000)
  }
  const pauseTimer = () => {
    isPlaying.value = false
    clearInterval(timeObj)
  }
  const nextTimer = () => {
    if(status.value.type === "Focus"){
      if(status.value.count === status.value.goal){
          status.value.type = "Long Break"
          timer.value = 600
          status.value.count = 1;
      }else {
        status.value.type = "Break"
        timer.value = 300
        status.value.count ++;
      }
    }else{
      status.value.type = "Focus"
      timer.value = 1500
    }
  }
  const formatTimer = (secondsTotal: number): string => {
    let minutes:number = Math.floor(secondsTotal/60);
    let seconds:number = secondsTotal%60;
    let secondsLeft:string;
    if(seconds<10){
      secondsLeft = '0'+String(seconds)
    }else{
      secondsLeft = String(seconds)
    }
    const timeLeft:string = String(minutes) + ':' + secondsLeft;
    return timeLeft
  }
</script>

<template>
  <main class="w-full/6 bg-white">
    <h2 class="px-5 py-2 bg-primary rounded-t-lg text-white text-xl font-bold font-['Switzer']">
      Timer
    </h2>
    <div class="p-5">
      <h3 class="w-fit bg-primary rounded-t px-2 py-1 text-white text-base font-bold font-['Switzer']">{{ status.type }}</h3>
      <div class="w-full h-56 rounded-r rounded-bl bg-amber-50">
        <!-- remove bg collor when finished -->
      </div>
      <p class="flex justify-center text-primary text-4xl font-bold font-['Nippo']">{{ formatTimer(timer) }}</p>
      <div class="flex justify-between">
        <button class="w-24 h-10 bg-primary rounded flex items-center justify-center">
          <span v-if="isPlaying" @click="pauseTimer" class="material-symbols-outlined text-white w-full flex items-center">pause</span>
          <span v-else @click="startTimer" class="material-symbols-outlined text-white w-full flex items-center">play_arrow</span>
        </button>
        <button class="w-24 h-10 bg-primary rounded flex items-center justify-center">
          <span @click="nextTimer" class="material-symbols-outlined text-white w-full flex items-center">skip_next</span>
        </button>
      </div>
    </div>
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
      <button class="w-full h-7 rounded bg-primary text-white text-base font-bold font-['Switzer']">+Add Task</button>
    </div>
  </main>
</template>