<script setup lang="ts">
import { ref } from 'vue';
import Modal from "./Modal.vue";

const editMode = ref(false);
const isHelpOpen = ref(false);

const startEdit = () => {
    editMode.value = true
};
const openHelp = () => {
    isHelpOpen.value = true;
}
</script>

<template>
    <main class="col-span-10 bg-white rounded-lg">
        <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
            <h2 class=" text-white text-xl font-bold font-['Switzer']">
                Pomodoro
            </h2>
            <div class="flex gap-4">
                <button @click="startEdit" class="flex items-center justify-center">
                    <span class="material-symbols-outlined text-white">edit</span>
                </button>
                <button @click="openHelp" class="flex items-center justify-center">
                    <span class="material-symbols-outlined text-white">help</span>
                </button>
            </div>
        </div>
        <section class="p-5 grid grid-cols-5 grid-rows-3 gap-4">
            <div v-for="n in 15" class="w-full h-60 bg-offwhite rounded-2xl">{{ n }}</div>
        </section>
    </main>
    <Modal v-if="isHelpOpen" :title="'Help'" @close="isHelpOpen = false">
        <p>hello im help</p>
    </Modal>
</template>