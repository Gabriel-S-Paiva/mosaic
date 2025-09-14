<!-- Todo: Fix Timer Settings -->
<!-- The timer object isn't being updated properly -->
<script setup lang="ts">
  import { ref, watch } from 'vue';
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
      }else {
        status.value = "Break"
        timer.value.time = timerConfig.value.break
      }
    }else{
      if(status.value == "Break"){
        timer.value.count ++;
      } else {
        timer.value.count = 1;
      }
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
</script>

<template>
    <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
        <h2 class=" text-white text-xl font-bold font-['Switzer']">
            Timer
        </h2>
        <div class="flex gap-4">
            <button @click="openSettings" class="flex items-center justify-center">
                <span class="material-symbols-outlined text-white">settings</span>
            </button>
        </div>
    </div>
    <div class="p-5">
        <h3 class="w-fit bg-primary rounded-t px-2 py-1 text-white text-base font-bold font-['Switzer']">{{ status }}</h3>
        <Mosaic :timeElapsed="(timerConfig.focus - timer.time)" :totalTimer="timerConfig.focus" :status="status"/>
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
        <div class="flex justify-between pt-4">
          <div v-for="done in timerConfig.goal" class="w-7 h-7">
            <span v-if="done <= timer.count" class=" bg-primary block w-full h-full rounded-full"></span>
            <span v-else class="bg-gray-600 block w-full h-full rounded-full"></span>
          </div>
        </div>
    </div>
    <Modal v-if="timerSettings" :title="'Timer'" @close="timerSettings = false">
      <form class="w-full flex flex-col gap-4 p-4 bg-white rounded-lg" @submit.prevent>
        <!-- Focus Time -->
        <div class="flex flex-col gap-1">
          <label for="focus-time" class="text-sm font-bold text-primary font-['Switzer']">Focus time (min):</label>
          <input
            id="focus-time"
            type="number"
            v-model="draftConfig.focus"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter focus time"
          />
        </div>

        <!-- Break Time -->
        <div class="flex flex-col gap-1">
          <label for="break-time" class="text-sm font-bold text-primary font-['Switzer']">Break time (min):</label>
          <input
            id="break-time"
            type="number"
            v-model="draftConfig.break"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter break time"
          />
        </div>

        <!-- Long Break Time -->
        <div class="flex flex-col gap-1">
          <label for="long-break-time" class="text-sm font-bold text-primary font-['Switzer']">Long break time (min):</label>
          <input
            id="long-break-time"
            type="number"
            v-model="draftConfig.longBreak"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter long break time"
          />
        </div>

        <!-- Number of Breaks -->
        <div class="flex flex-col gap-1">
          <label for="number-of-breaks" class="text-sm font-bold text-primary font-['Switzer']">Number of Breaks:</label>
          <input
            id="number-of-breaks"
            type="number"
            v-model="draftConfig.nBreak"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter number of breaks"
          />
        </div>

        <!-- Pomodoro Goal -->
        <div class="flex flex-col gap-1">
          <label for="pomodoro-goal" class="text-sm font-bold text-primary font-['Switzer']">Pomodoro Goal:</label>
          <input
            id="pomodoro-goal"
            type="number"
            v-model="draftConfig.goal"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter pomodoro goal"
          />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-4 pt-4">
          <button
            type="button"
            class="px-4 py-2 text-sm font-bold text-white bg-gray-400 rounded hover:bg-gray-500"
            @click="timerSettings = false"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-bold text-white bg-primary rounded"
            @click="updateConfig"
          >
            Confirmar
          </button>
        </div>
      </form>
    </Modal>
</template>