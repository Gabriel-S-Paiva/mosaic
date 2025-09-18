<!-- Todo: Fix Timer Settings -->
<!-- The timer object isn't being updated properly -->
<script setup lang="ts">
import { useTimerStore } from "../stores/timerStore";
import { ref, watch } from 'vue';
import Mosaic from './Mosaic.vue';
import Modal from './Modal.vue';

// Store
const timerStore = useTimerStore()

// Define Variables
const timerSettings = ref(false)
const draftConfig = ref({ ...timerStore.timerConfig || { focus: 1500, break: 300, longBreak: 600, nBreak: 4, goal: 4 } });
const emit = defineEmits(['finished'])

// Define functions
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
    draftConfig.value = { ...timerStore.timerConfig };
    timerSettings.value = true;
}
const updateConfig = () => {
  console.log(draftConfig.value )
  timerStore.timerConfig = { ...draftConfig.value };
  timerStore.timer.isFocus = true;
  timerStore.timer.time = timerStore.timerConfig.focus;
  timerSettings.value = false;
}

// Define Watcher
watch(() => timerStore.timer.time, (newTime) => {
  if (newTime === 0) {
    timerStore.nextTimer();
  }
});
watch(() => timerStore.status, (status) => {
  if (status === 'Long Break') {
    emit('finished')
  }
});
</script>

<template>
    <div>
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
        <h3 class="w-fit bg-primary rounded-t px-2 py-1 text-white text-base font-bold font-['Switzer']">{{ timerStore.status }}</h3>
        <Mosaic :timeElapsed="(timerStore.timerConfig.focus - timerStore.timer.time)" :totalTimer="timerStore.timerConfig.focus" :status="timerStore.status"/>
        <p class="flex justify-center text-primary text-4xl font-bold font-['Nippo']">{{ formatTimer(timerStore.timer.time) }}</p>
        <div class="flex flex-col xl:flex-row justify-between gap-6">
            <button class="w-full h-10 bg-primary rounded flex items-center justify-center">
                <span v-if="timerStore.timer.isRunning" @click="timerStore.pauseTimer" class="material-symbols-outlined text-white w-full flex items-center">pause</span>
                <span v-else @click="timerStore.startTimer" class="material-symbols-outlined text-white w-full flex items-center">play_arrow</span>
            </button>
            <button class="w-full h-10 bg-primary rounded flex items-center justify-center">
                <span @click="timerStore.nextTimer" class="material-symbols-outlined text-white w-full flex items-center">skip_next</span>
            </button>
        </div>
        <div class="flex justify-between pt-4">
          <div v-for="done in timerStore.timerConfig.goal" class="w-7 h-7">
            <span v-if="done <= timerStore.timer.count" class=" bg-primary block w-full h-full rounded-full"></span>
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
            v-model="draftConfig.nBreaks"
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
    </div>
</template>