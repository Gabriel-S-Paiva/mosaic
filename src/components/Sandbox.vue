<script setup lang="ts">
import { ref } from 'vue';
import Modal from "./Modal.vue";
// Interface Declaration
interface GridCell {
    width:number,
    height:number,
    component:string,
}
// Variables Declaration
const sandBoxCells = ref(Array.from({ length: 15 }, () => ({
    width: 1,
    height: 1,
    component: 'Empty',
} as GridCell)));

const startCell = ref<null | number>(null)
const editMode = ref(false);
const isHelpOpen = ref(false);
// Functions Declaration
const startDrag = (index:number) => {
    if(!editMode.value) return

    startCell.value = index
}
const endDrag = (index:number) => {
    if(startCell.value === null) return

    const colStart = Math.min(startCell.value % 5, index % 5);
    const colEnd = Math.max(startCell.value % 5, index % 5);
    const rowStart = Math.min(Math.floor(startCell.value / 5), Math.floor(index / 5));
    const rowEnd = Math.max(Math.floor(startCell.value / 5), Math.floor(index / 5));

    console.log("colStart:", colStart, "colEnd:", colEnd);
    console.log("rowStart:", rowStart, "rowEnd:", rowEnd);
    console.log("width:", colEnd - colStart + 1, "height:", rowEnd - rowStart + 1);

    const newGridCell = {
        width:(colEnd - colStart + 1),
        height:(rowEnd - rowStart + 1),
        component:'Hello'
    } as GridCell

    const area = newGridCell.height * newGridCell.width
    sandBoxCells.value.splice(startCell.value, area, newGridCell)
    startCell.value = null;
}
</script>

<template>
    <main class="col-span-1 h-min md:col-span-10 bg-white rounded-lg">
        <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
            <h2 class=" text-white text-xl font-bold font-['Switzer']">
                Pomodoro
            </h2>
            <div class="flex gap-4">
                <button @click="editMode = !editMode" class="flex items-center justify-center">
                    <span class="material-symbols-outlined text-white">{{editMode ? 'check' : 'edit'}}</span>
                </button>
                <button @click="isHelpOpen = true" class="flex items-center justify-center">
                    <span class="material-symbols-outlined text-white">help</span>
                </button>
            </div>
        </div>
        <section class="p-5 grid grid-cols-5 grid-rows-3 gap-4">
            <div
                v-for="(cell,index) in sandBoxCells"
                :key="index"
                @mousedown="startDrag(index)"
                @mouseup="endDrag(index)"
                :class="[
                    `col-span-${cell.width}`,
                    `row-span-${cell.height}`,
                    'w-full',
                    'min-h-55',
                    'bg-offwhite',
                    'rounded-2xl'
                ]"
            >
                {{ index }}
                {{ cell.component }}
            </div>
        </section> 
    </main>
    <Modal v-if="isHelpOpen" :title="'Help'" @close="isHelpOpen = false">
        <p>hello im help</p>
    </Modal>
</template>
