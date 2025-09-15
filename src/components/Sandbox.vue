<script setup lang="ts">
import { ref } from 'vue';
import Modal from "./Modal.vue";
import Tasks from "./Tasks.vue"
// Interface Declaration
interface gridCell {
    id: number,
    groupId?: number,
    component?: string | null,

}
// Variables Declaration
// Array Creation Variables
const N_ROWS = 3
const N_COLS = 5
let count = 0
// Drag Interaction Variables
const isDragging = ref(false);
const startIndex = ref<{col:number,row:number}|null>(null)
const endIndex = ref<{col:number,row:number}|null>(null)
const selectedComponent = ref<string | null>("Timer");
// Modal Bolean
const editMode = ref(false);
const isHelpOpen = ref(false);
// Array Creation
const grid = ref(
    Array.from({ length: N_ROWS }, () =>
        Array.from({ length: N_COLS }, () => ({
            id: getNextId(),
            component: null,
        } as gridCell))
    )
);
// Functions Declaration
function getNextId():number {
    return count++
}
const startDrag = (index: number) => {
    isDragging.value = true;

    const col = index % N_COLS;
    const row = Math.floor(index / N_COLS);

    startIndex.value = { col, row };
    endIndex.value = { col, row }; // Initialize endIndex to the same as startIndex
};
const dragOver = (index: number) => {
    if (isDragging.value) {
        const col = index % N_COLS;
        const row = Math.floor(index / N_COLS);

        endIndex.value = { col, row };
    }
};
const isCellSelected = (index: number) => {
    if (startIndex.value === null || endIndex.value === null) return false;

    const col = index % N_COLS;
    const row = Math.floor(index / N_COLS);

    const rMin = Math.min(startIndex.value.row, endIndex.value.row);
    const rMax = Math.max(startIndex.value.row, endIndex.value.row);
    const cMin = Math.min(startIndex.value.col, endIndex.value.col);
    const cMax = Math.max(startIndex.value.col, endIndex.value.col);

    return row >= rMin && row <= rMax && col >= cMin && col <= cMax;
};
const endDrag = () => {
    isDragging.value = false;

    if (startIndex.value !== null && endIndex.value !== null) {
        console.log("Selected cells:", getSelectedCells());
        if (selectedComponent.value) {
            assignComponent(selectedComponent.value);
        }
        showTolltip(); // Show tooltip or perform other actions
    }
};
const getSelectedCells = () => {
    if (startIndex.value === null || endIndex.value === null) return [];

    const rMin = Math.min(startIndex.value.row, endIndex.value.row);
    const rMax = Math.max(startIndex.value.row, endIndex.value.row);
    const cMin = Math.min(startIndex.value.col, endIndex.value.col);
    const cMax = Math.max(startIndex.value.col, endIndex.value.col);

    const selectedCells = [];
    for (let row = rMin; row <= rMax; row++) {
        for (let col = cMin; col <= cMax; col++) {
            selectedCells.push({ row, col });
        }
    }
    return selectedCells;
};
const assignComponent = (component: string) => {
    if (!editMode.value) {
        console.log("Edit mode is not enabled.");
        return;
    }

    const selectedCells = getSelectedCells(); // Get all selected cells
    if (selectedCells.length === 0) {
        console.log("No cells selected.");
        return;
    }

    selectedCells.forEach(({ row, col }) => {
        grid.value[row][col].component = component; // Assign the component to the selected cell
    });

    console.log(`Assigned component "${component}" to selected cells.`);
};
// Modal functions
const startEdit = () => {
    editMode.value = true
};
const openHelp = () => {
    isHelpOpen.value = true;
}
const showTolltip = () => {

}
//! This method is deprecated moved into and drag alternative isntead of an click one
const tryEdit = (cellId: number) => {
    if (editMode.value) {
        // Calculate row and column from cellId
        const startRow = Math.floor(cellId / N_COLS); // Divide by the number of columns
        const startCol = cellId % N_COLS; // Modulo gives the column index

        // Update the startIndex with the calculated row and column
        if (startIndex.value === null) {
            startIndex.value = { row: startRow, col: startCol };
        } else {
            startIndex.value.row = startRow;
            startIndex.value.col = startCol;
        }

        console.log(`Editing started at Row: ${startRow}, Col: ${startCol}`);
    } else {
        console.log("Edit mode is not enabled.");
    }
};
</script>

<template>
    <main class="col-span-1 md:col-span-10 bg-white rounded-lg">
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
            <div
                v-for="(cell, index) in grid.flat()"
                :key="cell.id"
                class="w-full h-60 bg-offwhite rounded-2xl"
                @mousedown="startDrag(index)"
                @mousemove="dragOver(index)"
                @mouseup="endDrag"
                :class="{
                    'bg-blue-200': isCellSelected(index),
                }"
            >
                {{ cell.component }}
                <component v-if="cell.component" :is="cell.component" />
            </div>
        </section>
        <div v-if="editMode" class="p-4">
            <label for="component-select">Select Component:</label>
            <select id="component-select" v-model="selectedComponent">
                <option value="Timer">Timer</option>
                <option value="Task">Task</option>
            </select>
        </div>  
    </main>
    <Modal v-if="isHelpOpen" :title="'Help'" @close="isHelpOpen = false">
        <p>hello im help</p>
    </Modal>
</template>