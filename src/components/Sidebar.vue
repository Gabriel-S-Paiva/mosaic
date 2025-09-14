<script setup lang="ts">
import Timer from './Timer.vue';
import Tasks from './Tasks.vue';
import { ref } from 'vue'

const tasksRef = ref<InstanceType<typeof Tasks> | null>(null)
const transferEmit = () => {
    tasksRef.value?.pomodoroCompleted()
};
</script>

<template>
    <main class="w-full col-span-1 md:col-span-2 flex flex-col gap-4" >
        <div class="w-full bg-white rounded-lg">
            <Timer @finished="transferEmit"/>
        </div>
        <div class="w-full bg-white rounded-lg">
            <Tasks ref="tasksRef"/>
        </div>
    </main>
</template>