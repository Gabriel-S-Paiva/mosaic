<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Modal from "./Modal.vue";
import Timer from "./Timer.vue";
import Notes from "./Notes.vue";
// Interface Declaration
interface GridCell {
    width:number,
    height:number,
    col:number,
    row:number,
    component:string|null,
}
const componentMap: Record<string, any> = {
    Timer,
    Notes,
    Empty: null,
};
// Variables Declaration
const ROWS = 3;
const COLS = 5;
const sandBoxCells = ref(
    Array.from({ length: ROWS }, (_, r) =>
        Array.from({ length: COLS }, (_, c) => ({
            width: 1,
            height: 1,
            col:c,
            row:r,
            component: 'Empty',
        } as GridCell))
    )
);
console.log(sandBoxCells.value)
const startCell = ref<null | {row:number,col:number}>(null)
const selectedComponent = ref<string | null>(null);
const editMode = ref(false);
const isHelpOpen = ref(false);
const isSelectOpen = ref(false)
// Functions Declaration
const waitForComponentSelection = (): Promise<string> => {
    return new Promise((resolve) => {
        const unwatch = watch(selectedComponent, (value) => {
            if (value !== null) {
                unwatch(); // Stop watching once a component is selected
                resolve(value); // Resolve the promise with the selected component
            }
        });
    });
};
const startDrag = (cell: GridCell) => {
    if (!editMode.value) return;

    startCell.value = { row: cell.row, col: cell.col };
};
const endDrag = async (cell: GridCell) => {
    if (!startCell.value) return;

   const colStart = Math.min(startCell.value.col, cell.col);
    const colEnd = Math.max(startCell.value.col, cell.col);
    const rowStart = Math.min(startCell.value.row, cell.row);
    const rowEnd = Math.max(startCell.value.row, cell.row);

    console.log("colStart:", colStart, "colEnd:", colEnd);
    console.log("rowStart:", rowStart, "rowEnd:", rowEnd);

    openSelect()
    const component = await waitForComponentSelection();

    const newGridCell = {
        width: colEnd - colStart + 1,
        col: colStart,
        height: rowEnd - rowStart + 1,
        row: rowStart,
        component: component,
    } as GridCell;

    if(newGridCell.component != 'Empty'){
        sandBoxCells.value.forEach(row => {
            row.forEach(cell => {
                if (cell.col === newGridCell.col && cell.row === newGridCell.row) {
                    // Set the anchor cell
                    cell.width = newGridCell.width;
                    cell.height = newGridCell.height;
                    cell.component = newGridCell.component;
                } else if (
                    cell.col >= colStart &&
                    cell.col <= colEnd &&
                    cell.row >= rowStart &&
                    cell.row <= rowEnd
                ) {
                    // Mark other cells as occupied
                    cell.component = null;
                }
            });
        });
    }

    startCell.value = null;
}
const resetGrid = () => {
    sandBoxCells.value = Array.from({ length: ROWS }, (_, r) =>
        Array.from({ length: COLS }, (_, c) => ({
            width: 1,
            height: 1,
            col: c,
            row: r,
            component: 'Empty',
        } as GridCell))
    );
};
const openSelect = () =>{
    isSelectOpen.value = true
}
const selectComponent = (component: string) => {
    selectedComponent.value = component;
    isSelectOpen.value = false; // Close the modal
};
const visibleCells = computed(() =>
    sandBoxCells.value.flat().filter(cell => cell.component !== null)
);
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
                <button v-if="editMode" @click="resetGrid()" class="flex items-center justify-center">
                    <span class="material-symbols-outlined text-white">replay</span>
                </button>
                <button @click="isHelpOpen = true" class="flex items-center justify-center">
                    <span class="material-symbols-outlined text-white">help</span>
                </button>
            </div>
        </div>
        <section class="p-5 grid grid-cols-5 grid-rows-3 gap-4">
            <div
                v-for="(cell, index) in visibleCells"
                :key="index"
                @mousedown="startDrag(cell)"
                @mouseup="endDrag(cell)"
                :class="[
                    cell.width === 1 ? 'col-span-1' : '',
                    cell.width === 2 ? 'col-span-2' : '',
                    cell.width === 3 ? 'col-span-3' : '',
                    cell.width === 4 ? 'col-span-4' : '',
                    cell.width === 5 ? 'col-span-5' : '',
                    cell.height === 1 ? 'row-span-1' : '',
                    cell.height === 2 ? 'row-span-2' : '',
                    cell.height === 3 ? 'row-span-3' : '',
                    'w-full',
                    'min-h-55',
                    'bg-offwhite',
                    'rounded-2xl'
                ]"
            >
                <component :is="componentMap[cell.component ?? 'Empty']"/>
            </div>
        </section> 
    </main>
    <Modal v-if="isSelectOpen" :title="'Select Component'" @close="isSelectOpen = false ">
        <div class="flex flex-col gap-2">
            <button
                v-for="(_, name) in componentMap"
                :key="name"
                class="px-4 py-2 bg-primary text-white rounded"
                @click="selectComponent(name)"
            >
                {{ name }}
            </button>
        </div>
    </Modal>

    <Modal v-if="isHelpOpen" :title="'Help'" @close="isHelpOpen = false">
        <p>hello im help</p>
    </Modal>
</template>
