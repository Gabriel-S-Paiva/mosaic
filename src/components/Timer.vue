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
          status.value.count = 1;
      }else {
        status.value.type = "Break"
        status.value.count ++;
      }
    }else{
      status.value.type = "Focus"
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
  <main class="w-full bg-white">
    <h2 class="px-5 py-2 bg-primary rounded-t-lg text-white text-xl font-bold font-['Switzer']">
      Timer
    </h2>
    <div class="p-5">
      <h3 class="w-fit bg-primary rounded-t px-2 py-1 text-white text-base font-bold font-['Switzer']">{{ status.type }}</h3>
      <div class="w-full h-56 rounded-r rounded-bl bg-amber-50">
        <!-- remove bg collor when finished -->
      </div>
      <p class="flex justify-center text-primary text-4xl font-bold font-['Nippo']">{{ formatTimer(timer) }}</p>
      <div>
        <button>
          <span v-if="isPlaying" @click="pauseTimer" class="material-symbols-outlined">pause</span>
          <span v-else @click="startTimer" class="material-symbols-outlined">play_arrow</span>
        </button>
        <button>
          <span @click="nextTimer" class="material-symbols-outlined">skip_next</span>
        </button>
      </div>
    </div>
  </main>
</template>