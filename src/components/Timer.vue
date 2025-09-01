<!-- Todo: Fix Timer Settings -->
<!-- The timer object isn't being updated properly -->
<!-- Todo: Fix Mosaic Component -->
<!-- The mosaic "M" pattern isn´t appearing -->
<script setup lang="ts">
  import { ref, watch, computed } from 'vue';
  import Mosaic from './Mosaic.vue';
  import Modal from './Modal.vue';

  const timerSettings = ref(false)
  const timer = ref({
    time:1500,
    count:1,
    isFocus: true,
  });
  const status = ref('Focus')
  const timerConfig = ref({
    focus: 1500,
    break: 300,
    longBreak: 600,
    nBreak:4,
    goal: 4
  })
  const draftConfig = ref({ ...timerConfig.value || { focus: 1500, break: 300, longBreak: 600, nBreak: 4, goal: 4 } });
  const isPlaying = ref(false);
  let timeObj:number
  const startTimer = () => {
    isPlaying.value = true
    timeObj = setInterval(()=>{
      timer.value.time--
      formatTimer(timer.value.time)
    }, 1000)
  }
  const pauseTimer = () => {
    isPlaying.value = false
    clearInterval(timeObj)
  }
  const nextTimer = () => {
    if(timer.value.isFocus){
      if(timer.value.count === timerConfig.value.nBreak){
          // status.value.type = "Long Break"
          timer.value.time = timerConfig.value.longBreak
          status.value = "Long Break"
          timer.value.count = 1;
      }else {
        status.value = "Break"
        timer.value.time = timerConfig.value.break
        timer.value.count ++;
      }
    }else{
      status.value = "Focus"
      timer.value.time = timerConfig.value.focus
    }
    timer.value.isFocus = !timer.value.isFocus
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
  const openSettings = () => {
      draftConfig.value = { ...timerConfig.value };
      timerSettings.value = true;
  }
  const updateConfig = () => {
    timerConfig.value = { ...draftConfig.value };
    timer.value.isFocus = true;
    timer.value.time = timerConfig.value.focus;
    timerSettings.value = false;
  }
  watch(() => timer.value.time, (newTime) => {
    if (newTime === 0) {
      nextTimer();
    }
  });
const draftConfigMinutes = computed({
  get: () => ({
    focus: Math.floor(draftConfig.value.focus / 60),
    break: Math.floor(draftConfig.value.break / 60),
    longBreak: Math.floor(draftConfig.value.longBreak / 60),
    nBreak: draftConfig.value.nBreak,
    goal: draftConfig.value.goal,
  }),
  set: (val) => {
    draftConfig.value.focus = val.focus * 60;
    draftConfig.value.break = val.break * 60;
    draftConfig.value.longBreak = val.longBreak * 60;
    draftConfig.value.nBreak = val.nBreak;
    draftConfig.value.goal = val.goal;
  },
});
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
        <h3 class="w-fit bg-primary rounded-t px-2 py-1 text-white text-base font-bold font-['Switzer']">{{ status }}</h3>
        <Mosaic :timeElapsed="(timerConfig.focus - timer.time)" :totalTimer="timerConfig.focus" />
        <p class="flex justify-center text-primary text-4xl font-bold font-['Nippo']">{{ formatTimer(timer.time) }}</p>
        <div class="flex flex-col xl:flex-row justify-between gap-6">
            <button class="w-full h-10 bg-primary rounded flex items-center justify-center">
                <span v-if="isPlaying" @click="pauseTimer" class="material-symbols-outlined text-white w-full flex items-center">pause</span>
                <span v-else @click="startTimer" class="material-symbols-outlined text-white w-full flex items-center">play_arrow</span>
            </button>
            <button class="w-full h-10 bg-primary rounded flex items-center justify-center">
                <span @click="nextTimer" class="material-symbols-outlined text-white w-full flex items-center">skip_next</span>
            </button>
        </div>
    </div>
    <Modal v-if="timerSettings" :title="'Timer'" @close="timerSettings = false">
        <form class="w-full flex flex-col gap-1 p-3" @submit.prevent>
            <label class="text-base font-['Switzer']">Focus time (min):</label>
            <input class="outline-2 focus:outline-primary focus:outline-4 rounded p-1 " type="number" v-model="draftConfigMinutes.focus"/>
            <label class="text-base font-['Switzer']">Break time (min):</label>
            <input class="outline-2 focus:outline-primary focus:outline-4 rounded p-1 " type="number" v-model="draftConfigMinutes.break"/>
            <label class="text-base font-['Switzer']">Long break time (min):</label>
            <input class="outline-2 focus:outline-primary focus:outline-4 rounded p-1 " type="number" v-model="draftConfigMinutes.longBreak"/>
            <label class="text-base font-['Switzer']">Number of Breaks:</label>
            <input class="outline-2 focus:outline-primary focus:outline-4 rounded p-1 " type="number" v-model="draftConfigMinutes.nBreak"/>
            <label class="text-base font-['Switzer']">Pomodoro Goal::</label>
            <input class="outline-2 focus:outline-primary focus:outline-4 rounded p-1 " type="number" v-model="draftConfigMinutes.goal">
            <div class="w-full flex gap-2 pt-4">
                <button 
                    type="button"
                    class="w-full h-8 text-base font-['Switzer'] bg-red-300 hover:bg-red-400 outline-3 outline-red-600 p-2 rounded flex items-center justify-center"
                    @click="timerSettings = false"
                >
                    Cancelar
                </button>
                <button 
                    type="button" 
                    class="w-full h-8 text-base font-['Switzer'] bg-green-300 hover:bg-green-400 outline-3 outline-green-600 p-2 rounded flex items-center justify-center" 
                    @click="updateConfig"
                >
                    Confirmar
                </button>
            </div>
        </form> 
    </Modal>
</template>