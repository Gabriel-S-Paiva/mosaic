<script setup lang="ts">
import Timer from './Timer.vue';
import Tasks from './Tasks.vue';
</script>

<template>
    <main class="w-full col-span-2 flex flex-col gap-4">
        <div class="w-full bg-white rounded-lg">
            <Timer />
        </div>
        <div class="w-full bg-white rounded-lg">
            <Tasks />
        </div>
    </main>
</template>