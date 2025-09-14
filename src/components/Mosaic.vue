<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps ({
    timeElapsed: {
        type: Number,
        default: 0
    },
    totalTime: {
        type: Number,
        default: 1500
    },
    status: {
        type: String,
        default: "Focus"
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
    return props.status=="Focus" ? filledCells: 25;
})
</script>

<template>
    <div class="w-full aspect-square rounded-r rounded-bl grid grid-rows-5 grid-cols-5 gap-1 p-1 bg-offwhite">
        <div v-for="nCell in displayMosaic" class="w-full h-full">
            <span v-if="flatMosaic[nCell-1]" class="bg-primary block rounded-sm w-full h-full"></span>
            <span v-else class="bg-dark block rounded-sm w-full h-full"></span>
        </div>
    </div>
</template>