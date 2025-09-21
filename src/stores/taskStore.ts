import { defineStore  } from "pinia";
import { ref } from 'vue';

// Define Interface
export interface Task {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    time: number;
    estimatedTime: number;
}

export const useTaskStore = defineStore('task', () => {
    // Define Variables
    const tasks = ref([
        // Placeholder Data
        {
            id: 1,
            title: 'Task 1',
            description:'Make tasks work',
            finished:true,
            time:1,
            estimatedTime:4
        },
        {
            id: 2,
            title: 'Task 2',
            description:'Improve tasks functionality',
            finished:false,
            time:1,
            estimatedTime:4
        },
        {
            id: 3,
            title: 'Task 3',
            description:'Make tasks work',
            finished:false,
            time:2,
            estimatedTime:6
        }
    ] as Task[])
    const currentTask = ref<Task>({
        id: 0,
        title:'No Task Found',
        description:'This is just a placholder. Lets create a new task',
        finished:false,
        time:0,
        estimatedTime:1
    })
    // Define Actions
    const selectTask = (task:Task) => {
        const found = tasks.value.find(t => t.id === task.id);
        if (found) currentTask.value = found;
    }
    const getNextTask = () => {
        const next = tasks.value.find(task => !task.finished);
        currentTask.value = next || {
            id: 0,
            title: 'No Task Found',
            description: 'This is just a placeholder. Lets create a new task.',
            finished: false,
            time: 0,
            estimatedTime: 1,
        }
    }
    const addTask = (newTask: Task) => {
        tasks.value.push({ ...newTask })
    }
    const editTask = (updatedTask:Task) => {
        const index = tasks.value.findIndex(t => t.id == updatedTask.id)
        if(index!==-1){
            tasks.value.splice(index,1, updatedTask)
        }
    }
    const deleteTask = (task: Task) => {
        const index = tasks.value.findIndex(t => t.id == task.id)
        if(index!==-1){
            tasks.value.splice(index,1)
        }
        getNextTask();
    }
    const completeTask = (task: Task) => {
        if (!task || task.id === 0) return
        const index = tasks.value.findIndex(t => t.id == task.id)
        if (index !== -1) {
            tasks.value[index].finished = true
        }
        getNextTask();
    }
    const pomodoroCompleted = () => {
        currentTask.value.time++;
    }
    return {
        tasks,
        currentTask,
        selectTask,
        addTask,
        editTask,
        deleteTask,
        completeTask,
        pomodoroCompleted,
        getNextTask,
    }
})