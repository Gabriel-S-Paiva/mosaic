<script setup lang="ts">
import { ref } from 'vue';
import Modal from "./Modal.vue";
// Interface Declaration
interface GridCell {
    id: number,
    groupId?: number,
    component?: string | null,
}
interface Selection {
    start:{
        col:number | null,
        row:number | null
    },
    end:{
        col:number | null,
        row:number | null
    }
}
// Variables Declaration
const selection = ref({
    start:{
        col:null,
        row:null
    },
    end:{
        col:null,
        row:null
    }
} as Selection)
// Array Creation Variables
const N_ROWS = 5
const N_COLS = 3
let id = 0
let groupId = 0
// Drag Interaction Variables
// Modal Bolean
const editMode = ref(false);
const isHelpOpen = ref(false);
// Array Creation
const grid = ref(
    Array.from({ length: N_ROWS }, () =>
        Array.from({ length: N_COLS }, () => ({
            id: getNextId(),
            component: null,
        } as GridCell))
    )
);
// Functions Declaration
function getNextId():number {
    return id++
}
function getNextGroupId():number {
    return groupId++
}
const selectComponent = () => {
    console.log(selection.value)
    const groupId = getNextGroupId()
    grid.value.forEach(row => {
        row.forEach(cell => {
            const rowIndex = Math.floor(cell.id / N_COLS)
            const colIndex = cell.id % N_COLS
            if (
                selection.value.start.col !== null &&
                selection.value.end.col !== null &&
                selection.value.end.col >= colIndex &&
                colIndex >= selection.value.start.col &&
                selection.value.start.row !== null &&
                selection.value.end.row !== null &&
                selection.value.end.row >= rowIndex &&
                rowIndex >= selection.value.start.row
            ) {
                cell.component = "Timer"
                cell.groupId = groupId
            }
        })
    })
};
const startDrag = (index: number) => {
    const row = Math.floor(index / N_COLS)
    const col = index % N_COLS
    selection.value.start = {col:col, row:row}
}
const endDrag = (index: number) => {
    const row = Math.floor(index / N_COLS)
    const col = index % N_COLS
    selection.value.end = {col:col, row:row}
    selectComponent();
}
</script>

<template>
    <main class="col-span-1 md:col-span-10 bg-white rounded-lg">
        <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
            <h2 class=" text-white text-xl font-bold font-['Switzer']">
                Pomodoro
            </h2>
            <div class="flex gap-4">
                <button @click="editMode = !editMode" class="flex items-center justify-center">
                    <span class="material-symbols-outlined text-white">edit</span>
                </button>
                <button @click="isHelpOpen = true" class="flex items-center justify-center">
                    <span class="material-symbols-outlined text-white">help</span>
                </button>
            </div>
        </div>
        <section class="p-5 grid grid-cols-5 grid-rows-3 gap-4">
            <div
                v-for="(row, rowIndex) in grid"
                :key="rowIndex"
            >
                <div
                    v-for="(cell, colIndex) in row"
                    :key="cell.id"
                    @mousedown="startDrag(rowIndex * N_COLS + colIndex)"
                    @mouseup="endDrag(rowIndex * N_COLS + colIndex)"
                    class="w-full h-60 bg-offwhite rounded-2xl"
                    :class="{
                        'bg-blue-200': cell.groupId !== undefined,
                    }"
                >
                {{ cell }}
                    <component v-if="cell.component" :is="cell.component"></component>
                </div>
            </div>
        </section> 
    </main>
    <Modal v-if="isHelpOpen" :title="'Help'" @close="isHelpOpen = false">
        <p>hello im help</p>
    </Modal>
</template>