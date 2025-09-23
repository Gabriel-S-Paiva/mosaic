<script setup lang="ts">
import { ref } from "vue"

const isPlaying = ref(false)
const progress = ref(0)
const audioRef = ref<HTMLAudioElement | null>(null)
const audioURL = ref<string>("../assets/sound.mp3")

const togglePlay = () => {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}
const onEnded = () => {
  isPlaying.value = false
}
const updateProgress = () => {
  if (!audioRef.value) return
  progress.value = (audioRef.value.currentTime / audioRef.value.duration) * 100
}
const seek = (event: Event) => {
  if (!audioRef.value) return
  const value = (event.target as HTMLInputElement).valueAsNumber
  audioRef.value.currentTime = (value / 100) * audioRef.value.duration
}
const handleFileChange = (event: Event):void => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    audioURL.value = URL.createObjectURL(file)
  }
}
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
      <h2 class=" text-white text-xl font-bold font-['Switzer']">
        Music Player
      </h2>
    </div>
    <div class="flex flex-col gap-4 p-5">
      <!--Circle-->
      <div
          class="w-40 h-40 rounded-full bg-slate-950 flex items-center justify-center shadow-inner"
          :class="{ 'animate-spin-slow': isPlaying }"
      >
        <div class="w-12 h-12 rounded-full bg-rose-950"></div>
      </div>
      <input
          type="range"
          min="0"
          max="100"
          step="1"
          v-model="progress"
          @input="seek"
          class="w-full accent-primary"
      />
      <audio ref="audioRef" :src="audioURL" @timeupdate="updateProgress" @ended="onEnded"></audio>

      <div class="flex gap-4">
        <button
            @click="togglePlay"
            class="px-4 py-2 bg-primary basis-2/3 text-white rounded-lg flex items-center justify-center"
        >
          <span class="material-symbols-outlined text-white">{{ isPlaying ? 'pause' : 'play_arrow' }}</span>
          {{ isPlaying ? "Pause" : "Play" }}
        </button>
        <div class="flex basis-1/3 gap-2 bg-primary text-white rounded-lg items-center justify-center">
          <!-- File Upload Button -->
          <input
              type="file"
              accept="audio/*"
              @change="handleFileChange"
              class="hidden"
              id="pdf-upload"
          />
          <label
              for="pdf-upload"
              class="cursor-pointer flex items-center justify-center w-8 h-8 hover:bg-white/30 rounded transition-colors"
              title="Upload PDF"
          >
            <span class="material-symbols-outlined text-white text-sm">upload_file</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>