<script setup lang="ts">
  import { ref, watch } from 'vue';
  import Mosaic from './Mosaic.vue';
  import Modal from './Modal.vue';

  const timerSettings = ref(false)
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
  watch(timer, ()=> {
    if (timer.value === 0){
      nextTimer()
    }
  })
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

  const openSettings = () => {
      timerSettings.value = true;
  }
</script>

<template>
        <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
          <h2 class=" text-white text-xl font-bold font-['Switzer']">
              Timer
          </h2>
          <div class="flex gap-4">
              <button @click="openSettings">
                  <span class="material-symbols-outlined text-white">settings</span>
              </button>
          </div>
      </div>
    <div class="p-5">
      <h3 class="w-fit bg-primary rounded-t px-2 py-1 text-white text-base font-bold font-['Switzer']">{{ status.type }}</h3>
      <Mosaic :timeElapsed="(1500 - timer)" :totalTimer="1500" />
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

    <Modal v-if="timerSettings" :title="'Timer'" @close="timerSettings = false">

    </Modal>
</template>