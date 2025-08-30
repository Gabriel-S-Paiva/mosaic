<script setup lang="ts">
import Modal from "./Modal.vue";

const openSettings = () => {
    console.log("config")
};
const openHelp = () => {
    console.log("help")
}
</script>

<template>
    <main class="col-span-10 bg-white rounded-lg">
        <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
            <h2 class=" text-white text-xl font-bold font-['Switzer']">
                Pomodoro
            </h2>
            <div class="flex gap-4">
                <button @click="openSettings">
                    <span class="material-symbols-outlined text-white">settings</span>
                </button>
                <button @click="openHelp">
                    <span class="material-symbols-outlined text-white">help</span>
                </button>
            </div>
        </div>
        <section class="p-5 grid">
            <!-- Modules to insert -->
        </section>
    </main>
    <Modal>
        
    </Modal>
</template>