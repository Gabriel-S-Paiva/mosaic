import { defineStore } from "pinia";
import { ref, watch, computed } from 'vue';

// Define Interface
export interface GridCell {
    row: number;
    col: number;
    component: string | null;
    width: number;
    height: number;
}

// Define Store
export const useGridStore = defineStore('grid', () => {
    // Define Grid Size
    const ROWS = 3;
    const COLS = 5;

    // State: 2D array of gridCell (dynamic)
    const sandBoxCells = ref(
        Array.from({ length: ROWS }, (_, row) =>
            Array.from({ length: COLS }, (_, col) => ({
                row,
                col,
                component: 'Empty',
                width: 1,
                height: 1,
            } as GridCell))
        )
    );
    // Computed: Flattened array of cells with non-null components
    const visibleCells = computed(() =>
        sandBoxCells.value.flat().filter((cell) => cell.component !== null)
    );

    // Selection State
    const isSelectOpen = ref(false);
    const selectedComponent = ref<string | null>(null);

    // Define Actions
    const resetGrid = () => {
        sandBoxCells.value = Array.from({ length: ROWS }, (_, row) =>
            Array.from({ length: COLS }, (_, col) => ({
                row,
                col,
                component: 'Empty',
                width: 1,
                height: 1,
            } as GridCell))
        );
    };

    const updateCell = (row: number, col: number, component: string) => {
        const cell = sandBoxCells.value[row][col];
        if (cell) {
            cell.component = component;
        }
    };

    const openSelect = () => {
        isSelectOpen.value = true;
    };

    const selectComponent = (component: string) => {
        selectedComponent.value = component;
        isSelectOpen.value = false;
    };

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

    return {
        resetGrid,
        openSelect,
        selectComponent,
        waitForComponentSelection,
        sandBoxCells,
        visibleCells,
        updateCell,
        isSelectOpen
    };
})