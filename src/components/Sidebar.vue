<script setup lang="ts">
import Timer from './Timer.vue';
import Tasks from './Tasks.vue';
import Modal from './Modal.vue';

import { ref } from 'vue';

const timerSettings = ref(false)

const openSettings = () => {
    timerSettings.value = true;
}
</script>

<template>
    <main class="w-full/6 bg-white col-span-2 rounded-b-lg">
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
        <Timer />
        <Tasks />
    </main>
    <Modal v-if="timerSettings" :title="'Timer'" @close="timerSettings = false">

    </Modal>
</template>