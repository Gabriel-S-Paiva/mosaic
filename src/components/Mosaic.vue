<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps ({
    timeElapsed: {
        type: Number,
        default: 0
    },
    totalTime: {
        type: Number,
        default: 1500
    }
})
const mosaic = [
    [true, false, false, false, true],
    [true, true, false, true, true],
    [true, false, true, false, true],
    [true, false, false, false, true],
    [true, false, false, false, true]
]

const flatMosaic = mosaic.flat();

const displayMosaic = computed(() => {
    const nCells = 25
    const fillRatio = props.timeElapsed / props.totalTime;
    const filledCells = Math.floor(fillRatio*nCells);
    return flatMosaic.map((val, index) => index < filledCells ? val : null)
})
</script>

<template>
    <div class="w-full h-56 rounded-r rounded-bl grid grid-rows-5 grid-cols-5 gap-0.5 bg-offwhite">
        <div v-for="(cell, index) in displayMosaic" :key="index" class="w-full h-full">
            <span v-if="cell" class="bg-primary w-full h-full"></span>
            <span v-else class="bg-dark w-full h-full"></span>
        </div>
    </div>
</template>